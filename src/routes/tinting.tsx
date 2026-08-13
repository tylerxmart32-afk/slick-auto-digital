import { createFileRoute } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";

import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import tintingImage from "@/assets/service-tinting.jpg";
import { PHONE_DISPLAY, PHONE_HREF, TINTING_SERVICES } from "@/lib/site";

const TITLE = "Auto Window Tinting in Lakewood, NJ | Slick Auto Spa";
const DESCRIPTION =
  "Ceramic and standard window tinting in Lakewood, NJ. Heat rejection, UV protection, privacy, and legal darkness levels for the Jersey Shore.";

export const Route = createFileRoute("/tinting")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tinting" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tinting" }],
  }),
  component: TintingPage,
});

const TINT_TIERS = [
  {
    name: "Standard Dyed Film",
    body: "Clean looks, solid glare control, and strong privacy at an approachable price. A great fit for daily drivers.",
  },
  {
    name: "Ceramic Film",
    body: "Maximum heat and infrared rejection with no signal interference. Keeps the cabin noticeably cooler through Jersey Shore summers.",
  },
];

function TintingPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal variant="fade-up">
              <p className="text-xs font-semibold tracking-[0.22em] text-steel uppercase">
                Auto Tinting
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={80}>
              <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
                Tint That Blocks Heat, Not Your View
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={160}>
              <p className="mt-4 text-muted-foreground">
                Heat rejection and privacy for the rear glass, installed to factory-quality
                standards — with every job kept fully compliant with New Jersey law.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#quote">Get a Tint Quote</a>
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
          <Reveal variant="scale" delay={120}>
            <img
              src={tintingImage}
              alt="Ceramic tint film being squeegeed onto a car window"
              loading="lazy"
              width={1200}
              height={900}
              className="rounded-lg border border-border object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="fade-up">
            <h2 className="text-2xl font-bold">What We Install</h2>
            <ul className="mt-6 space-y-3">
              {TINTING_SERVICES.map((service) => (
                <li key={service} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="fade-up" delay={80}>
            <h2 className="text-2xl font-bold">Ceramic vs. Standard</h2>
            <div className="mt-6 space-y-5">
              {TINT_TIERS.map((tier) => (
                <div key={tier.name} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-bold">{tier.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              New Jersey does not permit tint on the windshield or front side windows without a
              state medical exemption. Rear windows and the rear windshield have no legal
              darkness limit — we keep every install fully compliant.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="quote" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <Reveal variant="fade-up">
            <h2 className="text-2xl font-bold sm:text-3xl">Get Your Tinting Quote</h2>
          </Reveal>
          <Reveal variant="fade-up" delay={100} className="mt-8">
            <QuoteForm defaultService="Auto Tinting" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
