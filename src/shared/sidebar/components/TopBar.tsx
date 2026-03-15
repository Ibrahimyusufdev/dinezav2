// TopBar.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/features/auth";
import { getInitials } from "@/shared/helpers/getInitials";
import { getDashboardByrole } from "@/app/index";
import { ROUTES } from "@/shared/types/constants";
import { logo } from "@/assets";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export const TopBar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="bg-background sticky top-0 z-40 flex items-center justify-between border-b px-4 py-3">
      {/* Logo */}
      <Link to={getDashboardByrole[user?.role]} className="flex items-center gap-2">
        <img src={logo} alt="Dineza Logo" className="h-8 w-8" />
        <p className="text-xl font-bold">Dineza</p>
      </Link>

      {/* User avatar */}
      <Link to={`${getDashboardByrole[user?.role]}/profile`}>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user?.profilePicture} alt={user?.firstName} />
          <AvatarFallback className="rounded-lg">
            {getInitials(user?.firstName, user?.lastName)}
          </AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
};
