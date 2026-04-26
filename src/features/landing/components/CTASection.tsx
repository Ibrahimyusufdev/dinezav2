import { Link } from "react-router-dom";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { ROUTES } from "@/shared/types/constants";

export const CTASection = () => (
  <section className="bg-primary relative overflow-hidden py-20 sm:py-24">
    {/* Decorative circles */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white opacity-5"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white opacity-5"
    />

    <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
      <h2 className="text-[clamp(1.75rem,5vw,3rem)] leading-tight font-medium tracking-tight text-white">
        Ready to turn dining into earnings?
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-base text-white/75 sm:mt-5 sm:text-lg">
        Join thousands of women who dine smart and get 25% cash back on every visit.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
        <Link
          to={ROUTES.REGISTER}
          className="text-primary flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90 sm:w-auto sm:text-base"
        >
          Start as a Diner <ArrowRight size={16} />
        </Link>

        <Link
          to={ROUTES.REGISTER}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/10 sm:w-auto sm:text-base"
        >
          <UtensilsCrossed size={16} />
          Partner your Restaurant
        </Link>
      </div>
    </div>
  </section>
);

export default CTASection;
