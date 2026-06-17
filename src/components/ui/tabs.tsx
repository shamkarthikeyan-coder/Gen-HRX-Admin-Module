import { cn } from "@/lib/cn";

interface TabItem {
  value: string;
  label: React.ReactNode;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Underline tab bar. The active tab carries the product's signature
 * purple → pink → orange gradient indicator.
 */
export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex items-center gap-1 border-b border-border", className)}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "text-purple-700 dark:text-purple-300"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
            {item.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs tabular-nums",
                  active
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {item.count}
              </span>
            )}
            {active && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
