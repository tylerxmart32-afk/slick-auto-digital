import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  durationSeconds?: number;
  direction?: "left" | "right";
  label: string;
  className?: string;
}

/**
 * Renders the track twice for a seamless loop; the duplicate is
 * aria-hidden so assistive tech announces the content once. Pauses on
 * hover/focus (WCAG 2.2.2) and, under reduced motion, becomes a plain
 * horizontally scrollable list — pure CSS, no JS branch.
 */
export function Marquee({ children, durationSeconds = 32, direction = "left", label, className }: MarqueeProps) {
  const style = { "--marquee-duration": `${durationSeconds}s` } as CSSProperties;

  return (
    <div
      role="group"
      aria-label={label}
      data-direction={direction}
      style={style}
      className={cn("marquee-viewport", className)}
    >
      <div className="marquee-rail">
        <div className="marquee-track">{children}</div>
        <div className="marquee-track" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
