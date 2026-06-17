// Domain model for the GenHRX Admin Console prototype.
// Names mirror the Functional Spec / TRD. This is a front-end-only prototype:
// these objects live in an in-memory store, not a database.

export type UUID = string;

// ── Users ────────────────────────────────────────────────────────────────────
export type AccountStatus = "active" | "warned" | "suspended" | "banned";
export type UserRole = "member" | "vendor" | "admin";
export type VerificationStatus = "verified" | "unverified";

/** Platform achievement badges shown on a member's profile and post byline. */
export type BadgeType =
  | "verified"
  | "thought-leader"
  | "strategy-architect"
  | "innovator"
  | "decision-catalyst"
  | "community-strategist"
  | "knowledge-contributor"
  | "executive-insider";

export interface User {
  id: UUID;
  name: string;
  email: string;
  role: UserRole;
  joinDate: string; // ISO
  verification: VerificationStatus;
  accountStatus: AccountStatus;
  activity: {
    parleys: number;
    articles: number;
    takes: number;
    lastActive: string; // ISO
  };
  badges?: BadgeType[]; // earned profile badges (shown on the byline + profile)
  followers?: number;
  following?: number;
  // Full member profile (mirrors the GenHRX member app: headline, bio, experience, education,
  // certifications, interests). Optional — when absent, the admin detail page derives a complete
  // profile from the fields above (see lib/profile.ts) so every account renders a full profile.
  profile?: UserProfile;
  // Company profile for vendor accounts (role === "vendor"). Mirrors the member app's Service
  // Vendor profile — About, Services Offered, Industries Served, HQ, service area, contact. The
  // admin vendor detail renders this instead of the person-centric member profile above.
  vendorProfile?: VendorProfile;
}

/** A vendor account's company profile, as shown on the member-app Service Vendor profile. */
export interface VendorProfile {
  companyName: string;
  about: string;
  serviceCategories: string[]; // e.g. "Talent Acquisition And Staffing"
  industriesServed: string[]; // e.g. "Healthcare And Life Sciences"
  headquarters: string; // e.g. "Europe"
  serviceArea: string; // e.g. "Multiple Cities"
  email: string; // public contact email
  phone: string;
  website: string; // full URL
  location: string; // header location line, e.g. "Europe"
}

/** A member's full profile, as collected/shown in the GenHRX member app. */
export interface UserProfile {
  username: string; // @handle
  headline: string; // role line, e.g. "Senior HR Director @ TechCorp"
  company?: string;
  location: string;
  bio: string;
  industry?: string;
  organizationSize?: string; // e.g. "501–1000 employees"
  interests: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  posts: number; // total posts, shown as a profile stat
}

export interface Experience {
  id: UUID;
  title: string;
  company: string;
  startDate: string; // display string, e.g. "Jan 2020"
  endDate: string; // display string, e.g. "Present"
  isCurrent: boolean;
}

export interface Education {
  id: UUID;
  degree: string;
  institution: string;
  year: string; // e.g. "2015 - 2017"
}

export interface Certification {
  id: UUID;
  name: string; // e.g. "SHRM-SCP"
  issuer: string; // e.g. "Society for Human Resource Management"
  year: string;
}

// ── Content & Flags ──────────────────────────────────────────────────────────
// Parley / Article / Take are public-feed content. "Input" is a Peer Input contributed inside a
// Decision Room (members add inputs to a structured decision — see DecisionRoom).
export type ContentType = "Parley" | "Article" | "Take" | "Input";
export type FlagSource = "ai" | "community";
export type FlagStatus = "unresolved" | "resolved";
export type Surface = "general" | "decision-room";
export type ResolutionAction = "dismiss" | "remove" | "hide" | "restore";
export type RoomStatus = "active" | "archived";

/** A Decision Room. Content references a room by the denormalized `roomId` / `roomName`
 *  on `Content`; this record is the single source of truth for the room's lifecycle status.
 *  Removal (CTA 8) is permitted whether the room is active or archived. */
