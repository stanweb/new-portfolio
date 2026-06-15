/**
 * Pure-CSS overlay: subtle film grain everywhere + faint horizontal scanlines
 * in dark mode. No JS, no motion budget.
 */
export function GrainOverlay() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="scanline-overlay" aria-hidden="true" />
    </>
  )
}