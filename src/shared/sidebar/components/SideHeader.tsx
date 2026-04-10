import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

import { logo } from "@/assets";

// Wire up dashboard by role
import { getDashboardByRole } from "@/app/";
import { useCurrentUser } from "@/features/auth";

const SideHeader = () => {
  // getting authUser data from auth store
  const { authUser } = useCurrentUser();

  if (!authUser || !authUser.role) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link to={getDashboardByRole[authUser.role]}>
            <div className="bg-sidebar-secondary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <img src={logo} alt="Dineza logo" className="h-8 w-8" />
            </div>
            <span className="font-medium">Dineza</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SideHeader;
