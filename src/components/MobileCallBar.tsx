import { Link } from "@tanstack/react-router";
import { CalendarCheck, Phone } from "lucide-react";

import { PHONE_HREF } from "@/lib/site";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur sm:hidden">
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
      >
        <Phone className="size-4" aria-hidden="true" />
        Call Now
      </a>
      <Link
        to="/contact"
        className="flex items-center justify-center gap-2 bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <CalendarCheck className="size-4" aria-hidden="true" />
        Book Now
      </Link>
    </div>
  );
}
