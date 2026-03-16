// Shadcn ui
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";

import { getSidebarConfig } from "../helpers/getSidebarConfig";
import { useAuthStore } from "@/features/auth";

const NavMain = () => {
  // Getting user data from auth store, so you can access the role signed it with
  const user = useAuthStore((state) => state.user);

  // Func to get sidebar based on user role form auth store user data
  const config = getSidebarConfig(user.role);

  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      {config.items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <NavLink
            to={item.path}
            end
            className={({ isActive }) =>
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
