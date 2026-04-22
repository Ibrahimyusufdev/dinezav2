interface AuthBrandPanelProps {
  heading: React.ReactNode;
  subheading: string;
}

export const AuthBrandPanel = ({ heading, subheading }: AuthBrandPanelProps) => (
  <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0D0D0B] p-8 lg:flex lg:p-10">
    {/* Dot texture */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--brand-secondary-orange) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />

    {/* Orange glow */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-16 -right-16 size-72 rounded-full bg-[var(--brand-secondary-orange)] opacity-20 blur-3xl"
    />

    {/* Main copy */}
    <div className="relative z-10 space-y-4">
      <p className="text-xs font-semibold tracking-widest text-[var(--brand-secondary-orange)] uppercase">
        The dining platform
      </p>
      <h2 className="text-4xl leading-tight font-bold tracking-tight text-white">{heading}</h2>
      <p className="text-sm leading-relaxed text-white/50">{subheading}</p>

      {/* Stats */}
      <div className="flex items-center gap-6 pt-4">
        <div className="text-center">
          <p className="text-xl font-bold text-white">2k+</p>
          <p className="mt-1 text-xs text-white/40">Restaurants</p>
        </div>
        <div className="h-8 w-px bg-white/10" />

        <div className="text-center">
          <p className="text-xl font-bold text-white">50k+</p>
          <p className="mt-1 text-xs text-white/40">Reservations</p>
        </div>
        <div className="h-8 w-px bg-white/10" />

        <div className="text-center">
          <p className="text-xl font-bold text-white">4.9★</p>
          <p className="mt-1 text-xs text-white/40">Rating</p>
        </div>
      </div>
    </div>

    {/* Testimonial */}
    <div className="relative z-10 rounded-xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm">
      <p className="text-sm leading-relaxed text-white/65 italic">
        "Dineza made managing our reservations effortless. Revenue up 40% in just 3 months."
      </p>
      <p className="mt-3 text-xs font-semibold text-white/35">— Ibrahim Y., Restaurant Owner</p>
    </div>
  </div>
);
