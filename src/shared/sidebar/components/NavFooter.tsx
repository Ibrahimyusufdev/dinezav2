// Shadcn
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

// Helpers
import { getInitials } from "@/shared/helpers/getInitials";

// Lucide react
import { ChevronsUpDown, LogOut } from "lucide-react";

// React router
import { Link, NavLink } from "react-router-dom";

import { ROUTES } from "@/shared/types/constants";

import { getSidebarConfig } from "../helpers/getSidebarConfig";
import { useLogout, useCurrentUser } from "@/features/auth";

const NavFooter = () => {
  const { authUser } = useCurrentUser();
  const { logout } = useLogout();
  const { isMobile } = useSidebar();

  if (!authUser || !authUser.role) return null;

  // Func to get sidebar based on authUser role form auth store authUser data
  const config = getSidebarConfig(authUser.role);

  const getProfileRoute = () => {
    switch (authUser.role) {
      case "diner":
        return ROUTES.DINER_PROFILE;
      case "restaurant":
        return ROUTES.RESTAURANT_PROFILE;
      case "admin":
        return ROUTES.ADMIN_PROFILE;
      default:
        return ROUTES.HOME;
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* Trigger for dropdown */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={authUser.avatarUrl} alt={authUser?.firstName} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(authUser?.firstName, authUser?.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{authUser?.firstName}</span>
                <span className="truncate text-xs">{authUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown menu containing routing and logout */}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* Change to routing you want to go to, and use TS */}

            <DropdownMenuLabel asChild className="p-0 font-normal">
              <Link to={getProfileRoute()}>
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={authUser?.avatarUrl ?? ""}
                      alt={authUser?.firstName ?? "User"}
                    />
                    <AvatarFallback className="rounded-lg">
                      {getInitials(authUser?.firstName, authUser?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{authUser?.firstName}</span>
                    <span className="truncate text-xs">{authUser?.email}</span>
                  </div>
                </div>
              </Link>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Footer nav */}
            <DropdownMenuGroup>
              {config.footerItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <item.icon className="mr-2 size-4" />
                    {item.title}
                  </DropdownMenuItem>
                </NavLink>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
