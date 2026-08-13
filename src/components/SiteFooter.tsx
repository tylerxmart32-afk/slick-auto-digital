import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";

import logo from "@/assets/logo.png";
import {
  ADDRESS_LINE,
  EMAIL,
  FACEBOOK_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/site";

const QUICK_LINKS = [
  { to: "/tinting", label: "Auto Tinting" },
  { to: "/detailing", label: "Auto Detailing" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <img src={logo} alt="Slick Auto Spa" width={849} height={599} className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium auto tinting &amp; detailing serving Lakewood, Toms River, and the Jersey
            Shore.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-steel uppercase">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-steel uppercase">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {ADDRESS_LINE}
            </li>
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Facebook className="size-4 shrink-0" aria-hidden="true" />
                Follow on Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Slick Auto Spa. All rights reserved.</p>
          <p>Designed for high conversions by Red Ridge AI Consulting</p>
        </div>
      </div>
    </footer>
  );
}
