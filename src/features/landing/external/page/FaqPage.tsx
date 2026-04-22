import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";
import { faqs, type FAQ } from "../data/faq.data.ts";

interface AccordionItemProps {
  item: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ item, isOpen, onToggle }: AccordionItemProps) => (
  <div
    className="border-border overflow-hidden rounded-2xl border transition-all"
    style={{ background: isOpen ? "var(--brand-primary-light)" : "white" }}
  >
    <button
      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="text-foreground text-[15px] leading-snug font-medium">{item.question}</span>
      <ChevronDown
        size={18}
        className={`text-brand-primary shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>

    {isOpen && (
      <div className="px-6 pb-5">
        <p className="text-muted-foreground text-[15px] leading-relaxed">{item.answer}</p>
      </div>
    )}
  </div>
);

export const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
          <p className="text-brand-primary mb-4 text-[13px] font-semibold tracking-widest uppercase">
            Got questions?
          </p>
          <h1
            className="font-display mb-5 leading-tight font-medium text-white"
            style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
          >
            Frequently Asked <em className="text-brand-primary not-italic">Questions</em>
          </h1>
          <p className="text-[17px] leading-relaxed text-white/60">
            Everything you need to know about Dineza - how you earn, how you dine, and how we've got
            your back.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary-light border-border border-t py-16">
        <div className="mx-auto max-w-xl px-5 text-center">
          <h2 className="font-display text-foreground mb-3 text-[32px] font-medium">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our support team is always happy to help. Reach out anytime.
          </p>
          <Link
            to={ROUTES.CONTACT_US}
            className="bg-brand-primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium text-white transition-all hover:opacity-90"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
};
