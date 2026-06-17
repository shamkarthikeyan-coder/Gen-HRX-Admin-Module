import { toast } from "sonner";
import { isAppError } from "./errors";

/**
 * Runs a store mutation, surfacing the spec's error codes as toasts. Returns
 * true on success (so callers can close dialogs only when the action committed).
 */
export function runAction(fn: () => void, successMsg?: string): boolean {
  try {
    fn();
    if (successMsg) toast.success(successMsg);
    return true;
  } catch (e) {
    if (isAppError(e)) {
      toast.error(`${e.status} · ${e.code}`, { description: e.message });
    } else {
      toast.error("Unexpected error", { description: String(e) });
    }
    return false;
  }
}
