import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthPageShell } from "@/features/auth";
import { Mail, Phone, MessageSquare, BadgeCheck } from "lucide-react";

import { EXTERNAL_LINKS } from "@/shared/types/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Contact Methods
const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: EXTERNAL_LINKS.SUPPORT_EMAIL,
    desc: "We respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: EXTERNAL_LINKS.SUPPORT_PHONE_DISPLAY,
    desc: "Mon – Fri, 9am – 6pm WAT",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    value: "In-app chat",
    desc: "Available after you log in",
  },
];

// Zod Schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email({ pattern: z.regexes.email }),
  subject: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Page
export const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const isFormDisabled = form.formState.isSubmitting;

  const handleSubmit = async (data: ContactFormData) => {
    console.log("Contact form:", data);

    // TODO: Supabase / email service
    setSubmitted(true);
    form.reset();
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-dark py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
          <p className="text-brand-primary mb-4 text-[13px] font-semibold tracking-widest uppercase">
            Get in Touch
          </p>

          <h1
            className="font-display mb-5 leading-tight font-medium text-white"
            style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
          >
            We're here to <em className="text-brand-primary not-italic">help</em>
          </h1>

          <p className="text-xl leading-relaxed text-white/60">
            Questions, issues, or feedback, we’ll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <AuthPageShell>
        <section className="py-16 md:py-24">
          <div className="border-(--brand-gray-200)]/80 mx-auto grid max-w-5xl gap-12 overflow-hidden rounded-2xl border bg-white p-8 px-5 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] sm:p-10 md:grid-cols-2 md:px-10">
            {/* CONTACT METHODS */}
            <div className="">
              <h2 className="font-display text-foreground mb-8 text-[28px] font-medium">
                Other ways to reach us
              </h2>

              <div className="flex flex-col gap-5">
                {CONTACT_METHODS.map(({ icon: Icon, label, value, desc }) => (
                  <div
                    key={label}
                    className="border-border flex items-start gap-4 rounded-2xl border p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-foreground text-xl font-semibold">{label}</p>
                      <p className="text-[15px] font-medium">{value}</p>
                      <p className="text-muted-foreground mt-0.5 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div>
              <h2 className="font-display text-foreground mb-8 text-[28px] font-medium">
                Send us a message
              </h2>

              {submitted ? (
                <div className="border-border bg-brand-primary-light flex flex-col items-center justify-center rounded-2xl border px-8 py-16 text-center">
                  <div className="bg-brand-primary mb-5 flex h-16 w-16 items-center justify-center rounded-full">
                    <BadgeCheck size={28} className="text-white" />
                  </div>

                  <h3 className="font-display text-foreground mb-2 text-[24px] font-medium">
                    Message sent!
                  </h3>

                  <p className="text-muted-foreground text-[15px]">
                    We’ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                  {/* NAME */}
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          placeholder="Your name"
                          disabled={isFormDisabled}
                        />

                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* EMAIL */}
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
                          placeholder="Email address"
                          disabled={isFormDisabled}
                        />

                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* SUBJECT */}
                  <Controller
                    name="subject"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Topic</FieldLabel>

                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isFormDisabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="cash-back">Cash back issue</SelectItem>
                            <SelectItem value="reservation">Reservation problem</SelectItem>
                            <SelectItem value="account">Account & billing</SelectItem>
                            <SelectItem value="restaurant">Restaurant partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>

                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* MESSAGE */}
                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Message</FieldLabel>

                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Tell us what's going on..."
                          disabled={isFormDisabled}
                        />

                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    disabled={isFormDisabled}
                    className="bg-primary w-full text-white"
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </AuthPageShell>
    </>
  );
};
