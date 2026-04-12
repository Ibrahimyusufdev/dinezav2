// src/features/auth/pages/ConfirmEmailPage.tsx
import { AuthPageShell } from "../components/AuthPageShell";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";
import { MailOpen, ArrowRight, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ConfirmEmailPage = () => {
  const location = useLocation();
  // Email may be passed via router state from register
  const email: string = location.state?.email ?? "your email";
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    // TODO: call supabase.auth.resend() or your auth service
    setResent(true);
    setTimeout(() => setResent(false), 5000);
  };

  return (
    <AuthPageShell>
      <div className="mx-auto w-full max-w-[440px]">
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center">

          {/* Icon */}
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5900]/8 ring-1 ring-[#FF5900]/15">
            <MailOpen size={28} className="text-[#FF5900]" strokeWidth={1.5} />
          </div>

          {/* Step badge */}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5900]/20 bg-[#FF5900]/5 px-3.5 py-1 text-[10.5px] font-semibold uppercase tracking-widest text-[#FF5900]">
            Almost there
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-[1.65rem] font-bold tracking-tight text-gray-950">
            Check your inbox
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
            We sent a verification link to{" "}
            <span className="font-semibold text-gray-800">{email}</span>.
            <br />
            Click the link to activate your account.
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
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5900]" />
                <p className="text-[12.5px] text-gray-500">{tip}</p>
              </div>
            ))}
          </div>

          {/* Resend */}
          <Button
            type="button"
            variant="outline"
            onClick={handleResend}
            disabled={resent}
            className="mt-6 h-10 w-full rounded-xl border-gray-200 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-60 transition-colors"
          >
            {resent ? (
              "Email sent ✓"
            ) : (
              <span className="flex items-center gap-2">
                <RefreshCcw size={13} />
                Resend verification email
              </span>
            )}
          </Button>

          {/* Footer */}
          <p className="mt-6 text-center text-[12.5px] text-gray-400">
            Already verified?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center gap-1 font-semibold text-gray-700 underline-offset-2 hover:text-[#FF5900] hover:underline"
            >
              Sign in <ArrowRight size={11} />
            </Link>
          </p>
        </div>
      </div>
    </AuthPageShell>
  );
};

export default ConfirmEmailPage;