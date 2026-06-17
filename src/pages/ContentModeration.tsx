import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/shared/page";
import { Tabs } from "@/components/ui/tabs";
import { useStore } from "@/store/AppStore";
import { ModerationQueueView } from "./ModerationQueue";
import { DecisionRoomsView } from "./DecisionRooms";
import { AppealsView } from "./Appeals";

/** Area 1 — combines the general queue (CTA 1–4), Decision Rooms (CTA 6–8), and appeals review.
 *  Active tab lives in the URL (?tab=rooms / ?tab=appeals) so returning from review restores it. */
export function ContentModerationPage() {
  const { flags } = useStore();
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab");
  const tab = raw === "rooms" || raw === "appeals" ? raw : "queue";
  const setTab = (t: string) => setParams(t === "queue" ? {} : { tab: t }, { replace: true });

  const generalOpen = flags.filter((f) => f.surface === "general" && f.status !== "resolved").length;
  const drOpen = flags.filter((f) => f.surface === "decision-room" && f.status !== "resolved").length;
  const appealsOpen = flags.filter((f) => f.appealStatus === "pending").length;

  return (
    <div>
      <PageHeader
        title="Content Moderation"
        description="Review flagged content from the general moderation queue and AI-escalated Decision Room flags."
      />
      <div className="mb-5">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: "queue", label: "General Queue", count: generalOpen },
            { value: "rooms", label: "Decision Rooms", count: drOpen },
            { value: "appeals", label: "Appeals", count: appealsOpen },
          ]}
        />
      </div>
      {tab === "queue" ? (
        <ModerationQueueView />
      ) : tab === "rooms" ? (
        <DecisionRoomsView />
      ) : (
        <AppealsView />
      )}
    </div>
  );
}