export interface DecisionRoom {
  id: UUID;
  name: string; // room title
  status: RoomStatus;
  archivedAt: string | null; // ISO; null while active
  // ── Decision context ── the structured decision members are contributing inputs to. Shown to
  // the moderator so a flagged input can be judged in context, not as a bare post.
  question: string; // the decision being made
  situation: string; // background / why the decision is on the table
  constraints: string; // boundary conditions the decision must respect
  options: { id: string; text: string; votes: number }[]; // poll options (percentages computed in UI)
  timeRemaining?: string; // e.g. "2h" — present while active
  createdBy?: string; // e.g. "HR Director"
  groupType?: string; // e.g. "Invite Only"
}

export interface PostComment {
  id: UUID;
  author: string;
  role?: string;
  text: string;
  time: string; // relative display string, e.g. "1h ago"
  likes: number;
}

export interface Content {
  id: UUID;
  type: ContentType;
  authorId: UUID | null; // null => anonymous (CTA 4 edge case)
  excerpt: string; // short preview used by the moderation queue table
  createdAt: string; // ISO
  surface: Surface;
  roomId?: UUID; // present for decision-room content
  roomName?: string;
  deletedAt: string | null; // soft-delete (CTA 3 / 8)
  hiddenAt: string | null; // reversible hide (CTA 7, DR only)

  // ── Post presentation ──
  // Denormalized author + post fields so the review dialog can render the item exactly as it
  // appears in the member feed (Parley / Article / Take), not as a plain excerpt.
  authorName: string; // byline shown on the post ("Anonymous HR Professional" when anon)
  authorRole?: string; // job-title line, e.g. "Senior HR Manager • Northwind"
  verified?: boolean; // verified-professional tick
  body: string; // full post text (Parley body / Take caption / Article intro)
  likes: number;
  comments: number;
  shares: number;
  confessional?: boolean; // "Confessional" tag
  trending?: boolean; // "Trending" tag
  imageUrl?: string; // Parley / Article cover image
  title?: string; // Article headline
  readTime?: string; // Article read time, e.g. "4 min read"
  videoThumbnail?: string; // Take (video) thumbnail
  duration?: string; // Take (video) duration, e.g. "0:42"
  commentThread?: PostComment[]; // a sample of the comment thread, for moderation context

  // ── Peer Input (type === "Input", Decision Rooms only) ──
  // A member's contribution to a decision. Distinct from feed engagement: peers up/down-vote
  // inputs and reply to them, and an input may carry an attachment (a common PII-leak vector).
  inputTags?: string[]; // member-selected tags, e.g. "Risk alert", "Legal compliance"
  upvotes?: number; // peer upvotes on the input (used instead of `likes`)
  downvotes?: number; // peer downvotes on the input
  replyCount?: number; // replies on the input (used instead of `comments`)
  attachmentName?: string; // uploaded attachment filename, if any
  anonymous?: boolean; // posted anonymously — identity hidden from peers (admin still sees authorId)
}

export interface Flag {
  id: UUID;
  contentId: UUID;
  surface: Surface;
  source: FlagSource;
  reasons: string[]; // all associated flag reasons (CTA 1 detail)
  reportCount?: number; // community report volume (AI flags are a single detection)
  note?: string; // why it was flagged — AI rationale or a representative community report note
  status: FlagStatus;
  createdAt: string; // ISO — tie-break key
  resolvedAt: string | null;
  resolutionAction: ResolutionAction | null;

  // ── Appeal (admin-side) ── set once content is removed; an author may then contest the removal.
  // The author-facing "file appeal" step lives in the member app, so pending appeals are seeded here.
  appealStatus?: "none" | "pending" | "upheld" | "denied";
  appealNote?: string; // the author's argument for why the removal was wrong
  appealAttachmentName?: string; // evidence the author attached when filing (e.g. a screenshot/doc)
  appealAttachmentUrl?: string; // optional image preview for the attachment
  appealedAt?: string; // ISO — when the appeal was filed
  appealDeadline?: string; // ISO — 14-day window the appeal falls within
  appealResolvedAt?: string; // ISO — when the admin upheld/denied
}

// ── Moderation / Audit trail ───────────────────────────────────────────────────
export type ModerationActionType =
  | "dismiss"
  | "remove"
  | "restore"
  | "warn"
  | "hide"
  | "unhide"
  | "suspend"
  | "ban"
  | "lift";

