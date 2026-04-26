import { footerLinkGroupDynamic, footerLinkGroupStatic, socialLinks } from "./footerConfig";
import { EXTERNAL_LINKS } from "@/shared/types/constants";
import { SOCIAL_ICONS } from "./footerConfig";
import { Logo } from "@/shared/components/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground border-t border-white/10">
      <div className="container mx-auto px-4 py-16 sm:px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>

            <p className="text-sm leading-relaxed text-white/60">
              Dining that pays you back. Every table, every time.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ name, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];

                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <Icon size={16} className="text-white/70" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Anchor link groups (same-page sections) */}
          {footerLinkGroupStatic.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 text-sm font-semibold text-white">{group.title}</h2>
              <ul className="space-y-3 text-sm text-white/60">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <a href={`#${link.path}`} className="transition-colors hover:text-white">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Router link groups (separate pages) */}
          {footerLinkGroupDynamic.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 text-sm font-semibold text-white">{group.title}</h2>
              <ul className="space-y-3 text-sm text-white/60">
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

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Dineza. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center md:justify-end">
            <a
              href={`mailto:${EXTERNAL_LINKS.SUPPORT_EMAIL}`}
              className="transition-colors hover:text-white/80"
            >
              {EXTERNAL_LINKS.SUPPORT_EMAIL}
            </a>
            <span aria-hidden>·</span>
            <span>{EXTERNAL_LINKS.SUPPORT_PHONE_DISPLAY}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
