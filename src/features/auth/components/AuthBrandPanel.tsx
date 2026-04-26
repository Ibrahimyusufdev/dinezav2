interface AuthBrandPanelProps {
  heading: React.ReactNode;
  subheading: string;
}

export const AuthBrandPanel = ({ heading, subheading }: AuthBrandPanelProps) => (
  <div className="bg-brand-dark relative hidden flex-col justify-between overflow-hidden p-8 lg:flex lg:p-10">
    {/* Dot texture */}
    <div
      aria-hidden="true"
      className="bg-primary pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_1px_at_center,black_1px,transparent_1px)] [mask-size:24px_24px] opacity-[0.035]"
    />

    {/* Orange glow */}
    <div
      aria-hidden="true"
      className="bg-primary pointer-events-none absolute -top-16 -right-16 size-72 rounded-full opacity-20 blur-3xl"
    />

    {/* Main copy */}
    <div className="relative z-10 space-y-4">
      <p className="text-primary text-xs font-semibold tracking-widest uppercase">
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
    <div className="relative z-10 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <p className="text-sm leading-relaxed text-white/65 italic">
        &ldquo;Dineza made managing our reservations effortless. Revenue up 40% in just 3
        months.&rdquo;
      </p>
      <p className="mt-3 text-xs font-semibold text-white/40">— Ibrahim Y., Restaurant Owner</p>
    </div>
  </div>
);
