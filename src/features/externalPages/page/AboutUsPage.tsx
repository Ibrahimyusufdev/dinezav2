import { Link } from "react-router-dom";
import { Heart, Shield, Sparkles, ArrowUpRight } from "lucide-react";
import { EXTERNAL_LINKS, ROUTES } from "@/shared/types/constants";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/shared/components/BrandIcons";

const VALUES = [
  {
    icon: Heart,
    title: "Women First",
    desc: "Everything we build starts with a simple question: does this make dining more rewarding for women? If the answer isn't yes, we don't ship it.",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    desc: "No hidden fees, no fine print traps. Your 25% cash back is exactly that - 25% of every naira spent at a partner restaurant, no asterisks.",
  },
  {
    icon: Sparkles,
    title: "Excellence by Default",
    desc: "We only partner with restaurants that meet our quality bar. Your time is precious - the venues you're sent to should feel that way.",
  },
];

const TEAM = [
  {
    name: "Ibrahim Yusuf",
    role: "Software Engineer",
    color: "#E8A87C",
    initials: "IY",
    image: "/images/team/Ibrahim.JPG",
    bio: "Ibrahim leads the engineering at Dineza, architecting the systems that power seamless reservations and real-time cash-back processing. With a background in full-stack development and a sharp eye for scalable infrastructure, he makes sure every feature ships fast and runs clean.",
    quote: "Good software should be invisible - you only notice it when it's broken.",
    tags: ["React", "NextJs", "TypeScript", "Supabase", "Node.js"],
    socials: {
      github: EXTERNAL_LINKS.GITHUB,
      linkedin: EXTERNAL_LINKS.LINKEDIN,
      twitter: "#",
    },
  },
  {
    name: "Aminu Abdulrasheed",
    role: "Product Designer",
    color: "#C27BA0",
    initials: "AA",
    image: "/images/team/Lanky.jpg",
    bio: "Aminu shapes how Dineza feels, from the first tap on the app to the moment a diner receives her cash back notification. He brings a considered, human-centered approach to every screen, ensuring the experience is as refined as the restaurants we partner with.",
    quote: "Design isn't just how it looks. It's how it makes you feel when everything works.",
    tags: ["Product Design", "Figma", "UX Research", "Brand"],
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

export const AboutUsPage = () => (
  <>
    {/* Hero  */}
    <section className="bg-brand-dark relative overflow-hidden py-24 md:py-32">
      {/* Subtle radial glow behind headline */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(var(--brand-primary-rgb, 201,155,109), 0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-10">
        <span className="text-brand-primary mb-5 inline-block text-xs font-semibold tracking-[0.2em] uppercase">
          Our Story
        </span>
        <h1
          className="mb-6 leading-tight font-medium text-white"
          style={{ fontSize: "clamp(40px, 6vw, 68px)" }}
        >
          Built for women who <em className="text-brand-primary not-italic">value their time</em>
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-white/55">
          Dineza was born from a simple belief — that women's time, presence, and social energy has
          real, tangible value. We built the platform that actually rewards it.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <span className="text-brand-primary mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase">
              Our Mission
            </span>
            <h2
              className="text-foreground mb-5 leading-tight font-medium"
              style={{ fontSize: "clamp(32px, 4vw, 46px)" }}
            >
              Make every dinner worth it
            </h2>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              Dating culture has long expected women to show up, look great, and give their time
              freely. Dineza flips that dynamic - you dine, you earn, full stop.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              We've partnered with premium restaurants across Nigeria to make sure every reservation
              you make through Dineza puts money back in your pocket within 7 days.
            </p>
          </div>

          {/* Stat card */}
          <div className="bg-brand-primary-light flex flex-col items-center justify-center rounded-3xl px-10 py-14 text-center">
            <p
              className="text-brand-primary mb-1 leading-none font-medium"
              style={{ fontSize: "clamp(72px, 10vw, 108px)" }}
            >
              25%
            </p>
            <p className="text-foreground mt-2 text-lg font-semibold">Cash back on every visit</p>
            <p className="text-muted-foreground mt-1.5 text-sm">No cap. No fine print.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-brand-dark py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <div className="mb-14 text-center">
          <span className="text-brand-primary mb-3 inline-block text-xs font-semibold tracking-[0.2em] uppercase">
            What we stand for
          </span>
          <h2
            className="leading-tight font-medium text-white"
            style={{ fontSize: "clamp(32px, 4vw, 46px)" }}
          >
            Our values
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-brand-dark-card group rounded-2xl border border-white/8 p-8 transition-colors hover:border-white/20"
            >
              <div className="bg-brand-primary/15 mb-6 flex h-11 w-11 items-center justify-center rounded-xl">
                <Icon size={20} className="text-brand-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
              <p className="text-base leading-relaxed text-white/55">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-brand-primary mb-3 inline-block text-xs font-semibold tracking-[0.2em] uppercase">
            The Team
          </span>
          <h2
            className="text-foreground leading-tight font-medium"
            style={{ fontSize: "clamp(32px, 4vw, 46px)" }}
          >
            The people behind Dineza
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-base leading-relaxed">
            A small, focused team obsessed with building something women actually love using.
          </p>
        </div>

        {/* Team cards */}
        <div className="flex flex-col gap-8">
          {TEAM.map(({ name, role, color, initials, image, bio, quote, tags, socials }) => (
            <div
              key={name}
              className="group overflow-hidden rounded-3xl border border-black/6 bg-[#FAFAF9] transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: avatar + name block */}
                <div className="relative flex flex-col items-center justify-center px-10 py-12 md:w-72 md:shrink-0 md:items-start">
                  {/* Large avatar */}
                  <Avatar className="mb-6 h-28 w-28 rounded-2xl shadow-md">
                    <AvatarImage src={image} alt={name} className="object-cover" />
                    <AvatarFallback
                      style={{ background: color }}
                      className="text-3xl font-bold text-white"
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <p className="text-foreground text-xl leading-tight font-semibold">{name}</p>
                  <p className="text-muted-foreground mt-1 text-xs font-medium">{role}</p>

                  {/* Socials */}
                  <div className="mt-5 flex items-center gap-3">
                    {socials.github && (
                      <a
                        href={socials.github}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                      >
                        <GitHubIcon size={17} />
                      </a>
                    )}
                    {socials.linkedin && (
                      <a
                        href={socials.linkedin}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon size={17} />
                      </a>
                    )}
                    {socials.twitter && (
                      <a
                        href={socials.twitter}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Twitter / X"
                      >
                        <TwitterIcon size={17} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: details */}
                <div className="flex flex-1 flex-col justify-center px-10 py-12">
                  {/* Quote */}
                  <blockquote className="text-muted-foreground mb-5 text-base leading-snug font-medium italic">
                    "{quote}"
                  </blockquote>

                  {/* Bio */}
                  <p className="text-muted-foreground mb-7 text-base leading-relaxed">{bio}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-foreground rounded-full border border-black/8 bg-white px-3.5 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-brand-primary-light border-border border-t py-20">
      <div className="mx-auto max-w-xl px-5 text-center">
        <h2
          className="text-foreground mb-3 font-medium"
          style={{ fontSize: "clamp(28px, 4vw, 36px)" }}
        >
          Ready to start earning?
        </h2>
        <p className="text-muted-foreground mb-8 text-base leading-relaxed">
          Join thousands of women turning their social lives into something that pays.
        </p>
        <Link
          to={ROUTES.REGISTER}
          className="bg-brand-primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
        >
          Create Your Account
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  </>
);

export default AboutUsPage;
