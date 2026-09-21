'use client';

import React, { useState } from 'react';
import { journeyData } from '@/data/journey';
import { projectsData } from '@/data/projects';
import { Compass, Award, Terminal, ArrowRight } from 'lucide-react';

interface JourneyChannelProps {
  onNavigateToProject?: (projectId: string) => void;
}

export default function JourneyChannel({ onNavigateToProject }: JourneyChannelProps) {
  const [activeYear, setActiveYear] = useState<string>(journeyData[0].year); // Default to 2023

  const activeDoc = journeyData.find(j => j.year === activeYear) || journeyData[0];

  // Helper to find associated projects by matching title/names in data/projects.ts
  const getAssociatedProjects = (builtList: string[]) => {
    return projectsData.filter(proj => 
      builtList.some(b => b.toLowerCase().includes(proj.title.toLowerCase()) || proj.title.toLowerCase().includes(b.toLowerCase()))
    );
  };

  const relatedProjects = getAssociatedProjects(activeDoc.built);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-8 font-sans select-text selection:bg-[#00D9FF] selection:text-black">
      
      {/* Channel Header */}
      <div className="border-b border-zinc-900 pb-4 select-none">
        <span className="font-mono text-[9px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 05 // THE JOURNEY
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-[#E6E8EA] tracking-wide uppercase">
          DOCUMENTARY SERIES
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D9FF] uppercase ml-3">
            {"// THE ROAD SO FAR"}
          </span>
        </h1>
      </div>

      {/* Cinematic Horizontal Timeline Selector */}
      <div className="w-full flex flex-col items-center select-none bg-[#0D1013]/30 border border-zinc-900 rounded-xl p-6 gap-4 border-l-2 border-l-[#00D9FF]">
        <span className="font-mono text-[8px] text-zinc-550 uppercase tracking-widest font-extrabold align-self-start">
          Timeline Navigation // Select Epoch
        </span>
        
        {/* Horizontal Node Track */}
        <div className="relative w-full flex justify-between items-center max-w-2xl mt-4">
          {/* Connector Track Line */}
          <div className="absolute left-0 right-0 h-[2px] bg-zinc-900 z-0" />
          
          {journeyData.map((jd) => {
            const isActive = jd.year === activeYear;
            return (
              <button
                key={jd.year}
                onClick={() => setActiveYear(jd.year)}
                className="relative z-10 flex flex-col items-center gap-2.5 focus:outline-none group cursor-pointer"
                aria-pressed={isActive}
                aria-label={`Select Timeline node for year ${jd.year}`}
              >
                {/* Year Indicator Label */}
                <span className={`font-mono text-[10px] font-bold tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-[#00D9FF]' : 'text-zinc-650 group-hover:text-zinc-400'
                }`}>
                  {jd.year}
                </span>

                {/* Interactive Node Point */}
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isActive 
                    ? 'border-[#00D9FF] bg-[#080A0C] scale-110 shadow-[0_0_12px_#00D9FF]' 
                    : 'border-zinc-900 bg-zinc-950 group-hover:border-zinc-700'
                }`}>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                  )}
                </div>

                {/* Subtitle preview */}
                <span className={`hidden md:block font-mono text-[7.5px] uppercase tracking-wider transition-opacity duration-200 ${
                  isActive ? 'text-zinc-300 font-extrabold' : 'text-zinc-700 opacity-60'
                }`}>
                  {jd.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Epoch Content Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[350px]">
        
        {/* Left Area: Massive typography overlay & Synopsis (takes 7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-6 relative overflow-hidden">
          
          {/* Massive Translucent Year Typography Background */}
          <div className="absolute -top-12 -left-4 text-[120px] md:text-[160px] font-black text-zinc-800/[0.04] leading-none select-none tracking-tighter pointer-events-none uppercase font-mono">
            {activeDoc.year}
          </div>

          <div className="flex flex-col gap-1 z-10 select-none">
            <span className="font-mono text-[9px] text-[#00D9FF] tracking-wider uppercase font-bold">
              NOW SCREENING // {activeDoc.episodeTitle}
            </span>
            <h2 className="text-xl md:text-3xl font-black text-[#E6E8EA] tracking-tight uppercase">
              {activeDoc.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed font-sans z-10">
            {activeDoc.summary}
          </p>

          {/* Objective Statement Block */}
          <div className="flex flex-col gap-1.5 bg-[#080A0C]/60 border border-zinc-900 p-4 rounded-xl z-10 select-none">
            <span className="font-mono text-[8.5px] text-[#00D9FF] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
              <Compass size={11} />
              EPISODE OBJECTIVE
            </span>
            <p className="text-xs text-zinc-300 font-sans font-light mt-0.5 leading-relaxed">
              {activeDoc.objective}
            </p>
          </div>
        </div>

        {/* Right Area: Acquired Knowledge & Compiled Projects (takes 5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          
          {/* Knowledge Card */}
          <div className="glass-l2 rounded-xl p-5 border border-zinc-900 select-text">
            <span className="font-mono text-[9px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-2 select-none">
              <Award size={13} className="text-[#00D9FF]" />
              ACQUIRED KNOWLEDGE
            </span>
            <ul className="flex flex-col gap-2 mt-3 text-xs text-[#8D969D] pl-3.5 list-disc font-sans font-light leading-relaxed">
              {activeDoc.learned.map((item, idx) => (
                <li key={idx} className="hover:text-zinc-300 transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Projects associated with this year */}
          <div className="glass-l2 rounded-xl p-5 border border-zinc-900 flex flex-col gap-3">
            <span className="font-mono text-[9px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-2 select-none">
              <Terminal size={13} className="text-[#00D9FF]" />
              SYSTEMS COMPILED
            </span>
            
            {relatedProjects.length > 0 ? (
              <div className="flex flex-col gap-2 mt-1 select-none">
                {relatedProjects.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onNavigateToProject?.(proj.id);
                    }}
                    className="w-full text-left bg-[#080A0C]/50 border border-zinc-900 hover:border-[#00D9FF] rounded-lg p-3 transition-colors text-xs font-semibold text-[#E6E8EA] hover:text-[#00D9FF] flex justify-between items-center group cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-sans font-black uppercase text-zinc-300 group-hover:text-[#00D9FF] transition-colors">{proj.title}</span>
                      <span className="text-[8.5px] font-mono text-zinc-650 mt-0.5 lowercase group-hover:text-[#00D9FF]/85">
                        {"// click to view dossier"}
                      </span>
                    </div>
                    <ArrowRight size={12} className="text-zinc-600 group-hover:text-[#00D9FF] transition-colors transform translate-x-[-2px] group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            ) : (
              // Display string elements if no match in projectsData
              <ul className="flex flex-col gap-2 mt-1.5 text-xs text-[#8D969D] pl-3.5 list-disc font-sans font-light select-text">
                {activeDoc.built.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
