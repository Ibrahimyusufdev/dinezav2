interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div className="mb-10">
    <h2 className="font-display text-foreground mb-4 text-[24px] font-semibold">{title}</h2>
    <div className="text-muted-foreground space-y-3 text-[15px] leading-relaxed">{children}</div>
  </div>
);

export const TermsOfServicePage = () => (
  <>
    <section className="bg-brand-dark py-16">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <p className="text-brand-primary mb-4 text-[13px] font-semibold tracking-widest uppercase">
          Legal
        </p>
        <h1
          className="font-display leading-tight font-medium text-white"
          style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        >
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-white/50">Last updated: January 2025</p>
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using Dineza ("the Platform"), you agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use our platform.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <p>
            You must be at least 18 years old to use Dineza. By using our platform, you represent
            and warrant that you meet this requirement and have the legal capacity to enter into a
            binding agreement.
          </p>
        </Section>

        <Section title="3. Cash Back Programme">
          <p>
            Dineza offers 25% cash back on dining experiences at partner restaurants. Cash back is
            calculated on the total spend reported by the member within 7 days of their dining
            experience. Failure to report within this window may result in forfeiture of the
            applicable cash back.
          </p>
          <p>
            Dineza reserves the right to verify spend reports. Fraudulent reporting will result in
            immediate account suspension and forfeiture of all accumulated earnings.
          </p>
        </Section>

        <Section title="4. User Conduct">
          <p>
            You agree not to misuse the platform, submit false spend reports, create multiple
            accounts, or engage in any activity that undermines the integrity of the Dineza
            community or our partner restaurants.
          </p>
        </Section>

        <Section title="5. Partner Restaurants">
          <p>
            Dineza operates in partnership with selected restaurants. Our list of partners is
            subject to change. Dineza is not liable for the quality of service or dining experience
            at partner restaurants, though we take quality seriously and actively maintain our
            partner standards.
          </p>
        </Section>

        <Section title="6. Withdrawals">
          <p>
            Verified cash back earnings may be withdrawn at any time to your registered bank
            account. Minimum withdrawal amounts and processing times apply. Dineza reserves the
            right to place holds on withdrawals pending verification.
          </p>
        </Section>

        <Section title="7. Termination">
          <p>
            We reserve the right to suspend or terminate your account at our discretion if you
            violate these terms. You may also close your account at any time by contacting support.
          </p>
        </Section>

        <Section title="8. Changes to Terms">
          <p>
            We may update these terms from time to time. Continued use of the platform after changes
            constitutes acceptance of the new terms. We will notify you of significant changes via
            email.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            Questions about these terms? Email us at{" "}
            <a href="mailto:legal@dineza.com" className="text-brand-primary hover:underline">
              legal@dineza.com
            </a>
            .
          </p>
        </Section>
      </div>
    </section>
  </>
);

export default TermsOfServicePage;
