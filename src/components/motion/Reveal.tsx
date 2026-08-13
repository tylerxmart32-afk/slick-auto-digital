import type { CSSProperties, ElementType, ReactNode } from "react";

import { useReveal, type RevealOptions } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale";

interface RevealProps extends RevealOptions {
  as?: ElementType;
  variant?: RevealVariant;
  index?: number;
  delay?: number;
  className?: string;
  children?: ReactNode;
}

export function Reveal({
  as: Component = "div",
  variant = "fade-up",
  index,
  delay,
  threshold,
  rootMargin,
  once,
  disabled,
  className,
  children,
}: RevealProps) {
  const ref = useReveal({
    ...(threshold !== undefined && { threshold }),
    ...(rootMargin !== undefined && { rootMargin }),
    ...(once !== undefined && { once }),
    ...(disabled !== undefined && { disabled }),
  });

  const style: CSSProperties = {};
  if (index !== undefined) (style as Record<string, unknown>)["--reveal-index"] = index;
  if (delay !== undefined) (style as Record<string, unknown>)["--reveal-delay"] = `${delay}ms`;

  return (
    <Component ref={ref} data-reveal={variant} style={style} className={cn(className)}>
      {children}
    </Component>
  );
}
