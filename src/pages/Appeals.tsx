import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Inbox, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useStore } from "@/store/AppStore";
import { timeAgo } from "@/lib/format";

/** Appeals — a second review of a removal. Authors contest removals from the member app (out of
 *  scope here); those land as `appealStatus: "pending"` flags for an admin to uphold or deny. */
export function AppealsView() {
  const { flags, content } = useStore();
  const navigate = useNavigate();

  const rows = useMemo(() => {
    return flags
      .filter((f) => f.appealStatus === "pending")
      .map((f) => ({ flag: f, content: content.find((c) => c.id === f.contentId)! }))
      .filter((r) => r.content)
      .sort(
        (a, b) =>
          new Date(b.flag.appealedAt ?? b.flag.createdAt).getTime() -
          new Date(a.flag.appealedAt ?? a.flag.createdAt).getTime(),
      );
  }, [flags, content]);

  function review(flagId: string) {
    navigate(`/moderation/${flagId}`);
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Authors contesting a removal. Open an item to review the original content alongside their
        argument, then uphold the appeal (restore) or deny it (the removal stands).
      </p>

      {rows.length === 0 ? (
        <EmptyState
          icon={<Inbox className="size-8" />}
          title="No appeals to review"
          description="There are no pending appeals right now."
        />
      ) : (
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <THead>
              <TR>
                <TH>Content</TH>
                <TH>Removed for</TH>
                <TH>Appeal argument</TH>
                <TH>Appealed</TH>
              </TR>
            </THead>
            <TBody>
              {rows.map(({ flag, content: c }) => (
                <TR key={flag.id} className="cursor-pointer" onClick={() => review(flag.id)}>
                  <TD className="max-w-xs">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate">{c.excerpt}</p>
                      {c.surface === "decision-room" && <Badge variant="muted">Room</Badge>}
                    </div>
                  </TD>
                  <TD className="max-w-[12rem]">
                    <p className="truncate text-muted-foreground" title={flag.reasons.join("; ")}>
                      {flag.reasons.join("; ")}
                    </p>
                  </TD>
                  <TD className="max-w-sm">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate" title={flag.appealNote}>
                        {flag.appealNote}
                      </p>
                      {flag.appealAttachmentName && (
                        <Paperclip
                          className="size-3.5 shrink-0 text-muted-foreground"
                          aria-label="Has an attachment"
                        />
                      )}
                    </div>
                  </TD>
                  <TD className="whitespace-nowrap text-muted-foreground">
                    {timeAgo(flag.appealedAt ?? flag.createdAt)}
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
