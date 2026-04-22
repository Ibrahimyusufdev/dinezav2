import { DollarSign, Clock, Star, Users, TrendingUp, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const dinerFeatures: FeatureItem[] = [
  {
    icon: DollarSign,
    title: "Earn 25% Cash Back",
    desc: "Receive cash back on every dining experience. The more you dine, the more you earn — it's that simple.",
  },
  {
    icon: Clock,
    title: "Your Time Has Value",
    desc: "No more dates that don't appreciate you. Make every outing worth your while with guaranteed earnings.",
  },
  {
    icon: Star,
    title: "Exclusive Experiences",
    desc: "Access curated offers at top-tier restaurants - experiences designed for the discerning diner.",
  },
];

export const restaurantFeatures: FeatureItem[] = [
  {
    icon: Users,
    title: "Attract Premium Guests",
    desc: "Welcome guests who appreciate fine dining and arrive ready to spend on memorable experiences.",
  },
  {
    icon: TrendingUp,
    title: "Boost Your Revenue",
    desc: "Increase bookings, fill tables on slow nights, and showcase your best menus to the right audience.",
  },
  {
    icon: BadgeCheck,
    title: "Gain Real Visibility",
    desc: "Feature your establishment to an exclusive, high-intent community of food-loving women.",
  },
];
