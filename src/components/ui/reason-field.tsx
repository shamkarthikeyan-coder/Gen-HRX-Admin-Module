import { Label } from "./label";
import { Textarea } from "./textarea";
import { REASON_MAX, REASON_MIN } from "@/lib/errors";
import { cn } from "@/lib/cn";

interface ReasonFieldProps {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

/** Reason textarea with the spec's 10–500 char rule and a live counter. */
export function ReasonField({
  value,
  onChange,
  label = "Reason",
  placeholder = "Explain why you're taking this action (visible in the audit log)…",
  required = true,
}: ReasonFieldProps) {
  const len = value.trim().length;
  const tooShort = len > 0 && len < REASON_MIN;
  const tooLong = len > REASON_MAX;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <span
          className={cn(
            "text-xs tabular-nums",
            tooShort || tooLong ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {len}/{REASON_MAX}
        </span>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={REASON_MAX + 50}
      />
      {tooShort && (
        <p className="text-xs text-destructive">
          Must be at least {REASON_MIN} characters (MODERATION_REASON_TOO_SHORT).
        </p>
      )}
    </div>
  );
}
