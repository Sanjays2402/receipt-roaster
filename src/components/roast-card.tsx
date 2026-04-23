"use client";

import { forwardRef } from "react";

type Props = {
  roast: string;
  vibe: string;
};

export const RoastCard = forwardRef<HTMLDivElement, Props>(function RoastCard(
  { roast, vibe },
  ref
) {
  return (
    <div
      ref={ref}
      style={{ width: 1080, height: 1350 }}
      className="relative overflow-hidden flex flex-col justify-between"
    >
      {/* background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 15% 10%, rgba(251,191,36,0.18), transparent 60%), radial-gradient(900px 500px at 85% 90%, rgba(194,65,12,0.20), transparent 60%), linear-gradient(180deg, #110d09 0%, #1a1410 100%)",
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* content */}
      <div className="relative z-10 px-20 pt-20">
        <div className="inline-block px-4 py-2 rounded-full bg-amber/10 border border-amber/30">
          <span
            className="font-mono text-amber uppercase tracking-widest"
            style={{ fontSize: 22, letterSpacing: "0.18em" }}
          >
            {vibe}
          </span>
        </div>
      </div>

      <div className="relative z-10 px-20">
        <div
          aria-hidden
          className="font-display italic leading-none text-amber/60 select-none"
          style={{ fontSize: 220, marginBottom: -40 }}
        >
          “
        </div>
        <p
          className="font-mono text-ink leading-snug"
          style={{ fontSize: 56, lineHeight: 1.25 }}
        >
          {roast}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between px-20 pb-20">
        <div>
          <div
            className="font-display italic text-ink"
            style={{ fontSize: 44 }}
          >
            Receipt Roaster
          </div>
          <div className="text-ink-dim font-sans" style={{ fontSize: 22 }}>
            your taste, roasted
          </div>
        </div>
        <div
          className="font-mono text-ink-dim"
          style={{ fontSize: 22 }}
        >
          🪞
        </div>
      </div>
    </div>
  );
});
