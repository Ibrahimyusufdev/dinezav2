import { Link, useNavigate } from "react-router-dom";
import { EXTERNAL_LINKS, ROUTES } from "@/shared/types/constants";
import { Mail, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth";
import { getUserRedirect } from "@/app/helpers/getUserRedirect";

export const ConfirmEmailPage = () => {
  const { authUser } = useCurrentUser();

  const navigate = useNavigate();

  //  Determine which dashboard route to send the authUser to
  //  Navigate authUser to their dashboard based on role
  const handleGoToDashboard = (): void => {
    navigate(getUserRedirect(authUser));
  };

  // If authUser is logged in and chosen role, take them to thier dashboard
  if (authUser && authUser.role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md text-center">
          {/* Title */}
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">Email Already Verified</h2>

          {/* Description */}
          <p className="mb-8 text-gray-600">Your email is already verified, and you're signed in</p>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleGoToDashboard} className="w-full" size="lg">
              <Home className="mr-2 h-4 w-4" />
              Go to My Dashboard
            </Button>
          </div>

          {/* Help */}
          <div className="mt-8 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-medium">Need help?</p>
            <p className="mt-1 text-blue-700">
              If you believe you should have access to this page,{" "}
              <Link
                to={EXTERNAL_LINKS.HELP}
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
  }

  // Normal page to see after first signing up
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/30">
          <Mail className="h-8 w-8 text-[#FF5900]" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Check your inbox</h1>
          <p className="text-muted-foreground text-sm leading-relaxed text-balance">
            We've sent a verification link to your email address. Click the link to activate your
            Dineza account.
          </p>
        </div>

        {/* Info box */}
        <div className="w-full rounded-xl border border-orange-100 bg-orange-50/50 px-4 py-3 dark:border-orange-950/30 dark:bg-orange-950/10">
          <p className="text-muted-foreground text-sm">
            Can't find it? Check your{" "}
            <span className="text-foreground font-medium">spam or junk</span> folder.
          </p>
        </div>

        {/* Back to login */}
        <div className="flex w-full flex-col items-center gap-3">
          <Button asChild variant="outline" className="w-full">
            <Link to={ROUTES.LOGIN}>Back to Sign In</Link>
          </Button>
          <p className="text-muted-foreground text-xs">
            Wrong email?{" "}
            <Link to={ROUTES.REGISTER} className="text-foreground underline underline-offset-2">
              Sign up again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
