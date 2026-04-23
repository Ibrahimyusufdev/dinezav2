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
  <div className="relative">
    <div
      className={`relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border-2 ${
        isFirst
          ? "bg-primary border-primary shadow-primary/30 text-white shadow-lg"
          : "bg-background border-border text-primary"
      }`}
    >
      <span className="text-2xl font-semibold">{step.n}</span>
    </div>

    <h3 className="text-foreground mb-2 text-lg font-semibold">{step.title}</h3>

    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
  </div>
);

export const HowItWorks = () => (
  <section id="how-it-works" className="bg-muted py-16 sm:py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-10">
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
        {/* Connecting line */}
        <div className="from-primary to-primary/20 absolute top-10 right-4 left-4 hidden h-px bg-linear-to-r sm:right-10 sm:left-10 md:block" />

        <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 md:grid-cols-5">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} isFirst={i === 0} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center sm:mt-16">
        <Link to={ROUTES.REGISTER}>
          <Button className="bg-primary gap-1.5" size="lg">
            Join Dineza - It's Free
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
