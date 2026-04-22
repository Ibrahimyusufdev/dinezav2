// Sidebar types config for composition
import type { SidebarConfig } from "../types/sidebarConfig.types";

// Icons for routes/links
import {
  LayoutDashboard,
  Book,
  DollarSign,
  Share2,
  MessageSquareText,
  Gift,
  ChartNoAxesColumnDecreasing,
  Settings,
  Bell,
} from "lucide-react";

import { ROUTES } from "@/shared/types/constants";

// Wiring up the configuration for restaurant sidebar so that I can compose and set it via my getSidebarConfig
export const restaurantSidebarConfig: SidebarConfig = {
  // Nav items
  items: [
    {
      id: "dashboard",
      title: "Dashboard",
      path: ROUTES.RESTAURANT_DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      id: "reservations",
      title: "My Reservations",
      path: ROUTES.RESTAURANT_RESERVATION,
      icon: Book,
    },
    { id: "offer", title: "Special Offer", path: ROUTES.RESTAURANT_OFFER, icon: Gift },
    {
      id: "analytics",
      title: "Analytics",
      path: ROUTES.RESTAURANT_ANALYTICS,
      icon: ChartNoAxesColumnDecreasing,
    },
    { id: "invite", title: "Invite Friends", path: ROUTES.RESTAURANT_INVITE, icon: Share2 },
    { id: "payment", title: "Payment", path: ROUTES.RESTAURANT_PAYMENT, icon: DollarSign },
    {
      id: "messages",
      title: "Messages",
      path: ROUTES.RESTAURANT_MESSAGES,
      icon: MessageSquareText,
    },
  ],
  // Footer items
  footerItems: [
    { id: "settings", title: "Settings", path: ROUTES.RESTAURANT_SETTINGS, icon: Settings },
    {
      id: "notifications",
      title: "Notifications",
      path: ROUTES.RESTAURANT_NOTIFICATIONS,
      icon: Bell,
    },
  ],
};
