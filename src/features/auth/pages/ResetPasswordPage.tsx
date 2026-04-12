import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ResetPasswordFormData } from "../validations/auth-schemas";
import { resetPasswordSchema } from "../validations/auth-schemas";

import { AuthPageShell } from "../components/AuthPageShell";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { Eye, EyeOff, ShieldCheck, AlertCircle, X } from "lucide-react";

import { ROUTES } from "@/shared/types/constants";
import { passwordRules, PasswordChecklist } from "../components/PasswordChecklist";

import { supabase } from "@/lib/supabase";
import { useResetPassword } from "../hooks/useResetPassword";
import { toast } from "sonner";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const { mutateAsync: resetPassword, isPending, error, reset: resetMutation } = useResetPassword();

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          toast.error("Invalid or expired reset link");
          navigate(ROUTES.LOGIN, { replace: true });
          return;
        }

        if (!session) {
          toast.error("Please use the password reset link from your email");
          navigate(ROUTES.LOGIN, { replace: true });
          return;
        }

        setSessionChecked(true);
      } catch (err) {
        toast.error("Something went wrong");
        navigate(ROUTES.LOGIN, { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  // Handle redirect after success
  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      navigate(ROUTES.LOGIN, { replace: true });
    }, 2500);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [success, navigate]);

  // Cleanup error on unmount
  useEffect(() => {
    return () => {
      resetMutation();
    };
  }, [resetMutation]);

  const handleReset = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword(data.password);
      setSuccess(true);
      toast.success("Password updated successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update password";
      toast.error(errorMessage);
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  const isFormDisabled = isSubmitting || isPending;
  const isSubmitDisabled = !form.formState.isValid || isFormDisabled;

  // Show loading state while checking session
  if (!sessionChecked) {
    return (
      <AuthPageShell>
        <div className="mx-auto flex w-full max-w-md items-center justify-center py-12">
          <Spinner />
        </div>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell>
      <div className="mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] sm:p-10">
          {success ? (
            /* Success state */
            <div className="text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
                <ShieldCheck size={28} className="text-emerald-500" strokeWidth={1.5} />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Password updated
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Your password has been changed successfully.
                <br />
                Redirecting you to sign in...
              </p>

              <div className="mt-6 flex justify-center">
                <div className="size-5 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-500" />
              </div>
            </div>
          ) : (
            /* Form state*/
            <>
              {/* Header */}
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#FF5900]/8 ring-1 ring-[#FF5900]/15">
                <ShieldCheck size={24} className="text-[#FF5900]" strokeWidth={1.5} />
              </div>

              <div className="mb-6 space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                  Set new password
                </h1>
                <p className="text-sm leading-relaxed text-gray-500">
                  Choose a strong password for your account.
                </p>
              </div>

              {/* API error */}
              {error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="animate-in fade-in slide-in-from-top-2 mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm shadow-sm duration-300"
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  <p className="flex-1 leading-relaxed font-medium text-red-800">
                    {error instanceof Error ? error.message : "Failed to update password"}
                  </p>
                  <button
                    type="button"
                    onClick={() => resetMutation()}
                    aria-label="Dismiss error"
                    className="shrink-0 rounded-md p-0.5 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Form */}
              <form onSubmit={form.handleSubmit(handleReset)} className="space-y-5">
                {/* New password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>New password</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          aria-invalid={fieldState.invalid}
                          disabled={isFormDisabled}
                          className="h-11 border-gray-200 bg-gray-50/60 pr-11 transition-colors focus-visible:border-[#FF5900] focus-visible:bg-white focus-visible:ring-[#FF5900]/20"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          disabled={isFormDisabled}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="focus-visible:ring-ring absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
                        >
                          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </div>

                      {/* Show checklist when there's a value, regardless of error state */}
                      {field.value && !passwordRules.every((rule) => rule.test(field.value)) && (
                        <PasswordChecklist value={field.value} />
                      )}
                    </Field>
                  )}
                />

                {/* Confirm password */}
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          aria-invalid={fieldState.invalid}
                          disabled={isFormDisabled}
                          className="h-11 border-gray-200 bg-gray-50/60 pr-11 transition-colors focus-visible:border-[#FF5900] focus-visible:bg-white focus-visible:ring-[#FF5900]/20"
                        />

                        <button
                          type="button"
                          onClick={() => setShowConfirm((p) => !p)}
                          disabled={isFormDisabled}
                          aria-label={showConfirm ? "Hide password" : "Show password"}
                          className="focus-visible:ring-ring absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
                        >
                          {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </div>

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="h-11 w-full rounded-xl bg-[#FF5900] font-semibold text-white shadow-none transition-all hover:bg-[#e04f00] focus-visible:ring-[#FF5900]/40 disabled:opacity-50"
                >
                  {isFormDisabled ? (
                    <span className="flex items-center gap-2">
                      <Spinner />
                      Updating password...
                    </span>
                  ) : (
                    "Update password"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </AuthPageShell>
  );
};

export default ResetPasswordPage;
