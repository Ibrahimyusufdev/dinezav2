import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/shared/types/constants";
import { steps, type Step } from "../data/steps.data";
import { Button } from "@/components/ui/button";

interface StepCardProps {
  step: Step;
  isFirst: boolean;
}

const StepCard = ({ step, isFirst }: StepCardProps) => (
  <div className="flex gap-4 md:flex-col md:gap-0">
    {/* Mobile: vertical connector line on the left */}
    <div className="flex flex-col items-center md:hidden">
      <div
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 ${
          isFirst
            ? "bg-primary border-primary shadow-primary/30 text-white shadow-md"
            : "bg-background border-border text-primary"
        }`}
      >
        <span className="text-sm font-semibold">{step.n}</span>
      </div>
      {/* Vertical connector — hidden for last item */}
      <div className="bg-border mt-1 h-full w-px flex-1 last:hidden" />
    </div>

    {/* Desktop: step number above */}
    <div
      className={`relative z-10 mb-5 hidden h-16 w-16 items-center justify-center rounded-2xl border-2 md:flex ${
        isFirst
          ? "bg-primary border-primary shadow-primary/30 text-white shadow-md"
          : "bg-background border-border text-primary"
      }`}
    >
      <span className="text-xl font-semibold">{step.n}</span>
    </div>

    <div className="pb-8 md:pb-0">
      <h3 className="text-foreground mb-2 text-base font-semibold md:text-lg">{step.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
    </div>
  </div>
);

export const HowItWorks = () => (
  <section id={ROUTES.HOME} className="bg-muted py-16 sm:py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          The Process
        </p>

        <h2 className="text-foreground text-[clamp(1.75rem,5vw,3.25rem)] leading-tight font-medium">
          How it works
        </h2>
      </div>

      <div className="relative">
        {/* Desktop connecting line */}
        <div className="from-primary to-primary/20 absolute top-8 right-10 left-10 hidden h-px bg-linear-to-r md:block" />

        {/* Desktop grid — 5 equal columns */}
        <div className="hidden md:grid md:grid-cols-5 md:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} isFirst={i === 0} />
          ))}
        </div>

        {/* Mobile list — clean vertical stepper */}
        <div className="flex flex-col md:hidden">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} isFirst={i === 0} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center sm:mt-16">
        <Link to={ROUTES.REGISTER}>
          <Button className="bg-primary gap-1.5" size="lg">
            Join Dineza — It&apos;s Free
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
