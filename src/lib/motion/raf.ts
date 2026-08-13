type Frame = (now: number, scrollY: number) => void;

const subs = new Set<Frame>();
let handle = 0;

function loop(now: number) {
  const scrollY = window.scrollY;
  for (const fn of subs) fn(now, scrollY);
  handle = subs.size > 0 ? requestAnimationFrame(loop) : 0;
}

/**
 * One shared requestAnimationFrame loop for all continuous motion (parallax,
 * spotlight, drag). Subscribers may only WRITE inside the callback — scrollY
 * is read once per frame here and handed down so nobody triggers a forced
 * synchronous layout by reading geometry mid-frame.
 */
export function subscribeFrame(fn: Frame): () => void {
  subs.add(fn);
  if (handle === 0) handle = requestAnimationFrame(loop);
  return () => {
    subs.delete(fn);
  };
}
