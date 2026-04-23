import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "../data/testimonials.data";
import { LandingID } from "@/shared/types/constants";
import { AuthPageShell } from "@/features/auth";

interface TestimonialCardProps {
  item: Testimonial;
}

const TestimonialCard = ({ item }: TestimonialCardProps) => (
  <div className="bg-brand-dark-card rounded-3xl border border-white/10 p-5 sm:p-8">
    {/* Stars */}
    <div className="mb-4 flex gap-1 sm:mb-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-primary fill-primary" />
      ))}
    </div>

    {/* Quote */}
    <blockquote className="mb-6 text-base leading-relaxed break-words text-white italic sm:mb-8 sm:text-xl">
      "{item.quote}"
    </blockquote>

    {/* Earnings stats */}
    <div className="mb-6 flex gap-4 rounded-xl bg-white/5 p-3 sm:p-4">
      <div className="flex-1 text-center">
        <p className="text-primary text-lg font-semibold sm:text-xl">{item.earned}</p>
        <p className="line-clamp-2 text-xs text-white/60">Total earned</p>
      </div>

      <div className="w-px bg-white/10" />

      <div className="flex-1 text-center">
        <p className="text-lg font-semibold text-white sm:text-xl">{item.dinners}</p>
        <p className="line-clamp-2 text-xs text-white/60">Dinners</p>
      </div>
    </div>

    {/* Author */}
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm"
        style={{ background: item.avatarColor }}
      >
        {item.initials}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{item.name}</p>
        <p className="truncate text-xs text-white/60">{item.role}</p>
      </div>
    </div>
  </div>
);

export const SuccussStories = () => (
  <AuthPageShell>
    <section id={LandingID.SUCCESS_STORIES} className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-10">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="text-primary mb-2 text-xs font-semibold tracking-[0.2em] uppercase sm:mb-3">
            Success Stories
          </p>

          <h2 className="text-[clamp(1.75rem,5vw,3.25rem)] leading-tight font-medium">
            Real women, <span className="text-primary italic">real earnings</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  </AuthPageShell>
);
