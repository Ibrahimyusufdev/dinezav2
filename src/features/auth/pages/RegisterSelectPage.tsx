import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";
import { ArrowRight, UtensilsCrossed, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthPageShell } from "../components/AuthPageShell";

// Contents for cards
const roles = [
  {
    id: "diner",
    Icon: UtensilsCrossed,
    eyebrow: "For food lovers",
    title: "I'm a Diner",
    description:
      "Discover curated restaurants, make reservations, and earn rewards with every visit.",
    tags: ["Reservations", "Rewards", "Discover"],
    route: ROUTES.ONBOARD_DINER,
  },
  {
    id: "restaurant",
    Icon: Store,
    eyebrow: "For businesses",
    title: "I'm a Restaurant",
    description:
      "List your restaurant, manage reservations, and grow your revenue with real-time analytics on Dineza.",
    tags: ["Manage Tables", "Analytics", "Payouts"],
    route: ROUTES.ONBOARD_RESTAURANT,
  },
] as const;

export const RegisterSelectPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AuthPageShell>
        <div className="mx-auto w-full max-w-4xl">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5900]/20 bg-[#FF5900]/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FF5900] uppercase">
              Step 1
            </p>
            <h1 className="text-[2rem] leading-tight font-bold tracking-tight text-gray-950 sm:text-[2.5rem]">
              How will you use <span className="text-[#FF5900]">Dineza?</span>
            </h1>
            ``
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
              Choose your role to personalise your experience.
              <br className="hidden sm:block" />
              This cannot be changed later.
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => navigate(role.route)}
                className={cn(
                  "group relative flex cursor-pointer flex-col items-start overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-7 text-left shadow-sm transition-all duration-300",
                  "hover:-translate-y-0.5 hover:border-[#FF5900]/30 hover:shadow-[0_8px_32px_rgba(255,89,0,0.10)]",
                  "focus-visible:ring-2 focus-visible:ring-[#FF5900]/50 focus-visible:outline-none"
                )}
              >
                {/* Top accent bar, slides in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[#FF5900] transition-transform duration-300 group-hover:scale-x-100"
                />

                {/* Icon */}
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5900]/8 ring-1 ring-[#FF5900]/15 transition-colors duration-300 group-hover:bg-[#FF5900]/12">
                  <role.Icon size={20} className="text-[#FF5900]" strokeWidth={1.75} />
                </div>

                {/* Eyebrow */}
                <p className="mb-1.5 text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                  {role.eyebrow}
                </p>

                {/* Title */}
                <h2 className="mb-2.5 text-[1.15rem] font-bold tracking-tight text-gray-950">
                  {role.title}
                </h2>

                {/* Description */}
                <p className="mb-6 text-[13.5px] leading-relaxed text-gray-500">
                  {role.description}
                </p>

                {/* Tags */}
                <div className="mb-7 flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="mt-auto flex w-full items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#FF5900]">Get started</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5900]/8 transition-all duration-300 group-hover:bg-[#FF5900] group-hover:text-white">
                    <ArrowRight
                      size={14}
                      className="text-[#FF5900] transition-colors duration-300 group-hover:text-white"
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-[13px] text-gray-400">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-gray-800 underline underline-offset-2 hover:text-[#FF5900] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthPageShell>
    </>
  );
};

export default RegisterSelectPage;
