import { Instagram, Twitter, Github, type LucideIcon } from "lucide-react";
import { EXTERNAL_LINKS } from "@/shared/types/constants";

export interface FooterLink {
  title: string;
  path: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const quickLinks: FooterLink[] = [
  { title: "About Us", path: "#" },
  { title: "Contact", path: "#" },
  { title: "FAQs", path: "#" },
  { title: "Terms of Service", path: "#" },
  { title: "Privacy Policy", path: "#" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: EXTERNAL_LINKS.INSTAGRAM,
    icon: Instagram,
  },
  {
    name: "Github",
    href: EXTERNAL_LINKS.GITHUB,
    icon: Github,
  },

  {
    name: "twitter",
    href: EXTERNAL_LINKS.TWITTER,
    icon: Twitter,
  },
];
