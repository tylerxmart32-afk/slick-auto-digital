import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealGroupProps {
  as?: ElementType;
  stagger?: number;
  autoStagger?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Sets the --motion-stagger step for its subtree (a grid can be snappier
 * than a hero) and optionally opts a subtree of static markup into a bounded
 * nth-child stagger ladder via autoStagger, without touching the children.
 */
export function RevealGroup({
  as: Component = "div",
  stagger,
  autoStagger,
  className,
  children,
}: RevealGroupProps) {
  const style: CSSProperties = {};
  if (stagger !== undefined) (style as Record<string, unknown>)["--motion-stagger"] = `${stagger}ms`;

  return (
    <Component style={style} data-auto-stagger={autoStagger ? "" : undefined} className={cn(className)}>
      {children}
    </Component>
  );
}
