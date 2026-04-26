import { LandingID } from "@/shared/types/constants";
import { dinerFeatures, restaurantFeatures, type FeatureItem } from "../data/features.data";

interface FeatureCardProps {
  item: FeatureItem;
  dark?: boolean;
}

const FeatureCard = ({ item, dark = false }: FeatureCardProps) => {
  const { icon: Icon, title, desc } = item;

  return (
    <div
      className={`group rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 sm:p-7 ${
        dark
          ? "bg-brand-dark border-white/10 text-white hover:border-white/20 hover:shadow-xl hover:shadow-black/30"
          : "bg-background border-border text-foreground hover:border-border hover:shadow-lg hover:shadow-black/5"
      }`}
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 ${
          dark
            ? "bg-primary/20 group-hover:bg-primary/30"
            : "bg-primary/10 group-hover:bg-primary/15"
        }`}
      >
        <Icon size={20} className="text-primary" />
      </div>

      <h3 className="font-display mb-2 text-xl font-semibold">{title}</h3>

      <p className={`text-sm leading-relaxed ${dark ? "text-white/60" : "text-muted-foreground"}`}>
        {desc}
      </p>
    </div>
  );
};

interface SectionDividerProps {
  label: string;
}

const SectionDivider = ({ label }: SectionDividerProps) => (
  <p className="text-muted-foreground mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.15em] uppercase">
    <span className="bg-border h-px flex-1" />
    {label}
    <span className="bg-border h-px flex-1" />
  </p>
);

export const FeaturesOverview = () => (
  <section id="features" className="bg-background py-16 sm:py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
      {/* Header */}
      <div className="mb-12 text-center sm:mb-16">
        <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Why Dineza
        </p>

        <h2 className="font-display text-foreground text-[clamp(1.75rem,5vw,3.25rem)] leading-tight font-medium">
          Everything you need, <span className="text-primary italic">nothing you don't</span>
        </h2>
      </div>

      {/* Diners */}
      <div className="mb-16 sm:mb-20" id={LandingID.FOR_WOMEN}>
        <SectionDivider label="For Diners" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {dinerFeatures.map((item) => (
            <FeatureCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div id={LandingID.FOR_RESTAURANT}>
        <SectionDivider label="For Restaurants" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {restaurantFeatures.map((item) => (
            <FeatureCard key={item.title} item={item} dark />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesOverview;
