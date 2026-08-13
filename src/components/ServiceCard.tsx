import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  image: string;
  imageAlt: string;
  headline: string;
  description: string;
  services: string[];
  ctaLabel: string;
  ctaTo: "/tinting" | "/detailing";
}

export function ServiceCard({
  image,
  imageAlt,
  headline,
  description,
  services,
  ctaLabel,
  ctaTo,
}: ServiceCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        width={1200}
        height={900}
        className="h-56 w-full object-cover sm:h-64"
      />
      <div className="flex flex-1 flex-col p-6 sm:p-8">
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
