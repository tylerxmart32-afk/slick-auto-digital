import { createFileRoute } from "@tanstack/react-router";
import { Gauge, Phone, ShieldCheck, Sparkles } from "lucide-react";

import { ContactActions } from "@/components/ContactActions";
import { LocationMap } from "@/components/LocationMap";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import heroCar from "@/assets/hero-car.jpg";
import detailingImage from "@/assets/service-detailing.jpg";
import tintingImage from "@/assets/service-tinting.jpg";
import {
  ADDRESS_LINE,
  DETAILING_SERVICES,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
  TINTING_SERVICES,
} from "@/lib/site";

const TITLE = "Auto Tinting & Detailing in Lakewood, NJ | Slick Auto Spa";
const DESCRIPTION =
  "Premium auto tinting and detailing in Lakewood, NJ. Ceramic tint, paint protection, and showroom detailing for Toms River and the Jersey Shore. Call (732) 693-5154.";

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

function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroCar}
          alt="Black sedan with freshly tinted windows and a polished finish"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <p className="text-xs font-semibold tracking-[0.22em] text-steel uppercase">
            Lakewood, NJ &middot; Serving the Jersey Shore
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
            Premium Auto Tinting &amp; Detailing for the Jersey Shore
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            Professional craftsmanship. Local trust. Lasting results.
          </p>
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <ServiceCard
            image={tintingImage}
            imageAlt="Technician applying ceramic tint film to a car window"
            headline="Professional Auto Tinting"
            description="UV protection. Privacy. Custom darkness levels. Factory-quality results."
            services={TINTING_SERVICES}
            ctaLabel="Explore Tinting"
            ctaTo="/tinting"
          />
          <ServiceCard
            image={detailingImage}
            imageAlt="Polisher buffing glossy black car paint during a detail"
            headline="Expert Auto Detailing"
            description="Deep clean. Protected finish. Showroom results."
            services={DETAILING_SERVICES}
            ctaLabel="Explore Detailing"
            ctaTo="/detailing"
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h2 className="text-2xl font-bold sm:text-3xl">Why Choose Slick Auto Spa?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {WHY_SLICK.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
          <ul className="mt-12 grid gap-3 border-t border-border pt-8 text-sm text-muted-foreground sm:grid-cols-3">
            <li>Trusted by local car owners across the Jersey Shore</li>
            <li>A growing community of 166 followers on Facebook</li>
            <li>100% satisfaction guarantee on every service</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <ContactActions />
      </section>

      <section id="quote" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
          <h2 className="text-2xl font-bold sm:text-3xl">Request Your Quote</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tell us about your vehicle and we&apos;ll follow up with pricing and the next open
            appointment.
          </p>
          <div className="mt-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <LocationMap />
        <p className="sr-only">{ADDRESS_LINE}</p>
      </section>
    </>
  );
}
