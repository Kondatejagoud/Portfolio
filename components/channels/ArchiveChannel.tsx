'use client';

import React, { useState } from 'react';
import { archiveData, ArchiveItem } from '@/data/archive';
import { Archive, AlertTriangle, RefreshCw, Milestone } from 'lucide-react';

export default function ArchiveChannel() {
  const [selectedItemId, setSelectedItemId] = useState<string>(archiveData[0].id);

  const selectedItem = archiveData.find(item => item.id === selectedItemId) || archiveData[0];

  const getStatusColor = (status: ArchiveItem['status']) => {
    switch (status) {
      case 'REPLACED': return 'text-amber-500 border-amber-900/60 bg-amber-950/20';
      case 'RETIRED': return 'text-red-500 border-red-950 bg-red-950/20';
      default: return 'text-zinc-400 border-zinc-800 bg-zinc-900/50';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-none relative">
      {/* Degraded scanline overlay for the whole archive channel */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none degraded-signal bg-amber-500" />

      {/* Signal Warning Ticker */}
      <div className="bg-amber-955/20 border border-amber-900/40 p-2.5 rounded text-amber-500 text-[10px] md:text-xs flex items-center justify-between font-bold z-10">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
          <span>WARNING: ANALOG BROADCAST DEGRADATION WARNING</span>
        </div>
        <span className="hidden sm:inline">DEGRADED FEED // 240P ARCHIVE</span>
      </div>

      {/* Channel Header */}
      <div className="border-b border-zinc-800/80 pb-3 z-10">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 06 // ARCHIVED SIGNAL
        </span>
        <h1 className="text-xl md:text-2xl font-extrabold text-zinc-300 tracking-wider uppercase flex items-center gap-2">
          <Archive size={20} className="text-amber-600" />
          DEGRADED ARCHIVE // PAST BUILDS
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start z-10">
        {/* Archives Playlist (takes 4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-[10px] text-zinc-550 uppercase tracking-wider font-bold border-b border-zinc-900 pb-2">
            ARCHIVE DIRECTORY
          </span>
          <div className="flex flex-col gap-2 max-h-60 lg:max-h-[380px] overflow-y-auto">
            {archiveData.map((item) => {
              const isActive = item.id === selectedItemId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`w-full text-left p-3 rounded border text-xs transition-all duration-200 cursor-pointer flex items-center justify-between group focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                    isActive
                      ? 'bg-[#0D1013] border-amber-500/80 text-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.15)]'
                      : 'bg-[#090B0D] border-zinc-900 hover:border-zinc-800 text-[#8D969D] hover:text-[#E6E8EA]'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider font-bold mb-0.5 text-zinc-650 group-hover:text-amber-500 transition-colors">
                      {item.category}
                    </span>
                    <span className={`font-extrabold ${isActive ? 'text-amber-500' : 'text-zinc-400'}`}>
                      {item.title}
                    </span>
                  </div>
                  <Milestone 
                    size={14} 
                    className={`flex-shrink-0 transition-transform ${
                      isActive 
                        ? 'text-amber-500' 
                        : 'text-zinc-800 group-hover:text-zinc-600'
                    }`} 
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Vintage Monitor Display (takes 8 cols on lg) */}
        <div className="lg:col-span-8 bg-[#0D1013]/90 border border-zinc-800 rounded-lg p-5 flex flex-col gap-6 relative select-text selection:bg-amber-600 selection:text-black">
          {/* Internal shadow & scanline border */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none degraded-signal bg-yellow-400" />
          
          <div className="flex justify-between items-start border-b border-zinc-900 pb-3 flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-amber-500 font-bold tracking-widest uppercase">
                ARCHIVED DOSSIER // DEGRADED FEED
              </span>
              <h2 className="text-base md:text-lg font-black text-zinc-300 tracking-wide uppercase">
                {selectedItem.title}
              </h2>
            </div>
            <span className={`px-2 py-0.5 border rounded text-[9px] font-mono font-bold uppercase ${getStatusColor(selectedItem.status)}`}>
              {selectedItem.status}
            </span>
          </div>

          <div className="flex flex-col gap-5 text-xs md:text-sm leading-relaxed text-[#8D969D]">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-zinc-550 uppercase tracking-wider font-bold">RELEASE DATE</span>
              <span className="text-zinc-300 font-mono">{selectedItem.date}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-zinc-550 uppercase tracking-wider font-bold">ARCHIVE DESCRIPTION</span>
              <p className="text-zinc-300 font-sans leading-relaxed">{selectedItem.details}</p>
            </div>

            {selectedItem.replacedBy && (
              <div className="flex flex-col gap-1.5 bg-amber-955/10 border border-amber-900/20 p-3 rounded">
                <span className="text-[9px] text-amber-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <RefreshCw size={10} className="animate-spin" />
                  UPGRADED TO ACTIVE VERSION
                </span>
                <p className="text-zinc-300 font-semibold">{selectedItem.replacedBy}</p>
              </div>
            )}

            <div className="flex flex-col gap-1.5 bg-[#080A0C] border border-zinc-900 p-3 rounded">
              <span className="text-[9px] text-zinc-550 uppercase tracking-wider font-bold">RETROSPECTIVE LESSON</span>
              <p className="text-zinc-350 italic font-sans leading-relaxed font-semibold">
                &ldquo;{selectedItem.lesson}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
