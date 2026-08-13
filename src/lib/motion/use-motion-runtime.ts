import { useEffect } from "react";

declare global {
  interface Window {
    __motionBooted?: number;
  }
}

/**
 * Confirms to boot.ts's failsafe that hydration succeeded, and strips
 * data-motion if the user flips on reduced-motion mid-session (before the
 * failsafe already fired — re-arming after that would pop hidden content
 * back out of view, which is worse than leaving it revealed).
 */
export function useMotionRuntime() {
  useEffect(() => {
    window.__motionBooted = 1;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (mql.matches) {
        document.documentElement.removeAttribute("data-motion");
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
}
