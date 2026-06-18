// Account categories from member-app onboarding ("What best describes you?"). The three HR personas
// all render the person-style profile; `vendor` is a company account; `admin` is a platform operator.
import type { UserRole } from "@/data/types";

export const ROLE_LABEL: Record<UserRole, string> = {
  "hr-practitioner": "HR Practitioner",
  "hr-leader": "HR Leader",
  "friends-of-hr": "Friends of HR",
  vendor: "Vendor",
  admin: "Admin",
};

// Person accounts (the HR personas) — everything that isn't a vendor company or platform admin.
// These are moderated like ordinary members and share the person profile shape.
export function isPersonRole(role: UserRole): boolean {
  return role === "hr-practitioner" || role === "hr-leader" || role === "friends-of-hr";
}
