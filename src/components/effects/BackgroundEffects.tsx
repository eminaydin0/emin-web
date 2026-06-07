"use client";

export function BackgroundEffects() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-0 grid-bg"
        aria-hidden="true"
      />
      <div className="aurora fixed inset-0 z-0" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(139, 92, 246, 0.12), transparent)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
