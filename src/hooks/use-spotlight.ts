import { useCallback, useRef } from "react";

let fineHoverQuery: MediaQueryList | null = null;
function supportsFineHover() {
  if (typeof window === "undefined") return false;
  fineHoverQuery ??= window.matchMedia("(hover: hover) and (pointer: fine)");
  return fineHoverQuery.matches;
}

export interface SpotlightHandle {
  ref: (node: HTMLElement | null) => void;
  onPointerEnter: (e: React.PointerEvent) => void;
  onPointerLeave: (e: React.PointerEvent) => void;
}

/**
 * Pointer-tracked glow. A hook, not a wrapper component, so it can attach
 * directly to an existing element (e.g. ServiceCard's <article>) without
 * injecting a div that would break a CSS grid layout. Writes CSS custom
 * properties straight to the DOM — never triggers a React re-render on
 * mousemove.
 */
export function useSpotlight(options: { disabled?: boolean } = {}): SpotlightHandle {
  const nodeRef = useRef<HTMLElement | null>(null);
  const geo = useRef({ left: 0, top: 0 });
  const moveHandler = useRef<((e: PointerEvent) => void) | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  const onPointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (options.disabled || !supportsFineHover()) return;
      const node = nodeRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      geo.current = { left: rect.left, top: rect.top };

      const handler = (ev: PointerEvent) => {
        node.style.setProperty("--spot-x", `${ev.clientX - geo.current.left}px`);
        node.style.setProperty("--spot-y", `${ev.clientY - geo.current.top}px`);
      };
      moveHandler.current = handler;
      node.addEventListener("pointermove", handler);
      handler(e.nativeEvent);
    },
    [options.disabled],
  );

  const onPointerLeave = useCallback(() => {
    const node = nodeRef.current;
    if (node && moveHandler.current) {
      node.removeEventListener("pointermove", moveHandler.current);
      moveHandler.current = null;
    }
  }, []);

  return { ref, onPointerEnter, onPointerLeave };
}
