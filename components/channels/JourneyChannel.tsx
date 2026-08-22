'use client';

import React, { useState } from 'react';
import { journeyData } from '@/data/journey';
import { PlayCircle, Award, Terminal, Compass, Film } from 'lucide-react';

export default function JourneyChannel() {
  const [activeYear, setActiveYear] = useState<string>(journeyData[0].year); // Default to 2023

  const activeDoc = journeyData.find(j => j.year === activeYear) || journeyData[0];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-none">
      {/* Channel Header */}
      <div className="border-b border-zinc-800/80 pb-3 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#8D969D] uppercase tracking-widest block mb-1">
            CH 05 // THE JOURNEY
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#E6E8EA] tracking-wider uppercase flex items-center gap-2">
            <Film className="text-[#00D9FF]" size={20} />
            DOCUMENTARY SERIES
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timeline Menu (takes 4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold border-b border-zinc-900 pb-2">
            EPISODE PLAYLIST
          </span>
          <div className="flex flex-col gap-2">
            {journeyData.map((jd) => {
              const isActive = jd.year === activeYear;
              return (
                <button
                  key={jd.year}
                  onClick={() => setActiveYear(jd.year)}
                  className={`w-full text-left p-3 rounded border text-xs transition-all duration-200 cursor-pointer flex items-center justify-between group focus:outline-none focus:ring-1 focus:ring-[#00D9FF] ${
                    isActive
                      ? 'bg-[#0D1013] border-[#00D9FF] text-[#00D9FF] shadow-[0_0_6px_rgba(0,217,255,0.15)]'
                      : 'bg-[#090B0D] border-zinc-900 hover:border-zinc-800 text-[#8D969D] hover:text-[#E6E8EA]'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider font-bold mb-0.5 text-zinc-650 group-hover:text-[#00D9FF] transition-colors">
                      {jd.episodeTitle}
                    </span>
                    <span className={`font-extrabold ${isActive ? 'text-[#00D9FF]' : 'text-zinc-300'}`}>
                      {jd.title}
                    </span>
                  </div>
                  <PlayCircle 
                    size={16} 
                    className={`flex-shrink-0 transition-transform ${
                      isActive 
                        ? 'text-[#00D9FF] scale-110' 
                        : 'text-zinc-700 group-hover:text-[#8D969D]'
                    }`} 
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Playback Viewer (takes 8 cols on lg) */}
        <div className="lg:col-span-8 bg-[#0D1013] border border-zinc-855 rounded-lg p-5 flex flex-col gap-6 relative overflow-hidden select-text selection:bg-[#00D9FF] selection:text-black">
          {/* Watermark scanlines */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none degraded-signal" />

          {/* Viewer header */}
          <div className="flex justify-between items-start border-b border-zinc-900 pb-3 flex-wrap gap-2 z-10">
            <div className="flex flex-col">
              <span className="text-[9px] text-[#00D9FF] font-bold tracking-widest uppercase">
                NOW SCREENING — {activeDoc.episodeTitle}
              </span>
              <h2 className="text-base md:text-lg font-black text-[#E6E8EA] tracking-wide uppercase">
                {activeDoc.title} ({activeDoc.year})
              </h2>
            </div>
            <div className="px-2 py-0.5 border border-zinc-800 bg-[#080A0C] rounded text-[9px] font-bold text-[#8D969D]">
              HD BROADCAST FEED
            </div>
          </div>

          <div className="flex flex-col gap-5 text-xs md:text-sm leading-relaxed z-10">
            {/* Summary */}
            <p className="font-sans text-[#8D969D] leading-relaxed">
              {activeDoc.summary}
            </p>

            {/* Objective */}
            <div className="flex flex-col gap-1 bg-[#080A0C] border border-zinc-900/60 p-3 rounded">
              <span className="text-[9px] text-[#00D9FF] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Compass size={12} />
                EPISODE OBJECTIVE
              </span>
              <p className="text-zinc-300 font-sans mt-0.5">{activeDoc.objective}</p>
            </div>

            {/* Learned list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1">
                  <Award size={12} className="text-[#00D9FF]" />
                  ACQUIRED KNOWLEDGE
                </span>
                <ul className="flex flex-col gap-1.5 font-sans text-[#8D969D] pl-3.5 list-disc">
                  {activeDoc.learned.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Built list */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1">
                  <Terminal size={12} className="text-[#00D9FF]" />
                  SYSTEMS COMPILED
                </span>
                <ul className="flex flex-col gap-1.5 font-sans text-[#8D969D] pl-3.5 list-disc">
                  {activeDoc.built.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
