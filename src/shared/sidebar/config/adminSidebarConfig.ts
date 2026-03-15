// Sidebar types config for composition
import type { SidebarConfig } from "../types/sidebarConfig.types";

// Icons for routes/links
import {
  LayoutDashboard,
  Users,
  Store,
  BookOpen,
  CreditCard,
  BarChart3,
  MessageSquareText,
  Settings,
  Bell,
} from "lucide-react";

import { ROUTES } from "@/shared/types/constants";

// Wiring up the configuration for admin sidebar
export const adminSidebarConfig: SidebarConfig = {
  // Main navigation items
  items: [
    {
      id: "dashboard",
      title: "Dashboard",
      path: ROUTES.ADMIN_DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      id: "users",
      title: "Users",
      path: ROUTES.ADMIN_USERS,
      icon: Users,
    },
    {
      id: "restaurants",
      title: "Restaurants",
      path: ROUTES.ADMIN_RESTAURANTS,
      icon: Store,
    },
    {
      id: "reservations",
      title: "Reservations",
      path: ROUTES.ADMIN_RESERVATIONS,
      icon: BookOpen,
    },
    {
      id: "transactions",
      title: "Transactions",
      path: ROUTES.ADMIN_TRANSACTIONS,
      icon: CreditCard,
    },
    {
      id: "analytics",
      title: "Analytics",
      path: ROUTES.ADMIN_ANALYTICS,
      icon: BarChart3,
    },
    {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    }, {
      id: "messages",
      title: "Messages",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
     {
      id: "messages",
      title: "CHecking Overflow",
      path: ROUTES.ADMIN_MESSAGES,
      icon: MessageSquareText,
    },
  ],

  // Footer navigation items
  footerItems: [
    {
      id: "settings",
      title: "Settings",
      path: ROUTES.ADMIN_SETTINGS,
      icon: Settings,
    },
    {
      id: "notifications",
      title: "Notifications",
      path: ROUTES.ADMIN_NOTIFICATIONS,
      icon: Bell,
    },
  ],
};
