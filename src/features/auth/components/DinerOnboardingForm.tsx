import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dinerOnboardSchema } from "../validations/auth-schemas";
import type { DinerOnboardData } from "../validations/auth-schemas";
import { formatInternationalPhone } from "@/shared/helpers/formatPhoneNumber";

import { EXTERNAL_LINKS } from "@/shared/types/constants";
import { Link } from "react-router-dom";

import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";

import { User, Phone, MapPin, Upload, X, AlertCircle, UtensilsCrossed } from "lucide-react";

import { LocationSelect } from "./LocationSelect";
import { useState } from "react";
import { useOnboardDiner } from "../queries/useOnboardDiner";

export const DinerOnboardingForm = () => {
  // Avatar and avatar preview
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<DinerOnboardData>({
    resolver: zodResolver(dinerOnboardSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      preferredDiningLocations: [],
      agreeToTerms: false,
    },
  });

  // Grabbing mutation from useOnboardDiner hook
  const { mutateAsync: onboardDiner, isPending, error, reset: resetMutation } = useOnboardDiner();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      form.setError("root", { message: "Please upload a valid image file" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      form.setError("root", { message: "Image size must be less than 5MB" });
      return;
    }

    setAvatarImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarImage(null);
    setAvatarPreview(null);
    form.clearErrors("root");
  };

  const handleSubmit = async (formData: DinerOnboardData) => {
    try {
      await onboardDiner({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        preferredDiningLocations: formData.preferredDiningLocations,
        avatarFile: avatarImage,
      });
    } catch (err) {
      console.error("Onboarding error:", err);
    }
  };

  const isFormDisabled = form.formState.isSubmitting || isPending;
  const isSubmitDisabled = !form.formState.isValid || isFormDisabled;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="border-b border-gray-100 bg-gradient-to-br from-[#FF5900]/5 to-transparent p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#FF5900]/10 ring-1 ring-[#FF5900]/20">
              <UtensilsCrossed size={24} className="text-[#FF5900]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-950">
                Complete Your Profile
              </h1>
              <p className="mt-1 text-sm text-gray-500">Tell us about yourself to get started</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-8">
          {/* API Error */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="animate-in fade-in slide-in-from-top-2 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm shadow-sm duration-300"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
              <p className="flex-1 leading-relaxed font-medium text-red-800">
                {error instanceof Error ? error.message : "Something went wrong"}
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

          {/* Profile Image Upload */}
          <Field>
            <FieldLabel>Profile Photo (Optional)</FieldLabel>
            <div className="flex items-center gap-4">
              {avatarPreview ? (
                <div className="relative">
                  <img
                    src={avatarPreview}
                    alt="Profile preview"
                    className="size-20 rounded-xl object-cover ring-2 ring-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeAvatar}
                    disabled={isFormDisabled}
                    aria-label="Remove photo"
                    className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-50"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="ring-dashed flex size-20 items-center justify-center rounded-xl bg-gray-50 ring-2 ring-gray-200">
                  <User size={32} className="text-gray-300" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={isFormDisabled}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={isFormDisabled}
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                  className="h-10"
                >
                  <Upload size={16} />
                  Upload Photo
                </Button>
                <FieldDescription className="mt-2">JPG, PNG or GIF. Max 5MB.</FieldDescription>
              </div>
            </div>
            {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}
          </Field>

          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                  <div className="relative">
                    <User
                      size={18}
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                      aria-hidden="true"
                    />
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="John"
                      autoComplete="given-name"
                      disabled={isFormDisabled}
                      className="h-11 pl-10"
                    />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                  <div className="relative">
                    <User
                      size={18}
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                      aria-hidden="true"
                    />
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Doe"
                      autoComplete="family-name"
                      disabled={isFormDisabled}
                      className="h-11 pl-10"
                    />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Phone Number */}
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                <div className="relative">
                  <Phone
                    size={18}
                    className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                  />
                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    placeholder="+234 800 000 0000"
                    autoComplete="tel"
                    disabled={isFormDisabled}
                    className="h-11 pl-10"
                    value={field.value ? formatInternationalPhone(field.value) : ""}
                    onChange={
                      (e) => field.onChange(e.target.value.replace(/[^\d+]/g, "")) // keep only digits/+ in state
                    }
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Preferred Dining Locations */}
          <Controller
            name="preferredDiningLocations"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="location-select">
                  <MapPin size={16} className="inline" aria-hidden="true" /> Preferred Dining
                  Locations
                </FieldLabel>
                <FieldDescription>
                  Select cities where you'd like to discover restaurants
                </FieldDescription>
                <LocationSelect
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isFormDisabled}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Terms and Conditions */}
          <Controller
            name="agreeToTerms"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <Checkbox
                    id="agreeToTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isFormDisabled}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="agreeToTerms"
                      className="cursor-pointer text-sm leading-relaxed text-gray-700"
                    >
                      I agree to Dineza's{" "}
                      <Link
                        to={EXTERNAL_LINKS.TERMS_OF_SERVICE}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-[#FF5900] underline-offset-2 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to={EXTERNAL_LINKS.PRIVACY_POLICY}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-[#FF5900] underline-offset-2 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                    </label>
                    {fieldState.invalid && (
                      <p className="mt-1 text-xs text-red-600">{fieldState.error?.message}</p>
                    )}
                  </div>
                </div>
              </Field>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="h-12 w-full rounded-xl bg-[#FF5900] text-base font-semibold text-white shadow-none transition-all hover:bg-[#e04f00] focus-visible:ring-[#FF5900]/40 disabled:opacity-50"
          >
            {isFormDisabled ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Setting up your profile...
              </span>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};