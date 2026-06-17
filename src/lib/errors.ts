// Error codes lifted from the Functional Spec / TRD error tables. There is no
// backend in this prototype, so these are surfaced as in-app validation feedback
// (toast + inline) rather than HTTP responses — but the codes/statuses are kept
// for fidelity with the spec.

export type AppErrorCode =
  | "MODERATION_REASON_TOO_SHORT"
  | "FLAG_NOT_FOUND"
  | "CONTENT_NOT_FOUND"
  | "USER_NOT_FOUND"
  | "USER_ALREADY_SUSPENDED"
  | "SUSPENSION_DURATION_INVALID"
  | "BAN_CONFIRMATION_INVALID"
  | "USER_ALREADY_BANNED"
  | "VENDOR_SUBSCRIPTION_NO_CHANGE"
  | "VENDOR_NOT_FOUND"
  | "VENDOR_ALREADY_SPONSORED"
  | "VENDOR_NOT_ACTIVE"
  | "SPONSORED_SLOTS_FULL"
  | "PLACEMENT_NOT_FOUND"
  | "INVALID_STATE_TRANSITION"
  | "INVALID_INPUT"
  | "WRITE_FAILED"
  | "STORE_UNREACHABLE";

export const ERROR_MESSAGE: Record<AppErrorCode, string> = {
  MODERATION_REASON_TOO_SHORT: "Reason must be between 10 and 500 characters.",
  FLAG_NOT_FOUND: "That flag no longer matches a record.",
  CONTENT_NOT_FOUND: "Content not found (it may already have been deleted).",
  USER_NOT_FOUND: "User not found.",
  USER_ALREADY_SUSPENDED: "This user already has an active suspension.",
  SUSPENSION_DURATION_INVALID: "Suspension duration is not an allowed preset.",
  BAN_CONFIRMATION_INVALID: 'Confirmation must be the exact token "CONFIRM".',
  USER_ALREADY_BANNED: "This user is already banned.",
  VENDOR_SUBSCRIPTION_NO_CHANGE: "Vendor subscription is already in that state.",
  VENDOR_NOT_FOUND: "Vendor not found.",
  VENDOR_ALREADY_SPONSORED: "This vendor already has an active placement.",
  VENDOR_NOT_ACTIVE: "Vendor subscription must be active before it can be sponsored.",
  SPONSORED_SLOTS_FULL: "All sponsored slots are in use — remove one before adding another.",
  PLACEMENT_NOT_FOUND: "Placement not found.",
  INVALID_STATE_TRANSITION: "That state transition is not allowed.",
  INVALID_INPUT: "Invalid input.",
  WRITE_FAILED: "The write failed; nothing was changed. Please retry.",
  STORE_UNREACHABLE: "The data store is unreachable.",
};

export const ERROR_STATUS: Record<AppErrorCode, number> = {
  MODERATION_REASON_TOO_SHORT: 400,
  FLAG_NOT_FOUND: 404,
  CONTENT_NOT_FOUND: 404,
  USER_NOT_FOUND: 404,
  USER_ALREADY_SUSPENDED: 409,
  SUSPENSION_DURATION_INVALID: 400,
  BAN_CONFIRMATION_INVALID: 400,
  USER_ALREADY_BANNED: 409,
  VENDOR_SUBSCRIPTION_NO_CHANGE: 409,
  VENDOR_NOT_FOUND: 404,
  VENDOR_ALREADY_SPONSORED: 409,
  VENDOR_NOT_ACTIVE: 409,
  SPONSORED_SLOTS_FULL: 409,
  PLACEMENT_NOT_FOUND: 404,
  INVALID_STATE_TRANSITION: 400,
  INVALID_INPUT: 400,
  WRITE_FAILED: 500,
  STORE_UNREACHABLE: 503,
};

/** Thrown by store actions on a guard failure; caught at the call site for UX. */
export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status: number;
  constructor(code: AppErrorCode, message?: string) {
    super(message ?? ERROR_MESSAGE[code]);
    this.name = "AppError";
    this.code = code;
    this.status = ERROR_STATUS[code];
  }
}

export function isAppError(e: unknown): e is AppError {
  return e instanceof AppError;
}

export const REASON_MIN = 10;
export const REASON_MAX = 500;
