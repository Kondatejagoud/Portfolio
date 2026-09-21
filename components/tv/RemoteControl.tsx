'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Minimize2, Power, Home, Menu, Tv } from 'lucide-react';

interface RemoteControlProps {
  currentChannel: number;
  onChannelChange: (ch: number) => void;
  onDpadUp?: () => void;
  onDpadDown?: () => void;
  onDpadLeft?: () => void;
  onDpadRight?: () => void;
  onDpadEnter?: () => void;
  isCrtEnabled: boolean;
  onToggleCrt: () => void;
}

export default function RemoteControl({
  currentChannel,
  onChannelChange,
  onDpadUp,
  onDpadDown,
  onDpadLeft,
  onDpadRight,
  onDpadEnter,
  isCrtEnabled,
  onToggleCrt,
}: RemoteControlProps) {
  const [isMinimized, setIsMinimized] = useState(true);

  // Quick channel offset navigation (CH+ / CH-)
  const handleChannelOffset = (offset: number) => {
    let nextCh = currentChannel + offset;
    if (nextCh < 1) nextCh = 6;
    if (nextCh > 6) nextCh = 1;
    onChannelChange(nextCh);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-40 select-none font-mono">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950/75 backdrop-blur-md border border-zinc-800/80 hover:border-cyan-500/80 rounded-full text-zinc-400 hover:text-[#00D9FF] shadow-lg transition-all duration-300 cursor-pointer text-[10px] font-bold uppercase tracking-wider"
          aria-label="Expand virtual TV remote control"
          aria-expanded="false"
        >
          <Tv size={12} className="text-[#00D9FF]" />
          <span>REMOTE</span>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-20 right-4 z-40 w-40 glass-l3 rounded-xl p-3.5 flex flex-col items-center gap-3.5 select-none font-mono text-[9px] text-zinc-300"
      role="dialog"
      aria-label="Virtual TV Remote Control"
    >
      {/* Remote Header */}
      <div className="w-full flex justify-between items-center text-zinc-400 border-b border-zinc-900 pb-1.5">
        <span className="text-[8px] tracking-widest uppercase font-extrabold text-[#00D9FF]">TEJA REMOTE</span>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
          aria-label="Minimize remote control"
          aria-expanded="true"
        >
          <Minimize2 size={12} />
        </button>
      </div>

      {/* Power Section */}
      <div className="w-full flex justify-between items-center">
        <button
          onClick={onToggleCrt}
          className={`p-1.5 rounded-full border cursor-pointer transition-all duration-300 ${
            isCrtEnabled
              ? 'border-red-900/60 bg-red-950/20 text-red-500 hover:bg-red-950/40 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
              : 'border-zinc-800 bg-zinc-900 text-zinc-650 hover:text-zinc-400'
          }`}
          title="Toggle CRT Screen Power"
          aria-label="Toggle CRT Screen Power"
        >
          <Power size={11} />
        </button>
        <span className="text-[7.5px] text-zinc-550 uppercase tracking-wider font-extrabold">
          CRT SCREEN
        </span>
      </div>

      {/* D-Pad Controller */}
      <div 
        className="relative w-24 h-24 bg-zinc-950/80 border border-zinc-900 rounded-full flex items-center justify-center shadow-inner"
        aria-label="Navigation D-pad"
      >
        {/* Up */}
        <button
          onClick={onDpadUp}
          className="absolute top-1.5 p-1 hover:text-[#00D9FF] text-zinc-500 transition-colors cursor-pointer"
          aria-label="Navigate Up"
        >
          <ChevronUp size={16} />
        </button>
        {/* Down */}
        <button
          onClick={onDpadDown}
          className="absolute bottom-1.5 p-1 hover:text-[#00D9FF] text-zinc-500 transition-colors cursor-pointer"
          aria-label="Navigate Down"
        >
          <ChevronDown size={16} />
        </button>
        {/* Left */}
        <button
          onClick={onDpadLeft}
          className="absolute left-1.5 p-1 hover:text-[#00D9FF] text-zinc-500 transition-colors cursor-pointer"
          aria-label="Navigate Left"
        >
          <ChevronLeft size={16} />
        </button>
        {/* Right */}
        <button
          onClick={onDpadRight}
          className="absolute right-1.5 p-1 hover:text-[#00D9FF] text-zinc-500 transition-colors cursor-pointer"
          aria-label="Navigate Right"
        >
          <ChevronRight size={16} />
        </button>
        {/* Center OK */}
        <button
          onClick={onDpadEnter}
          className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 text-[10px] font-black text-zinc-300 hover:text-[#00D9FF] flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label="Select active item"
        >
          OK
        </button>
      </div>

      {/* Channel Adjusters */}
      <div className="w-full grid grid-cols-2 gap-1.5 text-center">
        <button
          onClick={() => handleChannelOffset(1)}
          className="py-1 bg-zinc-950/60 border border-zinc-900 rounded hover:border-[#00D9FF]/40 hover:text-white transition-all cursor-pointer font-bold tracking-wider"
          aria-label="Channel Up"
        >
          CH +
        </button>
        <button
          onClick={() => handleChannelOffset(-1)}
          className="py-1 bg-zinc-950/60 border border-zinc-900 rounded hover:border-[#00D9FF]/40 hover:text-white transition-all cursor-pointer font-bold tracking-wider"
          aria-label="Channel Down"
        >
          CH -
        </button>
      </div>

      {/* Menu / Home Controls */}
      <div className="w-full grid grid-cols-2 gap-1 text-zinc-400 border-t border-zinc-900 pt-2.5">
        <button
          onClick={() => onChannelChange(1)}
          className="flex items-center justify-center gap-1 hover:text-[#00D9FF] transition-colors cursor-pointer"
          aria-label="Go to Home Channel 1"
        >
          <Home size={9} />
          <span>HOME</span>
        </button>
        <button
          onClick={() => onChannelChange(2)}
          className="flex items-center justify-center gap-1 hover:text-[#00D9FF] transition-colors cursor-pointer"
          aria-label="Go to Projects Channel 2"
        >
          <Menu size={9} />
          <span>MENU</span>
        </button>
      </div>
    </div>
  );
}
