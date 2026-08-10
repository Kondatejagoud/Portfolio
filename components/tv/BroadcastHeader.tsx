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

  // Determine signal quality based on channel (e.g., Archive is CH06 - degraded)
  const getSignalStrength = () => {
    if (channelNumber === 0) return { label: 'DIAGNOSTICS MODE', color: 'text-amber-500' };
    if (channelNumber === 6) return { label: 'SIGNAL DEGRADED', color: 'text-red-500 animate-pulse' };
    if (channelNumber === 3) return { label: 'SIGNAL WEAK (LAB)', color: 'text-yellow-500' };
    return { label: 'SIGNAL: EXCELLENT', color: 'text-[#00E5FF]' };
  };

  const signal = getSignalStrength();

  return (
    <header className="w-full bg-[#070707] border-b border-zinc-800/60 px-4 md:px-6 py-3 flex justify-between items-center font-mono text-xs md:text-sm select-none z-30">
      {/* Network Brand */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-extrabold tracking-widest text-[#F2F2F2] text-sm md:text-base glitch-text">
            TEJA NETWORK
          </span>
          <span className="text-[9px] text-[#777777] tracking-wider uppercase">
            Personal Broadcast Node
          </span>
        </div>
      </div>

      {/* Program Details (Center on larger screens) */}
      <div className="hidden lg:flex flex-col items-center text-center">
        <span className="text-[10px] text-[#777777] uppercase tracking-wider">
          Currently Showing
        </span>
        <span className="text-[#00E5FF] font-medium tracking-wide uppercase max-w-xs truncate">
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
          <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-800/30 px-2 py-0.5 rounded text-red-500 font-bold uppercase text-[10px] md:text-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 absolute translate-x-0.5 translate-y-0.5" />
            LIVE
          </div>
          <span className="text-[#F2F2F2] font-semibold tracking-wider font-mono min-w-[85px] text-right">
            {timeStr}
          </span>
        </div>
      </div>
    </header>
  );
}
