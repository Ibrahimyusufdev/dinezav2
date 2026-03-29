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
import { Button } from "@/components/ui/button";

// Helpers
import { getInitials } from "@/shared/helpers/getInitials";

// Lucide react
import { ChevronsUpDown, LogOut } from "lucide-react";

// React router
import { Link, NavLink, useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared/types/constants";

import { getSidebarConfig } from "../helpers/getSidebarConfig";
import { useLogout, useRequiredUser } from "@/features/auth";

const NavFooter = () => {
  // Getting user data from auth store
  const user = useRequiredUser();

  // Grab logout from useLogout hook
  const { logout } = useLogout();

  // Func to get sidebar based on user role form auth store user data
  const config = getSidebarConfig(user.role);

  const navigate = useNavigate();

  // logout logic and redirecting to login page
  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const isMobile = useSidebar();

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
                <AvatarImage src={user.avatar} alt={user?.firstName} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.firstName}</span>
                <span className="truncate text-xs">{user.email}</span>
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
            <Link to={`/${user.role}/profile`}>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user?.firstName} />
                    <AvatarFallback className="rounded-lg">
                      {getInitials(user?.firstName, user?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.firstName}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </Link>
            <DropdownMenuSeparator />

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
                    <item.icon />
                    {item.title}
                  </DropdownMenuItem>
                </NavLink>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Button onClick={handleLogout} variant="outline" className="cursor-pointer">
                <LogOut />
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
