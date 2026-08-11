'use client';

import React from 'react';

interface Channel {
  number: number;
  label: string;
  name: string;
}

const channelsList: Channel[] = [
  { number: 1, label: 'CH 01', name: 'ABOUT' },
  { number: 2, label: 'CH 02', name: 'PROJECTS' },
  { number: 3, label: 'CH 03', name: 'WORKSHOP' },
  { number: 4, label: 'CH 04', name: 'SKILLS' },
  { number: 5, label: 'CH 05', name: 'JOURNEY' },
  { number: 6, label: 'CH 06', name: 'CONTACT' },
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
      className="w-full bg-[#0D1013] border-t border-zinc-800/60 p-3 flex flex-wrap justify-center items-center gap-2 select-none z-30"
      aria-label="TV Channel Changer"
    >
      <div className="flex items-center gap-2.5 overflow-x-auto py-1 px-2 no-scrollbar max-w-full">
        {channelsList.map((ch) => {
          const isActive = ch.number === currentChannel;
          return (
            <button
              key={ch.number}
              onClick={() => onChannelChange(ch.number)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 border rounded-lg font-mono text-xs md:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-[#00D9FF] ${
                isActive
                  ? 'bg-[#080A0C] border-[#00D9FF] text-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,0.18)]'
                  : 'bg-[#090B0D] border-zinc-800 hover:border-zinc-700 text-[#8D969D] hover:text-[#E6E8EA]'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Switch to Channel ${ch.number}: ${ch.name}`}
            >
              {isActive && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              )}
              <span className={`font-bold ${isActive ? 'text-[#00D9FF]' : 'text-zinc-550'}`}>
                {ch.label}
              </span>
              <span className="text-[10px] md:text-xs tracking-wider uppercase font-semibold">
                {ch.name}
              </span>
            </button>
          );
        })}
      </div>
      <div className="hidden xl:flex items-center gap-2 ml-4 text-[10px] font-mono text-zinc-650">
        <span>CHANNELS 1-6</span>
        <span>•</span>
        <span>REMOTE ACTIVE</span>
      </div>
    </nav>
  );
}
