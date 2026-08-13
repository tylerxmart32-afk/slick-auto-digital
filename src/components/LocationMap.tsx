import { ArrowUpRight, Clock, MapPin } from "lucide-react";

import { ADDRESS_LINE, DIRECTIONS_URL, MAP_EMBED_URL } from "@/lib/site";

export function LocationMap() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Visit Us Today</h2>
        <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          {ADDRESS_LINE}
        </p>
        <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
          <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Call for hours — same-day and next-day appointments are often available.
        </p>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
        >
          Get driving directions
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <iframe
          title="Map showing Slick Auto Spa at 1745 Lakewood Rd Unit 1, Lakewood, NJ"
          src={MAP_EMBED_URL}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[320px] w-full border-0 sm:h-[380px]"
        />
      </div>
    </div>
  );
}
