import { dinerSidebarConfig } from "../config/dinerSidebarConfig";
import { restaurantSidebarConfig } from "../config/restaurantSidebarConfig";
import { adminSidebarConfig } from "../config/adminSidebarConfig";
import type { UserRole } from "@/features/auth";
import type { SidebarConfig } from "../types/sidebarConfig.types";

// Return sidebar config by role, that is, return the config based on the role user sign in with
const SIDEBAR_BY_ROLE: Record<UserRole, SidebarConfig> = {
  diner: dinerSidebarConfig,
  restaurant: restaurantSidebarConfig,
  admin: adminSidebarConfig,
};

// Func to get the sidebar config based on what user signed it with
export const getSidebarConfig = (role: UserRole): SidebarConfig => {
  const config = SIDEBAR_BY_ROLE[role];
  if (!config) throw new Error(`Unsupported role: ${role}`);
  return config;
};
