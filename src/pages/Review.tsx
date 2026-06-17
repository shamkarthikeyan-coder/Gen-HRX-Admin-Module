import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Eye, EyeOff, Flag as FlagIcon, Paperclip, RotateCcw, ShieldX, ThumbsDown, ThumbsUp, Trash2, UserX } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReasonField } from "@/components/ui/reason-field";
import { EmptyState } from "@/components/ui/empty-state";
import { PostPreview } from "@/components/shared/PostPreview";
import { InputPreview } from "@/components/shared/InputPreview";
import { ProfileBadgeChips } from "@/components/shared/ProfileBadge";
import { FlagSourceBadge, AccountStatusBadge, RoomStatusBadge } from "@/components/shared/badges";
import { useStore } from "@/store/AppStore";
import { useSidebar } from "@/components/layout/sidebar-context";
import { runAction } from "@/lib/runAction";
import { formatDate, formatDateTime, timeAgo } from "@/lib/format";
import { reportVolume } from "@/lib/moderation";
import { cn } from "@/lib/cn";
import type { Content, DecisionRoom, Flag, PostComment } from "@/data/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Comment pools used to materialize a post's full thread when the seed carries only a comment
// *count* (item.comments) and no tailored `commentThread`. Deterministic per content id, so the
// same post always renders the same comments across renders.
const COMMENT_AUTHORS: { name: string; role: string }[] = [
  { name: "Jordan Webb", role: "Talent Acquisition Lead" },
  { name: "Priya Nair", role: "HR Business Partner" },
  { name: "Sam Whitfield", role: "People Ops Lead" },
  { name: "Dana Lopez", role: "Recruiter" },
  { name: "Greg Tanaka", role: "Hiring Manager" },
  { name: "Nina Patel", role: "DEI Lead" },
  { name: "Marcus Hale", role: "HR Generalist" },
  { name: "Aisha Khan", role: "Senior Recruiter" },
  { name: "Tom Becker", role: "Compensation Analyst" },
  { name: "Lena Ortiz", role: "Employee Relations" },
  { name: "Raj Mehta", role: "L&D Manager" },
  { name: "Chloe Adams", role: "HR Business Partner" },
  { name: "Devon Price", role: "Talent Partner" },
  { name: "Hana Suzuki", role: "People Analytics" },
  { name: "Omar Farouk", role: "HR Director" },
  { name: "Beth Coleman", role: "Recruiting Coordinator" },
];
const COMMENT_TEXTS = [
  "This needs a lot more nuance than it's getting.",
  "Hard disagree, but I appreciate the discussion.",
  "Strong take — though I'd push back on the framing a bit.",
  "Not sure this holds up in practice, but worth debating.",
  "Saving this — want to revisit it with my team.",
  "Seen this play out before. Mixed results, honestly.",
  "Curious how this scales beyond a small team.",
  "We tried something similar last year — happy to share notes.",
  "There are real legal risks here people are glossing over.",
  "Respectfully, this could backfire badly.",
  "Finally someone said it.",
  "I'd want data before acting on this.",
  "This is exactly what our policy should cover.",
  "Hard no from me, but I see the intent.",
  "Great in theory, messy in execution.",
  "Has anyone run this past legal?",
];
const COMMENT_TIMES = ["6h ago", "5h ago", "3h ago", "2h ago", "1h ago", "45m ago", "20m ago", "just now"];

// Build the post's full comment thread (every comment, not a sample) from its comment count.
function buildThread(seedId: string, count: number): PostComment[] {
  let h = 0;
  for (const ch of seedId) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const n = Math.max(0, Math.min(count, 50)); // cap purely to bound the DOM on very busy posts
  return Array.from({ length: n }, (_, i) => {
    const a = COMMENT_AUTHORS[(h + i) % COMMENT_AUTHORS.length];
    return {
      id: `${seedId}-c-${i}`,
      author: a.name,
      role: a.role,
      text: COMMENT_TEXTS[(h + i * 7) % COMMENT_TEXTS.length],
      time: COMMENT_TIMES[(h + i) % COMMENT_TIMES.length],
      likes: (h + i * 13) % 40,
    };
  });
}

