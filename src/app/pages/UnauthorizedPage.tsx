import { useAuthStore } from "@/features/auth";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";


import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Wire up dashboard by role
import { getDashboardByrole } from "../helpers/getDashboardByRole";

const UnauthorizedPage = () => {
  // Grab logout and user from auth store
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  // Determine where to send them back
  const getCorrectDashboard = (): string => {
    if (!user) return ROUTES.LOGIN;

    return getDashboardByrole[user.role] ?? ROUTES.HOME;
  };

  // Handle going to the dashboard
  const handleGoToDashboard = () => {
    navigate(getCorrectDashboard());
  };

  //  Handle go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Logout and re-login
  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert className="h-10 w-10 text-red-600" />
        </div>

        {/* Error Code */}
        <h1 className="mb-2 text-6xl font-bold text-gray-900">403</h1>

        {/* Title */}
        <h2 className="mb-3 text-2xl font-semibold text-gray-900">Access Denied</h2>

        {/* Description */}
        <p className="mb-8 text-gray-600">
          {user ? (
            <>
              You don&apos;t have permission to access this page.
              <span className="mt-2 block text-sm">
                You&apos;re logged in as a <strong>{user.role}</strong>.
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

          {user && (
            <Button onClick={handleLogout} variant="outline" className="w-full text-gray-600">
              Logout and switch accounts
            </Button>
          )}
        </div>

        {/* Help */}
        <div className="mt-8 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
          <p className="font-medium">Need help?</p>
          <p className="mt-1 text-blue-700">
            If you believe you should have access to this page,{" "}
            <Link
              to="/help"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-blue-900"
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
