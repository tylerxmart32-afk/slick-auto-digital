import { useEffect, useRef } from "react";

import { subscribeFrame } from "@/lib/motion/raf";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

import { useInView } from "./use-in-view";

const formatters = new Map<string, Intl.NumberFormat>();
function getFormatter(locale: string, decimals: number) {
  const key = `${locale}|${decimals}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    formatters.set(key, formatter);
  }
  return formatter;
}

// Duplicates the --ease-out-quart curve from styles.css as a JS easing
// function — this is the one place a timing token is intentionally
// duplicated, since CSS transitions can't drive a text node.
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export interface UseCountUpOptions {
  value: number;
  from?: number;
  durationMs?: number;
  decimals?: number;
  locale?: string;
}

/**
 * Animates a <span>'s textContent imperatively, bypassing React entirely
 * for the per-frame writes. The caller renders the final formatted value
 * for SSR/first paint; this hook only rewrites it after the element enters
 * view (and never at all under reduced motion).
 */
export function useCountUp<T extends HTMLElement>({
  value,
  from = 0,
  durationMs = 1400,
  decimals = 0,
  locale = "en-US",
}: UseCountUpOptions) {
  const [inViewRef, inView] = useInView<T>({ threshold: 0.35 });
  const nodeRef = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  const setRef = (node: T | null) => {
    nodeRef.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const node = nodeRef.current;
    if (!node) return;

    const formatter = getFormatter(locale, decimals);
    const start = performance.now();

    const stop = subscribeFrame((now) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = easeOutQuart(t);
      const current = from + (value - from) * eased;
      node.textContent = formatter.format(current);
      if (t >= 1) stop();
    });

    return stop;
  }, [inView, reducedMotion, value, from, durationMs, decimals, locale]);

  return setRef;
}
