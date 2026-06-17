import { useState } from "react";
import { Check, ExternalLink, Globe, Plus, Power, PowerOff, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { ReasonField } from "@/components/ui/reason-field";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { SubscriptionBadge } from "@/components/shared/badges";
import { useStore } from "@/store/AppStore";
import { runAction } from "@/lib/runAction";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { SUBSCRIPTION_TERM_DAYS } from "@/data/types";

/** A term is past due if its expiry has elapsed (status stays manual until PAYMENT-SYSTEM enforces it). */
function isExpired(iso: string | null): boolean {
  return !!iso && new Date(iso).getTime() < Date.now();
}

export function VendorSubscriptionsView() {
  const store = useStore();
  const { vendors, placements } = store;
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [deactivateId, setDeactivateId] = useState<string | null>(null);
  const [deactReason, setDeactReason] = useState("");
  const [adding, setAdding] = useState(false);
  const [pickId, setPickId] = useState("");
  const [pickQuery, setPickQuery] = useState("");
  const [activateNow, setActivateNow] = useState(true);

  // Vendors already in the subscription-management list (the table) vs. directory vendors
  // that can still be added (the picker).
  const listed = vendors.filter((v) => !v.catalogOnly);
  const catalog = vendors.filter((v) => v.catalogOnly);
  const query = pickQuery.trim().toLowerCase();
  const catalogMatches = query
    ? catalog.filter(
        (v) =>
          v.companyName.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query),
      )
    : catalog;

  const preview = previewId ? vendors.find((v) => v.id === previewId) ?? null : null;
  const deactivating = deactivateId ? vendors.find((v) => v.id === deactivateId) ?? null : null;
  const deactivatingPlacement = deactivating
    ? placements.find((p) => p.vendorId === deactivating.id && p.active) ?? null
    : null;

  function openDeactivate(id: string) {
    setDeactivateId(id);
    setDeactReason("");
  }
  function closeDeactivate() {
    setDeactivateId(null);
    setDeactReason("");
  }
  function openAdd() {
    setPickId("");
    setPickQuery("");
    setActivateNow(true);
    setAdding(true);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Activating a subscription unlocks the full service listing for a {SUBSCRIPTION_TERM_DAYS}-day
          term. Deactivating degrades gracefully — the basic profile stays visible.{" "}
          <span className="text-xs"></span>
        </p>
        <Button onClick={openAdd} disabled={catalog.length === 0}>
          <Plus className="size-4" /> Add vendor
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <THead>
            <TR>
              <TH>Company</TH>
              <TH>Subscription</TH>
              <TH>Expires</TH>
              <TH className="text-right">Action</TH>
            </TR>
          </THead>
          <TBody>
            {listed.map((v) => {
              const expired = v.subscriptionStatus === "active" && isExpired(v.subscriptionExpiresAt);
              return (
                <TR key={v.id} className="cursor-pointer" onClick={() => setPreviewId(v.id)}>
                  <TD>
                    <span className="font-medium">{v.companyName}</span>
                    <a
                      href={v.website}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1.5 inline-flex text-muted-foreground hover:text-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  </TD>
                  <TD>
                    <SubscriptionBadge status={v.subscriptionStatus} />
                  </TD>
                  <TD>
                    {v.subscriptionStatus === "active" && v.subscriptionExpiresAt ? (
                      <span
                        className={cn(
                          "whitespace-nowrap text-sm",
                          expired ? "font-medium text-destructive" : "text-muted-foreground",
                        )}
                      >
                        {expired && "Expired · "}
                        {formatDate(v.subscriptionExpiresAt)}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TD>
                  <TD className="text-right">
                    <div className="flex justify-end gap-2">
                      {v.subscriptionStatus === "inactive" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            runAction(
                              () => store.activateVendor(v.id),
                              `${v.companyName} subscription activated · expires in ${SUBSCRIPTION_TERM_DAYS} days.`,
                            );
                          }}
                        >
                          <Power className="size-4" /> Activate
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeactivate(v.id);
                          }}
                        >
                          <PowerOff className="size-4" /> Deactivate
                        </Button>
                      )}
                    </div>
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </div>

      {/* Marketplace preview — how this vendor appears at the current subscription state. */}
      <Dialog
        open={!!preview}
        onClose={() => setPreviewId(null)}
        title={preview ? `${preview.companyName} — marketplace preview` : ""}
        description="How this vendor appears in the marketplace at the current subscription state."
        className="max-w-xl"
      >
        {preview && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <SubscriptionBadge status={preview.subscriptionStatus} />
              {preview.subscriptionStatus === "active" && preview.subscriptionExpiresAt && (
                <span
                  className={cn(
                    isExpired(preview.subscriptionExpiresAt)
                      ? "font-medium text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {isExpired(preview.subscriptionExpiresAt) ? "Term expired " : "Term ends "}
                  {formatDate(preview.subscriptionExpiresAt)}
                </span>
              )}
            </div>

            {/* Basic profile — always visible */}
            <div className="rounded-lg border border-border p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Basic profile (always visible)
              </p>
              <p className="font-medium">{preview.companyName}</p>
              <p className="text-sm text-muted-foreground">{preview.description}</p>
              <a
                href={preview.website}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Globe className="size-3.5" /> {preview.website}
              </a>
            </div>

            {/* Full listing — suppressed when inactive */}
            <div className="rounded-lg border border-border p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Full service listing
              </p>
              {preview.subscriptionStatus === "active" ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Services: </span>
                    {preview.fullListing.services.join(", ")}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pricing: </span>
                    {preview.fullListing.pricing}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Contact: </span>
                    {preview.fullListing.contactEmail}
                  </div>
                </div>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  Hidden — subscription inactive. Reactivate to restore full listing visibility.
                </p>
              )}
            </div>
          </div>
        )}
      </Dialog>

      {/* Deactivation — consequential, so it confirms, captures an optional reason, and warns
          when it will also pull the vendor from the Sponsored section. */}
      <Dialog
        open={!!deactivating}
        onClose={closeDeactivate}
        title={deactivating ? `Deactivate ${deactivating.companyName}?` : ""}
        description="The full service listing will be hidden. The basic profile (company name, description, website) stays visible."
        footer={
          deactivating ? (
            <>
              <Button variant="ghost" onClick={closeDeactivate}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (
                    runAction(
                      () => store.deactivateVendor(deactivating.id, deactReason.trim() || undefined),
                      `${deactivating.companyName} subscription deactivated.`,
                    )
                  ) {
                    closeDeactivate();
                  }
                }}
              >
                <PowerOff className="size-4" /> Deactivate subscription
              </Button>
            </>
          ) : null
        }
      >
        {deactivating && (
          <div className="space-y-4">
            {deactivatingPlacement && (
              <div className="rounded-lg border border-amber-300/60 bg-amber-50 p-3 text-sm dark:border-amber-800/60 dark:bg-amber-950/40">
                <p className="font-medium">This also removes a sponsored placement</p>
                <p className="text-muted-foreground">
                  {deactivating.companyName} is currently sponsored at rank{" "}
                  {deactivatingPlacement.rank}. Deactivating removes them from the Sponsored section
                  and recompacts the remaining ranks.
                </p>
              </div>
            )}
            <ReasonField
              value={deactReason}
              onChange={setDeactReason}
              label="Reason (optional)"
              required={false}
              placeholder="Optional note — included in the audit log and the vendor's notification…"
            />
          </div>
        )}
      </Dialog>

      {/* Add vendor — pick an existing directory vendor and add it to the subscription list. */}
      <Dialog
        open={adding}
        onClose={() => setAdding(false)}
        title="Add vendor to subscriptions"
        description="Select a vendor from the directory to add to the subscription list."
        className="max-w-xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button
              disabled={!pickId}
              onClick={() => {
                const v = vendors.find((x) => x.id === pickId);
                if (
                  runAction(
                    () => store.addVendorToList(pickId, activateNow),
                    `${v?.companyName ?? "Vendor"} added to subscriptions${activateNow ? " · active" : ""}.`,
                  )
                ) {
                  setAdding(false);
                }
              }}
            >
              Add to subscriptions
            </Button>
          </>
        }
      >
        {catalog.length === 0 ? (
          <EmptyState
            icon={<Plus className="size-8" />}
            title="No vendors to add"
            description="Every directory vendor is already in the subscription list."
          />
        ) : (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  autoFocus
                  value={pickQuery}
                  onChange={(e) => setPickQuery(e.target.value)}
                  placeholder={`Search ${catalog.length} directory vendors…`}
                  className="pl-8"
                />
              </div>
              <div className="max-h-64 space-y-1 overflow-y-auto rounded-md border border-border p-1">
                {catalogMatches.length === 0 ? (
                  <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                    No vendors match “{pickQuery}”.
                  </p>
                ) : (
                  catalogMatches.map((v) => {
                    const isSelected = v.id === pickId;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setPickId(v.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
                          isSelected ? "bg-purple-50 dark:bg-purple-950/40" : "hover:bg-accent",
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{v.companyName}</p>
                          <p className="truncate text-xs text-muted-foreground">{v.description}</p>
                        </div>
                        {isSelected && (
                          <Check className="size-4 shrink-0 text-purple-600 dark:text-purple-400" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-2 rounded-md border border-border px-3 py-2.5 text-sm">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={activateNow}
                onChange={(e) => setActivateNow(e.target.checked)}
              />
              <span>
                Activate subscription now
                <span className="text-muted-foreground">
                  {" "}
                  — starts a {SUBSCRIPTION_TERM_DAYS}-day term and makes the full listing visible.
                  Leave unchecked to add as inactive.
                </span>
              </span>
            </label>
          </div>
        )}
      </Dialog>
    </div>
  );
}
