import type { ElementType } from "react";

import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  from?: number;
  durationMs?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  as?: ElementType;
  className?: string;
}

/**
 * Renders the final formatted value for SSR/first paint (non-negotiable for
 * SEO — a stat that reads 0 in the HTML is worse than no stat). Only after
 * hydration + scroll-into-view does an effect animate the digits node.
 */
export function CountUp({
  value,
  from = 0,
  durationMs,
  decimals = 0,
  prefix,
  suffix,
  locale,
  as: Component = "span",
  className,
}: CountUpProps) {
  const ref = useCountUp<HTMLElement>({
    value,
    from,
    ...(durationMs !== undefined && { durationMs }),
    decimals,
    ...(locale !== undefined && { locale }),
  });

  const formatted = new Intl.NumberFormat(locale ?? "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <Component className={cn(className)}>
      {prefix}
      <span ref={ref}>{formatted}</span>
      {suffix}
    </Component>
  );
}
