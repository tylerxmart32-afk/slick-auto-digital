import { createFileRoute } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";

import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import detailingImage from "@/assets/service-detailing.jpg";
import { DETAILING_SERVICES, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

const TITLE = "Car Detailing in Lakewood, NJ | Slick Auto Spa";
const DESCRIPTION =
  "Multi-step auto detailing in Lakewood, NJ: interior deep cleaning, paint polishing, ceramic coating, and wax for Toms River and the Jersey Shore.";

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
  { step: "01", title: "Decontaminate", body: "Foam wash, wheel and trim cleaning, and a clay treatment that strips embedded grit." },
  { step: "02", title: "Correct", body: "Machine polishing that removes swirl marks and restores depth to the paint." },
  { step: "03", title: "Protect", body: "Wax, sealant, or ceramic coating matched to how you drive and store the vehicle." },
  { step: "04", title: "Refresh Inside", body: "Interior vacuum, surface cleaning, and conditioning for leather and trim." },
];

function DetailingPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-steel uppercase">
              Auto Detailing
            </p>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
              A Showroom Finish, Inside and Out
            </h1>
            <p className="mt-4 text-muted-foreground">
              Deep clean. Protected finish. Showroom results — with a multi-step process built
              around your vehicle&apos;s condition, not a one-size package.
            </p>
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
          </div>
          <img
            src={detailingImage}
            alt="Machine polisher restoring gloss to black car paint"
            loading="lazy"
            width={1200}
            height={900}
            className="rounded-lg border border-border object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Services</h2>
            <ul className="mt-6 space-y-3">
              {DETAILING_SERVICES.map((service) => (
                <li key={service} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Our Multi-Step Process</h2>
            <ol className="mt-6 space-y-5">
              {PROCESS.map((item) => (
                <li key={item.step} className="rounded-lg border border-border bg-card p-5">
                  <span className="font-display text-sm font-bold text-primary">{item.step}</span>
                  <h3 className="mt-1 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">Get Your Detailing Quote</h2>
          <div className="mt-8">
            <QuoteForm defaultService="Auto Detailing" />
          </div>
        </div>
      </section>
    </>
  );
}
