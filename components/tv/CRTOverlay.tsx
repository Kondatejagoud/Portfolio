'use client';

import React from 'react';

export default function CRTOverlay() {
  return (
    <>
      {/* Moving scanline filter */}
      <div className="scanline pointer-events-none absolute inset-0 z-42" />
      {/* CRT screen corner vignette shadow */}
      <div className="crt-vignette pointer-events-none absolute inset-0 z-41" />
      {/* Subtle glass display glare reflection */}
      <div className="pointer-events-none absolute inset-0 z-43 bg-gradient-to-tr from-white/[0.005] via-transparent to-white/[0.02]" />
    </>
  );
}
