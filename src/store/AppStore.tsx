import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as seed from "@/data/seed";
import { AppError, REASON_MAX, REASON_MIN } from "@/lib/errors";
import { nextId } from "@/lib/format";
import {
  MAX_SPONSORED_SLOTS,
  SUBSCRIPTION_TERM_DAYS,
  SUSPENSION_PRESETS,
  type AuditLogEntry,
  type Content,
  type DecisionRoom,
  type DomainEvent,
  type DomainEventName,
  type Flag,
  type ModerationAction,
  type ModerationActionType,
  type NotificationRecord,
  type SponsoredPlacement,
  type SuspensionRecord,
  type User,
  type Vendor,
} from "@/data/types";

// ─────────────────────────────────────────────────────────────────────────────
// State shape. There is NO backend — everything lives here in memory and is
// seeded at startup. Every mutating action computes a full next-state and
// commits it in one setState call, which models the spec's "single atomic
// transaction" guarantee (audit + moderation + entity change commit together,
// or not at all).
// ─────────────────────────────────────────────────────────────────────────────

interface StoreState {
  users: User[];
  content: Content[];
  rooms: DecisionRoom[];
  flags: Flag[];
  vendors: Vendor[];
  placements: SponsoredPlacement[];
  suspensions: SuspensionRecord[];
  moderationActions: ModerationAction[];
  auditLog: AuditLogEntry[];
  events: DomainEvent[];
  notifications: NotificationRecord[];
}

function initialState(): StoreState {
  return {
    users: structuredClone(seed.users),
    content: structuredClone(seed.content),
    rooms: structuredClone(seed.rooms),
    flags: structuredClone(seed.flags),
    vendors: structuredClone(seed.vendors),
    placements: structuredClone(seed.placements),
    suspensions: structuredClone(seed.suspensions),
    moderationActions: structuredClone(seed.moderationActions),
    auditLog: structuredClone(seed.auditLog),
    events: structuredClone(seed.events),
    notifications: structuredClone(seed.notifications),
  };
}

export interface StoreActions {
  // Content moderation — general queue (CTAs 2–5)
  dismissFlag(flagId: string): void;
  removeContent(contentId: string, reason: string, simulateFailure?: boolean): void;
  warnAuthor(contentId: string, reason: string): void;
  // Decision Rooms (CTAs 7–8)
  hideContent(contentId: string, simulateFailure?: boolean): void;
  unhideContent(contentId: string): void;
  removeDecisionRoomContent(contentId: string, reason: string): void;
  // Revise a resolved decision in place (from the "Show resolved" list)
  removeResolvedContent(flagId: string, reason: string): void;
  restoreResolvedContent(flagId: string, reason: string): void;
  // Appeals — a second review of a removal (admin-side)
  upholdAppeal(flagId: string, reason: string): void;
  denyAppeal(flagId: string, reason: string): void;
  // User account management (CTAs 10–13)
  warnUser(userId: string, reason: string): void;
  suspendUser(userId: string, durationHours: number, reason: string): void;
  banUser(userId: string, confirmToken: string, reason?: string): void;
  liftSuspension(userId: string): void;
  // Vendor subscription (CTAs 14–15)
  addVendorToList(vendorId: string, activate: boolean): void;
  activateVendor(vendorId: string): void;
  deactivateVendor(vendorId: string, reason?: string): void;
  // Sponsored placements (CTAs 16–18)
  createPlacement(
    vendorId: string,
    rank: number,
    monthlyFee: number,
    durationDays: number,
  ): SponsoredPlacement;
  updatePlacementRank(placementId: string, newRank: number): void;
  removePlacement(placementId: string): void;
  // Demo controls
  resetAll(): void;
}

interface StoreContextValue extends StoreState, StoreActions {
  session: typeof seed.session;
  // derived read helpers
  activeSuspensionFor(userId: string): SuspensionRecord | undefined;
  roomFor(roomId?: string): DecisionRoom | undefined;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <AppStoreProvider>");
  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(initialState);

  // stateRef lets action closures read the latest committed state without being
  // recreated on every render.
  const stateRef = useRef(state);
  stateRef.current = state;

  const admin = seed.session;

  // ── small builders ────────────────────────────────────────────────────────
  const buildAudit = useCallback(
    (
      actionType: string,
      targetType: string,
      targetLabel: string,
      metadata?: Record<string, unknown>,
    ): AuditLogEntry => ({
      id: nextId("audit"),
      actorAdminId: admin.adminId,
      actorAdminName: admin.adminName,
      actionType,
      targetType,
      targetLabel,
      timestamp: new Date().toISOString(),
      metadata,
    }),
    [admin],
  );

  const buildModeration = useCallback(
    (
      actionType: ModerationActionType,
      targetType: ModerationAction["targetType"],
      targetId: string,
      reason: string | null,
    ): ModerationAction => ({
      id: nextId("mod"),
      actionType,
      targetType,
      targetId,
      adminId: admin.adminId,
      reason,
      createdAt: new Date().toISOString(),
    }),
    [admin],
  );

  const buildEvent = useCallback(
    (
      name: DomainEventName,
      consumers: string[],
      payload: Record<string, unknown>,
    ): DomainEvent => ({
      id: nextId("evt"),
      name,
      consumers,
      payload,
      emittedAt: new Date().toISOString(),
    }),
    [],
  );

