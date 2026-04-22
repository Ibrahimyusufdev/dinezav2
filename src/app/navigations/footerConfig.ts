import { EXTERNAL_LINKS, LandingID } from "@/shared/types/constants";
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

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export const footerLinkGroupStatic: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { title: "How It Works", path: LandingID.HOW_IT_WORKS },
      { title: "For Diners", path: LandingID.FOR_WOMEN },
      { title: "For Restaurants", path: LandingID.FOR_RESTAURANT },
    ],
  },
];

export const footerLinkGroupDynamic: FooterLinkGroup[] = [
  {
    title: "Company",
    links: [
      { title: "About Us", path: EXTERNAL_LINKS.ABOUT_US },
      { title: "Blog", path: "#" },

      { title: "Contact", path: EXTERNAL_LINKS.CONTACT_US },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", path: EXTERNAL_LINKS.PRIVACY_POLICY },
      { title: "Terms of Service", path: EXTERNAL_LINKS.TERMS_OF_SERVICE },

      { title: "FAQs", path: EXTERNAL_LINKS.FAQ },
    ],
  },
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
