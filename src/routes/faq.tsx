import { createFileRoute, Link } from "@tanstack/react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const TITLE = "Auto Tinting & Detailing FAQ | Slick Auto Spa";
const DESCRIPTION =
  "Answers on ceramic vs. standard tint, New Jersey tint laws, ceramic coating, turnaround times, and detailing prep at Slick Auto Spa in Lakewood, NJ.";

const FAQS = [
  {
    question: "What's the difference between ceramic and standard tint?",
    answer:
      "Standard dyed film controls glare and adds privacy. Ceramic film uses nano-ceramic particles to reject a much higher share of infrared heat and UV, so the cabin stays cooler without going darker — and it never interferes with phone, GPS, or radio signals.",
  },
  {
    question: "Is window tint legal in New Jersey?",
    answer:
      "New Jersey restricts tint on front side windows, while rear side and back glass have more flexibility. We review the legal limits with you and install a compliant configuration for your vehicle.",
  },
  {
    question: "How long does a tint installation take?",
    answer:
      "Most full-vehicle tint jobs are completed the same day, typically in two to four hours depending on the number of windows and the film selected.",
  },
  {
    question: "How long should I wait before rolling down new tint?",
    answer:
      "Leave the windows up for two to three days while the film cures. Small water pockets or slight haze during that window are normal and disappear as the film dries.",
  },
  {
    question: "What does ceramic coating do that wax doesn't?",
    answer:
      "Wax sits on top of the paint for a few weeks or months. A ceramic coating chemically bonds to the clear coat, giving years of hydrophobic protection, deeper gloss, and easier washing.",
  },
  {
    question: "How should I prepare my vehicle for a detail?",
    answer:
      "Remove personal items, car seats, and anything in the trunk you want left untouched. That's it — we handle the rest.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Straight answers on tint, coatings, and what to expect on service day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-lg border border-border bg-card p-6 text-center">
          <h2 className="text-lg font-bold">Still have a question?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Send us your vehicle details and we&apos;ll point you to the right service.
          </p>
          <Button asChild className="mt-5">
            <Link to="/contact">Ask Us Directly</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
