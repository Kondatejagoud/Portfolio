'use client';

import React, { useState, useEffect } from 'react';

interface BroadcastHeaderProps {
  channelNumber: number;
  channelTitle: string;
  currentProgram: string;
}

export default function BroadcastHeader({
  channelNumber,
  channelTitle,
  currentProgram,
}: BroadcastHeaderProps) {
  const [timeStr, setTimeStr] = useState<string>('00:00:00 AM');

  useEffect(() => {
    // Client-side timer to update the clock
    const updateTime = () => {
      const date = new Date();
      setTimeStr(
        date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine signal quality based on active channel (descriptive metrics, no fake numbers)
  const getSignalStrength = () => {
    if (channelNumber === 0) return { label: 'DIAGNOSTICS DECK', color: 'text-amber-500' };
    switch (channelNumber) {
      case 1: // About
      case 2: // Projects
      case 4: // Skills
        return { label: 'SIGNAL: STABLE', color: 'text-[#00D9FF]' };
      case 3: // Workshop
        return { label: 'SIGNAL: ACTIVE DEVELOPMENT', color: 'text-[#00D9FF] font-bold' };
      case 5: // Journey
        return { label: 'SIGNAL: TRANSMITTING', color: 'text-cyan-400' };
      case 6: // Archive
        return { label: 'SIGNAL: DEGRADED', color: 'text-red-500 animate-pulse' };
      case 7: // Contact
        return { label: 'SIGNAL: OPEN', color: 'text-[#00D9FF] font-bold' };
      default:
        return { label: 'SIGNAL: STABLE', color: 'text-[#00D9FF]' };
    }
  };

  const signal = getSignalStrength();

  return (
    <header className="w-full bg-[#0D1013] border-b border-zinc-800/60 px-4 md:px-6 py-3 flex justify-between items-center font-mono text-xs md:text-sm select-none z-30">
      {/* Network Brand */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-extrabold tracking-widest text-[#E6E8EA] text-sm md:text-base glitch-text">
            TEJA NETWORK
          </span>
          <span className="text-[9px] text-[#8D969D] tracking-wider uppercase">
            Personal Broadcast Node
          </span>
        </div>
      </div>

      {/* Program Details (Center on larger screens) */}
      <div className="hidden lg:flex flex-col items-center text-center">
        <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">
          Currently Showing
        </span>
        <span className="text-[#00D9FF] font-bold tracking-wide uppercase max-w-sm truncate text-xs">
          CH {channelNumber.toString().padStart(2, '0')} — {channelTitle} — {currentProgram}
        </span>
      </div>

      {/* Live Status and Clock */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] md:text-xs font-semibold ${signal.color} uppercase tracking-wider`}>
            {signal.label}
          </span>
        </div>

        <div className="flex items-center gap-3 border-l border-zinc-800/60 pl-4 md:pl-6">
          <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded text-red-500 font-bold uppercase text-[10px] md:text-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 absolute translate-x-0.5 translate-y-0.5" />
            LIVE
          </div>
          <span className="text-[#E6E8EA] font-semibold tracking-wider font-mono min-w-[85px] text-right">
            {timeStr}
          </span>
        </div>
      </div>
    </header>
  );
}
