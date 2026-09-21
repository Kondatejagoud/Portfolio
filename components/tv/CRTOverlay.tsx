'use client';

import React from 'react';

export default function CRTOverlay() {
  return (
    <>
      {/* Subtle scanline pattern */}
      <div className="scanline pointer-events-none absolute inset-0 z-42" />
      {/* Moving scanline sweeps */}
      <div className="scanline-bar pointer-events-none absolute inset-0 z-43" />
      {/* Dark screen corner vignette shadow */}
      <div className="crt-vignette pointer-events-none absolute inset-0 z-41" />
      {/* Glare overlay */}
      <div className="pointer-events-none absolute inset-0 z-44 bg-gradient-to-tr from-white/[0.003] via-transparent to-white/[0.015]" />
    </>
  );
}
