import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Ban,
  ExternalLink,
  FileText,
  FolderOpen,
  Inbox,
  MapPin,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  ThumbsUp,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { ReasonField } from "@/components/ui/reason-field";
import { ProfileBadgeChips } from "@/components/shared/ProfileBadge";
import { AccountStatusBadge } from "@/components/shared/badges";
import { useStore } from "@/store/AppStore";
import { useSidebar } from "@/components/layout/sidebar-context";
import { runAction } from "@/lib/runAction";
import { deriveProfile } from "@/lib/profile";
import { formatDate, formatDateTime, timeAgo } from "@/lib/format";
import { cn } from "@/lib/cn";
import { SUSPENSION_PRESETS, type Content, type Flag, type ModerationAction } from "@/data/types";

type Mode = "warn" | "suspend" | "ban";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const { users, content, flags, moderationActions } = store;
  const { expanded: navExpanded } = useSidebar();

  const [tab, setTab] = useState<"posts" | "professional">("posts");
  const [mode, setMode] = useState<Mode | null>(null);
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState<number>(SUSPENSION_PRESETS[0].hours);
  const [confirmToken, setConfirmToken] = useState("");

  const reasonLen = reason.trim().length;
  const reasonValid = reasonLen >= 10 && reasonLen <= 500;
  const tokenValid = confirmToken === "CONFIRM";

  const user = users.find((u) => u.id === id) ?? null;

  if (!user) {
    return (
      <div>
        <BackLink onClick={() => navigate("/users")} />
        <div className="mt-6">
          <EmptyState title="User not found" description="This account may no longer exist." />
        </div>
      </div>
    );
  }

  const profile = deriveProfile(user);
  const activeSuspension = store.activeSuspensionFor(user.id);

  // The user's content that the moderation store knows about — newest first. Flagged items link to
  // their review page so an admin can act on the content straight from the profile.
  const authored = content
    .filter((c) => c.authorId === user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Account actions against this user + removals of content they authored = full moderation history.
  const userActions = moderationActions.filter((m) => m.targetType === "user" && m.targetId === user.id);
  const contentActions = moderationActions.filter(
    (m) => m.targetType === "content" && content.find((c) => c.id === m.targetId)?.authorId === user.id,
  );
  const history = [...userActions, ...contentActions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const priorWarnings = userActions.filter((m) => m.actionType === "warn").length;
  const priorSuspensions = userActions.filter((m) => m.actionType === "suspend").length;
  // Most recent account action (ISO strings sort chronologically) — shown in the action dialogs
  // so an admin sees the prior record before escalating.
  const lastUserActionAt =
    userActions.length > 0
      ? userActions.map((m) => m.createdAt).sort().at(-1) ?? null
      : null;

  function openMode(m: Mode) {
    setMode(m);
    setReason("");
    setConfirmToken("");
    setDuration(SUSPENSION_PRESETS[0].hours);
  }
  // Actions keep us on the page so the profile + standing update live.
  function act(fn: () => void, msg: string) {
    if (runAction(fn, msg)) setMode(null);
  }

  const banned = user.accountStatus === "banned";

  // Vendor accounts render a company profile (per the member-app Service Vendor profile) instead of
  // the person-centric member profile. Enforcement (warn/suspend/ban) applies to both the same way.
  const isVendor = user.role === "vendor";
  const vp = user.vendorProfile;
  const displayName = isVendor && vp ? vp.companyName : user.name;

  return (
    <div className="space-y-5 pb-24">
      <BackLink onClick={() => navigate("/users")} />

      {/* Identity header — banner + avatar + headline, mirroring the member profile.
          The avatar is positioned absolutely so it straddles the banner's bottom edge
          without dragging the (taller, multi-line) identity block up onto the gradient. */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative h-28 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
          <div className="absolute -bottom-12 left-6 z-10 flex size-24 items-center justify-center rounded-full border-4 border-card bg-gradient-to-br from-purple-500 to-orange-500 text-2xl font-semibold text-white shadow-md">
            {initials(displayName)}
          </div>
        </div>
        <div className="px-6 pb-5">
          {/* Identity sits in the card body, clearing the avatar to its left */}
          <div className="min-w-0 pl-28 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{displayName}</h1>
              <AccountStatusBadge status={user.accountStatus} />
              <Badge variant="outline" className="capitalize">{user.role}</Badge>
              <Badge
                variant={user.verification === "verified" ? "success" : "muted"}
                className="capitalize"
              >
                {user.verification}
              </Badge>
            </div>
            {isVendor && vp ? (
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3" /> {vp.location}
                </span>
                <a
                  href={vp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-purple-600 hover:underline dark:text-purple-400"
                >
                  <ExternalLink className="size-3" /> {vp.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            ) : (
              <>
                <p className="mt-1 text-sm text-muted-foreground">{profile.headline}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>{profile.username}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3" /> {profile.location}
                  </span>
                  <span>{user.email}</span>
                </div>
              </>
            )}
          </div>
          {user.badges && user.badges.length > 0 && (
            <div className="mt-4">
              <ProfileBadgeChips badges={user.badges} />
            </div>
          )}
        </div>
      </div>

      {activeSuspension && (
        <div className="rounded-xl border border-blue-300/60 bg-blue-50 p-4 text-sm dark:border-blue-800/60 dark:bg-blue-950/40">
          <p className="font-medium">Active suspension</p>
          <p className="text-muted-foreground">
            Ends {formatDateTime(activeSuspension.endTime)} · “{activeSuspension.reason}”
          </p>
        </div>
      )}

      {isVendor && vp ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Main — company profile (mirrors the member-app Service Vendor profile) */}
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Posts" value={profile.posts} />
              <Stat label="Followers" value={(user.followers ?? 0).toLocaleString()} />
              <Stat label="Following" value={(user.following ?? 0).toLocaleString()} />
            </div>

            <div className="space-y-6 rounded-xl border border-border bg-card p-5">
              <Section title="About">
                <p className="text-sm leading-relaxed text-muted-foreground">{vp.about}</p>
              </Section>

              <Section title="Services Offered">
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Service Categories
                    </p>
                    <ChipGroup items={vp.serviceCategories} />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Industries Served
                    </p>
                    <ChipGroup items={vp.industriesServed} />
                  </div>
                </div>
              </Section>
            </div>
          </div>

          {/* Sidebar — company details + standing */}
          <aside className="space-y-5">
            <Panel title="Company details">
              <Row label="Headquarters">{vp.headquarters}</Row>
              <Row label="Service area">{vp.serviceArea}</Row>
              <Row label="Email">
                <a href={`mailto:${vp.email}`} className="text-purple-600 hover:underline dark:text-purple-400">
                  {vp.email}
                </a>
              </Row>
              <Row label="Phone">{vp.phone}</Row>
              <Row label="Website">
                <a
                  href={vp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-600 hover:underline dark:text-purple-400"
                >
                  {vp.website.replace(/^https?:\/\//, "")}
                </a>
              </Row>
            </Panel>

            <AccountStandingPanel
              priorWarnings={priorWarnings}
              priorSuspensions={priorSuspensions}
              history={history}
              content={content}
            />
          </aside>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main — the full profile */}
        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Posts" value={profile.posts} />
            <Stat label="Followers" value={(user.followers ?? 0).toLocaleString()} />
            <Stat label="Following" value={(user.following ?? 0).toLocaleString()} />
          </div>

          <Tabs
            value={tab}
            onChange={(v) => setTab(v as "posts" | "professional")}
            items={[
              { value: "posts", label: "Posts", count: authored.length },
              { value: "professional", label: "Professional" },
            ]}
          />

          {tab === "posts" ? (
            authored.length === 0 ? (
              <EmptyState
                icon={<Inbox className="size-8" />}
                title="No posts in moderation scope"
                description="Only this member's flagged or actioned content is tracked in the console."
              />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {authored.map((c) => {
                  const f = flags.find((fl) => fl.contentId === c.id) ?? null;
                  return (
                    <ContentCard
                      key={c.id}
                      content={c}
                      flag={f}
                      onOpen={f ? () => navigate(`/moderation/${f.id}`) : undefined}
                    />
                  );
                })}
              </div>
            )
          ) : (
            <div className="space-y-6 rounded-xl border border-border bg-card p-5">
              <Section title="About">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {[
                    profile.bio,
                    profile.experience[0] &&
                      `Currently ${profile.experience[0].title} at ${profile.experience[0].company}.`,
                    profile.interests.length > 0 &&
                      `Focus areas include ${profile.interests.slice(0, 3).join(", ")}.`,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              </Section>

              <Section title="Experience">
                <ul className="space-y-4">
                  {profile.experience.map((e) => (
                    <li key={e.id} className="flex gap-3">
                      <InitialSquare seed={e.company} text={orgInitials(e.company)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold">{e.title}</p>
                          {e.isCurrent && <Badge variant="success">Current</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{e.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {e.startDate} – {e.endDate}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>

              {profile.interests.length > 0 && (
                <Section title="Skills & Expertise">
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-purple-500/10 px-3 py-1.5 text-sm font-medium text-purple-700 dark:text-purple-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Education">
                <ul className="space-y-4">
                  {profile.education.map((e) => (
                    <li key={e.id} className="flex gap-3">
                      <InitialSquare seed={e.institution} text={orgInitials(e.institution)} />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{e.degree}</p>
                        <p className="text-sm text-muted-foreground">{e.institution}</p>
                        <p className="text-xs text-muted-foreground">{e.year}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>

              {profile.certifications.length > 0 && (
                <Section title="Certifications">
                  <ul className="space-y-2">
                    {profile.certifications.map((c) => (
                      <li key={c.id} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-purple-600" />
                        <span>
                          {c.name}
                          <span className="text-muted-foreground"> · {c.issuer} ({c.year})</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>
          )}
        </div>

        {/* Sidebar — admin context */}
        <aside className="space-y-5">
          <Panel title="Account">
            <Row label="Industry">{profile.industry ?? "—"}</Row>
            <Row label="Org size">{profile.organizationSize ?? "—"}</Row>
            <Row label="Joined">{formatDate(user.joinDate)}</Row>
            <Row label="Last active">{formatDateTime(user.activity.lastActive)}</Row>
          </Panel>

          <Panel title="Activity">
            <Row label="Parleys">{user.activity.parleys}</Row>
            <Row label="Articles">{user.activity.articles}</Row>
            <Row label="Takes">{user.activity.takes}</Row>
          </Panel>

          <Panel title="Account standing">
            <p className="text-sm">
              {priorWarnings === 0 && priorSuspensions === 0 ? (
                <span className="text-muted-foreground">No prior actions on record.</span>
              ) : (
                <span className="font-medium">
                  {[
                    priorWarnings && `${priorWarnings} warning${priorWarnings > 1 ? "s" : ""}`,
                    priorSuspensions && `${priorSuspensions} suspension${priorSuspensions > 1 ? "s" : ""}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              )}
            </p>
            {history.length > 0 && (
              <ul className="space-y-1.5">
                {history.map((m) => {
                  const c = m.targetType === "content" ? content.find((ci) => ci.id === m.targetId) : null;
                  return (
                    <li key={m.id} className="flex items-start gap-2 text-sm">
                      <Badge variant="muted" className="mt-0.5 capitalize">{m.actionType}</Badge>
                      <div className="min-w-0">
                        <span className="text-muted-foreground">{formatDateTime(m.createdAt)}</span>
                        {c && (
                          <span className="text-muted-foreground"> · {c.type}: “{c.excerpt.slice(0, 28)}…”</span>
                        )}
                        {m.reason && <p className="italic text-muted-foreground">“{m.reason}”</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>
        </aside>
        </div>
      )}

      {/* Fixed action bar */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur transition-[left] duration-200 ease-out",
          navExpanded ? "left-64" : "left-16",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-8 py-3">
          {banned ? (
            <div className="flex w-full items-center gap-2 text-sm text-muted-foreground">
              <Ban className="size-4 shrink-0 text-destructive" />
              Account permanently banned — recovery only via the DB runbook.
            </div>
          ) : (
            <>
              <span className="hidden text-sm text-muted-foreground sm:block">{displayName}</span>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                {activeSuspension && (
                  <Button
                    variant="secondary"
                    onClick={() => act(() => store.liftSuspension(user.id), "Suspension lifted · login restored")}
                  >
                    <ShieldCheck className="size-4" /> Lift suspension
                  </Button>
                )}
                <Button variant="outline" onClick={() => openMode("warn")}>
                  <UserX className="size-4" /> Warn
                </Button>
                <Button
                  variant="outline"
                  disabled={!!activeSuspension}
                  title={activeSuspension ? "Already suspended" : undefined}
                  onClick={() => openMode("suspend")}
                >
                  <ShieldAlert className="size-4" /> Suspend
                </Button>
                <Button variant="destructive" onClick={() => openMode("ban")}>
                  <Ban className="size-4" /> Ban
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action forms */}
      <Dialog
        open={mode !== null}
        onClose={() => setMode(null)}
        title={mode === "warn" ? "Issue a warning" : mode === "suspend" ? "Suspend account" : "Permanently ban account"}
        description={mode === "ban" ? "This is irreversible. Type CONFIRM to proceed." : undefined}
        className="max-w-lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setMode(null)}>
              Cancel
            </Button>
            {mode === "warn" && (
              <Button
                disabled={!reasonValid}
                onClick={() => act(() => store.warnUser(user.id, reason), "Warned · notified · logged")}
              >
                Issue warning
              </Button>
            )}
            {mode === "suspend" && (
              <Button
                disabled={!reasonValid}
                onClick={() =>
                  act(() => store.suspendUser(user.id, duration, reason), "Suspended · login blocked · logged")
                }
              >
                Suspend account
              </Button>
            )}
            {mode === "ban" && (
              <Button
                variant="destructive"
                disabled={!tokenValid}
                onClick={() =>
                  act(() => store.banUser(user.id, confirmToken, reason || undefined), "Banned · logged to audit")
                }
              >
                Ban permanently
              </Button>
            )}
          </>
        }
      >
        {/* Prior record, shown in every action dialog so escalation is a proportional, informed call. */}
        <StandingSummary warnings={priorWarnings} suspensions={priorSuspensions} lastActionAt={lastUserActionAt} />

        {mode === "warn" && <ReasonField value={reason} onChange={setReason} />}

        {mode === "suspend" && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Duration</Label>
              <div className="flex flex-wrap gap-2">
                {SUSPENSION_PRESETS.map((p) => (
                  <button
                    key={p.hours}
                    onClick={() => setDuration(p.hours)}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm transition-colors",
                      duration === p.hours
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-accent",
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <ReasonField value={reason} onChange={setReason} />
          </div>
        )}

        {mode === "ban" && (
          <div className="space-y-4">
            <ReasonField value={reason} onChange={setReason} label="Reason (optional)" required={false} />
            <div className="space-y-1.5">
              <Label>
                Type <span className="font-mono font-semibold">CONFIRM</span> to ban
              </Label>
              <Input
                value={confirmToken}
                onChange={(e) => setConfirmToken(e.target.value)}
                placeholder="CONFIRM"
                className="font-mono"
              />
              {confirmToken.length > 0 && !tokenValid && (
                <p className="text-xs text-destructive">Token must match “CONFIRM” exactly (case-sensitive).</p>
              )}
            </div>
          </div>
        )}
      </Dialog>
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
      <ArrowLeft className="size-4" /> Back to users
    </button>
  );
}

// A member-style content card for the Posts grid — Decision / Article / Parley variants, with the
// item's current moderation status and a click-through to its review page when it carries a flag.
function ContentCard({
  content: c,
  flag: f,
  onOpen,
}: {
  content: Content;
  flag: Flag | null;
  onOpen?: () => void;
}) {
  const clickable = !!onOpen;
  const status = c.deletedAt ? (
    <Badge variant="destructive">Removed</Badge>
  ) : c.hiddenAt ? (
    <Badge variant="info">Hidden</Badge>
  ) : f && f.status !== "resolved" ? (
    <Badge variant="warning">Flagged</Badge>
  ) : (
    <Badge variant="success">Live</Badge>
  );
  const isDecision = c.surface === "decision-room" || c.type === "Input";
  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onOpen!();
            }
          : undefined
      }
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card p-4 transition-colors",
        clickable && "cursor-pointer hover:border-purple-300 hover:bg-muted/40",
      )}
    >
      {isDecision ? (
        <>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <FolderOpen className="size-4" /> Decision
          </div>
          <p className="line-clamp-2 font-semibold leading-snug">{c.roomName ?? c.excerpt}</p>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.excerpt}</p>
          <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>{c.replyCount ?? c.comments ?? 0} inputs</span>
            {status}
          </div>
        </>
      ) : c.type === "Article" ? (
        <>
          {c.imageUrl && (
            <img src={c.imageUrl} alt="" className="mb-3 h-28 w-full rounded-lg object-cover" />
          )}
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
            <FileText className="size-4" /> Article
          </div>
          <p className="line-clamp-2 font-semibold leading-snug">{c.title ?? c.excerpt}</p>
          <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>{timeAgo(c.createdAt)}</span>
            {status}
          </div>
        </>
      ) : (
        <>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <FileText className="size-4" /> {c.type}
          </div>
          <p className="line-clamp-3 text-sm leading-snug">{c.excerpt}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <ThumbsUp className="size-3.5" /> {c.likes ?? c.upvotes ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="size-3.5" /> {c.comments ?? c.replyCount ?? 0}
            </span>
            <span className="ml-auto inline-flex items-center gap-2">
              {timeAgo(c.createdAt)} {status}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      {children}
    </section>
  );
}

// Colored initial squares for Experience / Education rows (e.g. "TC", "SU"), as in the member profile.
const SQUARE_COLORS = [
  "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "bg-pink-500/15 text-pink-700 dark:text-pink-300",
];
function orgInitials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
function InitialSquare({ seed, text }: { seed: string; text: string }) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
        SQUARE_COLORS[h % SQUARE_COLORS.length],
      )}
    >
      {text}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

// Orange-outlined pills for a vendor's Service Categories / Industries Served (mirrors the member app).
function ChipGroup({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-sm text-muted-foreground">—</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border border-orange-300/70 bg-orange-50 px-3 py-1.5 text-sm text-orange-900 dark:border-orange-800/60 dark:bg-orange-950/30 dark:text-orange-200"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// Account standing panel — prior warnings/suspensions + the action history. Shared by the member
// and vendor sidebars (enforcement applies to both account types).
function AccountStandingPanel({
  priorWarnings,
  priorSuspensions,
  history,
  content,
}: {
  priorWarnings: number;
  priorSuspensions: number;
  history: ModerationAction[];
  content: Content[];
}) {
  return (
    <Panel title="Account standing">
      <p className="text-sm">
        {priorWarnings === 0 && priorSuspensions === 0 ? (
          <span className="text-muted-foreground">No prior actions on record.</span>
        ) : (
          <span className="font-medium">
            {[
              priorWarnings && `${priorWarnings} warning${priorWarnings > 1 ? "s" : ""}`,
              priorSuspensions && `${priorSuspensions} suspension${priorSuspensions > 1 ? "s" : ""}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        )}
      </p>
      {history.length > 0 && (
        <ul className="space-y-1.5">
          {history.map((m) => {
            const c = m.targetType === "content" ? content.find((ci) => ci.id === m.targetId) : null;
            return (
              <li key={m.id} className="flex items-start gap-2 text-sm">
                <Badge variant="muted" className="mt-0.5 capitalize">{m.actionType}</Badge>
                <div className="min-w-0">
                  <span className="text-muted-foreground">{formatDateTime(m.createdAt)}</span>
                  {c && (
                    <span className="text-muted-foreground"> · {c.type}: “{c.excerpt.slice(0, 28)}…”</span>
                  )}
                  {m.reason && <p className="italic text-muted-foreground">“{m.reason}”</p>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}

// The user's prior account record, surfaced inside the action dialogs. Mirrors the phrasing of the
// Account Standing sidebar panel ("2 warnings · 1 suspension") so an admin escalates proportionally.
function StandingSummary({
  warnings,
  suspensions,
  lastActionAt,
}: {
  warnings: number;
  suspensions: number;
  lastActionAt: string | null;
}) {
  const parts = [
    warnings > 0 && `${warnings} warning${warnings > 1 ? "s" : ""}`,
    suspensions > 0 && `${suspensions} suspension${suspensions > 1 ? "s" : ""}`,
  ].filter(Boolean) as string[];
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Account standing
        </span>
        {lastActionAt && (
          <span className="text-xs text-muted-foreground">last action {timeAgo(lastActionAt)}</span>
        )}
      </div>
      {parts.length > 0 ? (
        <p className="mt-1 text-sm font-medium">{parts.join(" · ")}</p>
      ) : (
        <p className="mt-1 text-sm text-muted-foreground">No prior actions on record.</p>
      )}
    </div>
  );
}

function Panel({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {icon}
        {title}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 text-right">{children}</span>
    </div>
  );
}
