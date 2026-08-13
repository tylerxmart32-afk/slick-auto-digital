import { createFileRoute } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";

import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import detailingImage from "@/assets/service-detailing.jpg";
import { DETAILING_SERVICES, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

const TITLE = "Car Detailing in Lakewood, NJ | Slick Auto Spa";
const DESCRIPTION =
  "Multi-step auto detailing in Lakewood, NJ: interior deep cleaning, paint correction, ceramic coating, and wax for Toms River and the Jersey Shore.";

export const Route = createFileRoute("/detailing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/detailing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/detailing" }],
  }),
  component: DetailingPage,
});

const PROCESS = [
  {
    step: "01",
    title: "Decontaminate",
    body: "Foam wash, wheel and trim cleaning, and a clay treatment that lifts embedded contaminants a wash alone can't touch.",
  },
  {
    step: "02",
    title: "Correct",
    body: "Machine polishing removes swirl marks and restores depth to the clear coat — a finite resource, done right the first time.",
  },
  {
    step: "03",
    title: "Protect",
    body: "Wax, sealant, or ceramic coating matched to how you drive and store the vehicle, applied only after the paint is fully corrected.",
  },
  {
    step: "04",
    title: "Refresh Inside",
    body: "Interior vacuum, surface cleaning, and conditioning for leather and trim.",
  },
];

const COATING_TIERS = [
  {
    name: "Wax",
    body: "A carnauba film that sits on the surface. Deep, warm shine — but it breaks down fast under sun and heat, typically weeks to a few months.",
  },
  {
    name: "Sealant",
    body: "A synthetic polymer with stronger hold than wax. Good mid-tier protection, usually good for several months to a year.",
  },
  {
    name: "Ceramic Coating",
    body: "Cures into a cross-linked silica layer that bonds far more tenaciously than wax or sealant, with real multi-year durability when maintained.",
  },
];

function DetailingPage() {
  return (
    <>
      <section className="relative border-b border-border bg-surface">
        <div className="radial-glow absolute inset-x-0 top-0 -z-10 h-full" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal variant="fade-up">
              <p className="text-xs font-semibold tracking-[0.22em] text-steel uppercase">
                Auto Detailing
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={80}>
              <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
                A <span className="metallic-text">Showroom Finish</span>, Inside and Out
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={160}>
              <p className="mt-4 text-muted-foreground">
                Deep clean. Protected finish. Showroom results — with a multi-step process built
                around your vehicle&apos;s condition, not a one-size package.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#quote">Get a Detailing Quote</a>
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
          <Reveal variant="scale" delay={120} className="spotlight-card overflow-hidden rounded-lg">
            <img
              src={detailingImage}
              alt="Machine polisher restoring gloss to black car paint"
              loading="lazy"
              width={1200}
              height={900}
              className="relative z-[2] rounded-lg border border-border object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal variant="fade-up">
              <h2 className="text-2xl font-bold">Services</h2>
            </Reveal>
            <RevealGroup as="ul" stagger={60} className="mt-6 space-y-3">
              {DETAILING_SERVICES.map((service, i) => (
                <Reveal key={service} as="li" variant="fade-up" index={i} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{service}</span>
                </Reveal>
              ))}
            </RevealGroup>

            <div className="mt-10 rounded-lg border border-border bg-card p-6">
              <Reveal variant="fade-up">
                <h3 className="font-bold">Protection, Honestly Compared</h3>
              </Reveal>
              <RevealGroup as="div" stagger={70} className="mt-4 space-y-4">
                {COATING_TIERS.map((tier, i) => (
                  <Reveal key={tier.name} variant="fade-up" index={i}>
                    <p className="text-sm font-semibold text-foreground">{tier.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{tier.body}</p>
                  </Reveal>
                ))}
              </RevealGroup>
            </div>
          </div>

          <div>
            <Reveal variant="fade-up">
              <h2 className="text-2xl font-bold">Our Multi-Step Process</h2>
            </Reveal>
            <RevealGroup as="ol" stagger={90} className="mt-6 space-y-5">
              {PROCESS.map((item, i) => (
                <Reveal
                  key={item.step}
                  as="li"
                  variant="fade-up"
                  index={i}
                  className="relative overflow-hidden rounded-lg border border-border bg-card p-5"
                >
                  <span className="font-display text-sm font-bold text-primary">{item.step}</span>
                  <h3 className="mt-1 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </Reveal>
              ))}
            </RevealGroup>
            <Reveal variant="fade" delay={150}>
              <p className="mt-6 text-sm text-muted-foreground">
                A car realistically tolerates only a few heavy corrections in its lifetime — we
                do it once, do it right, then protect it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <Reveal variant="fade-up">
            <h2 className="text-2xl font-bold sm:text-3xl">Get Your Detailing Quote</h2>
          </Reveal>
          <Reveal variant="fade-up" delay={100} className="mt-8">
            <QuoteForm defaultService="Auto Detailing" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
