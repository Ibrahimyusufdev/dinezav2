import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import type { RestaurantOnboardData } from "../validations/auth-schemas";
import { restaurantOnboardSchema } from "../validations/auth-schemas";

import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";

import {
  User,
  Phone,
  MapPin,
  Mail,
  Building2,
  Upload,
  X,
  AlertCircle,
  UtensilsCrossed,
  FileText,
} from "lucide-react";

import { useState, useRef } from "react";
import { useOnboardRestaurant } from "../queries/useOnboardRestaurant";
import { EXTERNAL_LINKS } from "@/shared/types/constants";

// constants
const CUISINE_OPTIONS = [
  "Nigerian",
  "Continental",
  "Italian",
  "Chinese",
  "American",
  "African",
  "Seafood",
  "BBQ",
  "Vegetarian",
  "Vegan",
  "Fast Food",
  "Pastry & Bakery",
];

export const RestaurantOnboardingForm = () => {
  // States for files and preview
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);

  const {
    mutateAsync: onboardRestaurant,
    isPending,
    error,
    reset: resetMutation,
  } = useOnboardRestaurant();

  const form = useForm<RestaurantOnboardData>({
    resolver: zodResolver(restaurantOnboardSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      restaurantName: "",
      businessEmail: "",
      contactName: "",
      contactPhone: "",
      address: "",
      cuisineType: [],
      agreeToTerms: false,
    },
  });

  // Func to handle logo change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      form.setError("root", { message: "Please upload a valid image file" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      form.setError("root", { message: "Image must be less than 5MB" });
      return;
    }

    setLogoFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Listen to logo remove and update state
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    form.clearErrors("root");
  };

  // Funct to handle Restaurant Images changes
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  // Listen to restaurant images remove and update state
  const removeImage = (idx: number) => {
    URL.revokeObjectURL(imagePreviews[idx]);
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // Funct to handle Restaurant docs changes
  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])]);
    e.target.value = "";
  };

  // Listen to restaurant docs remove and update state
  const removeDoc = (idx: number) => {
    setDocumentFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (formData: RestaurantOnboardData) => {
    try {
      await onboardRestaurant({
        firstName: formData.firstName,
        lastName: formData.lastName,
        restaurantName: formData.restaurantName,
        businessEmail: formData.businessEmail,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        address: formData.address,
        cuisineType: formData.cuisineType,
        ...(logoFile && { logoFile }),
        ...(imageFiles.length > 0 && { imageFiles }),
        ...(documentFiles.length > 0 && { documentFiles }),
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
                Set Up Your Restaurant
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Tell us about your restaurant to get listed
              </p>
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

          {/* Owner Details */}
          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Owner Details
            </p>
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
          </div>

          {/* Restaurant Info */}
          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Restaurant Info
            </p>
            <div className="space-y-4">
              <Controller
                name="restaurantName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Restaurant Name</FieldLabel>
                    <div className="relative">
                      <Building2
                        size={18}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. The Golden Fork"
                        disabled={isFormDisabled}
                        className="h-11 pl-10"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="businessEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Business Email</FieldLabel>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="reservations@restaurant.com"
                        autoComplete="email"
                        disabled={isFormDisabled}
                        className="h-11 pl-10"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Restaurant Address</FieldLabel>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="12 Victoria Island, Lagos"
                        disabled={isFormDisabled}
                        className="h-11 pl-10"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Cuisine Type */}
              <Controller
                name="cuisineType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Cuisine Type
                      {field.value.length > 0 && (
                        <span className="ml-2 rounded-full bg-[#FF5900]/10 px-2 py-0.5 text-xs font-medium text-[#FF5900]">
                          {field.value.length} selected
                        </span>
                      )}
                    </FieldLabel>
                    <FieldDescription>Select all that apply</FieldDescription>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {CUISINE_OPTIONS.map((cuisine) => {
                        const selected = field.value.includes(cuisine);
                        return (
                          <button
                            key={cuisine}
                            type="button"
                            disabled={isFormDisabled}
                            onClick={() =>
                              field.onChange(
                                selected
                                  ? field.value.filter((c) => c !== cuisine)
                                  : [...field.value, cuisine]
                              )
                            }
                            className={[
                              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                              selected
                                ? "border-[#FF5900]/30 bg-[#FF5900]/10 text-[#FF5900]"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
                              "disabled:cursor-not-allowed disabled:opacity-50",
                            ].join(" ")}
                          >
                            {selected && <span className="mr-1 text-[10px]">✓</span>}
                            {cuisine}
                          </button>
                        );
                      })}
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* Contact Person */}
          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Contact Person
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="contactName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <div className="relative">
                      <User
                        size={18}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Manager or Owner"
                        disabled={isFormDisabled}
                        className="h-11 pl-10"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="contactPhone"
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
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* Media & Documents */}
          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Media & Documents
            </p>
            <div className="space-y-4">
              {/* Logo */}
              <Field>
                <FieldLabel>Restaurant Logo (Optional)</FieldLabel>
                <div className="flex items-center gap-4">
                  {logoPreview ? (
                    <div className="relative">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="size-20 rounded-xl object-cover ring-2 ring-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        disabled={isFormDisabled}
                        aria-label="Remove logo"
                        className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-50"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="ring-dashed flex size-20 items-center justify-center rounded-xl bg-gray-50 ring-2 ring-gray-200">
                      <Building2 size={28} className="text-gray-300" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      disabled={isFormDisabled}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isFormDisabled}
                      onClick={() => logoInputRef.current?.click()}
                      className="h-10"
                    >
                      <Upload size={16} />
                      Upload Logo
                    </Button>
                    <FieldDescription className="mt-2">PNG, JPG up to 5MB.</FieldDescription>
                  </div>
                </div>
                {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}
              </Field>

              {/* Restaurant Photos */}
              <Field>
                <FieldLabel>Restaurant Photos (Optional)</FieldLabel>
                <FieldDescription>
                  Interior, dishes, ambience - multiple files allowed
                </FieldDescription>
                <div className="mt-1">
                  <input
                    ref={imagesInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    disabled={isFormDisabled}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isFormDisabled}
                    onClick={() => imagesInputRef.current?.click()}
                    className="h-10"
                  >
                    <Upload size={16} />
                    Add Photos
                  </Button>
                </div>
                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="group relative aspect-square">
                        <img
                          src={src}
                          alt={`Restaurant photo ${i + 1}`}
                          className="size-full rounded-lg object-cover ring-1 ring-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          aria-label="Remove photo"
                          className="absolute -top-1.5 -right-1.5 hidden size-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm group-hover:flex hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Field>

              {/* Documents */}
              <Field>
                <FieldLabel>Business Documents (Optional)</FieldLabel>
                <FieldDescription>CAC certificate, food safety permit, menu, etc.</FieldDescription>
                <div className="mt-1">
                  <input
                    ref={docsInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleDocsChange}
                    disabled={isFormDisabled}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isFormDisabled}
                    onClick={() => docsInputRef.current?.click()}
                    className="h-10"
                  >
                    <FileText size={16} />
                    Attach Documents
                  </Button>
                </div>
                {documentFiles.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {documentFiles.map((doc, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                      >
                        <FileText size={14} className="shrink-0 text-gray-400" />
                        <span className="flex-1 truncate text-gray-700">{doc.name}</span>
                        <span className="shrink-0 text-xs text-gray-400">
                          {(doc.size / 1024).toFixed(0)} KB
                        </span>
                        <button
                          type="button"
                          onClick={() => removeDoc(i)}
                          aria-label={`Remove ${doc.name}`}
                          className="shrink-0 text-gray-400 transition-colors hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Field>
            </div>
          </div>

          {/* Terms */}
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

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-white shadow-none transition-all hover:bg-[#e04f00] focus-visible:ring-[#FF5900]/40 disabled:opacity-50"
          >
            {isFormDisabled ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Setting up your restaurant...
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

export default RestaurantOnboardingForm