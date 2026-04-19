import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleIcon } from "@/shared/components/BrandIcons";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import { passwordRules, PasswordChecklist } from "./PasswordChecklist";

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
import { Card, } from "@/components/ui/card";
import { Eye, EyeOff, X } from "lucide-react";
import { AuthBrandPanel } from "./AuthBrandPanel";

import type { RegisterFormData } from "../validations/auth-schemas";
import { registerSchema } from "../validations/auth-schemas";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { EXTERNAL_LINKS, ROUTES } from "@/shared/types/constants";
import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { toast } from "sonner";
import { clearInputFieldError } from "@/shared/helpers/clearInputFieldError";

export const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  // Wiring up the form for using useForm from rhf
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Grab login from useRegister hook
  const { register } = useRegister();
  const { handleGoogleLogin } = useLogin();

  // Grab error and isLoading from authstore
  // Grab error and isLoading from authstore
  const { error, isLoading, clearError, setEmail } = useAuthStore(
    useShallow((state) => ({
      error: state.error,
      isLoading: state.isLoading,
      clearError: state.clearError,
      setEmail: state.setEmail,
    }))
  );

  // Show/Hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Clear API error from any component once user, if user mount from there
  useEffect(() => {
    if (!error) return;
    clearError();
    toast.dismiss();
  }, []);

  // Disabling form and button
  const isFormDisabled = form.formState.isSubmitting || isLoading;
  const isSubmitDisabled = !form.formState.isValid || form.formState.isSubmitting || isLoading;

  // Logic to perform once the form is submitted successfully
  const handleRegister = async (formData: RegisterFormData) => {
    await register({
      email: formData.email,
      password: formData.password,
    });
    setEmail(formData.email)
  };

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden rounded-2xl border border-gray-200/80 p-0 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.08)] lg:grid lg:grid-cols-[1fr_1.1fr]">
        <>
          {/* Form side*/}
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-6 p-4 sm:p-8 md:p-8 lg:p-10"
          >
            {/* Headline */}
            <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
              <h1 className="text-2xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground text-balance">Sign Up to use Dineza</p>
            </div>

            {/* API/Server error */}
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="animate-in fade-in slide-in-from-top-2 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
              >
                <div className="flex items-center gap-2">
                  <p className="font-medium">{error.message}</p>
                  {error.code === "EMAIL_EXISTS" && (
                    <Link to={ROUTES.LOGIN} className="underline">
                      Sign in instead?
                    </Link>
                  )}
                </div>
                <button
                  type="button"
                  onClick={clearError}
                  className="text-red-600 transition-colors hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  aria-label="Dismiss error"
                >
                  <X size={18} />
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
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  {/* Wrapper for input + toggle button */}
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="new-password"
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
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50"
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>

                  {field.value && !passwordRules.every((rule) => rule.test(field.value)) && (
                    <PasswordChecklist value={field.value} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                  {/* Wrapper for input + toggle button */}
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="new-password"
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
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      disabled={isFormDisabled}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"} // ← was swapped
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50"
                    >
                      {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
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
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
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
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} className="underline underline-offset-2">
                Sign In
              </Link>
            </FieldDescription>
          </form>

          {/* Images side, hidden on mobile */}
          <AuthBrandPanel
            heading={
              <>
                Your table
                <br />
                awaits.
              </>
            }
            subheading="Join thousands of diners and restaurants already on Dineza."
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
