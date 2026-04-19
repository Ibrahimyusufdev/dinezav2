import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleIcon } from "@/shared/components/BrandIcons";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import { AlertCircle } from "lucide-react";

import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner";
import type { LoginFormData } from "../validations/auth-schemas";
import { loginSchema } from "../validations/auth-schemas";

import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/useAuthStore";

import { Link } from "react-router-dom";
import { EXTERNAL_LINKS, ROUTES } from "@/shared/types/constants";
import { useState, useEffect } from "react";
import { clearInputFieldError } from "@/shared/helpers/clearInputFieldError";
import { AuthBrandPanel } from "./AuthBrandPanel";

export const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  // Wiring up the form for using useForm from rhf
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Grab login from useLogin hook
  const { login, handleGoogleLogin } = useLogin();

  // Grab error and isLoading from authstore
  const { error, isLoading, clearError } = useAuthStore(
    useShallow((state) => ({
      error: state.error,
      isLoading: state.isLoading,
      clearError: state.clearError,
    }))
  );

  // Show/Hide password
  const [showPassword, setShowPassword] = useState(false);

  // Logic to perform once the form is submitted successfully
  const handleLogin = async (formData: LoginFormData) => {
    await login({ email: formData.email, password: formData.password });
  };

  // Clear API error from any component once user, if user mount from there

  useEffect(() => {
    if (!error) return;
    clearError();
    toast.dismiss();
  }, []);

  // Disabling form and button
  const isFormDisabled = form.formState.isSubmitting || isLoading;
  const isSubmitDisabled = !form.formState.isValid || form.formState.isSubmitting || isLoading;

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden rounded-2xl border border-gray-200/80 p-0 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.08)] lg:grid lg:grid-cols-[1fr_1.1fr]">
        <>
          {/* Form side*/}
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-6 p-4 sm:p-8 md:p-8 lg:p-10"
          >
            {/* Headline */}
            <div className="flex flex-col gap-2 text-center md:items-start md:text-left">
              <h1 className="text-2xl font-bold md:hidden">Welcome Back</h1>
              <h1 className="hidden text-2xl font-bold tracking-tight text-gray-950 md:block">
                Sign in
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Login to your Dineza account
              </p>
            </div>

            {/* API error */}
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="animate-in fade-in slide-in-from-top-2 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                <p className="flex-1 font-medium text-red-700">{error.message}</p>
                <button
                  type="button"
                  onClick={clearError}
                  aria-label="Dismiss error"
                  className="text-red-400 transition-colors hover:text-red-600"
                >
                  <X size={15} />
                </button>
              </div>
            )}

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isFormDisabled}
                    onChange={clearInputFieldError({
                      fieldOnChange: field.onChange,
                      error,
                      clearError,
                    })}
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link
                      to={ROUTES.FORGOT_PASSWORD}
                      className="text-sm text-red-600 underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Wrapper for input + toggle button */}
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={isFormDisabled}
                      className="pr-10"
                      onChange={clearInputFieldError({
                        fieldOnChange: field.onChange,
                        error,
                        clearError,
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={isFormDisabled}
                      aria-label={showPassword ? "Hide password" : "Show password"} // ← was swapped
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50"
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Submit button  */}
            <Field>
              <Button type="submit" className="w-full" disabled={isSubmitDisabled}>
                {form.formState.isSubmitting || isLoading ? (
                  <>
                    <Spinner />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </Field>

            <FieldSeparator>Or continue with</FieldSeparator>

            {/* OAuth button */}
            <Field className="mt-4 w-full">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                type="button"
                className="flex w-full items-center justify-center gap-2"
                disabled={isFormDisabled}
              >
                <GoogleIcon />
                <span>Google</span>
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link to={ROUTES.REGISTER} className="underline underline-offset-2">
                Sign Up
              </Link>
            </FieldDescription>
          </form>

          {/* Image side, hidden on mobile*/}

          <AuthBrandPanel
            heading={
              <>
                Welcome
                <br />
                back.
              </>
            }
            subheading="Sign in to your Dineza account and pick up where you left off."
          />
        </>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link
          to={EXTERNAL_LINKS.TERMS_OF_SERVICE}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to={EXTERNAL_LINKS.PRIVACY_POLICY}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
};
