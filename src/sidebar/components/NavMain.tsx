// Shadcn ui
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";

import { getSidebarConfig } from "../helpers/getSidebarConfig";
import { useCurrentUser } from "@/features/auth";
// import { useCurrentUser } from "@/features/auth";

const NavMain = () => {
  // Getting authUser data from auth store, so you can access the role signed it with
  const { authUser } = useCurrentUser();
  const { setOpenMobile } = useSidebar();
  if (!authUser || !authUser.role) return null;

  // Func to get sidebar based on authUser role form auth store authUser data
  const config = getSidebarConfig(authUser.role);

  return (
    <SidebarMenu>
      {config.items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <NavLink
            to={item.path}
            end
            className={({ isActive }) =>
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }
            onClick={() => setOpenMobile(false)}
          >
            <SidebarMenuButton tooltip={item.title} className="cursor-pointer px-4 py-5">
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </NavLink>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default NavMain;
