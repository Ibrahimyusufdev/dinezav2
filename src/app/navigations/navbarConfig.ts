import { LandingID} from "@/shared/types/constants";

export interface NavLinks {
  title: string;
  path: string;
}

export const navLinks: NavLinks[] = [
  { title: "How It Works", path: LandingID.HOW_IT_WORKS },
  { title: "For Women", path: LandingID.FOR_WOMEN },
  { title: "For Restaurants", path: LandingID.FOR_RESTAURANT },
  { title: "Success Stories", path: LandingID.SUCCESS_STORIES },
];
