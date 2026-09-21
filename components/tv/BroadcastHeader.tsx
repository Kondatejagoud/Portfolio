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

  const getSignalStrength = () => {
    if (channelNumber === 0) return { label: 'DIAGNOSTICS DECK', color: 'text-amber-500' };
    switch (channelNumber) {
      case 1:
      case 2:
      case 4:
        return { label: 'SIGNAL: STABLE', color: 'text-[#00D9FF]' };
      case 3:
        return { label: 'SIGNAL: ACTIVE DEVELOPMENT', color: 'text-[#00D9FF] font-bold' };
      case 5:
        return { label: 'SIGNAL: TRANSMITTING', color: 'text-cyan-400' };
      case 6:
        return { label: 'SIGNAL: OPEN', color: 'text-[#00D9FF] font-bold' };
      default:
        return { label: 'SIGNAL: STABLE', color: 'text-[#00D9FF]' };
    }
  };

  const signal = getSignalStrength();

  return (
    <header className="w-full bg-[#080A0C]/80 backdrop-blur-md border-b border-zinc-900 px-4 md:px-6 py-2.5 flex justify-between items-center text-xs md:text-sm select-none z-30">
      
      {/* Network Brand */}
      <div className="flex flex-col">
        <span className="font-sans font-black tracking-widest text-[#E6E8EA] text-xs md:text-sm uppercase">
          TEJA NETWORK
        </span>
        <span className="font-mono text-[8.5px] text-[#8D969D] tracking-wider uppercase font-semibold leading-none mt-0.5">
          KONDA TEJA // PERSONAL BROADCAST
        </span>
      </div>

      {/* Program Details (Center on larger screens) */}
      <div className="hidden lg:flex flex-col items-center text-center font-mono">
        <span className="text-[8px] text-[#8D969D] uppercase tracking-widest">
          Currently Showing
        </span>
        <span className="text-[#00D9FF] font-bold tracking-wide uppercase text-[10.5px] mt-0.5">
          CH {channelNumber.toString().padStart(2, '0')} — {channelTitle} — {currentProgram}
        </span>
      </div>

      {/* Live Status and Clock */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center font-mono">
          <span className={`text-[9.5px] font-bold ${signal.color} uppercase tracking-wider`}>
            {signal.label}
          </span>
        </div>

        <div className="flex items-center gap-3 border-l border-zinc-900 pl-4 font-mono">
          <div className="flex items-center gap-1.5 bg-red-950/20 border border-red-900/30 px-2 py-0.5 rounded text-red-500 font-extrabold uppercase text-[9.5px] select-none">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            LIVE
          </div>
          <span className="text-[#E6E8EA] font-bold tracking-wider text-[10px] min-w-[70px] text-right">
            {timeStr}
          </span>
        </div>
      </div>
    </header>
  );
}
