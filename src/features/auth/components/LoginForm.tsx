import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MetaIcon, AppleIcon, GoogleIcon } from "@/shared/components/BrandIcons";
import { cn } from "@/lib/utils";

import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

import type { LoginFormData } from "../validations/auth-schemas";
import { loginSchema } from "../validations/auth-schemas";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { EXTERNAL_LINKS, ROUTES } from "@/shared/types/constants";
import { useState } from "react";

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
  const { login } = useLogin();

  // Grab error and isLoading from authstore
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Logic to perform once the form is submitted successfully
  const handleLogin = async (formData: LoginFormData) => {
    await login({ email: formData.email, password: formData.password });
  };

  // Show/Hide password
  const [showPassword, setShowPassword] = useState(false);

  // Disabling form and button
  const isFormDisabled = form.formState.isSubmitting || isLoading;
  const isSubmitDisabled =
    !form.formState.isValid || form.formState.isSubmitting || !form.formState.isDirty || isLoading;

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form side*/}
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6 p-4 md:p-8">
            {/* API error */}
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-500 dark:bg-red-950/30">
                {error}
              </p>
            )}

            {/* Headline */}
            <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">Login to your Dineza account</p>
            </div>

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
                      to={ROUTES.FORGET_PASSWORD}
                      className="text-sm underline-offset-2 hover:underline"
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

            {/* OAuth buttons — stack on mobile, 3-col on sm+ */}
            <Field className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Button
                variant="outline"
                type="button"
                className="flex w-full items-center justify-center gap-2"
              >
                <AppleIcon />
                <span>Apple</span>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex w-full items-center justify-center gap-2"
              >
                <GoogleIcon />
                <span>Google</span>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex w-full items-center justify-center gap-2"
              >
                <MetaIcon />
                <span>Meta</span>
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link to={ROUTES.REGISTER_SELECT} className="underline underline-offset-2">
                Sign Up
              </Link>
            </FieldDescription>
          </form>

          {/* ── Image side — hidden on mobile ── */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/auth/login-bg.jpg"
              alt="Login visual"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
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
