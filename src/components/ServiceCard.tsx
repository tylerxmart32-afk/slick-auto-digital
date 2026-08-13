import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import { useSpotlight } from "@/hooks/use-spotlight";

interface ServiceCardProps {
  image: string;
  imageAlt: string;
  headline: string;
  description: string;
  services: string[];
  ctaLabel: string;
  ctaTo: "/tinting" | "/detailing";
  index?: number;
}

export function ServiceCard({
  image,
  imageAlt,
  headline,
  description,
  services,
  ctaLabel,
  ctaTo,
  index,
}: ServiceCardProps) {
  const revealRef = useReveal<HTMLElement>();
  const spotlight = useSpotlight();
  const style = index !== undefined ? ({ "--reveal-index": index } as CSSProperties) : undefined;

  return (
    <article
      ref={(node) => {
        revealRef(node);
        spotlight.ref(node);
      }}
      data-reveal="fade-up"
      style={style}
      onPointerEnter={spotlight.onPointerEnter}
      onPointerLeave={spotlight.onPointerLeave}
      className="spotlight-card flex flex-col overflow-hidden rounded-lg border border-border bg-card"
    >
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        width={1200}
        height={900}
        className="relative z-[2] h-56 w-full object-cover sm:h-64"
      />
      <div className="relative z-[2] flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="text-xl font-bold sm:text-2xl">{headline}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <ul className="mt-6 flex-1 space-y-3">
          {services.map((service) => (
            <li key={service} className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{service}</span>
            </li>
          ))}
        </ul>
        <Button asChild variant="outline" className="mt-8 w-full">
          <Link to={ctaTo}>{ctaLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
