import { NavLink } from "react-router-dom";
import { Flag, Users, Store, ScrollText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { useStore } from "@/store/AppStore";
import { useSidebar } from "./sidebar-context";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export function Sidebar() {
  const { flags, vendors } = useStore();
  const { expanded, setExpanded } = useSidebar();

  const openFlags = flags.filter((f) => f.status !== "resolved").length;
  const inactiveVendors = vendors.filter(
    (v) => !v.catalogOnly && v.subscriptionStatus === "inactive",
  ).length;

  const items: NavItem[] = [
    { to: "/moderation", label: "Content Moderation", icon: Flag, badge: openFlags },
    { to: "/users", label: "Users", icon: Users },
    { to: "/vendors", label: "Marketplace", icon: Store, badge: inactiveVendors },
    { to: "/audit", label: "Audit & Events", icon: ScrollText },
  ];

  return (
    // In-flow rail: it expands from 64px to 256px on hover and the main content reflows to fit
    // (the width transition animates the push). The detail-page action bars follow via context.
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={cn(
        "relative z-40 flex h-screen shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out",
        expanded ? "w-64 shadow-xl" : "w-16",
      )}
    >
        <div
          className={cn(
            "flex h-16 items-center overflow-hidden border-b border-sidebar-border",
            expanded ? "gap-2.5 px-5" : "justify-center px-0",
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-orange-500 text-white shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          {expanded && (
            <div className="leading-tight">
              <p className="text-sm font-semibold">GenHRX</p>
              <p className="text-xs text-muted-foreground">Admin Console</p>
            </div>
          )}
        </div>

        <nav
          className={cn(
            "flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden py-4",
            expanded ? "px-3" : "px-2",
          )}
        >
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center rounded-md py-2 text-sm font-medium transition-colors",
                  expanded ? "gap-2.5 px-2.5" : "justify-center px-0",
                  isActive
                    ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-gradient-to-b from-purple-600 to-orange-500" />
                  )}
                  <item.icon className="size-4 shrink-0" />
                  {expanded && <span className="flex-1 whitespace-nowrap">{item.label}</span>}
                  {item.badge ? (
                    expanded ? (
                      <span className="rounded-full bg-destructive px-1.5 py-0.5 text-xs font-semibold text-destructive-foreground">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                        {item.badge}
                      </span>
                    )
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>
    </aside>
  );
}
