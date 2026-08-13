import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

const NAV_LINKS = [
  { to: "/tinting", label: "Auto Tinting" },
  { to: "/detailing", label: "Auto Detailing" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-baseline gap-1.5" onClick={() => setOpen(false)}>
          <span className="font-display text-lg font-extrabold tracking-tight uppercase">
            Slick
          </span>
          <span className="metallic-text font-display text-lg font-extrabold tracking-tight uppercase">
            Auto Spa
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={PHONE_HREF}>
              <Phone className="size-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </Button>
          <Button asChild size="sm">
            <Link to="/contact">Book Now</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}

        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 py-2.5 text-sm font-medium text-primary"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
