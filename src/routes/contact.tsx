import { createFileRoute } from "@tanstack/react-router";

import { ContactActions } from "@/components/ContactActions";
import { LocationMap } from "@/components/LocationMap";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "Contact Slick Auto Spa | Lakewood, NJ Tinting & Detailing";
const DESCRIPTION =
  "Request a quote or book auto tinting and detailing at 1745 Lakewood Rd Unit 1, Lakewood, NJ. Call (732) 693-5154 or send your vehicle details.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal variant="fade-up">
            <h1 className="text-3xl font-extrabold sm:text-5xl">Get In Touch</h1>
          </Reveal>
          <Reveal variant="fade-up" delay={80}>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Send your vehicle details and we&apos;ll come back with pricing and the next open
              appointment. Prefer to talk it through? Call us directly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal variant="fade-up">
          <ContactActions />
        </Reveal>
      </section>

      <section id="quote" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <Reveal variant="fade-up">
            <h2 className="text-2xl font-bold sm:text-3xl">Quote Request</h2>
          </Reveal>
          <Reveal variant="fade-up" delay={100} className="mt-8">
            <QuoteForm defaultService="Not Sure — Get Advice" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal variant="fade-up">
          <LocationMap />
        </Reveal>
      </section>
    </>
  );
}
