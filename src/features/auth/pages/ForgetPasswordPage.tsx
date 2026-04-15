import { AuthPageShell } from "../components/AuthPageShell";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";
import { KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useForgotPassword } from "../queries/useForgotPassword";
import { AlertCircle } from "lucide-react";

// Schema
const forgotSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export const ForgotPasswordPage = () => {
  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const [submitted, setSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const forgotPassMutation = useForgotPassword();

  // Single source of truth for disabled state
  const isBusy = form.formState.isSubmitting || forgotPassMutation.isPending;
  const isSubmitDisabled = !form.formState.isValid || isBusy;

  const handleSubmit = async (formData: ForgotFormData) => {
    setSubmitError(null);

    try {
      await forgotPassMutation.mutateAsync(formData.email);

      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    }
  };

  return (
    <AuthPageShell>
      <div className="mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          {submitted ? (
            /* Success state*/
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
                <CheckCircle2 size={28} className="text-emerald-500" strokeWidth={1.5} />
              </div>
              <h1 className="text-[1.5rem] font-bold tracking-tight text-gray-950">
                Check your email
              </h1>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
                If <span className="font-semibold text-gray-800">{form.getValues("email")}</span> is
                registered, you'll receive a password reset link shortly.
              </p>
              <div className="mt-8 space-y-3 rounded-xl bg-gray-50 p-4 text-left">
                {["Check spam/junk if you don't see it", "The link expires in 1 hour"].map(
                  (tip) => (
                    <div key={tip} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5900]" />
                      <p className="text-[12.5px] text-gray-500">{tip}</p>
                    </div>
                  )
                )}
              </div>
              <Link
                to={ROUTES.LOGIN}
                className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-600 underline-offset-2 hover:text-[#FF5900] hover:underline"
              >
                <ArrowLeft size={13} />
                Back to sign in
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              {/* Icon */}
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5900]/8 ring-1 ring-[#FF5900]/15">
                <KeyRound size={24} className="text-[#FF5900]" strokeWidth={1.5} />
              </div>

              {/* Header */}
              <div className="mb-7 space-y-1.5">
                <h1 className="text-[1.65rem] font-bold tracking-tight text-gray-950">
                  Forgot password?
                </h1>
                <p className="text-[14px] leading-relaxed text-gray-500">
                  No worries. Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                {/* Inline API error */}
                {submitError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="animate-in fade-in slide-in-from-top-2 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                    <p className="font-medium text-red-700">{submitError}</p>
                  </div>
                )}

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                        disabled={isBusy}
                        className="border-gray-200 bg-gray-50/60 transition-colors focus-visible:border-[#FF5900] focus-visible:bg-white focus-visible:ring-[#FF5900]/20"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="h-11 w-full rounded-xl bg-[#FF5900] text-[14px] font-semibold text-white shadow-none transition-colors hover:bg-[#e04f00] focus-visible:ring-[#FF5900]/40 disabled:opacity-50"
                >
                  {isBusy ? (
                    <span className="flex items-center gap-2">
                      <Spinner /> Sending link...
                    </span>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>

              <div className="mt-7 text-center">
                <Link
                  to={ROUTES.LOGIN}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 underline-offset-2 hover:text-[#FF5900] hover:underline"
                >
                  <ArrowLeft size={13} />
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthPageShell>
  );
};

export default ForgotPasswordPage;