export interface ModerationAction {
  id: UUID;
  actionType: ModerationActionType;
  targetType: "content" | "user" | "flag";
  targetId: UUID;
  adminId: UUID;
  reason: string | null;
  createdAt: string; // immutable
}

export interface AuditLogEntry {
  id: UUID;
  actorAdminId: UUID;
  actorAdminName: string;
  targetType: string;
  targetLabel: string;
  actionType: string;
  timestamp: string; // immutable, append-only
  metadata?: Record<string, unknown>;
}

export type DomainEventName =
  | "ContentRemovedByAdmin"
  | "ContentRestoredByAdmin"
  | "UserModerationActionApplied"
  | "ContentHiddenPendingReview"
  | "VendorSubscriptionStatusChanged"
  | "SponsoredPlacementChanged";

export interface DomainEvent {
  id: UUID;
  name: DomainEventName;
  consumers: string[];
  payload: Record<string, unknown>;
  emittedAt: string;
}

// ── Suspensions ────────────────────────────────────────────────────────────────
export interface SuspensionRecord {
  id: UUID;
  userId: UUID;
  startTime: string; // ISO
  endTime: string; // ISO
  reason: string;
  adminId: UUID;
  liftedAt: string | null; // null => active (partial unique index)
}

// ── Vendors & placements ────────────────────────────────────────────────────────
export type SubscriptionStatus = "active" | "inactive";

export interface Vendor {
  id: UUID;
  companyName: string;
  description: string;
  website: string;
  subscriptionStatus: SubscriptionStatus;
  // Subscription term metadata — set on activation, cleared on deactivation (CTA 14).
  // Bridges the manual M2 process to PAYMENT-SYSTEM in M3, which will own renewal/billing.
  subscriptionActivatedAt: string | null;
  subscriptionExpiresAt: string | null;
  // Catalog vs. managed list: true = the vendor exists in the directory but has NOT yet been added
  // to the Subscriptions management list. Admins add these via "Add vendor". Absent/false = listed.
  catalogOnly?: boolean;
  // Suppressed in marketplace surfaces when inactive (CTA 15 graceful degrade).
  fullListing: {
    services: string[];
    pricing: string;
    contactEmail: string;
  };
}

export interface SponsoredPlacement {
  id: UUID;
  vendorId: UUID;
  rank: number; // unique across active placements
  monthlyFee: number; // sponsorship fee — the "higher-paying sponsors first" basis (CTA 17)
  createdBy: UUID;
  active: boolean;
  createdAt: string;
  expiresAt: string; // time-bound campaign — when the placement lapses
}

// ── Notifications ────────────────────────────────────────────────────────────────
export type NotificationStatus = "queued" | "delivered" | "delayed";

export interface NotificationRecord {
  id: UUID;
  recipientId: UUID;
  recipientName: string;
  channel: "in-app";
  message: string;
  reason?: string;
  status: NotificationStatus;
  attempts: number;
  createdAt: string;
}

/** The acting admin. Single-role assumption — OQ-2 (role hierarchy) unresolved. */
export interface AdminSession {
  adminId: UUID;
  adminName: string;
  role: "admin";
}

/** Standard suspension tiers offered to admins (24 hours up to 30 days) — confirmed default set (OQ-1). */
export const SUSPENSION_PRESETS = [
  { label: "24 hours", hours: 24 },
  { label: "72 hours", hours: 72 },
  { label: "7 days", hours: 24 * 7 },
  { label: "30 days", hours: 24 * 30 },
] as const;

/** Vendor subscription term applied on manual activation. Default pending PAYMENT-SYSTEM (M3). */
export const SUBSCRIPTION_TERM_DAYS = 30;

/** Sponsorship campaign lengths offered at placement creation. */
export const PLACEMENT_DURATION_PRESETS = [
  { label: "30 days", days: 30 },
  { label: "60 days", days: 60 },
  { label: "90 days", days: 90 },
] as const;

/** Maximum concurrent vendors in the marketplace Sponsored section. Confirmed default. */
export const MAX_SPONSORED_SLOTS = 12;
