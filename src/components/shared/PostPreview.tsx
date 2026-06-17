import {
  BadgeCheck,
  FileText,
  MessageCircle,
  MessageSquare,
  Play,
  Share2,
  ThumbsUp,
  Video,
} from "lucide-react";
import type { BadgeType, Content } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { ProfileBadges } from "./ProfileBadge";
import { timeAgo } from "@/lib/format";

const TYPE_META = {
  Parley: { label: "Parley", icon: MessageSquare },
  Article: { label: "Article", icon: FileText },
  Take: { label: "Take", icon: Video },
  // Decision Room inputs render via InputPreview, not here — this entry only keeps the lookup total.
  Input: { label: "Input", icon: MessageCircle },
} as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Renders a flagged item exactly as it appears in the member feed — a Parley, Article, or Take
 *  card — so moderators review the real post, not a bare excerpt. */
export function PostPreview({
  content,
  badges,
}: {
  content: Content;
  badges?: BadgeType[];
}) {
  const meta = TYPE_META[content.type];
  const TypeIcon = meta.icon;
  const anonymous = !content.authorId;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-orange-500 text-sm font-semibold text-white">
          {anonymous ? "🎭" : initials(content.authorName)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-foreground">{content.authorName}</span>
            {content.verified && <BadgeCheck className="size-4 text-purple-600 dark:text-purple-400" />}
            <ProfileBadges badges={badges?.filter((b) => b !== "verified")} />
          </div>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
            {content.authorRole && <span>{content.authorRole}</span>}
            {content.authorRole && <span aria-hidden>·</span>}
            <span>{timeAgo(content.createdAt)}</span>
            {content.roomName && (
              <>
                <span aria-hidden>·</span>
                <span>{content.roomName}</span>
              </>
            )}
            {content.confessional && (
              <Badge variant="warning" className="ml-0.5">Confessional</Badge>
            )}
            {content.trending && <Badge variant="info">Trending</Badge>}
            {content.hiddenAt && <Badge variant="info">Hidden</Badge>}
            {content.deletedAt && <Badge variant="destructive">Removed</Badge>}
          </div>
        </div>
        {/* Type chip */}
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
          <TypeIcon className="size-4 text-blue-500" />
          {meta.label}
        </span>
      </div>

      {/* Body */}
      <div className="mt-4">
        <div className="space-y-3">
          {content.type === "Article" && content.title && (
            <h3 className="text-lg font-semibold leading-snug text-foreground">{content.title}</h3>
          )}

          <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground">
            {content.body}
          </p>

          {/* Take — video thumbnail with play + duration */}
          {content.type === "Take" && content.videoThumbnail && (
            <div className="relative overflow-hidden rounded-xl">
              <img src={content.videoThumbnail} alt="" className="max-h-80 w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
                  <Play className="size-5 fill-white text-white" />
                </div>
              </div>
              {content.duration && (
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
                  {content.duration}
                </span>
              )}
            </div>
          )}

          {/* Parley / Article — cover image */}
          {content.type !== "Take" && content.imageUrl && (
            <div className="overflow-hidden rounded-xl">
              <img src={content.imageUrl} alt="" className="max-h-80 w-full object-cover" />
            </div>
          )}

          {content.type === "Article" && content.readTime && (
            <p className="text-xs text-muted-foreground">{content.readTime}</p>
          )}
        </div>
      </div>

      {/* Engagement (read-only) */}
      <div className="mt-4 flex items-center gap-6 border-t border-border pt-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ThumbsUp className="size-4" /> {content.likes.toLocaleString()}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle className="size-4" /> {content.comments.toLocaleString()}
        </span>
        <span className="flex items-center gap-1.5">
          <Share2 className="size-4" /> {content.shares.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