// Plain-English meaning of each reason tag, so the admin knows exactly what was alleged.
const REASON_INFO: Record<string, string> = {
  "Rude / uncivil tone": "Demeaning or insulting language directed at another member.",
  "Doxxing / personal information": "Shares someone's private or identifying information without consent.",
  "Targeted harassment": "Repeated or coordinated abuse aimed at a specific person.",
  "Coordinated pile-on": "Members organizing to target and overwhelm one person.",
  "Threats of violence": "Threatens physical harm against a person.",
  "Hate speech": "Attacks a person or group based on a protected characteristic.",
  "Age discrimination": "Discriminatory content targeting a protected age group.",
  "Scam / fraud": "Attempts to deceive members for money or personal data.",
  "Spam / low quality": "Repetitive, low-value, or unsolicited promotional content.",
  Spam: "Repetitive or unsolicited promotional content.",
  Promotional: "Primarily advertises a product or service.",
  "Repeated promotional links": "The same promotional link posted many times over.",
  "Off-topic / not professional": "Unrelated to the discussion or not workplace-appropriate.",
  "Possible PII in attachment": "An attachment may expose personal data such as emails or addresses.",
};

// A one-line "why" — uses a seeded note when present, otherwise a clear derived summary.
function flagNote(flag: Flag): string {
  if (flag.note) return flag.note;
  const why = flag.reasons.map((r) => r.toLowerCase()).join(" and ");
  if (flag.source === "ai") {
    return `GenHRX's AI moderation agent flagged this for ${why}.`;
  }
  const n = reportVolume(flag);
  return `${n} community member${n > 1 ? "s" : ""} reported this for ${why}.`;
}

