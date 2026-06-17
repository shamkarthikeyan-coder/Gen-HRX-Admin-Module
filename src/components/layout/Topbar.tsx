import { useEffect, useRef, useState } from "react";
import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store/AppStore";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Topbar() {
  const { session, notifications } = useStore();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const pending = notifications.filter((n) => n.status !== "delivered").length;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-2 border-b border-border bg-background px-6">
      <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>

      <div className="relative" ref={ref}>
        <Button variant="ghost" size="icon" onClick={() => setOpen((o) => !o)} aria-label="Notifications">
          <span className="relative">
            <Bell className="size-4" />
            {pending > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
                {pending}
              </span>
            )}
          </span>
        </Button>

        {open && (
          <div className="absolute right-0 top-11 z-50 w-96 rounded-xl border border-border bg-popover p-2 shadow-xl animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-2 py-1.5">
              <p className="text-sm font-medium">Outbound notifications</p>
              <Badge variant="muted">async queue</Badge>
            </div>
            <p className="px-2 pb-2 text-xs text-muted-foreground">
              Dispatched asynchronously. A queue hiccup is non-blocking — the action still commits and
              delivery retries.
            </p>
            <div className="max-h-80 space-y-1 overflow-y-auto">
              {notifications.length === 0 && (
                <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                  No notifications dispatched yet.
                </p>
              )}
              {notifications.slice(0, 12).map((n) => (
                <div key={n.id} className="rounded-lg px-2 py-2 hover:bg-accent">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{n.recipientName}</p>
                    <NotifStatus status={n.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                  {n.reason && <p className="mt-0.5 text-xs italic text-muted-foreground">“{n.reason}”</p>}
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{timeAgo(n.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="ml-2 flex items-center gap-2.5 border-l border-border pl-3">
        <div className="text-right leading-tight">
          <p className="text-sm font-medium">{session.adminName}</p>
          <p className="text-xs text-muted-foreground">Admin · single role</p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
          {session.adminName.slice(0, 1)}
        </div>
      </div>
    </header>
  );
}

function NotifStatus({ status }: { status: string }) {
  const map: Record<string, { variant: "success" | "warning" | "muted"; label: string }> = {
    delivered: { variant: "success", label: "delivered" },
    delayed: { variant: "warning", label: "delayed · retrying" },
    queued: { variant: "muted", label: "queued" },
  };
  const m = map[status] ?? map.queued;
  return <Badge variant={m.variant} className={cn("shrink-0")}>{m.label}</Badge>;
}
