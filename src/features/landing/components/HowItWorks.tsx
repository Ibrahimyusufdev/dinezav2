import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/shared/types/constants";
import { C, FONTS } from "./constants/tokens";
import { steps, type Step } from "../data/steps.data";

interface StepCardProps {
  step: Step;
  isFirst: boolean;
}

const StepCard = ({ step, isFirst }: StepCardProps) => (
  <div className="relative">
    <div
      className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl"
      style={{
        background: isFirst ? C.primary : C.white,
        border: `2px solid ${isFirst ? C.primary : C.stroke}`,
        boxShadow: isFirst ? `0 8px 24px ${C.primary}30` : "none",
      }}
    >
      <span
        style={{
          fontFamily: FONTS.display,
          fontSize: "28px",
          fontWeight: 600,
          color: isFirst ? C.white : C.primary,
        }}
      >
        {step.n}
      </span>
    </div>
    <h3
      className="mb-2"
      style={{ fontFamily: FONTS.display, color: C.text, fontSize: "20px", fontWeight: 600 }}
    >
      {step.title}
    </h3>
    <p style={{ fontFamily: FONTS.body, color: C.textMuted, fontSize: "14px", lineHeight: 1.6 }}>
      {step.desc}
    </p>
  </div>
);

export const HowItWorks = () => (
  <section id="how-it-works" className="py-24 md:py-32" style={{ background: C.primaryLight }}>
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="mb-16">
        <p
          className="mb-3"
          style={{
            color: C.primary,
            fontSize: "13px",
            fontFamily: FONTS.body,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          The Process
        </p>
        <h2
          style={{
            fontFamily: FONTS.display,
            color: C.text,
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 500,
            lineHeight: 1.1,
          }}
        >
          How it works
        </h2>
      </div>

      <div className="relative">
        {/* Connecting line — desktop only */}
        <div
          className="absolute top-10 right-10 left-10 hidden h-px md:block"
          style={{ background: `linear-gradient(90deg, ${C.primary}, ${C.primary}20)` }}
        />

        <div className="relative grid gap-8 md:grid-cols-5">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} isFirst={i === 0} />
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link
          to={ROUTES.REGISTER}
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium text-white transition-all hover:opacity-90"
          style={{
            background: C.primary,
            fontFamily: FONTS.body,
            fontSize: "15px",
            boxShadow: `0 12px 32px ${C.primary}40`,
          }}
        >
          Join Dineza — It's Free <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);
