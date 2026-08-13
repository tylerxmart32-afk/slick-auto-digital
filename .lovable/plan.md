# Slick Auto Spa — Website Build

Premium auto tinting & detailing site for Lakewood, NJ, built mobile-first for local search and click-to-call conversions.

## Look and feel

- Dark theme only: charcoal/black base, gunmetal and silver metallic accents, generous white space in content bands.
- Bright blue accent reserved for primary CTAs so booking buttons always stand out.
- Geometric display headings, clean sans body. Real copy from the brief throughout — no placeholder text.
- Hero uses generated high-quality automotive photography (tinted glass, glossy detailed paint).

## Pages

1. **Home (`/`)** — hero, two-pillar services, why Slick, booking band, contact form, map, footer.
2. **Tinting (`/tinting`)** — full tinting service breakdown, ceramic vs standard, legal darkness note, quote CTA.
3. **Detailing (`/detailing`)** — packages and multi-step process, ceramic coating, quote CTA.
4. **Contact (`/contact`)** — standalone quote form with service preselect + map and directions.
5. **FAQ (`/faq`)** — tint/detailing questions, accordion, FAQPage structured data.

## Home page sections

- **Hero:** "Premium Auto Tinting & Detailing for the Jersey Shore" / "Professional craftsmanship. Local trust. Lasting results." with "Book Your Appointment" primary CTA and a click-to-call secondary.
- **Two service cards:** Tinting and Detailing, each with image, description, 5-item service list, and its own CTA. Side by side on desktop, stacked on mobile.
- **Why Slick:** three columns — Precision Craftsmanship, Premium Materials, Fast Turnaround — plus trust line (Jersey Shore local, 100% satisfaction guarantee, Facebook community).
- **Booking band:** three equal actions — Book an Appointment (scrolls to form), Call Us (`tel:7326935154`), Email a Quote Request — with phone, email, and address displayed.
- **Contact form:** name, phone, email, service type dropdown, vehicle year/make/model, notes. Inline validation, loading state, success state.
- **Map:** embedded Google Map for 1745 Lakewood Rd Unit 1 plus a directions link and "Call for hours".
- **Footer:** three columns (brand blurb, quick links, contact + Facebook) and the Red Ridge AI credit line.

## Mobile behavior

Sticky header with logo, "Call" and "Book Now" buttons. Single-column layouts, tap targets sized for thumbs, below-fold images lazy loaded.

## Form submissions

Enable Lovable Cloud so quote requests are stored and emailed to slickautospa@gmail.com. The form writes the lead to a database table (so nothing is lost) and a server function sends the notification email. Email sending needs a Resend API key — I'll request it during the build; until it's added, leads still save and the form confirms to the visitor. SMS confirmations are out of scope for this build and can be layered on later.

## Technical notes

- TanStack Start routes, one file per page; shared `SiteHeader`, `SiteFooter`, `QuoteForm`, `ServiceCard` components kept under 150 lines each.
- Design tokens (dark palette, metallic accents, blue CTA, fonts, radii) defined in `src/styles.css`; no hardcoded color classes.
- React Hook Form + Zod validation, shadcn/ui components, Lucide icons, subtle Motion transitions.
- Per-route `head()` metadata targeting "auto tinting Lakewood NJ" and "car detailing Jersey Shore", plus LocalBusiness/AutoRepair JSON-LD with address, phone, and geo.
- Booking CTA points at the on-page form now, structured so a Calendly/GHL embed can drop in later.
- Analytics hooks left as a single place to add a GA measurement ID when available.
