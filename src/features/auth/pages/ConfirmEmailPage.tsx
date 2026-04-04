import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ConfirmEmailPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">

        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/30">
          <Mail className="h-8 w-8 text-[#FF5900]" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Check your inbox</h1>
          <p className="text-muted-foreground text-balance text-sm leading-relaxed">
            We've sent a verification link to your email address.
            Click the link to activate your Dineza account.
          </p>
        </div>

        {/* Info box */}
        <div className="w-full rounded-xl border border-orange-100 bg-orange-50/50 px-4 py-3 dark:border-orange-950/30 dark:bg-orange-950/10">
          <p className="text-muted-foreground text-sm">
            Can't find it? Check your <span className="text-foreground font-medium">spam or junk</span> folder.
          </p>
        </div>

        {/* Back to login */}
        <div className="flex flex-col items-center gap-3 w-full">
          <Button asChild variant="outline" className="w-full">
            <Link to={ROUTES.LOGIN}>Back to Sign In</Link>
          </Button>
          <p className="text-muted-foreground text-xs">
            Wrong email?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="text-foreground underline underline-offset-2"
            >
              Sign up again
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};