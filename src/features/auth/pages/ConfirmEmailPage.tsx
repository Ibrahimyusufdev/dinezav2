import { AuthPageShell } from "../components/AuthPageShell";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";
import { MailOpen, ArrowRight, RefreshCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

export const ConfirmEmailPage = () => {
  const email = useAuthStore((state) => state.email);

  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    // Clear any previous errors
    setError(null);

    // Validate email exists
    if (!email) {
      setError("Email address not found. Please return to registration.");
      toast.error("Email address not found");
      return;
    }

    setIsResending(true);

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (resendError) {
        throw resendError;
      }

      // Success
      setResent(true);
      toast.success("Verification email sent successfully");

      // Reset the "resent" state after 5 seconds
      setTimeout(() => setResent(false), 5000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to resend email";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthPageShell>
      <div className="mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] sm:p-10">
          {/* Error alert */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm shadow-sm">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
              <p className="flex-1 leading-relaxed font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* Icon */}
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#FF5900]/8 ring-1 ring-[#FF5900]/15">
            <MailOpen size={28} className="text-[#FF5900]" strokeWidth={1.5} />
          </div>

          {/* Step badge */}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5900]/20 bg-[#FF5900]/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FF5900] uppercase">
            Almost there
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">Check your inbox</h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            {email ? (
              <>
                We sent a verification link to{" "}
                <span className="font-semibold text-gray-800">{email}</span>.
                <br />
                Click the link to activate your account.
              </>
            ) : (
              "We sent a verification link to your email. Click the link to activate your account."
            )}
          </p>

          {/* Divider */}
          <div className="my-8 border-t border-gray-100" />

          {/* Tips */}
          <div className="space-y-3 rounded-xl bg-gray-50 p-4 text-left">
            {[
              "Check your spam or junk folder",
              "The link expires in 24 hours",
              "Make sure you used the right email",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-2.5">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF5900]" />
                <p className="text-xs text-gray-600">{tip}</p>
              </div>
            ))}
          </div>

          {/* Resend */}
          <Button
            type="button"
            variant="outline"
            onClick={handleResend}
            disabled={isResending || resent || !email}
            className="mt-6 h-11 w-full rounded-xl border-gray-200 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:opacity-60"
          >
            {resent ? (
              "Email sent ✓"
            ) : isResending ? (
              <span className="flex items-center gap-2">
                <RefreshCcw size={14} className="animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <RefreshCcw size={14} />
                Resend verification email
              </span>
            )}
          </Button>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-500">
            Already verified?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center gap-1 font-semibold text-gray-700 underline-offset-2 transition-colors hover:text-[#FF5900] hover:underline"
            >
              Sign in <ArrowRight size={12} />
            </Link>
          </p>
        </div>
      </div>
    </AuthPageShell>
  );
};

export default ConfirmEmailPage;
