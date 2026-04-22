import { Link } from "react-router-dom";
import { BookOpen, DollarSign, UtensilsCrossed, UserCircle, ChevronRight } from "lucide-react";
import { EXTERNAL_LINKS } from "@/shared/types/constants";

const HELP_CATEGORIES = [
  {
    icon: UserCircle,
    title: "Account & Profile",
    desc: "Sign up, login, profile settings, and account management.",
    links: [
      "How to create an account",
      "Updating your profile",
      "Changing your password",
      "Deleting your account",
    ],
  },
  {
    icon: UtensilsCrossed,
    title: "Reservations",
    desc: "Browsing restaurants, making bookings, and managing your dining plans.",
    links: [
      "How to book a restaurant",
      "Cancelling a reservation",
      "Modifying a booking",
      "Finding partner restaurants",
    ],
  },
  {
    icon: DollarSign,
    title: "Cash Back & Earnings",
    desc: "Reporting spend, tracking earnings, and withdrawing your cash back.",
    links: [
      "How to report your spend",
      "When will I receive my cash back",
      "Withdrawing your earnings",
      "Referral bonuses",
    ],
  },
  {
    icon: BookOpen,
    title: "Policies & Trust",
    desc: "Our rules, partnerships, and how we keep your data safe.",
    links: [
      "Our partner restaurant process",
      "How we protect your data",
      "Terms of service",
      "Reporting an issue",
    ],
  },
];

export const HelpPage = () => (
  <>
    {/* HERO */}
    <section className="bg-brand-dark py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
        <p className="text-brand-primary mb-4 text-xs font-semibold tracking-widest uppercase">
          Help Center
        </p>

        <h1 className="mb-5 text-4xl leading-tight font-medium text-white md:text-5xl">
          How can we <em className="text-brand-primary not-italic">help you?</em>
        </h1>

        <p className="mb-8 text-base leading-relaxed text-white/60 md:text-lg">
          Find guides, answers, and everything you need to make the most of Dineza.
        </p>
      </div>
    </section>

    {/* CATEGORIES */}
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {HELP_CATEGORIES.map(({ icon: Icon, title, desc, links }) => (
            <div
              key={title}
              className="border-border rounded-2xl border p-7 transition-all hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                <Icon size={22} className="text-brand-primary" />
              </div>

              <h2 className="text-foreground mb-2 text-xl font-semibold">{title}</h2>

              <p className="text-muted-foreground mb-5 text-sm leading-relaxed md:text-base">
                {desc}
              </p>

              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground flex items-center gap-2 text-sm hover:underline"
                    >
                      <ChevronRight size={14} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="border-border bg-brand-primary-light border-t py-16">
      <div className="mx-auto max-w-xl px-5 text-center">
        <h2 className="text-foreground mb-3 text-2xl font-medium md:text-3xl">
          Didn't find what you need?
        </h2>

        <p className="text-muted-foreground mb-8 text-sm md:text-base">
          Our team is ready to help. Check our FAQ or reach out directly.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to={EXTERNAL_LINKS.FAQ}
            className="border-border text-foreground rounded-full border px-7 py-3 text-sm font-medium transition-all hover:bg-white"
          >
            Browse FAQ
          </Link>

          <Link
            to={EXTERNAL_LINKS.CONTACT_US}
            className="bg-brand-primary rounded-full px-7 py-3 text-sm font-medium text-white transition-all hover:opacity-90"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  </>
);
