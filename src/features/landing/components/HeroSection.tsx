import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  DollarSign,
  UtensilsCrossed,
  TrendingUp,
  Heart,
  BadgeCheck,
  Star,
} from "lucide-react";
import { ROUTES } from "@/shared/types/constants";

const AVATAR_COLORS = ["#E8A87C", "#C27BA0", "#8E7CC3", "#6FA8DC"];
const AVATAR_INITIALS = ["J", "S", "A", "M"];

const HeroStatsCard = () => (
  <div className="bg-brand-dark-card relative ml-auto max-w-96 rounded-3xl border border-white/10 p-8">
    <div className="mb-6 flex items-center gap-3">
      <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-2xl">
        <DollarSign size={24} className="text-primary" />
      </div>
      <div>
        <p className="text-sm text-white/60">This month</p>
        <p className="text-2xl font-semibold text-white">$40 earned</p>
      </div>
    </div>

    <div className="mb-6 h-px w-full bg-white/10" />

    {[
      { label: "Total Reservations", value: "12", Icon: UtensilsCrossed },
      { label: "Cash Back Rate", value: "25%", Icon: TrendingUp },
      { label: "Restaurants Visited", value: "8", Icon: Heart },
    ].map(({ label, value, Icon }) => (
      <div key={label} className="mb-4 flex items-center justify-between last:mb-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
            <Icon size={14} className="text-white/50" />
          </div>
          <span className="text-sm text-white/60">{label}</span>
        </div>
        <span className="text-sm font-semibold text-white">{value}</span>
      </div>
    ))}
    {/* Floating badge */}
    <div className="bg-primary shadow-primary/30 absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-lg">
      <BadgeCheck size={18} className="text-white" />
      <div>
        <p className="text-sm font-semibold text-white">Verified Payouts</p>
        <p className="text-xs text-white/70">Every 7 days</p>
      </div>
    </div>
  </div>
);

export const HeroSection = () => (
  <section className="bg-brand-dark relative flex min-h-screen items-center overflow-hidden pt-16">
    {/* Ambient glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,var(--color-primary),transparent_50%),radial-gradient(circle_at_80%_20%,#FF9A4D,transparent_40%)] opacity-5" />

    {/* Subtle grid */}
    <div className="absolute inset-0 bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-size-[60px_60px] opacity-[0.03]" />

    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-10 md:py-0">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Left */}
        <div>
          <div className="bg-primary/10 border-primary/30 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <Sparkles size={14} className="text-primary" />
            <span className="text-primary text-xs font-medium">Now live in your city</span>
          </div>

          <h1 className="font-display text-[clamp(48px,7vw,80px)] leading-[1.05] font-medium tracking-tight text-white">
            Dine, <span className="text-primary italic">Delight</span>,<br />
            and Earn Cash Back
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
            Turn every date night into an opportunity to earn. Get 25% cash back on your restaurant
            visits - because your time deserves to be rewarded.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to={ROUTES.REGISTER}
              className="bg-primary flex items-center justify-center gap-2 rounded-full px-7 py-4 font-medium text-white transition hover:opacity-90"
            >
              Start Earning Now <ArrowRight size={16} />
            </Link>

            <Link
              to={ROUTES.REGISTER}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-white transition hover:border-white/40"
            >
              Partner with Us
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-2">
              {AVATAR_COLORS.map((bg, i) => (
                <div
                  key={i}
                  className={`border-brand-dark flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold text-white`}
                  style={{ backgroundColor: bg }}
                >
                  {AVATAR_INITIALS[i]}
                </div>
              ))}
            </div>

            <div>
              <div className="mb-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="text-primary fill-primary" />
                ))}
              </div>

              <p className="text-sm text-white/60">
                Loved by <span className="font-semibold text-white">100+</span> women
              </p>
            </div>
          </div>
        </div>

        {/* Right - stats card */}
        <div className="hidden md:block">
          <HeroStatsCard />
        </div>
      </div>
    </div>
  </section>
);
