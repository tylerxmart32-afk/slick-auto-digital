/**
 * Runs synchronously in <head>, before first paint. Sets data-motion="on"
 * only when IntersectionObserver exists and the user hasn't asked for
 * reduced motion — every hidden-pre-reveal style is scoped under
 * [data-motion="on"], so if this never runs (or JS is disabled) the page is
 * a plain, fully visible static document. The 2.5s failsafe strips the
 * attribute if hydration never confirms, so content can never get stuck
 * invisible.
 */
export const MOTION_BOOT = `(function(){try{
var d=document.documentElement;
if(!('IntersectionObserver' in window))return;
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.setAttribute('data-motion','on');
window.__motionBooted=0;
setTimeout(function(){if(!window.__motionBooted)d.removeAttribute('data-motion');},2500);
}catch(e){}})();`;
