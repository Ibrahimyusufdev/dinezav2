import { EXTERNAL_LINKS } from "@/shared/types/constants";

export interface NavLinks {
  title: string;
  path: string;
}

export const navLinks: NavLinks[] = [
  { title: "About Us", path: EXTERNAL_LINKS.ABOUT_US },
  { title: "Contact Us", path: EXTERNAL_LINKS.CONTACT_US },
  { title: "Faq", path: EXTERNAL_LINKS.FAQ },
];
