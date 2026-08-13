import { Link } from "@tanstack/react-router";
import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ADDRESS_LINE, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export function ContactActions() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 sm:p-10">
      <h2 className="text-2xl font-bold sm:text-3xl">
        Ready to Protect &amp; Perfect Your Vehicle?
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Same-day and next-day appointments are often available for local customers.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Button asChild size="lg">
          <a href="#quote">
            <CalendarCheck className="size-4" aria-hidden="true" />
            Book an Appointment
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={PHONE_HREF}>
            <Phone className="size-4" aria-hidden="true" />
            Call Us
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/contact">
            <Mail className="size-4" aria-hidden="true" />
            Email a Quote Request
          </Link>
        </Button>
      </div>

      <dl className="mt-8 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs tracking-[0.18em] text-steel uppercase">Phone</dt>
          <dd className="mt-1">
            <a href={PHONE_HREF} className="transition-colors hover:text-primary">
              {PHONE_DISPLAY}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs tracking-[0.18em] text-steel uppercase">Email</dt>
          <dd className="mt-1 break-all">
            <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-primary">
              {EMAIL}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs tracking-[0.18em] text-steel uppercase">Address</dt>
          <dd className="mt-1 flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {ADDRESS_LINE}
          </dd>
        </div>
      </dl>
    </div>
  );
}
