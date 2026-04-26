import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "../data/testimonials.data";
import { LandingID } from "@/shared/types/constants";

interface TestimonialCardProps {
  item: Testimonial;
}

const TestimonialCard = ({ item }: TestimonialCardProps) => (
  <div className="bg-brand-dark-card flex flex-col rounded-3xl border border-white/10 p-6 sm:p-8">
    {/* Stars */}
    <div className="mb-4 flex gap-1 sm:mb-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="fill-primary text-primary" />
      ))}
    </div>

    {/* Quote */}
    <blockquote className="mb-6 flex-1 text-base leading-relaxed text-white italic sm:mb-8 sm:text-lg">
      &ldquo;{item.quote}&rdquo;
    </blockquote>

    {/* Earnings stats */}
    <div className="mb-6 flex gap-4 rounded-xl bg-white/5 p-3 sm:p-4">
      <div className="flex-1 text-center">
        <p className="text-primary text-lg font-semibold sm:text-xl">{item.earned}</p>
        <p className="text-xs text-white/60">Total earned</p>
      </div>

      <div className="w-px bg-white/10" />

      <div className="flex-1 text-center">
        <p className="text-lg font-semibold text-white sm:text-xl">{item.dinners}</p>
        <p className="text-xs text-white/60">Dinners</p>
      </div>
    </div>

    {/* Author */}
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:text-sm"
        style={{ background: item.avatarColor }}
      >
        {item.initials}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{item.name}</p>
        <p className="truncate text-xs text-white/60">{item.role}</p>
      </div>
    </div>
  </div>
);

export const SuccessStories = () => (
  <section
    id={LandingID.SUCCESS_STORIES}
    className="bg-brand-dark relative overflow-hidden py-16 sm:py-24 md:py-32"
  >
    {/* Ambient glow */}
    <div
      aria-hidden
      className="bg-primary pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-5 blur-3xl"
    />
    <div
      aria-hidden
      className="bg-primary pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-5 blur-3xl"
    />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
      {/* Header */}
      <div className="mb-12 text-center sm:mb-16">
        <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Success Stories
        </p>

        <h2 className="text-[clamp(1.75rem,5vw,3.25rem)] leading-tight font-medium text-white">
          Real women, <span className="text-primary italic">real earnings</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        {testimonials.map((item) => (
          <TestimonialCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
