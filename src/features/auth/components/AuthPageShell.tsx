import { cn } from "@/lib/utils";

interface AuthPageShellProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthPageShell = ({ children, className }: AuthPageShellProps) => (
  <div
    className={cn(
      "relative flex min-h-[calc(100vh-2rem)] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-[var(--brand-gray-50)] px-4 py-20 md:min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)]",
      className
    )}
  >
    {/* Dot texture */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
    {/* Glow, top right */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-10 blur-3xl"
      style={{ background: "var(--brand-secondary-orange)" }}
    />
    {/* Glow, bottom left */}
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-[0.06] blur-3xl"
      style={{ background: "var(--brand-secondary-orange)" }}
    />

    <div className="relative z-10 w-full">{children}</div>
  </div>
);
