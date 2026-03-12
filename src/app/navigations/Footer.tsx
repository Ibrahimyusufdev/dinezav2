import { Link } from "react-router-dom";
import { quickLinks, socialLinks } from "./footerConfig";
import { EXTERNAL_LINKS } from "@/shared/types/constants";

const Footer = () => {
  return (
    <footer className="bg-muted mt-20 border-t">
      <div className="container mx-auto grid gap-10 px-6 py-12 md:grid-cols-3">
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
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                href={social.href}
                target="_blank"
                key={social.name}
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon size={25} />
              </a>
            ))}
          </div>
        </FooterSection>

        {/* Contact Info */}
        <FooterSection title="Contact">
          <div className="text-muted-foreground space-y-2 text-sm">
            <p>
              Email:{" "}
              <a
                href="mailto:support@dineza.com"
                className="hover:text-foreground transition-colors"
              >
                {EXTERNAL_LINKS.SUPPORT_EMAIL}
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href={EXTERNAL_LINKS.SUPPORT_PHONE}
                className="hover:text-foreground transition-colors"
              >
                {EXTERNAL_LINKS.SUPPORT_PHONE}
              </a>
            </p>
          </div>
        </FooterSection>
      </div>

      {/* Bottom Bar */}
      <div className="text-muted-foreground border-t py-6 text-center text-xs">
        © {new Date().getFullYear()} Dineza. All rights reserved.
      </div>
    </footer>
  );
};

// Reysable component section

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
