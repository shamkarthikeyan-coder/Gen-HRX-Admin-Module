import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Inbox } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { ColumnFilter } from "@/components/ui/column-filter";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FlagSourceBadge } from "@/components/shared/badges";
import { useStore } from "@/store/AppStore";
import { reportVolume } from "@/lib/moderation";
import { timeAgo } from "@/lib/format";

const TYPE_FILTERS = [
  { value: "all", label: "All" },
  { value: "Parley", label: "Parley" },
  { value: "Article", label: "Article" },
  { value: "Take", label: "Take" },
];
const SOURCE_FILTERS = [
  { value: "all", label: "All" },
  { value: "ai", label: "AI" },
  { value: "community", label: "Community" },
];
const DATE_SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

export function ModerationQueueView() {
  const { flags, content } = useStore();
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [showResolved, setShowResolved] = useState(false);
  const [dateSort, setDateSort] = useState("newest");

  const rows = useMemo(() => {
    return flags
      .filter(
        (f) =>
          f.surface === "general" &&
          (showResolved ? f.status === "resolved" : f.status !== "resolved"),
      )
      .map((f) => ({ flag: f, content: content.find((c) => c.id === f.contentId)! }))
      .filter(
        (r) =>
          r.content &&
          (typeFilter === "all" || r.content.type === typeFilter) &&
          (sourceFilter === "all" || r.flag.source === sourceFilter),
      )
      .sort((a, b) => {
        const ka = new Date(
          showResolved ? (a.flag.resolvedAt ?? a.flag.createdAt) : a.flag.createdAt,
        ).getTime();
        const kb = new Date(
          showResolved ? (b.flag.resolvedAt ?? b.flag.createdAt) : b.flag.createdAt,
        ).getTime();
        return dateSort === "newest" ? kb - ka : ka - kb;
      });
  }, [flags, content, typeFilter, sourceFilter, showResolved, dateSort]);

  function review(flagId: string) {
    navigate(`/moderation/${flagId}`);
  }

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {showResolved
            ? "Resolved flags, most recently resolved first. Open an item to review what was decided."
            : "Unresolved flags. Open an item to dismiss, remove, or warn the author."}
        </p>
        <label className="flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
          />
          Show resolved
        </label>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon={<Inbox className="size-8" />}
          title={showResolved ? "No resolved flags" : "Queue is clear"}
          description={
            showResolved
              ? "Nothing has been resolved in this queue yet."
              : "There are no unresolved flags matching this filter."
          }
        />
      ) : (
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <THead>
              <TR>
                <TH>
                  <ColumnFilter label="Type" value={typeFilter} onChange={setTypeFilter} options={TYPE_FILTERS} />
                </TH>
                <TH>Content</TH>
                <TH>Reason</TH>
                <TH>
                  <ColumnFilter label="Source" value={sourceFilter} onChange={setSourceFilter} options={SOURCE_FILTERS} />
                </TH>
                <TH>
                  <ColumnFilter label={showResolved ? "Resolved" : "Flagged"} value={dateSort} onChange={setDateSort} options={DATE_SORT_OPTIONS} />
                </TH>
              </TR>
            </THead>
            <TBody>
              {rows.map(({ flag, content: c }) => (
                <TR key={flag.id} className="cursor-pointer" onClick={() => review(flag.id)}>
                  <TD className="text-muted-foreground">{c.type}</TD>
                  <TD className="max-w-xs">
                    <p className="truncate">{c.excerpt}</p>
                  </TD>
                  <TD className="max-w-xs">
                    <p className="truncate" title={flag.reasons.join("; ")}>
                      {flag.reasons.join("; ")}
                    </p>
                  </TD>
                  <TD>
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <FlagSourceBadge source={flag.source} />
                      {flag.source === "community" && (
                        <span className="text-xs text-muted-foreground">· {reportVolume(flag)}</span>
                      )}
                    </div>
                  </TD>
                  <TD className="whitespace-nowrap text-muted-foreground">
                    {showResolved ? (
                      <div className="flex items-center gap-1.5">
                        {flag.resolutionAction && (
                          <Badge variant="muted" className="capitalize">{flag.resolutionAction}</Badge>
                        )}
                        <span>{timeAgo(flag.resolvedAt ?? flag.createdAt)}</span>
                      </div>
                    ) : (
                      timeAgo(flag.createdAt)
                    )}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      )}
    </div>
  );
}
