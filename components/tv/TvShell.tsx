'use client';

import React from 'react';
import CRTOverlay from '@/components/tv/CRTOverlay';

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
    <div className="w-full h-screen bg-[#040506] flex flex-col justify-between overflow-hidden relative p-0 md:p-4">
      {/* Sleek, ultra-thin border digital screen housing */}
      <div className="flex-1 w-full bg-[#080A0C] border border-zinc-800/60 rounded-none md:rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative">
        
        {/* Screen Viewport constrained to housing size */}
        <div 
          className={`flex-1 w-full flex flex-col min-h-0 overflow-hidden relative transition-all duration-300 ${
            isPowerOn ? 'bg-[#080A0C]' : 'bg-[#000000]'
          } ${
            isPowerOn && isCrtEnabled ? 'crt-flicker' : ''
          }`}
        >
          {/* Power Off black mask */}
          {!isPowerOn && (
            <div className="absolute inset-0 bg-[#000000] z-55 transition-opacity duration-300" />
          )}

          {/* CRT scanlines and vignettes */}
          {isPowerOn && isCrtEnabled && <CRTOverlay />}

          {/* Screen inner shadow/glare overlay */}
          {isPowerOn && (
            <div className="absolute inset-0 pointer-events-none z-40 screen-glare rounded-none md:rounded-xl" />
          )}

          {/* Render layout contents */}
          <div className="flex-1 w-full flex flex-col min-h-0 overflow-hidden z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