  // Notifications are dispatched asynchronously (Redis task queue in prod). Here
  // we create them "queued" and flip to "delivered" after a short delay, with a
  // non-blocking "delayed" hop every few sends to exercise the delayed banner.
  const deliveryCounter = useRef(0);
  const scheduleDelivery = useCallback((notifId: string) => {
    deliveryCounter.current += 1;
    const willDelay = deliveryCounter.current % 4 === 0;
    const finalize = () =>
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) =>
          n.id === notifId ? { ...n, status: "delivered", attempts: n.attempts + 1 } : n,
        ),
      }));
    if (willDelay) {
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) =>
          n.id === notifId ? { ...n, status: "delayed", attempts: n.attempts + 1 } : n,
        ),
      }));
      window.setTimeout(finalize, 2600);
    } else {
      window.setTimeout(finalize, 900);
    }
  }, []);

  const buildNotification = useCallback(
    (recipientId: string, recipientName: string, message: string, reason?: string) => {
      const notif: NotificationRecord = {
        id: nextId("ntf"),
        recipientId,
        recipientName,
        channel: "in-app",
        message,
        reason,
        status: "queued",
        attempts: 0,
        createdAt: new Date().toISOString(),
      };
      return notif;
    },
    [],
  );

  // ── lookups ─────────────────────────────────────────────────────────────────
  const get = <T extends { id: string }>(arr: T[], id: string) => arr.find((x) => x.id === id);

  const userLabel = (s: StoreState, id: string | null) =>
    (id && get(s.users, id)?.name) || "Anonymous";

  const validateReason = (reason: string) => {
    const len = reason.trim().length;
    if (len < REASON_MIN || len > REASON_MAX) throw new AppError("MODERATION_REASON_TOO_SHORT");
  };

  const activeSuspensionFor = useCallback(
    (userId: string) =>
      stateRef.current.suspensions.find((s) => s.userId === userId && s.liftedAt === null),
    [],
  );

  const roomFor = useCallback(
    (roomId?: string) =>
      roomId ? stateRef.current.rooms.find((r) => r.id === roomId) : undefined,
    [],
  );

  // ── CTA 2 — Dismiss flag ─────────────────────────────────────────────────────
  const dismissFlag = useCallback(
    (flagId: string) => {
      const s = stateRef.current;
      const flag = get(s.flags, flagId);
      if (!flag || flag.status === "resolved") throw new AppError("FLAG_NOT_FOUND");
      const ts = new Date().toISOString();
      const flags = s.flags.map((f): Flag =>
        f.id === flagId
          ? { ...f, status: "resolved", resolvedAt: ts, resolutionAction: "dismiss" }
          : f,
      );
      setState({
        ...s,
        flags,
        moderationActions: [buildModeration("dismiss", "flag", flagId, null), ...s.moderationActions],
        auditLog: [buildAudit("dismiss", "flag", `Flag ${flagId}`), ...s.auditLog],
      });
    },
    [buildAudit, buildModeration],
  );

  // ── CTA 3 — Remove content (general) ─────────────────────────────────────────
  const removeContent = useCallback(
    (contentId: string, reason: string, simulateFailure = false) => {
      validateReason(reason);
      const s = stateRef.current;
      const item = get(s.content, contentId);
      if (!item || item.deletedAt) throw new AppError("CONTENT_NOT_FOUND");
      // Atomic guarantee: a write failure rolls back the *entire* transaction.
      if (simulateFailure) throw new AppError("WRITE_FAILED");

      const ts = new Date().toISOString();
      const content = s.content.map((c): Content =>
        c.id === contentId ? { ...c, deletedAt: ts } : c,
      );
      const flags = s.flags.map((f): Flag =>
        f.contentId === contentId && f.status !== "resolved"
          ? { ...f, status: "resolved", resolvedAt: ts, resolutionAction: "remove" }
          : f,
      );
      const next: StoreState = {
        ...s,
        content,
        flags,
        moderationActions: [
          buildModeration("remove", "content", contentId, reason),
          ...s.moderationActions,
        ],
        auditLog: [buildAudit("remove", "content", `${item.type}: "${item.excerpt.slice(0, 40)}…"`, { reason }), ...s.auditLog],
        events: [
          buildEvent("ContentRemovedByAdmin", ["NOTIFICATION-SYSTEM", "CONTENT-MGMT", "FEED-SYSTEM"], {
            contentId,
            reason,
          }),
          ...s.events,
        ],
        notifications: s.notifications,
      };
      if (item.authorId) {
        const notif = buildNotification(
          item.authorId,
          userLabel(s, item.authorId),
          "Your content was removed for violating platform policy.",
          reason,
        );
        next.notifications = [notif, ...s.notifications];
        setState(next);
        scheduleDelivery(notif.id);
      } else {
        setState(next);
      }
    },
    [buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── CTA 4 — Warn author (from moderation queue; content stays live) ──────────
  const warnAuthor = useCallback(
    (contentId: string, reason: string) => {
      validateReason(reason);
      const s = stateRef.current;
      const item = get(s.content, contentId);
      if (!item) throw new AppError("CONTENT_NOT_FOUND");
      if (!item.authorId)
        throw new AppError("INVALID_INPUT", "Content is anonymous — there is no author to warn.");
      const author = get(s.users, item.authorId);
      if (!author) throw new AppError("USER_NOT_FOUND");

      const users = s.users.map((u): User =>
        u.id === author.id && u.accountStatus === "active" ? { ...u, accountStatus: "warned" } : u,
      );
      const notif = buildNotification(
        author.id,
        author.name,
        "You received a formal warning from a moderator.",
        reason,
      );
      setState({
        ...s,
        users,
        moderationActions: [buildModeration("warn", "user", author.id, reason), ...s.moderationActions],
        auditLog: [buildAudit("warn", "user", author.name, { fromContentId: contentId }), ...s.auditLog],
        events: [buildEvent("UserModerationActionApplied", ["NOTIFICATION-SYSTEM"], { userId: author.id, action_type: "warn" }), ...s.events],
        notifications: [notif, ...s.notifications],
      });
      scheduleDelivery(notif.id);
    },
    [buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── CTA 7 — Hide / unhide (Decision Rooms, reversible) ───────────────────────
  const hideContent = useCallback(
    (contentId: string, simulateFailure = false) => {
      const s = stateRef.current;
      const item = get(s.content, contentId);
      if (!item || item.deletedAt) throw new AppError("CONTENT_NOT_FOUND");
      if (item.hiddenAt) throw new AppError("INVALID_STATE_TRANSITION");
      // Write failure → 500, content remains FULLY visible (no partial state).
      if (simulateFailure) throw new AppError("WRITE_FAILED");
      const ts = new Date().toISOString();
      const content = s.content.map((c): Content => (c.id === contentId ? { ...c, hiddenAt: ts } : c));
      setState({
        ...s,
        content,
        moderationActions: [buildModeration("hide", "content", contentId, null), ...s.moderationActions],
        auditLog: [buildAudit("hide", "content", item.roomName ?? "Decision Room content"), ...s.auditLog],
        events: [buildEvent("ContentHiddenPendingReview", ["DECISION-ROOMS"], { contentId }), ...s.events],
      });
    },
    [buildAudit, buildModeration, buildEvent],
  );

  const unhideContent = useCallback(
    (contentId: string) => {
      const s = stateRef.current;
      const item = get(s.content, contentId);
      if (!item || item.deletedAt) throw new AppError("CONTENT_NOT_FOUND");
      if (!item.hiddenAt) throw new AppError("INVALID_STATE_TRANSITION");
      const content = s.content.map((c): Content => (c.id === contentId ? { ...c, hiddenAt: null } : c));
      setState({
        ...s,
        content,
        moderationActions: [buildModeration("unhide", "content", contentId, null), ...s.moderationActions],
        auditLog: [buildAudit("unhide", "content", item.roomName ?? "Decision Room content"), ...s.auditLog],
      });
    },
    [buildAudit, buildModeration],
  );

  // ── CTA 8 — Remove DR content (notifies author; appeal applies) ──────────────
  const removeDecisionRoomContent = useCallback(
    (contentId: string, reason: string) => {
      validateReason(reason);
      const s = stateRef.current;
      const item = get(s.content, contentId);
      if (!item || item.deletedAt) throw new AppError("CONTENT_NOT_FOUND");
      const ts = new Date().toISOString();
      // Removal is permitted whether the room is active or archived (CTA 8). We record the room's
      // status on the audit + event so removals from a closed room remain traceable.
      const room = item.roomId ? get(s.rooms, item.roomId) : undefined;
      const roomArchived = room?.status === "archived";
      // CTA 8 ships with an appeal process: removal opens a bounded, 14-day window in which the
      // author can contest the decision — recorded on the audit entry and surfaced to the author.
      const appealDeadline = new Date(Date.now() + 14 * 24 * 3600_000).toISOString();
      const content = s.content.map((c): Content =>
        c.id === contentId ? { ...c, deletedAt: ts } : c,
      );
      const flags = s.flags.map((f): Flag =>
        f.contentId === contentId && f.status !== "resolved"
          ? { ...f, status: "resolved", resolvedAt: ts, resolutionAction: "remove" }
          : f,
      );
      const next: StoreState = {
        ...s,
        content,
        flags,
        moderationActions: [buildModeration("remove", "content", contentId, reason), ...s.moderationActions],
        auditLog: [buildAudit("remove", "content", `${item.roomName ?? "DR"}: "${item.excerpt.slice(0, 30)}…"`, { reason, appeal: true, appealDeadline, roomName: item.roomName, roomArchived }), ...s.auditLog],
        events: [buildEvent("ContentRemovedByAdmin", ["NOTIFICATION-SYSTEM", "CONTENT-MGMT", "FEED-SYSTEM"], { contentId, reason, appealDeadline, roomArchived }), ...s.events],
        notifications: s.notifications,
      };
      if (item.authorId) {
        const notif = buildNotification(
          item.authorId,
          userLabel(s, item.authorId),
          `Your Decision Room content was removed. You may appeal this decision until ${new Date(appealDeadline).toLocaleDateString()}.`,
          reason,
        );
        next.notifications = [notif, ...s.notifications];
        setState(next);
        scheduleDelivery(notif.id);
      } else {
        setState(next);
      }
    },
    [buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── Revise a resolved decision (from the "Show resolved" list) ───────────────
  // A closed flag is not a dead end: it can be re-decided in place. Escalate a dismissed (still-live)
  // flag into a removal, or reverse a removal by restoring the content. Each revision re-stamps the
  // flag's resolution and writes audit + moderation + event + notification in one atomic commit —
  // the same single-transaction guarantee as the original action.
  const removeResolvedContent = useCallback(
    (flagId: string, reason: string) => {
      validateReason(reason);
      const s = stateRef.current;
      const flag = get(s.flags, flagId);
      if (!flag || flag.status !== "resolved") throw new AppError("FLAG_NOT_FOUND");
      const item = get(s.content, flag.contentId);
      if (!item) throw new AppError("CONTENT_NOT_FOUND");
      if (item.deletedAt)
        throw new AppError("INVALID_STATE_TRANSITION", "This content has already been removed.");
      const ts = new Date().toISOString();
      const isDR = item.surface === "decision-room";
      const room = item.roomId ? get(s.rooms, item.roomId) : undefined;
      const roomArchived = room?.status === "archived";
      const appealDeadline = new Date(Date.now() + 14 * 24 * 3600_000).toISOString();
      const label = isDR
        ? `${item.roomName ?? "DR"}: "${item.excerpt.slice(0, 30)}…"`
        : `${item.type}: "${item.excerpt.slice(0, 40)}…"`;
      const content = s.content.map((c): Content => (c.id === item.id ? { ...c, deletedAt: ts } : c));
      // Re-stamp this flag (and resolve any still-open flags on the same content) as a removal.
      const flags = s.flags.map((f): Flag =>
        f.contentId === item.id && (f.id === flag.id || f.status !== "resolved")
          ? { ...f, status: "resolved", resolvedAt: ts, resolutionAction: "remove" }
          : f,
      );
      const next: StoreState = {
        ...s,
        content,
        flags,
        moderationActions: [buildModeration("remove", "content", item.id, reason), ...s.moderationActions],
        auditLog: [
          buildAudit("remove", "content", label, {
            reason,
            revisedFrom: flag.resolutionAction,
            ...(isDR ? { appeal: true, appealDeadline, roomName: item.roomName, roomArchived } : {}),
          }),
          ...s.auditLog,
        ],
        events: [
          buildEvent("ContentRemovedByAdmin", ["NOTIFICATION-SYSTEM", "CONTENT-MGMT", "FEED-SYSTEM"], {
            contentId: item.id,
            reason,
            revised: true,
            ...(isDR ? { appealDeadline, roomArchived } : {}),
          }),
          ...s.events,
        ],
        notifications: s.notifications,
      };
      if (item.authorId) {
        const notif = buildNotification(
          item.authorId,
          userLabel(s, item.authorId),
          isDR
            ? `Your Decision Room content was removed. You may appeal this decision until ${new Date(appealDeadline).toLocaleDateString()}.`
            : "Your content was removed for violating platform policy.",
          reason,
        );
        next.notifications = [notif, ...s.notifications];
        setState(next);
        scheduleDelivery(notif.id);
      } else {
        setState(next);
      }
    },
    [buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  const restoreResolvedContent = useCallback(
    (flagId: string, reason: string) => {
      validateReason(reason);
      const s = stateRef.current;
      const flag = get(s.flags, flagId);
      if (!flag || flag.status !== "resolved") throw new AppError("FLAG_NOT_FOUND");
      const item = get(s.content, flag.contentId);
      if (!item) throw new AppError("CONTENT_NOT_FOUND");
      if (!item.deletedAt)
        throw new AppError("INVALID_STATE_TRANSITION", "This content is already live.");
      const ts = new Date().toISOString();
      const isDR = item.surface === "decision-room";
      const label = isDR
        ? `${item.roomName ?? "DR"}: "${item.excerpt.slice(0, 30)}…"`
        : `${item.type}: "${item.excerpt.slice(0, 40)}…"`;
      const content = s.content.map((c): Content => (c.id === item.id ? { ...c, deletedAt: null } : c));
      const flags = s.flags.map((f): Flag =>
        f.id === flag.id
          ? { ...f, status: "resolved", resolvedAt: ts, resolutionAction: "restore" }
          : f,
      );
      const next: StoreState = {
        ...s,
        content,
        flags,
        moderationActions: [buildModeration("restore", "content", item.id, reason), ...s.moderationActions],
        auditLog: [
          buildAudit("restore", "content", label, { reason, revisedFrom: flag.resolutionAction }),
          ...s.auditLog,
        ],
        events: [
          buildEvent("ContentRestoredByAdmin", ["NOTIFICATION-SYSTEM", "CONTENT-MGMT", "FEED-SYSTEM"], {
            contentId: item.id,
            reason,
          }),
          ...s.events,
        ],
        notifications: s.notifications,
      };
      if (item.authorId) {
        const notif = buildNotification(
          item.authorId,
          userLabel(s, item.authorId),
          "Your content was reviewed again and restored — it is visible once more.",
          reason,
        );
        next.notifications = [notif, ...s.notifications];
        setState(next);
        scheduleDelivery(notif.id);
      } else {
        setState(next);
      }
    },
    [buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── Appeal — uphold (a second review found the removal wrong → restore content) ──
  const upholdAppeal = useCallback(
    (flagId: string, reason: string) => {
      validateReason(reason);
      const s = stateRef.current;
      const flag = get(s.flags, flagId);
      if (!flag || flag.appealStatus !== "pending") throw new AppError("FLAG_NOT_FOUND");
      const item = get(s.content, flag.contentId);
      if (!item) throw new AppError("CONTENT_NOT_FOUND");
      const ts = new Date().toISOString();
      const isDR = item.surface === "decision-room";
      const label = isDR
        ? `${item.roomName ?? "DR"}: "${item.excerpt.slice(0, 30)}…"`
        : `${item.type}: "${item.excerpt.slice(0, 40)}…"`;
      const content = s.content.map((c): Content => (c.id === item.id ? { ...c, deletedAt: null } : c));
      const flags = s.flags.map((f): Flag =>
        f.id === flag.id
          ? { ...f, resolutionAction: "restore", appealStatus: "upheld", appealResolvedAt: ts }
          : f,
      );
      const next: StoreState = {
        ...s,
        content,
        flags,
        moderationActions: [buildModeration("restore", "content", item.id, reason), ...s.moderationActions],
        auditLog: [
          buildAudit("appeal-upheld", "content", label, { reason, removedFor: flag.reasons }),
          ...s.auditLog,
        ],
        events: [
          buildEvent("ContentRestoredByAdmin", ["NOTIFICATION-SYSTEM", "CONTENT-MGMT", "FEED-SYSTEM"], {
            contentId: item.id,
            reason,
            viaAppeal: true,
          }),
          ...s.events,
        ],
        notifications: s.notifications,
      };
      if (item.authorId) {
        const notif = buildNotification(
          item.authorId,
          userLabel(s, item.authorId),
          "Your appeal was successful — your content was reviewed again and restored.",
          reason,
        );
        next.notifications = [notif, ...s.notifications];
        setState(next);
        scheduleDelivery(notif.id);
      } else {
        setState(next);
      }
    },
    [buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── Appeal — deny (the removal was correct; it stands and is now final) ──────
  const denyAppeal = useCallback(
    (flagId: string, reason: string) => {
      validateReason(reason);
      const s = stateRef.current;
      const flag = get(s.flags, flagId);
      if (!flag || flag.appealStatus !== "pending") throw new AppError("FLAG_NOT_FOUND");
      const item = get(s.content, flag.contentId);
      if (!item) throw new AppError("CONTENT_NOT_FOUND");
      const ts = new Date().toISOString();
      const isDR = item.surface === "decision-room";
      const label = isDR
        ? `${item.roomName ?? "DR"}: "${item.excerpt.slice(0, 30)}…"`
        : `${item.type}: "${item.excerpt.slice(0, 40)}…"`;
      const flags = s.flags.map((f): Flag =>
        f.id === flag.id ? { ...f, appealStatus: "denied", appealResolvedAt: ts } : f,
      );
      const next: StoreState = {
        ...s,
        flags,
        auditLog: [buildAudit("appeal-denied", "content", label, { reason, removedFor: flag.reasons }), ...s.auditLog],
        notifications: s.notifications,
      };
      if (item.authorId) {
        const notif = buildNotification(
          item.authorId,
          userLabel(s, item.authorId),
          "Your appeal was reviewed — the original removal stands.",
          reason,
        );
        next.notifications = [notif, ...s.notifications];
        setState(next);
        scheduleDelivery(notif.id);
      } else {
        setState(next);
      }
    },
    [buildAudit, buildNotification, scheduleDelivery],
  );

  // ── CTA 10 — Warn user (account-level) ───────────────────────────────────────
  const warnUser = useCallback(
    (userId: string, reason: string) => {
      validateReason(reason);
      const s = stateRef.current;
      const user = get(s.users, userId);
      if (!user) throw new AppError("USER_NOT_FOUND");
      const users = s.users.map((u): User =>
        u.id === userId && u.accountStatus === "active" ? { ...u, accountStatus: "warned" } : u,
      );
      const notif = buildNotification(user.id, user.name, "You received a formal account warning.", reason);
      setState({
        ...s,
        users,
        moderationActions: [buildModeration("warn", "user", userId, reason), ...s.moderationActions],
        auditLog: [buildAudit("warn", "user", user.name), ...s.auditLog],
        events: [buildEvent("UserModerationActionApplied", ["NOTIFICATION-SYSTEM"], { userId, action_type: "warn" }), ...s.events],
        notifications: [notif, ...s.notifications],
      });
      scheduleDelivery(notif.id);
    },
    [buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── CTA 11 — Suspend user (reversible; one active suspension per user) ───────
  const suspendUser = useCallback(
    (userId: string, durationHours: number, reason: string) => {
      validateReason(reason);
      if (!SUSPENSION_PRESETS.some((p) => p.hours === durationHours))
        throw new AppError("SUSPENSION_DURATION_INVALID");
      const s = stateRef.current;
      const user = get(s.users, userId);
      if (!user) throw new AppError("USER_NOT_FOUND");
      if (user.accountStatus === "banned") throw new AppError("INVALID_STATE_TRANSITION", "A banned user cannot be suspended.");
      // Partial unique index: at most one active suspension per user.
      if (s.suspensions.some((r) => r.userId === userId && r.liftedAt === null))
        throw new AppError("USER_ALREADY_SUSPENDED");

      const start = new Date();
      const end = new Date(start.getTime() + durationHours * 3600_000);
      const record: SuspensionRecord = {
        id: nextId("susp"),
        userId,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        reason,
        adminId: admin.adminId,
        liftedAt: null,
      };
      const users = s.users.map((u): User => (u.id === userId ? { ...u, accountStatus: "suspended" } : u));
      const notif = buildNotification(
        user.id,
        user.name,
        `Your account is suspended until ${end.toLocaleString()}. You cannot log in during this period.`,
        reason,
      );
      setState({
        ...s,
        users,
        suspensions: [record, ...s.suspensions],
        moderationActions: [buildModeration("suspend", "user", userId, reason), ...s.moderationActions],
        auditLog: [buildAudit("suspend", "user", user.name, { suspension_end_time: end.toISOString() }), ...s.auditLog],
        events: [buildEvent("UserModerationActionApplied", ["NOTIFICATION-SYSTEM"], { userId, action_type: "suspend", suspension_end_time: end.toISOString() }), ...s.events],
        notifications: [notif, ...s.notifications],
      });
      scheduleDelivery(notif.id);
    },
    [admin, buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── CTA 12 — Ban user (irreversible; exact "CONFIRM" token) ──────────────────
  const banUser = useCallback(
    (userId: string, confirmToken: string, reason?: string) => {
      if (confirmToken !== "CONFIRM") throw new AppError("BAN_CONFIRMATION_INVALID");
      const s = stateRef.current;
      const user = get(s.users, userId);
      if (!user) throw new AppError("USER_NOT_FOUND");
      if (user.accountStatus === "banned") throw new AppError("USER_ALREADY_BANNED");

      const ts = new Date().toISOString();
      const users = s.users.map((u): User => (u.id === userId ? { ...u, accountStatus: "banned" } : u));
      // Banning supersedes any active suspension (keeps the active-suspension invariant clean).
      const suspensions = s.suspensions.map((r): SuspensionRecord =>
        r.userId === userId && r.liftedAt === null ? { ...r, liftedAt: ts } : r,
      );
      const notif = buildNotification(user.id, user.name, "Your account has been permanently banned.", reason);
      setState({
        ...s,
        users,
        suspensions,
        moderationActions: [buildModeration("ban", "user", userId, reason ?? null), ...s.moderationActions],
        auditLog: [buildAudit("ban", "user", user.name, { admin: admin.adminName, at: ts }), ...s.auditLog],
        events: [buildEvent("UserModerationActionApplied", ["NOTIFICATION-SYSTEM"], { userId, action_type: "ban" }), ...s.events],
        notifications: [notif, ...s.notifications],
      });
      scheduleDelivery(notif.id);
    },
    [admin, buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── CTA 13 — Lift active suspension early ────────────────────────────────────
  const liftSuspension = useCallback(
    (userId: string) => {
      const s = stateRef.current;
      const record = s.suspensions.find((r) => r.userId === userId && r.liftedAt === null);
      if (!record) throw new AppError("USER_NOT_FOUND"); // 404 also covers "nothing to lift"
      const user = get(s.users, userId);
      const ts = new Date().toISOString();
      const suspensions = s.suspensions.map((r): SuspensionRecord =>
        r.id === record.id ? { ...r, liftedAt: ts } : r,
      );
      const users = s.users.map((u): User => (u.id === userId ? { ...u, accountStatus: "active" } : u));
      const notif = buildNotification(userId, user?.name ?? "User", "Your suspension was lifted. Login is restored.");
      setState({
        ...s,
        users,
        suspensions,
        moderationActions: [buildModeration("lift", "user", userId, null), ...s.moderationActions],
        auditLog: [buildAudit("lift", "user", user?.name ?? userId), ...s.auditLog],
        events: [buildEvent("UserModerationActionApplied", ["NOTIFICATION-SYSTEM"], { userId, action_type: "lift" }), ...s.events],
        notifications: [notif, ...s.notifications],
      });
      scheduleDelivery(notif.id);
    },
    [buildAudit, buildModeration, buildEvent, buildNotification, scheduleDelivery],
  );

  // ── CTA 14 / 15 — Vendor subscription activate / deactivate ──────────────────
  const setVendorStatus = useCallback(
    (vendorId: string, status: Vendor["subscriptionStatus"], reason?: string) => {
      const s = stateRef.current;
      const vendor = get(s.vendors, vendorId);
      if (!vendor) throw new AppError("VENDOR_NOT_FOUND");
      if (vendor.subscriptionStatus === status) throw new AppError("VENDOR_SUBSCRIPTION_NO_CHANGE");
      const ts = new Date().toISOString();
      const activating = status === "active";
      const expiresAt = activating
        ? new Date(Date.now() + SUBSCRIPTION_TERM_DAYS * 86_400_000).toISOString()
        : null;
      const vendors = s.vendors.map((v): Vendor =>
        v.id === vendorId
          ? {
              ...v,
              subscriptionStatus: status,
              subscriptionActivatedAt: activating ? ts : null,
              subscriptionExpiresAt: expiresAt,
            }
          : v,
      );

      // Coupling invariant: a vendor only appears in the Sponsored section while their
      // subscription is active. Deactivating pulls any active placement and recompacts ranks
      // in the same atomic transaction.
      let placements = s.placements;
      let cascadedId: string | null = null;
      if (!activating) {
        const target = s.placements.find((p) => p.vendorId === vendorId && p.active);
        if (target) {
          cascadedId = target.id;
          const remaining = s.placements
            .filter((p) => p.active && p.id !== target.id)
            .sort((a, b) => a.rank - b.rank);
          const reranked = new Map(remaining.map((p, i) => [p.id, i + 1]));
          placements = s.placements.map((p): SponsoredPlacement => {
            if (p.id === target.id) return { ...p, active: false };
            if (reranked.has(p.id)) return { ...p, rank: reranked.get(p.id)! };
            return p;
          });
        }
      }

      const message = activating
        ? "Your marketplace subscription is active — your full service listing is now visible."
        : `Your marketplace subscription was deactivated — your full listing is hidden, though your basic profile (company name, description, website) stays visible.${cascadedId ? " Your sponsored placement has also been removed." : ""}`;
      const notif = buildNotification(vendor.id, vendor.companyName, message, reason);

      setState({
        ...s,
        vendors,
        placements,
        auditLog: [
          buildAudit(
            activating ? "activate-subscription" : "deactivate-subscription",
            "vendor",
            vendor.companyName,
            { reason, expiresAt, cascadedPlacement: cascadedId },
          ),
          ...s.auditLog,
        ],
        events: [
          buildEvent(
            "VendorSubscriptionStatusChanged",
            ["VENDOR-MANAGEMENT", "MARKETPLACE", "NOTIFICATION-SYSTEM"],
            { vendorId, subscription_status: status, expiresAt },
          ),
          ...(cascadedId
            ? [
                buildEvent("SponsoredPlacementChanged", ["MARKETPLACE"], {
                  placementId: cascadedId,
                  change_type: "removed",
                  reason: "subscription_deactivated",
                }),
              ]
            : []),
          ...s.events,
        ],
        notifications: [notif, ...s.notifications],
      });
      scheduleDelivery(notif.id);
    },
    [buildAudit, buildEvent, buildNotification, scheduleDelivery],
  );
  // Add an existing directory vendor to the subscription-management list, optionally activating it.
  const addVendorToList = useCallback(
    (vendorId: string, activate: boolean) => {
      const s = stateRef.current;
      const vendor = get(s.vendors, vendorId);
      if (!vendor) throw new AppError("VENDOR_NOT_FOUND");
      if (!vendor.catalogOnly)
        throw new AppError("INVALID_INPUT", "This vendor is already in the subscription list.");
      const ts = new Date().toISOString();
      const expiresAt = activate
        ? new Date(Date.now() + SUBSCRIPTION_TERM_DAYS * 86_400_000).toISOString()
        : null;
      const vendors = s.vendors.map((v): Vendor =>
        v.id === vendorId
          ? {
              ...v,
              catalogOnly: false,
              subscriptionStatus: activate ? "active" : "inactive",
              subscriptionActivatedAt: activate ? ts : null,
              subscriptionExpiresAt: expiresAt,
            }
          : v,
      );
      setState({
        ...s,
        vendors,
        auditLog: [
          buildAudit("add-to-subscriptions", "vendor", vendor.companyName, {
            subscription: activate ? "active" : "inactive",
            expiresAt,
          }),
          ...s.auditLog,
        ],
        events: activate
          ? [
              buildEvent(
                "VendorSubscriptionStatusChanged",
                ["VENDOR-MANAGEMENT", "MARKETPLACE", "NOTIFICATION-SYSTEM"],
                { vendorId, subscription_status: "active", expiresAt },
              ),
              ...s.events,
            ]
          : s.events,
      });
    },
    [buildAudit, buildEvent],
  );
  const activateVendor = useCallback((id: string) => setVendorStatus(id, "active"), [setVendorStatus]);
  const deactivateVendor = useCallback(
    (id: string, reason?: string) => setVendorStatus(id, "inactive", reason),
    [setVendorStatus],
  );

  // ── CTA 16 — Create sponsored placement ──────────────────────────────────────
  const createPlacement = useCallback(
    (vendorId: string, rank: number, monthlyFee: number, durationDays: number): SponsoredPlacement => {
      const s = stateRef.current;
      const vendor = get(s.vendors, vendorId);
      if (!vendor) throw new AppError("VENDOR_NOT_FOUND");
      // A sponsored vendor must have a visible (active) listing — no sponsoring a hidden vendor.
      if (vendor.subscriptionStatus !== "active") throw new AppError("VENDOR_NOT_ACTIVE");
      const actives = s.placements.filter((p) => p.active).sort((a, b) => a.rank - b.rank);
      if (actives.some((p) => p.vendorId === vendorId)) throw new AppError("VENDOR_ALREADY_SPONSORED");
      if (actives.length >= MAX_SPONSORED_SLOTS) throw new AppError("SPONSORED_SLOTS_FULL");
      if (!Number.isFinite(monthlyFee) || monthlyFee <= 0)
        throw new AppError("INVALID_INPUT", "Monthly fee must be greater than 0.");
      if (!Number.isInteger(durationDays) || durationDays < 1)
        throw new AppError("INVALID_INPUT", "Duration must be a positive number of days.");

      // Insert at the requested rank and renumber contiguously — same shift semantics as reorder,
      // so creation and drag-to-reorder behave identically (no "rank already taken" dead-end).
      const clamped = Math.max(1, Math.min(Math.trunc(rank) || actives.length + 1, actives.length + 1));
      const placement: SponsoredPlacement = {
        id: nextId("plc"),
        vendorId,
        rank: clamped,
        monthlyFee,
        createdBy: admin.adminId,
        active: true,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + durationDays * 86_400_000).toISOString(),
      };
      const list = [...actives];
      list.splice(clamped - 1, 0, placement);
      const reranked = new Map(list.map((p, i) => [p.id, i + 1]));
      const placements = [
        ...s.placements.map((p): SponsoredPlacement =>
          reranked.has(p.id) ? { ...p, rank: reranked.get(p.id)! } : p,
        ),
        { ...placement, rank: reranked.get(placement.id)! },
      ];
      setState({
        ...s,
        placements,
        auditLog: [
          buildAudit("create-placement", "vendor", vendor.companyName, {
            rank: clamped,
            monthlyFee,
            expiresAt: placement.expiresAt,
          }),
          ...s.auditLog,
        ],
        events: [
          buildEvent("SponsoredPlacementChanged", ["MARKETPLACE"], {
            placementId: placement.id,
            change_type: "created",
            rank: clamped,
          }),
          ...s.events,
        ],
      });
      return placement;
    },
    [admin, buildAudit, buildEvent],
  );

  // ── CTA 17 — Reorder placement (contiguous, unique ranks; "explicit lock") ───
  const updatePlacementRank = useCallback(
    (placementId: string, newRank: number) => {
      const s = stateRef.current;
      const target = s.placements.find((p) => p.id === placementId && p.active);
      if (!target) throw new AppError("PLACEMENT_NOT_FOUND");
      const ordered = s.placements.filter((p) => p.active).sort((a, b) => a.rank - b.rank);
      const clamped = Math.max(1, Math.min(newRank, ordered.length));
      const without = ordered.filter((p) => p.id !== placementId);
      without.splice(clamped - 1, 0, target);
      const reranked = new Map(without.map((p, i) => [p.id, i + 1]));
      const placements = s.placements.map((p): SponsoredPlacement =>
        reranked.has(p.id) ? { ...p, rank: reranked.get(p.id)! } : p,
      );
      const vendor = get(s.vendors, target.vendorId);
      setState({
        ...s,
        placements,
        auditLog: [buildAudit("reorder-placement", "vendor", vendor?.companyName ?? target.vendorId, { rank: clamped }), ...s.auditLog],
        events: [buildEvent("SponsoredPlacementChanged", ["MARKETPLACE"], { placementId, change_type: "rank_updated", rank: clamped }), ...s.events],
      });
    },
    [buildAudit, buildEvent],
  );

  // ── CTA 18 — Remove placement (resets ranks to stay contiguous) ──────────────
  const removePlacement = useCallback(
    (placementId: string) => {
      const s = stateRef.current;
      const target = s.placements.find((p) => p.id === placementId);
      if (!target) throw new AppError("PLACEMENT_NOT_FOUND");
      const remaining = s.placements
        .filter((p) => p.active && p.id !== placementId)
        .sort((a, b) => a.rank - b.rank);
      const reranked = new Map(remaining.map((p, i) => [p.id, i + 1]));
      const placements = s.placements.map((p): SponsoredPlacement => {
        if (p.id === placementId) return { ...p, active: false };
        if (reranked.has(p.id)) return { ...p, rank: reranked.get(p.id)! };
        return p;
      });
      const vendor = get(s.vendors, target.vendorId);
      setState({
        ...s,
        placements,
        auditLog: [buildAudit("remove-placement", "vendor", vendor?.companyName ?? target.vendorId), ...s.auditLog],
        events: [buildEvent("SponsoredPlacementChanged", ["MARKETPLACE"], { placementId, change_type: "removed" }), ...s.events],
      });
    },
    [buildAudit, buildEvent],
  );

  const resetAll = useCallback(() => {
    setState(initialState());
  }, []);

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      session: admin,
      activeSuspensionFor,
      roomFor,
      dismissFlag,
      removeContent,
      warnAuthor,
      hideContent,
      unhideContent,
      removeDecisionRoomContent,
      removeResolvedContent,
      restoreResolvedContent,
      upholdAppeal,
      denyAppeal,
      warnUser,
      suspendUser,
      banUser,
      liftSuspension,
      addVendorToList,
      activateVendor,
      deactivateVendor,
      createPlacement,
      updatePlacementRank,
      removePlacement,
      resetAll,
    }),
    [
      state,
      admin,
      activeSuspensionFor,
      roomFor,
      dismissFlag,
      removeContent,
      warnAuthor,
      hideContent,
      unhideContent,
      removeDecisionRoomContent,
      removeResolvedContent,
      restoreResolvedContent,
      upholdAppeal,
      denyAppeal,
      warnUser,
      suspendUser,
      banUser,
      liftSuspension,
      addVendorToList,
      activateVendor,
      deactivateVendor,
      createPlacement,
      updatePlacementRank,
      removePlacement,
      resetAll,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
