import { Link } from "react-router-dom";
import { footerLinkGroups, socialLinks } from "./footerConfig";
import { EXTERNAL_LINKS } from "@/shared/types/constants";
import { SOCIAL_ICONS } from "./footerConfig";
import { Logo } from "@/shared/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-foreground mt-20 border-t">
      <div className="container mx-auto px-4 py-16 sm:px-6">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>

            <p className="text-sm leading-relaxed text-white/70">
              Dining that pays you back. Every table, every time.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ name, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];

                return (
                  <a
                    key={name}
                    href={href}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                  >
                    <Icon size={16} className="text-white/70" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Groups */}
          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 text-sm font-semibold text-white">{group.title}</h2>
              <ul className="space-y-3 text-sm text-white/70">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="transition-colors hover:text-white">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/70 md:flex-row">
          <p>© {new Date().getFullYear()} Dineza. All rights reserved.</p>
          <p>
            {EXTERNAL_LINKS.SUPPORT_EMAIL} · {EXTERNAL_LINKS.SUPPORT_PHONE_DISPLAY}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
