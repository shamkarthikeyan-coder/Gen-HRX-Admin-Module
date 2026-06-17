import { useEffect, useRef, useState } from "react";
import { Check, ListFilter } from "lucide-react";
import { cn } from "@/lib/cn";

interface Option {
  value: string;
  label: string;
}

/** A filter that lives inside a table column header. Click the header to pick a value;
 *  the funnel icon highlights while a non-"all" value is applied. */
export function ColumnFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = value !== "all";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          // `text-xs uppercase` so the label matches the <TH> headers exactly — a <button>
          // resets font-size (to 16px) and text-transform (to none), which would otherwise
          // leave filter labels larger and title-cased next to the plain header labels.
          "-mx-1 inline-flex items-center gap-1 rounded px-1 py-0.5 text-xs uppercase transition-colors hover:text-foreground",
          active && "text-foreground",
        )}
      >
        <span>{label}</span>
        <ListFilter
          className={cn("size-3.5", active ? "text-purple-600 dark:text-purple-400" : "opacity-50")}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 min-w-[160px] rounded-lg border border-border bg-popover p-1 shadow-xl">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm normal-case tracking-normal transition-colors hover:bg-accent",
                o.value === value ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {o.label}
              {o.value === value && (
                <Check className="size-3.5 text-purple-600 dark:text-purple-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
