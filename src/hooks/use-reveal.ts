import { useCallback, useRef } from "react";

import { observeElement } from "@/lib/motion/observer";

export interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
}

/**
 * Ref callback that flips a data-revealed attribute directly on the DOM node
 * when it scrolls into view. Never calls setState — a page with dozens of
 * reveals costs zero React re-renders for the whole scroll experience.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
): (node: T | null) => void {
  const opts = useRef(options);
  opts.current = options;

  return useCallback((node: T | null) => {
    if (!node || opts.current.disabled) return undefined;
    const { threshold, rootMargin, once = true } = opts.current;

    return observeElement(
      node,
      (entry, unobserve) => {
        if (entry.isIntersecting) {
          node.setAttribute("data-revealed", "");
          if (once) unobserve();
        } else if (!once) {
          node.removeAttribute("data-revealed");
        }
      },
      {
        ...(threshold !== undefined && { threshold }),
        ...(rootMargin !== undefined && { rootMargin }),
      },
    );
  }, []);
}
