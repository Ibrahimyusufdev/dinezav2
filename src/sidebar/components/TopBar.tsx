import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { getInitials } from "@/shared/helpers/getInitials";
import { getDashboardByRole } from "@/shared/helpers/getDashboardByRole";
import { logo } from "@/assets";
import { Link } from "react-router-dom";
import { useCurrentUser } from "@/features/auth";

import { getAvatarUrl } from "@/shared/helpers/getAvatarUrl";
import { ROUTES } from "@/shared/types/constants";

export const TopBar = () => {
  const { authUser } = useCurrentUser();

  if (!authUser || !authUser.role) return null;

  const avatarUrl = getAvatarUrl(authUser);
  const displayName = authUser.firstName;
  const initials = getInitials(authUser.firstName, authUser.lastName);

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
    <header className="bg-background sticky top-0 z-40 flex items-center justify-between border-b px-4 py-3">
      {/* Logo */}
      <Link to={getDashboardByRole[authUser?.role]} className="flex items-center gap-2">
        <img src={logo} alt="Dineza Logo" className="h-8 w-8" />
        <p className="text-xl font-bold">Dineza</p>
      </Link>

      {/* User avatar */}
      <Link to={getProfileRoute()}>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={avatarUrl ?? undefined} alt={displayName} />
          <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
};