export function FlagReviewPage() {
  const { flagId } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const { flags, content, users, moderationActions } = store;
  const { expanded: navExpanded } = useSidebar();

  const [mode, setMode] = useState<"view" | "warn" | "remove" | "restore" | "uphold" | "deny">("view");
  const [reason, setReason] = useState("");

  const flag = flags.find((f) => f.id === flagId) ?? null;
  const item = flag ? content.find((c) => c.id === flag.contentId) ?? null : null;
  const author = item?.authorId ? users.find((u) => u.id === item.authorId) ?? null : null;

  const isDR = flag?.surface === "decision-room";
  const isAppeal = flag?.appealStatus === "pending";
  const backTo = `/moderation${isAppeal ? "?tab=appeals" : isDR ? "?tab=rooms" : ""}`;

  if (!flag || !item) {
    return (
      <div>
        <BackLink onClick={() => navigate("/moderation")} />
        <div className="mt-6">
          <EmptyState
            title="Flag not found"
            description="This item may have already been removed or resolved."
          />
        </div>
      </div>
    );
  }

  const reasonLen = reason.trim().length;
  const reasonValid = reasonLen >= 10 && reasonLen <= 500;
  const reports = reportVolume(flag);
  const note = flagNote(flag);

  // Resolved flags are reachable (and clickable) via the queue's "Show resolved" toggle. They render
  // the same context plus a banner summarizing how they were closed — and can be re-decided in place
  // (escalate a dismissal to a removal, or restore removed content). `resolution` is the moderation
  // record for the CURRENT outcome, so the banner shows the latest reason after any revision.
  const isResolved = flag.status === "resolved";
  const resolution = isResolved
    ? moderationActions.find((m) =>
        flag.resolutionAction === "dismiss"
          ? m.targetType === "flag" && m.targetId === flag.id
          : m.targetType === "content" &&
            m.targetId === flag.contentId &&
            m.actionType === flag.resolutionAction,
      )
    : undefined;
  const resolvedBy =
    resolution && resolution.adminId === store.session.adminId
      ? store.session.adminName
      : resolution?.adminId;

  const room = isDR ? store.roomFor(item.roomId) : undefined;
  const thread =
    item.commentThread && item.commentThread.length > 0
      ? item.commentThread
      : item.comments > 0
        ? buildThread(item.id, item.comments)
        : [];

  // The whole Decision Room conversation: every input in this room (flagged or not), oldest-first,
  // each paired with its still-open flag (if any) so the row can be marked and made clickable.
  const roomThread = isDR
    ? content
        .filter((c) => c.surface === "decision-room" && c.roomId === item.roomId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((c) => ({
          content: c,
          flag: flags.find((f) => f.contentId === c.id && f.status !== "resolved") ?? null,
        }))
    : [];

  // Author standing — what the admin needs to pick the right action.
  const history = author
    ? moderationActions.filter((m) => m.targetType === "user" && m.targetId === author.id)
    : [];
  const priorWarnings = history.filter((m) => m.actionType === "warn").length;
  const priorSuspensions = history.filter((m) => m.actionType === "suspend").length;
  const activeSuspension = author ? store.activeSuspensionFor(author.id) : undefined;

  // Resolving actions leave the queue; warn / hide keep you here so the context updates live.
  function resolveAndLeave(fn: () => void, msg: string) {
    if (runAction(fn, msg)) navigate(backTo);
  }
  function stay(fn: () => void, msg: string) {
    if (runAction(fn, msg)) {
      setMode("view");
      setReason("");
    }
  }

  return (
    <div className="space-y-5 pb-24">
      <div>
        <BackLink onClick={() => navigate(backTo)} />
        <div className="mt-2 flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isResolved
              ? isDR
                ? "Resolved Decision Room flag"
                : "Resolved flag"
              : isDR
                ? "Review Decision Room content"
                : "Review flagged content"}
          </h1>
          {isResolved && <Badge variant="success">Resolved</Badge>}
        </div>
      </div>

      {isResolved && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm dark:border-emerald-800/50 dark:bg-emerald-950/30">
          <Badge variant="success" className="capitalize">
            {flag.resolutionAction ?? "resolved"}
          </Badge>
          {flag.appealStatus === "pending" && <Badge variant="warning">Appeal pending</Badge>}
          {flag.appealStatus === "upheld" && <Badge variant="success">Appeal upheld</Badge>}
          {flag.appealStatus === "denied" && <Badge variant="muted">Appeal denied</Badge>}
          <span className="text-foreground">
            This flag was resolved{flag.resolvedAt ? ` ${timeAgo(flag.resolvedAt)}` : ""}
            {resolvedBy ? ` by ${resolvedBy}` : ""}.
          </span>
          {resolution?.reason && (
            <span className="min-w-0 text-muted-foreground">· “{resolution.reason}”</span>
          )}
          <span className="ml-auto whitespace-nowrap text-xs text-muted-foreground">
            {isAppeal ? "An appeal is pending — decide below." : "You can revise this below."}
          </span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main — the flagged item + the conversation it lives in */}
        <div className="space-y-5">
          {isAppeal && (
            <div className="rounded-xl border border-blue-300/70 bg-blue-50 p-4 dark:border-blue-800/50 dark:bg-blue-950/30">
              <div className="mb-2 flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                <RotateCcw className="size-4" />
                <p className="text-xs font-semibold uppercase tracking-wide">Author's appeal</p>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{flag.appealNote}</p>
              {flag.appealAttachmentName && (
                <div className="mt-3 space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300/60 bg-white/60 px-3 py-1.5 text-sm text-foreground dark:border-blue-800/50 dark:bg-blue-950/20">
                    <Paperclip className="size-4 text-muted-foreground" />
                    {flag.appealAttachmentName}
                  </span>
                  {flag.appealAttachmentUrl && (
                    <div className="overflow-hidden rounded-xl">
                      <img src={flag.appealAttachmentUrl} alt="" className="max-h-80 w-full object-cover" />
                    </div>
                  )}
                </div>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                Appealed {timeAgo(flag.appealedAt ?? flag.createdAt)}
                {flag.appealDeadline && ` · appeal window until ${formatDate(flag.appealDeadline)}`}
              </p>
            </div>
          )}

          {isDR && room && <DecisionContext room={room} />}

          {isDR ? (
            <InputPreview content={item} badges={author?.badges} />
          ) : (
            <PostPreview content={item} badges={author?.badges} />
          )}

          {isDR ? (
            <RoomConversation
              rows={roomThread}
              currentId={item.id}
              onOpen={(fid) => navigate(`/moderation/${fid}`)}
            />
          ) : (
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-3 text-sm font-medium">
                Comments <span className="text-muted-foreground">· {thread.length}</span>
              </p>
              {thread.length > 0 ? (
                <ul className="max-h-[480px] space-y-3.5 overflow-y-auto pr-1">
                  {thread.map((c) => (
                    <li key={c.id} className="flex gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-orange-500 text-[11px] font-semibold text-white">
                        {initials(c.author)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-1.5 text-sm">
                          <span className="font-medium">{c.author}</span>
                          {c.role && <span className="text-muted-foreground">· {c.role}</span>}
                          <span className="text-muted-foreground">· {c.time}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{c.text}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <ThumbsUp className="size-3" /> {c.likes}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No comments on this post.</p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar — decision context */}
        <aside className="space-y-5">
          {/* Why it was flagged — highlighted, since it's the heart of the decision */}
          <div className="rounded-xl border border-amber-300/70 bg-amber-50 p-4 dark:border-amber-800/50 dark:bg-amber-950/30">
            <div className="mb-2 flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
              <FlagIcon className="size-4" />
              <p className="text-xs font-semibold uppercase tracking-wide">Why it was flagged</p>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{note}</p>
            <div className="mt-3 space-y-2.5 border-t border-amber-300/50 pt-3 dark:border-amber-800/40">
              {flag.reasons.map((r) => (
                <div key={r}>
                  <p className="text-sm font-semibold text-foreground">{r}</p>
                  <p className="text-xs text-muted-foreground">
                    {REASON_INFO[r] ?? "Flagged for review under platform policy."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Flag details */}
          <Panel title="Flag details">
            {isDR && room && (
              <Row label="Decision Room">
                <span className="inline-flex items-center justify-end gap-1.5">
                  <span className="truncate">{room.name}</span>
                  <RoomStatusBadge status={room.status} />
                </span>
              </Row>
            )}
            {isDR && room?.status === "archived" && room.archivedAt && (
              <Row label="Archived">{formatDate(room.archivedAt)}</Row>
            )}
            <Row label="Flagged by">
              {flag.source === "ai" ? (
                <span className="inline-flex items-center gap-1.5">
                  <FlagSourceBadge source="ai" /> moderation agent
                </span>
              ) : (
                <FlagSourceBadge source="community" />
              )}
            </Row>
            <Row label="Report volume">
              {flag.source === "ai"
                ? "AI detection"
                : `${reports} member report${reports > 1 ? "s" : ""}`}
            </Row>
            <Row label="Flagged">{timeAgo(flag.createdAt)}</Row>
          </Panel>

          {/* Author */}
          <Panel title="Author">
            {author ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-orange-500 text-sm font-semibold text-white">
                    {initials(author.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{author.name}</p>
                    {item.authorRole && (
                      <p className="truncate text-xs text-muted-foreground">{item.authorRole}</p>
                    )}
                  </div>
                </div>
                {author.badges && author.badges.length > 0 && (
                  <div className="pb-3 pt-0.5">
                    <ProfileBadgeChips badges={author.badges} />
                  </div>
                )}
                <Row label="Email">
                  <span className="truncate">{author.email}</span>
                </Row>
                <Row label="Account">
                  <AccountStatusBadge status={author.accountStatus} />
                </Row>
                <Row label="Verification">
                  <Badge
                    variant={author.verification === "verified" ? "success" : "muted"}
                    className="capitalize"
                  >
                    {author.verification}
                  </Badge>
                </Row>
                <Row label="Joined">{formatDate(author.joinDate)}</Row>
                <Row label="Last active">{formatDateTime(author.activity.lastActive)}</Row>
                <Row label="Activity">
                  {author.activity.parleys}P · {author.activity.articles}A · {author.activity.takes}T
                </Row>
                {author.followers != null && (
                  <Row label="Audience">
                    {author.followers.toLocaleString()} followers ·{" "}
                    {(author.following ?? 0).toLocaleString()} following
                  </Row>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 w-full"
                  onClick={() => toast(`Opening ${author.name}'s profile…`)}
                >
                  <ExternalLink className="size-4" /> View full profile
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Anonymous post — no account to inspect or action.
              </p>
            )}
          </Panel>

          {/* Author moderation history */}
          {author && (
            <Panel title="Author moderation history">
              <p className="text-sm">
                {priorWarnings === 0 && priorSuspensions === 0 ? (
                  <span className="text-muted-foreground">No prior actions on record.</span>
                ) : (
                  <span className="font-medium">
                    {[
                      priorWarnings && `${priorWarnings} warning${priorWarnings > 1 ? "s" : ""}`,
                      priorSuspensions &&
                        `${priorSuspensions} suspension${priorSuspensions > 1 ? "s" : ""}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
              </p>
              {activeSuspension && (
                <div className="rounded-md border border-blue-300/60 bg-blue-50 p-2 text-xs text-muted-foreground dark:border-blue-800/60 dark:bg-blue-950/40">
                  Currently suspended until {formatDateTime(activeSuspension.endTime)}
                </div>
              )}
              {history.length > 0 && (
                <ul className="space-y-1.5">
                  {history.map((m) => (
                    <li key={m.id} className="flex items-start gap-2 text-sm">
                      <Badge variant="muted" className="mt-0.5 capitalize">
                        {m.actionType}
                      </Badge>
                      <div className="min-w-0">
                        <span className="text-muted-foreground">{formatDateTime(m.createdAt)}</span>
                        {m.reason && <p className="italic text-muted-foreground">“{m.reason}”</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          )}
        </aside>
      </div>

      {/* Fixed action bar — always reachable without scrolling. For a resolved flag this becomes a
          "revise" bar: escalate a dismissal to a removal, or restore previously-removed content. */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur transition-[left] duration-200 ease-out",
          navExpanded ? "left-64" : "left-16",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-8 py-3">
          {mode === "view" ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {isAppeal
                  ? "Appeal — uphold to restore, or deny to keep it removed"
                  : isResolved
                    ? "Resolved — revise this decision"
                    : `${isDR ? "Decision Room flag" : "Flagged content"} · ${item.type}`}
              </span>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                {isAppeal ? (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setMode("deny");
                        setReason("");
                      }}
                    >
                      <ShieldX className="size-4" /> Deny appeal
                    </Button>
                    <Button
                      onClick={() => {
                        setMode("uphold");
                        setReason("");
                      }}
                    >
                      <RotateCcw className="size-4" /> Uphold appeal
                    </Button>
                  </>
                ) : isResolved ? (
                  item.deletedAt ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMode("restore");
                        setReason("");
                      }}
                    >
                      <RotateCcw className="size-4" /> Restore content
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        disabled={!item.authorId}
                        title={item.authorId ? undefined : "Anonymous content has no author to warn."}
                        onClick={() => {
                          setMode("warn");
                          setReason("");
                        }}
                      >
                        <UserX className="size-4" /> Warn author
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setMode("remove");
                          setReason("");
                        }}
                      >
                        <Trash2 className="size-4" /> Remove content
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    {isDR &&
                      (item.hiddenAt ? (
                        <Button
                          variant="outline"
                          onClick={() =>
                            stay(() => store.unhideContent(item.id), "Input restored to the room.")
                          }
                        >
                          <Eye className="size-4" /> Unhide
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() =>
                            stay(() => store.hideContent(item.id), "Input hidden from the room.")
                          }
                        >
                          <EyeOff className="size-4" /> Hide
                        </Button>
                      ))}
                    <Button
                      variant="secondary"
                      onClick={() =>
                        resolveAndLeave(() => store.dismissFlag(flag.id), "Dismissed · content stays live")
                      }
                    >
                      <ShieldX className="size-4" /> Dismiss flag
                    </Button>
                    {!isDR && (
                      <Button
                        variant="outline"
                        disabled={!item.authorId}
                        title={item.authorId ? undefined : "Anonymous content has no author to warn."}
                        onClick={() => {
                          setMode("warn");
                          setReason("");
                        }}
                      >
                        <UserX className="size-4" /> Warn author
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setMode("remove");
                        setReason("");
                      }}
                    >
                      <Trash2 className="size-4" /> Remove content
                    </Button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex w-full items-end gap-3">
              <div className="flex-1">
                <ReasonField
                  value={reason}
                  onChange={setReason}
                  label={
                    mode === "remove"
                      ? "Reason for removal (author is notified)"
                      : mode === "restore"
                        ? "Reason for restoring (author is notified)"
                        : mode === "uphold"
                          ? "Reason for upholding the appeal (author is notified)"
                          : mode === "deny"
                            ? "Reason for denying the appeal (author is notified)"
                            : "Reason for warning (author is notified)"
                  }
                />
              </div>
              <div className="flex shrink-0 gap-2 pb-0.5">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMode("view");
                    setReason("");
                  }}
                >
                  Cancel
                </Button>
                {mode === "remove" ? (
                  <Button
                    variant="destructive"
                    disabled={!reasonValid}
                    onClick={() =>
                      isResolved
                        ? stay(
                            () => store.removeResolvedContent(flag.id, reason),
                            "Content removed · author notified",
                          )
                        : resolveAndLeave(
                            () =>
                              isDR
                                ? store.removeDecisionRoomContent(item.id, reason)
                                : store.removeContent(item.id, reason),
                            isDR
                              ? "Content removed; author notified with appeal path."
                              : "Removed · author notified · logged",
                          )
                    }
                  >
                    Confirm removal
                  </Button>
                ) : mode === "restore" ? (
                  <Button
                    disabled={!reasonValid}
                    onClick={() =>
                      stay(
                        () => store.restoreResolvedContent(flag.id, reason),
                        "Content restored · author notified",
                      )
                    }
                  >
                    Confirm restore
                  </Button>
                ) : mode === "uphold" ? (
                  <Button
                    disabled={!reasonValid}
                    onClick={() =>
                      resolveAndLeave(
                        () => store.upholdAppeal(flag.id, reason),
                        "Appeal upheld — content restored.",
                      )
                    }
                  >
                    Uphold appeal
                  </Button>
                ) : mode === "deny" ? (
                  <Button
                    variant="destructive"
                    disabled={!reasonValid}
                    onClick={() =>
                      resolveAndLeave(
                        () => store.denyAppeal(flag.id, reason),
                        "Appeal denied — removal stands.",
                      )
                    }
                  >
                    Deny appeal
                  </Button>
                ) : (
                  <Button
                    disabled={!reasonValid}
                    onClick={() =>
                      stay(() => store.warnAuthor(item.id, reason), "Warned · author notified")
                    }
                  >
                    Issue warning
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" /> Back to queue
    </button>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 text-sm")}>
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 text-right">{children}</span>
    </div>
  );
}

/** The decision an input was contributed to — question, situation, constraints, and the live poll.
 *  Framing the flagged input in its decision is what tells the moderator whether it belongs. */
function DecisionContext({ room }: { room: DecisionRoom }) {
  const totalVotes = room.options.reduce((sum, o) => sum + o.votes, 0);
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Decision</p>
        <div className="flex items-center gap-1.5">
          {room.timeRemaining && room.status === "active" && (
            <Badge variant="muted">{room.timeRemaining} left</Badge>
          )}
          <RoomStatusBadge status={room.status} />
        </div>
      </div>
      <h2 className="text-base font-semibold leading-snug text-foreground">{room.question}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{room.situation}</p>

      <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
        <p className="text-xs font-medium text-foreground">Constraints</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{room.constraints}</p>
      </div>

      {/* Live poll — read-only */}
      <div className="mt-4 space-y-2.5">
        {room.options.map((o) => {
          const pct = totalVotes > 0 ? Math.round((o.votes / totalVotes) * 100) : 0;
          return (
            <div key={o.id}>
              <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                <span className="min-w-0 truncate text-foreground">{o.text}</span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {pct}% · {o.votes}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-orange-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
        {room.createdBy && <span>Created by {room.createdBy}</span>}
        {room.groupType && <span aria-hidden>·</span>}
        {room.groupType && <span>{room.groupType}</span>}
        <span aria-hidden>·</span>
        <span>{totalVotes} votes</span>
      </div>
    </div>
  );
}

/** Every input in the room (flagged or not), so the moderator sees the flagged one in the context of
 *  the whole deliberation. The reviewed input is highlighted; other still-flagged inputs link to their
 *  own review. */
function RoomConversation({
  rows,
  currentId,
  onOpen,
}: {
  rows: { content: Content; flag: Flag | null }[];
  currentId: string;
  onOpen: (flagId: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-3 text-sm font-medium">
        Room conversation{" "}
        <span className="text-muted-foreground">
          · {rows.length} input{rows.length === 1 ? "" : "s"}
        </span>
      </p>
      <ul className="space-y-3">
        {rows.map(({ content: c, flag }) => {
          const isCurrent = c.id === currentId;
          const anon = !!c.anonymous || !c.authorId;
          const clickable = !isCurrent && !!flag;
          return (
            <li key={c.id}>
              <div
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onClick={clickable ? () => onOpen(flag!.id) : undefined}
                onKeyDown={
                  clickable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") onOpen(flag!.id);
                      }
                    : undefined
                }
                className={cn(
                  "flex gap-3 rounded-lg border p-3 transition-colors",
                  isCurrent
                    ? "border-purple-300 bg-purple-50/60 dark:border-purple-800/60 dark:bg-purple-950/30"
                    : clickable
                      ? "cursor-pointer border-border hover:bg-muted/50"
                      : "border-border",
                )}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-orange-500 text-[11px] font-semibold text-white">
                  {anon ? "🎭" : initials(c.authorName)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
                    <span className="font-medium">{anon ? "Anonymous" : c.authorName}</span>
                    {c.authorRole && <span className="text-muted-foreground">· {c.authorRole}</span>}
                    <span className="text-muted-foreground">· {timeAgo(c.createdAt)}</span>
                    {isCurrent ? (
                      <Badge variant="secondary">Reviewing</Badge>
                    ) : c.deletedAt ? (
                      <Badge variant="destructive">Removed</Badge>
                    ) : c.hiddenAt ? (
                      <Badge variant="info">Hidden</Badge>
                    ) : flag ? (
                      <Badge variant="warning">Flagged</Badge>
                    ) : null}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-foreground">{c.body}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="size-3" /> {c.upvotes ?? 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsDown className="size-3" /> {c.downvotes ?? 0}
                    </span>
                    {c.inputTags?.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
