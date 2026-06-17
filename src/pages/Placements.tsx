import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Megaphone,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { useStore } from "@/store/AppStore";
import { runAction } from "@/lib/runAction";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { MAX_SPONSORED_SLOTS, PLACEMENT_DURATION_PRESETS } from "@/data/types";

// Soft, deterministic identity tint per vendor (calm — not loud).
const TINTS = [
  "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
  "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
];
function tintFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return TINTS[h % TINTS.length];
}
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
function isExpired(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}

function Monogram({ id, name, className }: { id: string; name: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold",
        tintFor(id),
        className,
      )}
    >
      {initials(name)}
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-orange-500 text-xs font-bold text-white shadow-sm">
        1
      </div>
    );
  }
  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
      {rank}
    </div>
  );
}

export function PlacementsView() {
  const store = useStore();
  const { placements, vendors } = store;
  const [creating, setCreating] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const active = useMemo(
    () => placements.filter((p) => p.active).sort((a, b) => a.rank - b.rank),
    [placements],
  );
  const vendorById = (id: string) => vendors.find((v) => v.id === id);
  const vendorName = (id: string) => vendorById(id)?.companyName ?? id;

  // Only active-subscription vendors are eligible — a hidden listing can't be sponsored.
  const eligibleVendors = vendors.filter(
    (v) =>
      !v.catalogOnly &&
      v.subscriptionStatus === "active" &&
      !active.some((p) => p.vendorId === v.id),
  );
  const slotsFull = active.length >= MAX_SPONSORED_SLOTS;

  const [vendorId, setVendorId] = useState("");
  const [vendorQuery, setVendorQuery] = useState("");
  const [rank, setRank] = useState(active.length + 1);
  const [fee, setFee] = useState("");
  const [durationDays, setDurationDays] = useState<number>(PLACEMENT_DURATION_PRESETS[0].days);

  const feeNum = Number(fee);
  const feeValid = Number.isFinite(feeNum) && feeNum > 0;

  // Typeahead over eligible vendors — scales to large vendor catalogs.
  const vendorMatches = useMemo(() => {
    const n = vendorQuery.trim().toLowerCase();
    if (!n) return eligibleVendors;
    return eligibleVendors.filter(
      (v) =>
        v.companyName.toLowerCase().includes(n) || v.description.toLowerCase().includes(n),
    );
  }, [eligibleVendors, vendorQuery]);
  const MAX_RESULTS = 50;

  function openCreate() {
    setVendorId("");
    setVendorQuery("");
    setRank(active.length + 1);
    setFee("");
    setDurationDays(PLACEMENT_DURATION_PRESETS[0].days);
    setCreating(true);
  }

  // Drop the dragged placement onto a target row → it takes that row's rank;
  // the store reinserts and renumbers everything contiguously.
  function handleDrop(targetId: string, targetRank: number) {
    if (dragId && dragId !== targetId) {
      runAction(() => store.updatePlacementRank(dragId, targetRank));
    }
    setDragId(null);
    setOverId(null);
  }

  // Keyboard / non-drag reorder — moves a placement one slot up or down.
  function move(placementId: string, currentRank: number, dir: "up" | "down") {
    runAction(() => store.updatePlacementRank(placementId, currentRank + (dir === "up" ? -1 : 1)));
  }

  const newPlacementDisabled = eligibleVendors.length === 0 || slotsFull;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Admin-curated paid slots in the marketplace Sponsored section. Higher-paying sponsors rank
          first.
          <span className="text-xs"> (CTA 16–18)</span>
        </p>
        <div className="flex items-center gap-3">
          <span className={cn("text-xs", slotsFull ? "font-medium text-destructive" : "text-muted-foreground")}>
            {active.length} / {MAX_SPONSORED_SLOTS} slots used
          </span>
          <Button onClick={openCreate} disabled={newPlacementDisabled}>
            <Plus className="size-4" /> New placement
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Ranked lineup */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Ranked lineup
            </p>
            <p className="text-xs text-muted-foreground">
              {active.length} active · drag or use arrows to reorder
            </p>
          </div>

          {active.length === 0 ? (
            <EmptyState
              icon={<Megaphone className="size-8" />}
              title="No active placements"
              description="Create a sponsored placement to feature a vendor in the marketplace."
              action={
                <Button onClick={openCreate} disabled={newPlacementDisabled}>
                  <Plus className="size-4" /> New placement
                </Button>
              }
            />
          ) : (
            <div className="space-y-2.5">
              {active.map((p) => {
                const v = vendorById(p.vendorId);
                const category = v?.fullListing.services[0];
                const dragging = dragId === p.id;
                const over = overId === p.id && dragId !== null && dragId !== p.id;
                const expired = isExpired(p.expiresAt);
                return (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={(e) => {
                      setDragId(p.id);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = "move";
                      if (overId !== p.id) setOverId(p.id);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleDrop(p.id, p.rank);
                    }}
                    onDragEnd={() => {
                      setDragId(null);
                      setOverId(null);
                    }}
                    className={cn(
                      "flex select-none items-center gap-3 rounded-xl border border-border bg-card p-4 transition-shadow",
                      "cursor-grab hover:shadow-sm active:cursor-grabbing",
                      dragging && "opacity-40",
                      over && "ring-2 ring-purple-400 ring-offset-2 ring-offset-background",
                    )}
                  >
                    <GripVertical className="size-4 shrink-0 text-muted-foreground" />
                    <RankBadge rank={p.rank} />
                    <Monogram id={p.vendorId} name={v?.companyName ?? "?"} />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-medium">{vendorName(p.vendorId)}</p>
                        {p.rank === 1 && (
                          <Badge variant="muted" className="gap-1">
                            <Star className="size-3" /> Top sponsor
                          </Badge>
                        )}
                        {category && (
                          <Badge variant="outline" className="hidden sm:inline-flex">
                            {category}
                          </Badge>
                        )}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">{v?.description}</p>
                    </div>

                    <div className="hidden whitespace-nowrap text-right text-xs md:block">
                      <div className="font-medium text-foreground">
                        ${p.monthlyFee.toLocaleString()}/mo
                      </div>
                      <div className={expired ? "font-medium text-destructive" : "text-muted-foreground"}>
                        {expired ? "Expired " : "Expires "}
                        {formatDate(p.expiresAt)}
                      </div>
                    </div>

                    {/* Non-drag reorder (accessibility) */}
                    <div className="flex flex-col">
                      <button
                        type="button"
                        aria-label="Move up"
                        disabled={p.rank === 1}
                        onClick={() => move(p.id, p.rank, "up")}
                        className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ChevronUp className="size-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Move down"
                        disabled={p.rank === active.length}
                        onClick={() => move(p.id, p.rank, "down")}
                        className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ChevronDown className="size-4" />
                      </button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() =>
                        runAction(
                          () => store.removePlacement(p.id),
                          `${vendorName(p.vendorId)} removed; ranks reset.`,
                        )
                      }
                      aria-label="Remove"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Sponsored-section preview — how members see it */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Marketplace · Sponsored
            </p>
            <Badge variant="muted">preview</Badge>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-3">
            {active.length === 0 ? (
              <p className="px-1 py-6 text-center text-sm text-muted-foreground">No sponsored vendors.</p>
            ) : (
              <div className="space-y-2.5">
                {active.map((p) => {
                  const v = vendorById(p.vendorId);
                  const expired = isExpired(p.expiresAt);
                  return (
                    <div
                      key={p.id}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 shadow-sm"
                    >
                      <Monogram id={p.vendorId} name={v?.companyName ?? "?"} className="size-9" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold">{vendorName(p.vendorId)}</p>
                          <span className="shrink-0 rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-medium text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                            Sponsored
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs text-muted-foreground">{v?.description}</p>
                        {expired && (
                          <p className="mt-1 text-[11px] font-medium text-destructive">
                            Campaign expired — renew or remove.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={creating}
        onClose={() => setCreating(false)}
        title="Create sponsored placement"
        description="One active placement per vendor. New placements insert at the chosen rank; others shift down."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreating(false)}>
              Cancel
            </Button>
            <Button
              disabled={!vendorId || !feeValid}
              onClick={() => {
                if (
                  runAction(
                    () => store.createPlacement(vendorId, rank, feeNum, durationDays),
                    "Placement created.",
                  )
                ) {
                  setCreating(false);
                }
              }}
            >
              Create placement
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Vendor</Label>
            {eligibleVendors.length === 0 ? (
              <p className="rounded-md border border-dashed border-border px-3 py-4 text-center text-sm text-muted-foreground">
                No eligible vendors — every active-subscription vendor already has a placement.
              </p>
            ) : (
              <>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    autoFocus
                    value={vendorQuery}
                    onChange={(e) => setVendorQuery(e.target.value)}
                    placeholder={`Search ${eligibleVendors.length} eligible vendors…`}
                    className="pl-8"
                  />
                </div>
                <div className="max-h-56 space-y-1 overflow-y-auto rounded-md border border-border p-1">
                  {vendorMatches.length === 0 ? (
                    <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                      No vendors match “{vendorQuery}”.
                    </p>
                  ) : (
                    vendorMatches.slice(0, MAX_RESULTS).map((v) => {
                      const isSelected = v.id === vendorId;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVendorId(v.id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
                            isSelected
                              ? "bg-purple-50 dark:bg-purple-950/40"
                              : "hover:bg-accent",
                          )}
                        >
                          <Monogram id={v.id} name={v.companyName} className="size-8" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{v.companyName}</p>
                            <p className="truncate text-xs text-muted-foreground">{v.description}</p>
                          </div>
                          {isSelected && <Check className="size-4 shrink-0 text-purple-600 dark:text-purple-400" />}
                        </button>
                      );
                    })
                  )}
                </div>
                {vendorMatches.length > MAX_RESULTS && (
                  <p className="text-xs text-muted-foreground">
                    Showing {MAX_RESULTS} of {vendorMatches.length} — keep typing to narrow.
                  </p>
                )}
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Monthly fee (USD)</Label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  min={1}
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  placeholder="0"
                  className="pl-6"
                />
              </div>
              <p className="text-xs text-muted-foreground">Higher-paying sponsors rank first.</p>
            </div>
            <div className="space-y-1.5">
              <Label>Rank</Label>
              <Input
                type="number"
                min={1}
                value={rank}
                onChange={(e) => setRank(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Suggested next is {active.length + 1}.</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Campaign length</Label>
            <div className="flex flex-wrap gap-2">
              {PLACEMENT_DURATION_PRESETS.map((d) => (
                <button
                  key={d.days}
                  type="button"
                  onClick={() => setDurationDays(d.days)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm transition-colors",
                    durationDays === d.days
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-accent",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
