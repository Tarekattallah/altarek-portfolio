// True when the visitor asked their OS/browser to minimize non-essential motion
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
