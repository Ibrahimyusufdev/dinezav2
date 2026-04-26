import { useNavigate, Link } from "react-router-dom";

import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Wire up dashboard by role
import { useCurrentUser, useLogout } from "@/features/auth";
import { getUserRedirect } from "@/shared/helpers/getUserRedirect";

const UnauthorizedPage = () => {
  // Grab logout and authUser from auth hook and auth store
  const { authUser } = useCurrentUser();
  const { logout } = useLogout();

  const navigate = useNavigate();

  // Determine where to send them back
  // Handle going to the dashboard
  const handleGoToDashboard = (): void => {
    navigate(getUserRedirect(authUser));
  };

  //  Handle go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Logout and re-login
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="bg-destructive/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <ShieldAlert className="text-destructive h-10 w-10" />
        </div>

        {/* Error Code */}
        <h1 className="text-foreground mb-2 text-6xl font-bold">403</h1>

        {/* Title */}
        <h2 className="text-foreground mb-3 text-2xl font-semibold">Access Denied</h2>

        {/* Description */}
        <p className="text-muted-foreground mb-8">
          {authUser ? (
            <>
              You don&apos;t have permission to access this page.
              <span className="mt-2 block text-sm">
                You&apos;re logged in as a <strong>{authUser.role}</strong>.
              </span>
            </>
          ) : (
            "You need to be logged in with the correct permissions to access this page."
          )}
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={handleGoToDashboard} className="w-full" size="lg">
            <Home className="mr-2 h-4 w-4" />
            Go to My Dashboard
          </Button>

          <Button onClick={handleGoBack} variant="outline" className="w-full" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          {authUser && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-muted-foreground w-full"
            >
              Logout and switch accounts
            </Button>
          )}
        </div>

        {/* Help */}
        <div className="bg-muted mt-8 rounded-lg p-4 text-sm">
          <p className="text-foreground font-medium">Need help?</p>
          <p className="text-muted-foreground mt-1">
            If you believe you should have access to this page,{" "}
            <Link
              to="/help"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline underline-offset-2 hover:opacity-80"
            >
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
