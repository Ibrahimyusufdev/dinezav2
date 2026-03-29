import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import type { LoginFormData } from "../validations/auth-schemas";
import { loginSchema } from "../validations/auth-schemas";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/useAuthStore";

export const LoginForm = () => {
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
    await login({
      email: formData.email,
      password: formData.password,
    });
  };

  const isFormDisabled = form.formState.isSubmitting || isLoading;
  const isSubmitDisabled =
    !form.formState.isValid || form.formState.isSubmitting || !form.formState.isDirty || isLoading;

  return (
    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
      {/* API error from the store */}
      {error && <p className="text-red-500">{error}</p>}
      {/* Email field */}
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldGroup>
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="off"
                disabled={isFormDisabled}
              />
              <FieldDescription>Please enter a working email</FieldDescription>
              {/* Zod validation error for email field */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </FieldGroup>
        )}
      />

      {/* Password field */}
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
              type="password"
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your password"
              autoComplete="off"
              disabled={isFormDisabled}
            />
            <FieldDescription>Please atleast 8 characters of password</FieldDescription>
            {/* Zod validation error for password field */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Button */}
      <Button type="submit" disabled={isSubmitDisabled}>
        {form.formState.isSubmitting || isLoading ? (
          <>
            <Spinner />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
};
