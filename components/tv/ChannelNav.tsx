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
  { number: 3, label: 'CH 03', name: 'LAB' },
  { number: 4, label: 'CH 04', name: 'SKILLS' },
  { number: 5, label: 'CH 05', name: 'JOURNEY' },
  { number: 6, label: 'CH 06', name: 'ARCHIVE' },
  { number: 7, label: 'CH 07', name: 'CONTACT' },
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
    <nav className="w-full bg-[#070707] border-t border-zinc-800/60 p-3 flex flex-wrap justify-center items-center gap-2 select-none z-30">
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-2 no-scrollbar max-w-full">
        {channelsList.map((ch) => {
          const isActive = ch.number === currentChannel;
          return (
            <button
              key={ch.number}
              onClick={() => onChannelChange(ch.number)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 border rounded font-mono text-xs md:text-sm transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-[#00E5FF] ${
                isActive
                  ? 'bg-zinc-900 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.2)]'
                  : 'bg-[#0E0E0E] border-zinc-800 hover:border-zinc-700 text-[#777777] hover:text-[#F2F2F2]'
              }`}
            >
              <span className={`font-bold ${isActive ? 'text-[#00E5FF]' : 'text-zinc-600'}`}>
                {ch.label}
              </span>
              <span className="text-[10px] md:text-xs tracking-wider uppercase font-semibold">
                {ch.name}
              </span>
            </button>
          );
        })}
      </div>
      <div className="hidden xl:flex items-center gap-2 ml-4 text-[10px] font-mono text-[#555555]">
        <span>CHANNELS 1-7</span>
        <span>•</span>
        <span>REMOTE READY</span>
      </div>
    </nav>
  );
}
