import { EXTERNAL_LINKS, ROUTES } from "@/shared/types/constants";
import { TwitterIcon, InstagramIcon, GitHubIcon } from "@/shared/components/BrandIcons";

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  github: GitHubIcon,
} as const;

type SocialIconKey = keyof typeof SOCIAL_ICONS;

export interface FooterLink {
  title: string;
  path: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: SocialIconKey;
}

export const quickLinks: FooterLink[] = [
  { title: "About Us", path: ROUTES.ABOUT_US },
  { title: "Contact", path: ROUTES.CONTACT_US },
  { title: "FAQs", path: ROUTES.FAQ },
  { title: "Terms of Service", path: EXTERNAL_LINKS.TERMS_OF_SERVICE },
  { title: "Privacy Policy", path: EXTERNAL_LINKS.PRIVACY_POLICY },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: EXTERNAL_LINKS.INSTAGRAM,
    icon: "instagram",
  },
  {
    name: "Github",
    href: EXTERNAL_LINKS.GITHUB,
    icon: "github",
  },

  {
    name: "twitter",
    href: EXTERNAL_LINKS.TWITTER,
    icon: "twitter",
  },
];
