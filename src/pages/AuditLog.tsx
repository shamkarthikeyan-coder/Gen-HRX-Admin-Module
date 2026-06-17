import { useState } from "react";
import { PageHeader } from "@/components/shared/page";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useStore } from "@/store/AppStore";
import { formatDateTime } from "@/lib/format";
import { ScrollText } from "lucide-react";

export function AuditLogPage() {
  const { auditLog, events, notifications, moderationActions } = useStore();
  const [tab, setTab] = useState("audit");

  return (
    <div>
      <PageHeader
        title="Audit & Events"
        description="Every action writes an immutable, append-only audit record in the same transaction. Destructive and account actions also write a moderation record."
      />

      <div className="mb-4">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: "audit", label: "Audit Log", count: auditLog.length },
            { value: "moderation", label: "Moderation Records", count: moderationActions.length },
            { value: "events", label: "Domain Events", count: events.length },
            { value: "notifications", label: "Notifications", count: notifications.length },
          ]}
        />
      </div>

      {tab === "audit" && (
        <Panel
          empty={auditLog.length === 0}
          head={["Time", "Actor", "Action", "Target"]}
        >
          {auditLog.map((a) => (
            <TR key={a.id}>
              <TD className="whitespace-nowrap text-muted-foreground">{formatDateTime(a.timestamp)}</TD>
              <TD>{a.actorAdminName}</TD>
              <TD>
                <Badge variant="muted" className="capitalize">{a.actionType}</Badge>
              </TD>
              <TD>
                <span className="text-muted-foreground">{a.targetType}:</span> {a.targetLabel}
              </TD>
            </TR>
          ))}
        </Panel>
      )}

      {tab === "moderation" && (
        <Panel empty={moderationActions.length === 0} head={["Time", "Action", "Target", "Reason"]}>
          {moderationActions.map((m) => (
            <TR key={m.id}>
              <TD className="whitespace-nowrap text-muted-foreground">{formatDateTime(m.createdAt)}</TD>
              <TD>
                <Badge variant="muted" className="capitalize">{m.actionType}</Badge>
              </TD>
              <TD>
                <span className="text-muted-foreground">{m.targetType}:</span> {m.targetId}
              </TD>
              <TD className="max-w-md text-muted-foreground">{m.reason ?? "—"}</TD>
            </TR>
          ))}
        </Panel>
      )}

      {tab === "events" && (
        <Panel empty={events.length === 0} head={["Time", "Event", "Consumers", "Payload"]}>
          {events.map((e) => (
            <TR key={e.id}>
              <TD className="whitespace-nowrap text-muted-foreground">{formatDateTime(e.emittedAt)}</TD>
              <TD>
                <Badge variant="info">{e.name}</Badge>
              </TD>
              <TD className="text-xs text-muted-foreground">{e.consumers.join(", ")}</TD>
              <TD>
                <code className="text-xs text-muted-foreground">{JSON.stringify(e.payload)}</code>
              </TD>
            </TR>
          ))}
        </Panel>
      )}

      {tab === "notifications" && (
        <Panel empty={notifications.length === 0} head={["Time", "Recipient", "Status", "Message"]}>
          {notifications.map((n) => (
            <TR key={n.id}>
              <TD className="whitespace-nowrap text-muted-foreground">{formatDateTime(n.createdAt)}</TD>
              <TD>{n.recipientName}</TD>
              <TD>
                <Badge
                  variant={n.status === "delivered" ? "success" : n.status === "delayed" ? "warning" : "muted"}
                >
                  {n.status}
                </Badge>
              </TD>
              <TD className="max-w-md text-muted-foreground">
                <p className="truncate">{n.message}</p>
              </TD>
            </TR>
          ))}
        </Panel>
      )}
    </div>
  );
}

function Panel({
  empty,
  head,
  children,
}: {
  empty: boolean;
  head: string[];
  children: React.ReactNode;
}) {
  if (empty) {
    return <EmptyState icon={<ScrollText className="size-8" />} title="Nothing recorded yet" />;
  }
  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <THead>
          <TR>
            {head.map((h) => (
              <TH key={h}>{h}</TH>
            ))}
          </TR>
        </THead>
        <TBody>{children}</TBody>
      </Table>
    </div>
  );
}
