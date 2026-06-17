import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ColumnFilter } from "@/components/ui/column-filter";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useStore } from "@/store/AppStore";
import { timeAgo } from "@/lib/format";

const ROOM_STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];
const DATE_SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

export function DecisionRoomsView() {
  const { flags, content, roomFor } = useStore();
  const navigate = useNavigate();
  const [showResolved, setShowResolved] = useState(false);
  const [roomStatusFilter, setRoomStatusFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");

  const rows = useMemo(() => {
    return flags
      .filter(
        (f) =>
          f.surface === "decision-room" &&
          (showResolved ? f.status === "resolved" : f.status !== "resolved"),
      )
      .map((f) => ({ flag: f, content: content.find((c) => c.id === f.contentId)! }))
      .filter((r) => r.content)
      .filter((r) => {
        if (roomStatusFilter === "all") return true;
        const closed = roomFor(r.content.roomId)?.status === "archived";
        return roomStatusFilter === "closed" ? closed : !closed;
      })
      .sort((a, b) => {
        const ka = new Date(
          showResolved ? (a.flag.resolvedAt ?? a.flag.createdAt) : a.flag.createdAt,
        ).getTime();
        const kb = new Date(
          showResolved ? (b.flag.resolvedAt ?? b.flag.createdAt) : b.flag.createdAt,
        ).getTime();
        return dateSort === "newest" ? kb - ka : ka - kb;
      });
  }, [flags, content, roomFor, showResolved, roomStatusFilter, dateSort]);

  function review(flagId: string) {
    navigate(`/moderation/${flagId}`);
  }

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {showResolved
            ? "Resolved Decision Room flags, most recently resolved first. Open an item to review what was decided."
            : "Human review of AI-escalated critical-safety flags inside Decision Rooms — including the reversible hide / unhide safety valve the general queue does not have."}
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
          title={showResolved ? "No resolved flags" : "No AI-escalated flags"}
          description={
            showResolved
              ? "No Decision Room flags have been resolved yet."
              : "There are no unresolved critical-safety flags in Decision Rooms right now."
          }
        />
      ) : (
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <THead>
              <TR>
                <TH>Decision Room</TH>
                <TH>
                  <ColumnFilter label="Room status" value={roomStatusFilter} onChange={setRoomStatusFilter} options={ROOM_STATUS_FILTERS} />
                </TH>
                <TH>Content</TH>
                <TH>Reason</TH>
                <TH>
                  <ColumnFilter label={showResolved ? "Resolved" : "Flagged"} value={dateSort} onChange={setDateSort} options={DATE_SORT_OPTIONS} />
                </TH>
              </TR>
            </THead>
            <TBody>
              {rows.map(({ flag, content: c }) => (
                <TR key={flag.id} className="cursor-pointer" onClick={() => review(flag.id)}>
                  <TD className="whitespace-nowrap text-muted-foreground">{c.roomName}</TD>
                  <TD>
                    {roomFor(c.roomId)?.status === "archived" ? (
                      <Badge variant="warning">Closed</Badge>
                    ) : (
                      <Badge variant="muted">Open</Badge>
                    )}
                  </TD>
                  <TD className="max-w-sm">
                    <p className="truncate">{c.excerpt}</p>
                  </TD>
                  <TD className="max-w-xs">
                    <p className="truncate" title={flag.reasons.join("; ")}>
                      {flag.reasons.join("; ")}
                    </p>
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
