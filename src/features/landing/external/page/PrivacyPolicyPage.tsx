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

export const PrivacyPolicyPage = () => (
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
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-white/50">Last updated: January 2025</p>
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <Section title="1. What We Collect">
          <p>
            We collect information you provide directly: your name, email address, phone number,
            bank account details (for payouts), and dining spend reports. We also collect usage data
            including reservations made, pages visited, and device information.
          </p>
        </Section>

        <Section title="2. How We Use Your Data">
          <p>We use your data to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Process and verify your cash back earnings</li>
            <li>Facilitate restaurant reservations</li>
            <li>Send you relevant offers and platform updates</li>
            <li>Improve our platform and partner restaurant recommendations</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing">
          <p>
            We do not sell your personal data. We share data only with: partner restaurants (to
            facilitate reservations), payment processors (to execute payouts), and service providers
            that help us operate the platform — all under strict data processing agreements.
          </p>
        </Section>

        <Section title="4. Data Security">
          <p>
            We use industry-standard encryption and security practices to protect your data.
            Financial information is handled through PCI-compliant processors. However, no method of
            transmission over the internet is 100% secure.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>
            You have the right to access, correct, or delete your personal data at any time. You may
            also withdraw consent for marketing communications. To exercise these rights, contact us
            at{" "}
            <a href="mailto:privacy@dineza.com" className="text-brand-primary hover:underline">
              privacy@dineza.com
            </a>
            .
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            We use cookies and similar tracking technologies to improve your experience. You can
            control cookie preferences through your browser settings, though disabling cookies may
            affect platform functionality.
          </p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>
            We may update this policy as our platform evolves. We'll notify you of material changes
            via email. Continued use of the platform constitutes acceptance.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            Privacy questions? Contact our data team at{" "}
            <a href="mailto:privacy@dineza.com" className="text-brand-primary hover:underline">
              privacy@dineza.com
            </a>
            .
          </p>
        </Section>
      </div>
    </section>
  </>
);

export default PrivacyPolicyPage;
