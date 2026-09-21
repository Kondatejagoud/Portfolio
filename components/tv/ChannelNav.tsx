'use client';

import React from 'react';

interface Channel {
  number: number;
  label: string;
  name: string;
}

const channelsList: Channel[] = [
  { number: 1, label: '01', name: 'ABOUT' },
  { number: 2, label: '02', name: 'PROJECTS' },
  { number: 3, label: '03', name: 'WORKSHOP' },
  { number: 4, label: '04', name: 'SKILLS' },
  { number: 5, label: '05', name: 'JOURNEY' },
  { number: 6, label: '06', name: 'CONTACT' },
];

interface ChannelNavProps {
  currentChannel: number;
  onChannelChange: (channelNum: number) => void;
}

export default function ChannelNav({
  currentChannel,
  onChannelChange,
}: ChannelNavProps) {
  return (
    <nav 
      className="w-full bg-[#080A0C]/90 backdrop-blur-md border-t border-zinc-900/60 py-2 md:py-2.5 px-4 flex flex-col md:flex-row justify-between items-center gap-2 select-none z-30 font-sans"
      aria-label="TV Channel Changer"
    >
      {/* Sleek horizontal scrolling channel list */}
      <div className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto py-1.5 px-2 no-scrollbar scroll-smooth snap-x">
        {channelsList.map((ch) => {
          const isActive = ch.number === currentChannel;
          return (
            <button
              key={ch.number}
              onClick={() => onChannelChange(ch.number)}
              className={`snap-center flex items-center gap-2 px-4 py-2 border transition-all duration-300 rounded-md cursor-pointer whitespace-nowrap focus:outline-none ${
                isActive
                  ? 'bg-zinc-900/70 border-cyan-500/80 text-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.08)] scale-[1.03]'
                  : 'bg-transparent border-transparent text-[#8D969D] hover:text-[#E6E8EA]'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Switch to Channel ${ch.number}: ${ch.name}`}
            >
              {/* Active signal dot */}
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'bg-[#00D9FF] scale-110 shadow-[0_0_8px_#00D9FF]' : 'bg-transparent'
              }`} />
              
              {/* Technical index code */}
              <span className="font-mono text-[10px] font-extrabold tracking-wider opacity-80 mt-0.5">
                {ch.label}
              </span>
              
              {/* Display Label */}
              <span className="text-xs font-black tracking-widest uppercase">
                {ch.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer system details status */}
      <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-bold">
        <span>CHANNELS 1–6</span>
        <span>•</span>
        <span>REMOTE ACTIVE</span>
      </div>
    </nav>
  );
}
