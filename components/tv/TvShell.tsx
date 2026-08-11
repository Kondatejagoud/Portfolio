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
    <div className="w-full h-screen bg-[#040506] flex flex-col justify-between overflow-hidden relative p-1 md:p-2.5">
      {/* Outer Matte Bezel frame */}
      <div className="flex-1 w-full bg-[#0D1013] border-4 md:border-[10px] border-zinc-900 rounded-xl md:rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden relative">
        
        {/* CRT Screen Viewport */}
        <div 
          className={`flex-1 w-full flex flex-col relative transition-all duration-300 ${
            isPowerOn ? 'bg-[#080A0C]' : 'bg-[#000000]'
          } ${
            isPowerOn && isCrtEnabled ? 'crt-screen crt-flicker' : ''
          }`}
        >
          {/* Power Off black mask */}
          {!isPowerOn && (
            <div className="absolute inset-0 bg-[#000000] z-50 transition-opacity duration-300" />
          )}

          {/* CRT scanlines and vignettes */}
          {isPowerOn && isCrtEnabled && <CRTOverlay />}

          {/* Render layout contents */}
          <div className="flex-1 w-full flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
