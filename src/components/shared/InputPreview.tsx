import {
  BadgeCheck,
  MessageCircle,
  Paperclip,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import type { BadgeType, Content } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { ProfileBadges } from "./ProfileBadge";
import { timeAgo } from "@/lib/format";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Renders a flagged Decision Room item as the Peer Input it actually is — the member's text plus
 *  its tags, attachment and peer votes — rather than as a feed post. Anonymous inputs mask the
 *  member's identity in the card (the admin can still see the real author in the Author panel). */
export function InputPreview({
  content,
  badges,
}: {
  content: Content;
  badges?: BadgeType[];
}) {
  const anonymous = !!content.anonymous || !content.authorId;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-orange-500 text-sm font-semibold text-white">
          {anonymous ? "🎭" : initials(content.authorName)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-foreground">
              {anonymous ? "Anonymous" : content.authorName}
            </span>
            {!anonymous && content.verified && (
              <BadgeCheck className="size-4 text-purple-600 dark:text-purple-400" />
            )}
            {!anonymous && <ProfileBadges badges={badges?.filter((b) => b !== "verified")} />}
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
            {content.anonymous && <Badge variant="muted">Posted anonymously</Badge>}
            {content.hiddenAt && <Badge variant="info">Hidden</Badge>}
            {content.deletedAt && <Badge variant="destructive">Removed</Badge>}
          </div>
        </div>
        {/* Type chip */}
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
          <MessageCircle className="size-4 text-blue-500" />
          Input
        </span>
      </div>

      {/* Body */}
      <div className="mt-4">
        <div className="space-y-3">
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground">
            {content.body}
          </p>

          {/* Attachment — the common PII-leak vector for inputs */}
          {content.attachmentName && (
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm text-foreground">
                <Paperclip className="size-4 text-muted-foreground" />
                {content.attachmentName}
              </span>
              {content.imageUrl && (
                <div className="overflow-hidden rounded-xl">
                  <img src={content.imageUrl} alt="" className="max-h-80 w-full object-cover" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tags the member attached to their input */}
      {content.inputTags && content.inputTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {content.inputTags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Peer votes + replies (read-only) */}
      <div className="mt-4 flex items-center gap-6 border-t border-border pt-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ThumbsUp className="size-4" /> {(content.upvotes ?? 0).toLocaleString()}
        </span>
        <span className="flex items-center gap-1.5">
          <ThumbsDown className="size-4" /> {(content.downvotes ?? 0).toLocaleString()}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle className="size-4" /> {(content.replyCount ?? content.comments).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
