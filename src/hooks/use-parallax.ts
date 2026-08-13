import { useCallback, useEffect, useRef } from "react";

import { observeElement } from "@/lib/motion/observer";
import { subscribeFrame } from "@/lib/motion/raf";

export interface ParallaxOptions {
  strength?: number;
  disabled?: boolean;
}

let coarsePointerQuery: MediaQueryList | null = null;
function isCoarsePointer() {
  if (typeof window === "undefined") return true;
  coarsePointerQuery ??= window.matchMedia("(pointer: coarse)");
  return coarsePointerQuery.matches;
}

/**
 * Drives a --parallax-y custom property from the shared rAF loop, but only
 * while the element is in view and only on fine-pointer (desktop) devices.
 * SiteHeader uses backdrop-blur, which repaints every frame anything beneath
 * it moves — parallax on a mid-range phone would blow the frame budget, so
 * it's desktop-only by design, not an oversight.
 */
export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {},
): (node: T | null) => void {
  const opts = useRef(options);
  opts.current = options;
  const geo = useRef({ top: 0, height: 1 });
  const stopFrame = useRef<(() => void) | null>(null);
  const nodeRef = useRef<T | null>(null);

  const measure = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    geo.current = { top: rect.top + window.scrollY, height: rect.height || 1 };
  }, []);

  const arm = useCallback(() => {
    const node = nodeRef.current;
    if (!node || stopFrame.current || opts.current.disabled || isCoarsePointer()) return;
    measure();
    node.style.willChange = "transform";
    stopFrame.current = subscribeFrame((_now, scrollY) => {
      const strength = opts.current.strength ?? 0.15;
      const vh = window.innerHeight;
      const progress = (scrollY + vh - geo.current.top) / (vh + geo.current.height);
      const offset = (progress - 0.5) * strength * geo.current.height;
      node.style.setProperty("--parallax-y", `${offset}px`);
    });
  }, [measure]);

  const disarm = useCallback(() => {
    stopFrame.current?.();
    stopFrame.current = null;
    if (nodeRef.current) nodeRef.current.style.willChange = "";
  }, []);

  useEffect(() => () => disarm(), [disarm]);

  return useCallback(
    (node: T | null) => {
      nodeRef.current = node;
      if (!node) return undefined;

      const ro = new ResizeObserver(() => measure());
      ro.observe(node);

      const stopObserve = observeElement(node, (entry) => (entry.isIntersecting ? arm() : disarm()), {
        threshold: 0,
        rootMargin: "20% 0px",
      });

      return () => {
        ro.disconnect();
        stopObserve();
        disarm();
      };
    },
    [arm, disarm, measure],
  );
}
