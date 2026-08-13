import { useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from "react";

import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  beforeSrc: string;
  beforeAlt: string;
  beforeLabel?: string;
  afterSrc: string;
  afterAlt: string;
  afterLabel?: string;
  defaultPosition?: number;
  width: number;
  height: number;
  className?: string;
}

/**
 * Draggable before/after comparison. Pointer drags write straight to the
 * DOM (--ba-pos + aria-valuenow) at pointer-event rate with zero React
 * involvement; geometry is measured once per drag on pointerdown, never on
 * pointermove, to avoid forced synchronous layout. Keyboard steps go
 * through React state since they're low-frequency. touch-action differs
 * between root (pan-y, so the page still scrolls) and handle (none, so
 * grabbing it is always a drag).
 */
export function BeforeAfter({
  beforeSrc,
  beforeAlt,
  beforeLabel = "Before",
  afterSrc,
  afterAlt,
  afterLabel = "After",
  defaultPosition = 0.5,
  width,
  height,
  className,
}: BeforeAfterProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const geo = useRef({ left: 0, width: 1 });
  const dragging = useRef(false);
  const pendingX = useRef<number | null>(null);
  const frame = useRef(0);

  const clamp = (n: number) => Math.min(1, Math.max(0, n));

  const apply = (ratio: number) => {
    const c = clamp(ratio);
    const root = rootRef.current;
    const handle = handleRef.current;
    if (!root || !handle) return;
    root.style.setProperty("--ba-pos", `${(c * 100).toFixed(2)}%`);
    handle.setAttribute("aria-valuenow", String(Math.round(c * 100)));
    handle.setAttribute("aria-valuetext", `${Math.round(c * 100)}% after image shown`);
  };

  const measure = () => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    geo.current = { left: rect.left, width: rect.width || 1 };
  };

  const flush = () => {
    frame.current = 0;
    const x = pendingX.current;
    if (x === null) return;
    pendingX.current = null;
    apply((x - geo.current.left) / geo.current.width);
  };

  const endDrag = () => {
    dragging.current = false;
    rootRef.current?.removeAttribute("data-dragging");
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    measure();
    dragging.current = true;
    rootRef.current?.setAttribute("data-dragging", "");
    apply((e.clientX - geo.current.left) / geo.current.width);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    pendingX.current = e.clientX;
    if (frame.current === 0) frame.current = requestAnimationFrame(flush);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const handle = handleRef.current;
    if (!handle) return;
    const current = Number(handle.getAttribute("aria-valuenow") ?? "50") / 100;
    const step = e.shiftKey ? 0.1 : 0.02;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = current - step;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = current + step;
    else if (e.key === "PageDown") next = current - 0.1;
    else if (e.key === "PageUp") next = current + 0.1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 1;
    if (next !== null) {
      e.preventDefault();
      apply(next);
    }
  };

  const style = { "--ba-pos": `${defaultPosition * 100}%`, aspectRatio: `${width} / ${height}` } as CSSProperties;

  return (
    <div
      ref={rootRef}
      style={style}
      className={cn("ba-root", className)}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
    >
      <img src={afterSrc} alt={afterAlt} width={width} height={height} loading="lazy" className="ba-image" />
      <div className="ba-clip">
        <img src={beforeSrc} alt={beforeAlt} width={width} height={height} loading="lazy" className="ba-image" />
      </div>

      <span className="ba-chip ba-chip-before">{beforeLabel}</span>
      <span className="ba-chip ba-chip-after">{afterLabel}</span>

      <div
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-label="Comparison position"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(defaultPosition * 100)}
        aria-valuetext={`${Math.round(defaultPosition * 100)}% after image shown`}
        className="ba-handle"
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
