'use client';

import React from 'react';

interface TvShellProps {
  children: React.ReactNode;
  isPowerOn: boolean;
  isCrtEnabled: boolean;
}

export default function TvShell({
  children,
  isPowerOn,
  isCrtEnabled,
}: TvShellProps) {
  return (
    <div className="w-full h-screen bg-[#070707] flex flex-col justify-between overflow-hidden relative p-1 md:p-2.5">
      {/* Outer Plastic/Metal Bezel frame */}
      <div className="flex-1 w-full bg-[#121212] border-4 md:border-[10px] border-[#1D1D1D] rounded-xl md:rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative">
        
        {/* CRT Screen Wrapper */}
        <div 
          className={`flex-1 w-full flex flex-col relative transition-all duration-300 ${
            isPowerOn ? 'bg-[#0A0A0A]' : 'bg-[#000000]'
          } ${
            isPowerOn && isCrtEnabled ? 'crt-screen crt-flicker' : ''
          }`}
        >
          {/* Power Off Mask (Locks the TV screen from being viewed if powered down) */}
          {!isPowerOn && (
            <div className="absolute inset-0 bg-[#000000] z-50 transition-opacity duration-300" />
          )}

          {/* CRT overlays - only active when system is powered and CRT filters are enabled */}
          {isPowerOn && isCrtEnabled && (
            <>
              {/* Scanline line animation */}
              <div className="scanline" />
              {/* Radial vignette shadowing */}
              <div className="crt-vignette" />
              {/* Glass Reflection screen glare */}
              <div className="absolute inset-0 pointer-events-none z-43 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.04]" />
            </>
          )}

          {/* Render actual content inside the viewport */}
          <div className="flex-1 w-full flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
