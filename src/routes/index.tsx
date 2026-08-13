import { createFileRoute } from "@tanstack/react-router";
import { Gauge, Phone, ShieldCheck, Sparkles } from "lucide-react";

import { ContactActions } from "@/components/ContactActions";
import { LocationMap } from "@/components/LocationMap";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/motion/CountUp";
import { HeroVideo } from "@/components/motion/HeroVideo";
import { Marquee } from "@/components/motion/Marquee";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import heroCar from "@/assets/hero-car.jpg";
import detailingImage from "@/assets/service-detailing.jpg";
import tintingImage from "@/assets/service-tinting.jpg";
import {
  ADDRESS_LINE,
  DETAILING_SERVICES,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
  SERVICE_AREA_TOWNS,
  TINTING_SERVICES,
} from "@/lib/site";

const TITLE = "Auto Detailing & Tinting in Lakewood, NJ | Slick Auto Spa";
const DESCRIPTION =
  "Premium auto detailing and window tinting in Lakewood, NJ. Ceramic coating, paint correction, and showroom detailing for Toms River and the Jersey Shore. Call (732) 693-5154.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDetailing",
          name: "Slick Auto Spa",
          description: DESCRIPTION,
          telephone: PHONE_DISPLAY,
          email: EMAIL,
          address: {
            "@type": "PostalAddress",
            streetAddress: "1745 Lakewood Rd Unit 1",
            addressLocality: "Lakewood",
            addressRegion: "NJ",
            postalCode: "08701",
            addressCountry: "US",
          },
          areaServed: ["Lakewood NJ", "Toms River NJ", "Ocean County NJ", "Jersey Shore"],
        }),
      },
    ],
  }),
  component: HomePage,
});

const WHY_SLICK = [
  {
    icon: Sparkles,
    title: "Precision Craftsmanship",
    body: "Local experts with years of hands-on experience on every make and model.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Materials",
    body: "Only top-tier tint films and professional-grade detailing products.",
  },
  {
    icon: Gauge,
    title: "Fast Turnaround",
    body: "Most services completed same-day or next-day, so you're back on the road.",
  },
];

const STATS = [
  { value: 166, suffix: "", label: "Facebook followers and growing" },
  { value: 100, suffix: "%", label: "Satisfaction guarantee on every job" },
  { value: 8, suffix: "", label: "Jersey Shore towns in our service area" },
];

function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Parallax className="absolute inset-0 -z-10" strength={0.12}>
          <HeroVideo
            posterSrc={heroCar}
            posterAlt="Black sedan with freshly tinted windows and a polished finish"
            width={1920}
            height={1280}
            className="size-full"
          />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="radial-glow absolute inset-x-0 top-0 -z-10 h-[60%]" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <Reveal variant="fade-up" delay={0}>
            <p className="text-xs font-semibold tracking-[0.22em] text-steel uppercase">
              Lakewood, NJ &middot; Serving the Jersey Shore
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={80}>
            <h1 className="mt-5 max-w-2xl text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
              A <span className="metallic-text">Showroom Finish</span> for the Jersey Shore
            </h1>
          </Reveal>
          <Reveal variant="fade-up" delay={160}>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Premium auto detailing and window tinting. Professional craftsmanship. Local trust.
              Lasting results.
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#quote">Book Your Appointment</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={PHONE_HREF}>
                  <Phone className="size-4" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="border-y border-border bg-surface py-4">
        <Marquee label="Areas we serve" durationSeconds={36}>
          {SERVICE_AREA_TOWNS.map((town) => (
            <span key={town} className="hairline-rule px-2 text-sm font-medium text-muted-foreground">
              {town}, NJ
            </span>
          ))}
        </Marquee>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <RevealGroup as="div" stagger={90} className="grid gap-6 md:grid-cols-2">
          <ServiceCard
            index={0}
            image={detailingImage}
            imageAlt="Polisher buffing glossy black car paint during a detail"
            headline="Expert Auto Detailing"
            description="Deep clean. Protected finish. Showroom results."
            services={DETAILING_SERVICES}
            ctaLabel="Explore Detailing"
            ctaTo="/detailing"
          />
          <ServiceCard
            index={1}
            image={tintingImage}
            imageAlt="Technician applying ceramic tint film to a car window"
            headline="Professional Auto Tinting"
            description="UV protection. Privacy. Custom darkness levels. Factory-quality results."
            services={TINTING_SERVICES}
            ctaLabel="Explore Tinting"
            ctaTo="/tinting"
          />
        </RevealGroup>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <RevealGroup as="div" stagger={100} className="grid gap-8 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} variant="fade-up" index={i} className="text-center sm:text-left">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  as="p"
                  className="font-display text-4xl font-extrabold text-foreground sm:text-5xl"
                />
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal variant="fade-up">
          <h2 className="text-2xl font-bold sm:text-3xl">Why Choose Slick Auto Spa?</h2>
        </Reveal>
        <RevealGroup as="div" stagger={90} className="mt-10 grid gap-8 sm:grid-cols-3">
          {WHY_SLICK.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} variant="fade-up" index={i}>
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal variant="fade" delay={200}>
          <ul className="mt-12 grid gap-3 border-t border-border pt-8 text-sm text-muted-foreground sm:grid-cols-3">
            <li>Trusted by local car owners across the Jersey Shore</li>
            <li>A growing community on Facebook</li>
            <li>100% satisfaction guarantee on every service</li>
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal variant="fade-up">
          <ContactActions />
        </Reveal>
      </section>

      <section id="quote" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
          <Reveal variant="fade-up">
            <h2 className="text-2xl font-bold sm:text-3xl">Request Your Quote</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Tell us about your vehicle and we&apos;ll follow up with pricing and the next open
              appointment.
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={100} className="mt-8">
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal variant="fade-up">
          <LocationMap />
        </Reveal>
        <p className="sr-only">{ADDRESS_LINE}</p>
      </section>
    </>
  );
}
