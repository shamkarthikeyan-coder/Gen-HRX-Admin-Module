import type { Flag } from "@/data/types";

/** Community report volume. Real `reportCount` wins; otherwise a stable, illustrative number
 *  derived from the flag id (AI flags are a single detection). */
export function reportVolume(flag: Flag): number {
  if (flag.reportCount != null) return flag.reportCount;
  if (flag.source === "ai") return 1;
  let h = 0;
  for (const ch of flag.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return 2 + (h % 38);
}
