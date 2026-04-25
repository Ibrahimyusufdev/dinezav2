import { Construction, type LucideIcon } from "lucide-react";

interface PagePlaceholderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export const PagePlaceholder = ({
  title,
  description = "This page is still being built. Check back soon.",
  icon: Icon = Construction,
}: PagePlaceholderProps) => {
  return (
    <div className="mt-6 flex min-h-[60vh] items-center justify-center">
      <div className="bg-card relative w-full max-w-md overflow-hidden rounded-3xl border p-8 text-center sm:p-10">
        <div
          aria-hidden
          className="bg-primary/5 pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl"
        />
        <div
          aria-hidden
          className="bg-primary/5 pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl"
        />

        <div className="relative">
          <div className="bg-primary/10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
            <Icon className="text-primary h-6 w-6" strokeWidth={2} />
          </div>

          <h2 className="text-foreground mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
          </h2>

          <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
            {description}
          </p>

          <div className="bg-primary/10 text-primary mt-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
            <span className="bg-primary inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
            In development
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePlaceholder;
