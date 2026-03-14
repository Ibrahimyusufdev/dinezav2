import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth";

import type { UserRole } from "@/shared/types/common";
import { ROUTES } from "@/shared/types/constants";

import { FileQuestion, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getDashboardByrole } from "../helpers/getDashboardByRole";

const GlobalNoPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Handle going to dashboard or home depending if they're authenticated or not
  const handleGoHome = () => {
    if (isAuthenticated && user) {
      navigate(getDashboardByrole[user.role]);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <FileQuestion className="h-10 w-10 text-blue-600" />
        </div>

        {/* Error Code */}
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>

        {/* Main Message */}
        <h2 className="mb-3 text-2xl font-semibold text-gray-900">Page Not Found</h2>

        {/* Description */}
        <p className="mb-8 text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Action */}
          <Button onClick={handleGoHome} className="w-full" size="lg">
            <Home className="mr-2 h-4 w-4" />
            {isAuthenticated ? "Go to Dashboard" : "Go to Home"}
          </Button>

          {/* Secondary Action */}
          <Button onClick={handleGoBack} variant="outline" className="w-full" size="lg">
            Go Back
          </Button>
        </div>

        {/* Popular Links */}
        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-gray-700">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="link"
              className="text-blue-500 underline"
              size="sm"
              onClick={() => navigate(ROUTES.HOME)}
            >
              Home
            </Button>

            {!isAuthenticated && (
              <>
                <Button
                  variant="link"
                  className="text-blue-500 underline"
                  size="sm"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Login
                </Button>
                <Button
                  variant="link"
                  className="text-blue-500 underline"
                  size="sm"
                  onClick={() => navigate(ROUTES.REGISTER_SELECT)}
                >
                  Sign Up
                </Button>
              </>
            )}

            <Button
              variant="link"
              className="text-blue-500 underline"
              size="sm"
              onClick={() => navigate("/help")}
            >
              Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNoPage;
