import { useEffect, useRef, useState } from "react";

import { observeElement } from "@/lib/motion/observer";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

interface HeroVideoProps {
  posterSrc: string;
  posterAlt: string;
  videoSrc?: string;
  videoType?: string;
  width: number;
  height: number;
  className?: string;
}

function shouldSkipVideo() {
  if (typeof navigator === "undefined") return true;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  if (connection.effectiveType && /2g|3g/.test(connection.effectiveType)) return true;
  return false;
}

/**
 * SSR renders the poster <img> only — zero video bytes in the server
 * response, making the poster the LCP element. After hydration a <video>
 * mounts on top and crossfades in on canplay; the poster never unmounts, so
 * there's no blank frame or layout shift. Bails permanently to the poster
 * under reduced motion, save-data, slow connections, or a rejected
 * autoplay.
 */
export function HeroVideo({
  posterSrc,
  posterAlt,
  videoSrc,
  videoType = "video/mp4",
  width,
  height,
  className,
}: HeroVideoProps) {
  const reducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const canAttemptVideo = Boolean(videoSrc) && !reducedMotion && !shouldSkipVideo();

  useEffect(() => {
    if (!canAttemptVideo) return undefined;
    const node = videoRef.current;
    if (!node) return undefined;

    return observeElement(
      node,
      (entry) => {
        if (entry.isIntersecting) {
          node.play().catch(() => setShowVideo(false));
        } else {
          node.pause();
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );
  }, [canAttemptVideo]);

  useEffect(() => {
    const onVisibility = () => {
      const node = videoRef.current;
      if (!node) return;
      if (document.hidden) node.pause();
      else if (showVideo) node.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [showVideo]);

  return (
    <div className={cn("relative", className)}>
      <img
        src={posterSrc}
        alt={posterAlt}
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-700",
          showVideo && videoReady ? "opacity-0" : "opacity-100",
        )}
      />
      {canAttemptVideo ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          width={width}
          height={height}
          onCanPlay={() => {
            setVideoReady(true);
            setShowVideo(true);
          }}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            showVideo && videoReady ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={videoSrc} type={videoType} />
        </video>
      ) : null}
    </div>
  );
}
