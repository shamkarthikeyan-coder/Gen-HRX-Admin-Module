import { Badge } from "@/components/ui/badge";
import type {
  AccountStatus,
  FlagSource,
  FlagStatus,
  RoomStatus,
  SubscriptionStatus,
} from "@/data/types";

export function FlagStatusBadge({ status }: { status: FlagStatus }) {
  const map = { unresolved: "secondary", resolved: "success" } as const;
  return <Badge variant={map[status]} className="capitalize">{status}</Badge>;
}

export function FlagSourceBadge({ source }: { source: FlagSource }) {
  return (
    <Badge variant="outline" className="uppercase">
      {source === "ai" ? "AI" : "Community"}
    </Badge>
  );
}

export function AccountStatusBadge({ status }: { status: AccountStatus }) {
  const map = {
    active: "success",
    warned: "warning",
    suspended: "info",
    banned: "destructive",
  } as const;
  return <Badge variant={map[status]} className="capitalize">{status}</Badge>;
}

export function RoomStatusBadge({ status }: { status: RoomStatus }) {
  // Active rooms are the norm — show nothing to keep the queue clean; flag closed rooms in amber.
  if (status === "active") return null;
  return <Badge variant="warning">Decision room closed</Badge>;
}

export function SubscriptionBadge({ status }: { status: SubscriptionStatus }) {
  return (
    <Badge variant={status === "active" ? "success" : "muted"} className="capitalize">
      {status}
    </Badge>
  );
}
