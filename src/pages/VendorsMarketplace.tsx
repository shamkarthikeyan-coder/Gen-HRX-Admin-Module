import { useState } from "react";
import { PageHeader } from "@/components/shared/page";
import { Tabs } from "@/components/ui/tabs";
import { useStore } from "@/store/AppStore";
import { VendorSubscriptionsView } from "./Vendors";
import { PlacementsView } from "./Placements";

/** Area 3 — combines vendor subscriptions (CTA 14–15) and placements (CTA 16–18). */
export function VendorsMarketplacePage() {
  const { vendors } = useStore();
  const [tab, setTab] = useState("subscriptions");

  const inactive = vendors.filter(
    (v) => !v.catalogOnly && v.subscriptionStatus === "inactive",
  ).length;

  return (
    <div>
      <PageHeader
        title="Marketplace"
        description="Manage vendor subscription state and admin-curated sponsored placements in the marketplace directory."
      />
      <div className="mb-5">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: "subscriptions", label: "Subscriptions", count: inactive },
            { value: "placements", label: "Sponsored Placements" },
          ]}
        />
      </div>
      {tab === "subscriptions" ? <VendorSubscriptionsView /> : <PlacementsView />}
    </div>
  );
}
