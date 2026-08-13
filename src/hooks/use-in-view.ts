import { useCallback, useState } from "react";

import { observeElement, type ObserveOptions } from "@/lib/motion/observer";

export interface InViewOptions extends ObserveOptions {
  once?: boolean;
}

/**
 * Stateful counterpart to useReveal, for the rare primitives that must
 * branch in JS (count-up needs to start a rAF loop; hero video needs to
 * play/pause). Prefer useReveal wherever only CSS needs to react.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: InViewOptions = {},
): [(node: T | null) => void, boolean] {
  const [inView, setInView] = useState(false);
  const { threshold, rootMargin, once = true } = options;

  const ref = useCallback(
    (node: T | null) => {
      if (!node) return undefined;
      return observeElement(
        node,
        (entry, unobserve) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) unobserve();
          } else if (!once) {
            setInView(false);
          }
        },
        {
          ...(threshold !== undefined && { threshold }),
          ...(rootMargin !== undefined && { rootMargin }),
        },
      );
    },
    [threshold, rootMargin, once],
  );

  return [ref, inView];
}
