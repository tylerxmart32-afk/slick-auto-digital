import type { ElementType, ReactNode } from "react";

import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  as?: ElementType;
  strength?: number;
  className?: string;
  children?: ReactNode;
}

export function Parallax({ as: Component = "div", strength, className, children }: ParallaxProps) {
  const ref = useParallax<HTMLElement>({
    ...(strength !== undefined && { strength }),
  });

  return (
    <Component ref={ref} data-parallax="" className={cn(className)}>
      {children}
    </Component>
  );
}
