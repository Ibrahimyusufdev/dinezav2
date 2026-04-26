import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/features/auth";
import { EXTERNAL_LINKS, ROUTES } from "@/shared/types/constants";

import { FileQuestion, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getDashboardByRole } from "@/shared/helpers/getDashboardByRole";

export const GlobalNoPage = () => {
  const navigate = useNavigate();

  // get authUser from useAuthUser, react query
  const { authUser } = useCurrentUser();

  // Handle going to dashboard or home depending if they're authenticated or not
  const handleGoHome = () => {
    if (authUser && authUser.role) {
      navigate(getDashboardByRole[authUser.role]);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <FileQuestion className="text-primary h-10 w-10" />
        </div>

        {/* Error Code */}
        <h1 className="text-foreground mb-2 text-6xl font-bold">404</h1>

        {/* Main Message */}
        <h2 className="text-foreground mb-3 text-2xl font-semibold">Page Not Found</h2>

        {/* Description */}
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Action */}
          <Button onClick={handleGoHome} className="w-full cursor-pointer" size="lg">
            <Home className="mr-2 h-4 w-4" />
            {authUser && authUser.role ? "Go to Dashboard" : "Go to Home"}
          </Button>

          {/* Secondary Action */}
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full cursor-pointer"
            size="lg"
          >
            Go Back
          </Button>
        </div>

        {/* Popular Links */}
        <div className="mt-8">
          <p className="text-muted-foreground mb-3 text-sm font-medium">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              to={ROUTES.HOME}
              className="text-primary cursor-pointer underline underline-offset-2"
            >
              Home
            </Link>

            {!authUser && (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="text-primary cursor-pointer underline underline-offset-2"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="text-primary cursor-pointer underline underline-offset-2"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link
              to={EXTERNAL_LINKS.HELP}
              target="_blank"
              className="text-primary cursor-pointer underline underline-offset-2"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNoPage;
