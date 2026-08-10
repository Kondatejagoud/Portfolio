'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Minimize2, Maximize2, Power, Home, Menu, Tv } from 'lucide-react';

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

  // Quick channel increment/decrement
  const handleChannelOffset = (offset: number) => {
    let nextCh = currentChannel + offset;
    if (nextCh < 1) nextCh = 7;
    if (nextCh > 7) nextCh = 1;
    onChannelChange(nextCh);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-16 right-4 z-40 select-none">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#0E0E0E]/90 border border-zinc-800 rounded-full text-[#777777] hover:text-[#00E5FF] hover:border-[#00E5FF] shadow-lg transition-all duration-200 cursor-pointer text-xs font-mono"
        >
          <Tv size={14} />
          <span>REMOTE</span>
          <Maximize2 size={10} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-16 right-4 z-40 w-44 bg-[#0E0E0E] border border-zinc-800 rounded-xl p-4 shadow-2xl flex flex-col items-center gap-4 select-none font-mono text-[10px]">
      {/* Remote Header */}
      <div className="w-full flex justify-between items-center text-zinc-500 border-b border-zinc-900 pb-2">
        <span className="text-[9px] tracking-wider uppercase text-zinc-400">TEJA REMOTE</span>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-zinc-600 hover:text-[#00E5FF] transition-colors cursor-pointer"
        >
          <Minimize2 size={12} />
        </button>
      </div>

      {/* Power Section */}
      <div className="w-full flex justify-between items-center">
        <button
          onClick={onToggleCrt}
          className={`p-2 rounded-full border cursor-pointer transition-all duration-200 ${
            isCrtEnabled
              ? 'border-red-900/60 bg-red-950/20 text-red-500 hover:bg-red-950/40'
              : 'border-zinc-800 bg-zinc-900 text-zinc-600 hover:text-zinc-400'
          }`}
          title="Toggle CRT Screen FX"
        >
          <Power size={14} />
        </button>
        <span className="text-[8px] text-zinc-500 uppercase tracking-widest">
          CRT POWER
        </span>
      </div>

      {/* D-Pad Controller */}
      <div className="relative w-28 h-28 bg-[#090909] border border-zinc-800 rounded-full flex items-center justify-center shadow-inner">
        {/* Up */}
        <button
          onClick={onDpadUp}
          className="absolute top-1 p-1 hover:text-[#00E5FF] text-zinc-500 transition-colors cursor-pointer"
        >
          <ChevronUp size={18} />
        </button>
        {/* Down */}
        <button
          onClick={onDpadDown}
          className="absolute bottom-1 p-1 hover:text-[#00E5FF] text-zinc-500 transition-colors cursor-pointer"
        >
          <ChevronDown size={18} />
        </button>
        {/* Left */}
        <button
          onClick={onDpadLeft}
          className="absolute left-1 p-1 hover:text-[#00E5FF] text-zinc-500 transition-colors cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        {/* Right */}
        <button
          onClick={onDpadRight}
          className="absolute right-1 p-1 hover:text-[#00E5FF] text-zinc-500 transition-colors cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
        {/* Center OK */}
        <button
          onClick={onDpadEnter}
          className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-[#00E5FF] flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          OK
        </button>
      </div>

      {/* Channels & Volume Control */}
      <div className="w-full grid grid-cols-2 gap-2 text-center text-zinc-400">
        <button
          onClick={() => handleChannelOffset(1)}
          className="py-1.5 bg-zinc-900/60 border border-zinc-800 rounded hover:border-zinc-700 hover:text-white transition-all cursor-pointer font-bold"
        >
          CH +
        </button>
        <button
          onClick={() => handleChannelOffset(-1)}
          className="py-1.5 bg-zinc-900/60 border border-zinc-800 rounded hover:border-zinc-700 hover:text-white transition-all cursor-pointer font-bold"
        >
          CH -
        </button>
      </div>

      {/* Menu / Home Controls */}
      <div className="w-full grid grid-cols-2 gap-2 text-zinc-500 border-t border-zinc-900 pt-3">
        <button
          onClick={() => onChannelChange(1)} // Home is CH01
          className="flex items-center justify-center gap-1 py-1 hover:text-[#00E5FF] transition-colors cursor-pointer"
        >
          <Home size={10} />
          <span>HOME</span>
        </button>
        <button
          onClick={() => onChannelChange(2)} // Menu is Projects CH02
          className="flex items-center justify-center gap-1 py-1 hover:text-[#00E5FF] transition-colors cursor-pointer"
        >
          <Menu size={10} />
          <span>MENU</span>
        </button>
      </div>
    </div>
  );
}
