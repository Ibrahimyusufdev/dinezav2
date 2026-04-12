import { Link } from "react-router-dom";
import { quickLinks, socialLinks } from "./footerConfig";
import { EXTERNAL_LINKS } from "@/shared/types/constants";
import { SOCIAL_ICONS } from "./footerConfig";

const Footer = () => {
  return (
    <footer className="bg-muted mt-20 border-t">
      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <ul className="text-muted-foreground space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Social Media */}
          <FooterSection title="Follow Us">
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map(({ name, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];

                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title="Contact">
            <div className="text-muted-foreground space-y-2 text-sm">
              <p>
                Email:{" "}
                <a
                  href={EXTERNAL_LINKS.SUPPORT_EMAIL}
                  className="hover:text-foreground break-all underline transition-colors"
                >
                  {EXTERNAL_LINKS.SUPPORT_EMAIL}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href={`tel:${EXTERNAL_LINKS.SUPPORT_PHONE_LINK}`}
                  className="hover:text-foreground transition-colors"
                >
                  {EXTERNAL_LINKS.SUPPORT_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </FooterSection>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-muted-foreground border-t py-6 text-center text-sm">
        © {new Date().getFullYear()} Dineza. All rights reserved.
      </div>
    </footer>
  );
};

// Reusable component section

type FooterSectionProps = {
  title: string;
  children: React.ReactNode;
};

function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export default Footer;
