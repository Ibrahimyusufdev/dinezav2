import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { getInitials } from "@/shared/helpers/getInitials";
import { getDashboardByRole } from "@/app/index";
import { logo } from "@/assets";
import { Link } from "react-router-dom";
import { useCurrentUser } from "@/features/auth";

export const TopBar = () => {
  const { authUser } = useCurrentUser();

  if (!authUser || !authUser.role) return null;

  return (
    <header className="bg-background sticky top-0 z-40 flex items-center justify-between border-b px-4 py-3">
      {/* Logo */}
      <Link to={getDashboardByRole[authUser?.role]} className="flex items-center gap-2">
        <img src={logo} alt="Dineza Logo" className="h-8 w-8" />
        <p className="text-xl font-bold">Dineza</p>
      </Link>

      {/* User avatar */}
      <Link to={`${getDashboardByRole[authUser?.role]}/profile`}>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={authUser?.avatarUrl ?? ""} alt={authUser?.firstName ?? "User"} />
          <AvatarFallback className="rounded-lg">
            {getInitials(authUser?.firstName, authUser?.lastName)}
          </AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
};
