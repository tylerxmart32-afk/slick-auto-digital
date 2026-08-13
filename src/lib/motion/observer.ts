type Handler = (entry: IntersectionObserverEntry, unobserve: () => void) => void;

interface Pool {
  io: IntersectionObserver;
  targets: Map<Element, Set<Handler>>;
}

const pools = new Map<string, Pool>();

const DEFAULT_THRESHOLD = 0.15;
const DEFAULT_ROOT_MARGIN = "0px 0px -10% 0px";

export interface ObserveOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Shares one IntersectionObserver per unique (threshold, rootMargin) signature
 * across every caller, instead of one observer per element. Fails open: if
 * IntersectionObserver doesn't exist, the handler fires immediately as visible
 * so content is never stuck hidden.
 */
export function observeElement(
  el: Element,
  handler: Handler,
  options: ObserveOptions = {},
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    handler({ isIntersecting: true, target: el } as IntersectionObserverEntry, () => {});
    return () => {};
  }

  const threshold = options.threshold ?? DEFAULT_THRESHOLD;
  const rootMargin = options.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const key = `${rootMargin}|${threshold}`;

  let pool = pools.get(key);
  if (!pool) {
    const targets = new Map<Element, Set<Handler>>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const set = targets.get(entry.target);
          if (!set) continue;
          for (const fn of set) fn(entry, () => release(key, entry.target, fn));
        }
      },
      { threshold, rootMargin },
    );
    pool = { io, targets };
    pools.set(key, pool);
  }

  let set = pool.targets.get(el);
  if (!set) {
    set = new Set();
    pool.targets.set(el, set);
    pool.io.observe(el);
  }
  set.add(handler);

  return () => release(key, el, handler);
}

function release(key: string, el: Element, handler: Handler) {
  const pool = pools.get(key);
  if (!pool) return;
  const set = pool.targets.get(el);
  if (!set) return;
  set.delete(handler);
  if (set.size === 0) {
    pool.targets.delete(el);
    pool.io.unobserve(el);
    if (pool.targets.size === 0) {
      pool.io.disconnect();
      pools.delete(key);
    }
  }
}
