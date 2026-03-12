import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth"; 
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";
import type { UserRole } from "@/shared/types/common";
import { logo } from "@/assets";

// Wire up dashboard by role
const DASHBOARD_BY_ROLE: Record<UserRole, string> = {
  diner: ROUTES.DINER_DASHBOARD,
  restaurant: ROUTES.RESTAURANT_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD
};

const Header = () => {
    // getting user data from auth store
    const user = useAuthStore((state) => state.user);

  return (
     <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link to={DASHBOARD_BY_ROLE[user.role]}>
            <div className="bg-sidebar-secondary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <img src={logo} alt="Dineza logo" className="h-8 w-8" />
            </div>
            <span className="font-medium">Dineza</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default Header