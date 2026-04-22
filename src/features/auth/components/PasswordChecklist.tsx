import { cn } from "@/lib/utils";

export const passwordRules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "At most 20 characters", test: (v: string) => v.length <= 20 && v.length > 0 },
  { label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
  { label: "One special character", test: (v: string) => /[^a-zA-Z0-9]/.test(v) },
];

export const PasswordChecklist = ({ value }: { value: string }) => {
  return (
    <ul className="mt-2 space-y-1">
      {passwordRules.map((rule) => {
        const passed = rule.test(value);
        return (
          <li
            key={rule.label}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              passed ? "text-green-500" : "text-muted-foreground"
            )}
          >
            <svg
              className={cn(
                "h-3.5 w-3.5 shrink-0",
                passed ? "text-green-500" : "text-muted-foreground/40"
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {passed ? (
                <>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </>
              ) : (
                <circle cx="12" cy="12" r="10" />
              )}
            </svg>

            <span className={cn(passed && "line-through opacity-60")}>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
};
