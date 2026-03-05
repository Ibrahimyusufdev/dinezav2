import { ROUTES } from "@/shared/types/constants";

export interface NavLinks {
  title: string;
  path: string;
}

export const navLinks: NavLinks[] = [
  { title: "How It Works", path: ROUTES.HOW_IT_WORKS },
  { title: "For Women", path: ROUTES.FOR_WOMEN },
  { title: "For Restaurants", path: ROUTES.FOR_RESTAURANT },
  { title: "Success Stories", path: ROUTES.SUCCESS_STORIES },
];
