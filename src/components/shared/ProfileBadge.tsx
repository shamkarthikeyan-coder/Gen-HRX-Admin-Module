import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  Crown,
  FileText,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { BadgeType } from "@/data/types";

interface BadgeMeta {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
}

/** The platform's badge catalog (mirrors the member app's ProfileBadge). */
export const BADGE_META: Record<BadgeType, BadgeMeta> = {
  verified: {
    title: "Verified Professional",
    description: "Identity verified by Parley",
    icon: BadgeCheck,
    className: "bg-purple-600",
  },
  "thought-leader": {
    title: "Thought Leader",
    description: "Published 100 high-value parleys or articles",
    icon: BookOpen,
    className: "bg-cyan-500",
  },
  "strategy-architect": {
    title: "Strategy Architect",
    description: "Created 50 All Hands contributing to strategic HR discussions",
    icon: Target,
    className: "bg-blue-500",
  },
  innovator: {
    title: "Innovator",
    description: "Shares fresh perspectives and innovative HR solutions",
    icon: Sparkles,
    className: "bg-orange-500",
  },
  "decision-catalyst": {
    title: "Decision Catalyst",
    description: "Created 10 All Hands driving meaningful discussions",
    icon: Lightbulb,
    className: "bg-amber-500",
  },
  "community-strategist": {
    title: "Community Strategist",
    description: "Created 100 All Hands with active community participation",
    icon: Crown,
    className: "bg-violet-600",
  },
  "knowledge-contributor": {
    title: "Knowledge Contributor",
    description: "Published 25 parleys or articles with valuable HR insights",
    icon: FileText,
    className: "bg-orange-600",
  },
  "executive-insider": {
    title: "Executive Insider",
    description: "Has C-suite or VP-level experience",
    icon: Briefcase,
    className: "bg-indigo-600",
  },
};

/** A compact row of circular badge icons for a byline. Caps at `max`, then shows "+N". */
export function ProfileBadges({
  badges,
  max = 5,
  className,
}: {
  badges?: BadgeType[];
  max?: number;
  className?: string;
}) {
  if (!badges || badges.length === 0) return null;
  const shown = badges.slice(0, max);
  const extra = badges.length - shown.length;
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {shown.map((b) => {
        const m = BADGE_META[b];
        const Icon = m.icon;
        return (
          <span
            key={b}
            title={`${m.title} — ${m.description}`}
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded-full text-white",
              m.className,
            )}
          >
            <Icon className="size-2.5" />
          </span>
        );
      })}
      {extra > 0 && <span className="text-xs font-medium text-muted-foreground">+{extra}</span>}
    </span>
  );
}

/** Labeled badge chips for a profile / author panel. */
export function ProfileBadgeChips({ badges }: { badges?: BadgeType[] }) {
  if (!badges || badges.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => {
        const m = BADGE_META[b];
        const Icon = m.icon;
        return (
          <span
            key={b}
            title={m.description}
            className="inline-flex items-center gap-1 rounded-full border border-border py-0.5 pl-0.5 pr-2 text-xs"
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded-full text-white",
                m.className,
              )}
            >
              <Icon className="size-2.5" />
            </span>
            {m.title}
          </span>
        );
      })}
    </div>
  );
}
