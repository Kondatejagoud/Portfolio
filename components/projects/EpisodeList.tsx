'use client';

import React from 'react';
import { Episode } from '@/data/projects';
import { Play } from 'lucide-react';

interface EpisodeListProps {
  episodes: Episode[];
  activeEpisodeId: string;
  onEpisodeSelect: (id: string) => void;
}

export default function EpisodeList({
  episodes,
  activeEpisodeId,
  onEpisodeSelect,
}: EpisodeListProps) {
  return (
    <div className="w-full lg:w-64 bg-[#0E0E0E] border border-zinc-800 rounded-lg p-4 flex flex-col gap-3 font-mono">
      <span className="text-[10px] text-[#777777] uppercase tracking-wider font-bold border-b border-zinc-900 pb-2">
        EPISODE INDEX
      </span>
      <div className="flex flex-col gap-1.5 overflow-y-auto max-h-60 lg:max-h-[380px]">
        {episodes.map((ep) => {
          const isActive = ep.id === activeEpisodeId;
          return (
            <button
              key={ep.id}
              onClick={() => onEpisodeSelect(ep.id)}
              className={`w-full text-left px-3 py-2.5 rounded border text-xs transition-all duration-200 cursor-pointer flex items-center justify-between group focus:outline-none ${
                isActive
                  ? 'bg-zinc-900 border-[#00E5FF] text-[#00E5FF]'
                  : 'bg-[#090909] border-zinc-900 hover:border-zinc-800 text-[#777777] hover:text-[#F2F2F2]'
              }`}
            >
              <span className="truncate pr-2 font-semibold">
                {ep.title}
              </span>
              <Play 
                size={10} 
                className={`flex-shrink-0 transition-transform ${
                  isActive 
                    ? 'text-[#00E5FF] translate-x-0' 
                    : 'text-zinc-700 group-hover:text-zinc-500 group-hover:translate-x-0.5'
                }`} 
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
