import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "../data/testimonials.data";
import { LandingID } from "@/shared/types/constants";
import { AuthPageShell } from "@/features/auth";

interface TestimonialCardProps {
  item: Testimonial;
}

const TestimonialCard = ({ item }: TestimonialCardProps) => (
  <div className="bg-brand-dark-card rounded-3xl border border-white/10 p-8">
    {/* Stars */}
    <div className="mb-6 flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-primary fill-primary" />
      ))}
    </div>

    {/* Quote */}
    <blockquote className="mb-8 text-xl leading-relaxed text-white italic">
      "{item.quote}"
    </blockquote>

    {/* Earnings stats */}
    <div className="mb-6 flex gap-4 rounded-xl bg-white/5 p-4">
      <div className="flex-1 text-center">
        <p className="text-primary text-xl font-semibold">{item.earned}</p>
        <p className="text-xs text-white/60">Total earned</p>
      </div>

      <div className="w-px bg-white/10" />

      <div className="flex-1 text-center">
        <p className="text-xl font-semibold text-white">{item.dinners}</p>
        <p className="text-xs text-white/60">Dinners</p>
      </div>
    </div>

    {/* Author */}
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ background: item.avatarColor }}
      >
        {item.initials}
      </div>

      <div>
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="text-xs text-white/60">{item.role}</p>
      </div>
    </div>
  </div>
);

export const SuccussStories = () => (
  <AuthPageShell>
    <section id={LandingID.SUCCESS_STORIES} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
            Success Stories
          </p>

          <h2 className="text-[clamp(2.25rem,5vw,3.25rem)] leading-tight font-medium">
            Real women, <span className="text-primary italic">real earnings</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  </AuthPageShell>
);
