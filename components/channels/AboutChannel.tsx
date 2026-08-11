'use client';

import React from 'react';
import { User, Target, Cpu, BookOpen } from 'lucide-react';

export default function AboutChannel() {
  const interests = [
    "Artificial Intelligence",
    "Backend Systems",
    "Machine Learning",
    "Automation Pipelines",
    "System Architecture",
    "Data Engineering"
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 md:gap-8 font-mono select-text selection:bg-[#00D9FF] selection:text-black">
      {/* Title Header */}
      <div className="border-b border-zinc-800/80 pb-4">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 01 // ON AIR PROFILE
        </span>
        <h1 className="text-xl md:text-3xl font-extrabold text-[#E6E8EA] tracking-wider uppercase">
          WHO IS TEJA?
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Profile Card (ON AIR PROFILE) - takes 5 cols on lg */}
        <div className="lg:col-span-5 bg-[#0D1013] border border-zinc-800 rounded-lg p-5 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <span className="text-xs font-bold text-[#00D9FF] tracking-wider uppercase flex items-center gap-2">
              <User size={14} className="text-[#00D9FF]" />
              ON AIR PROFILE
            </span>
            <div className="flex items-center gap-1.5 bg-green-950/40 border border-green-800/40 px-2 py-0.5 rounded text-green-400 text-[10px] font-bold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              ONLINE
            </div>
          </div>

          <div className="flex flex-col gap-4 text-xs md:text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">NAME</span>
              <span className="text-[#E6E8EA] font-semibold">TEJA</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">ROLE</span>
              <span className="text-[#E6E8EA] font-semibold">COMPUTER SCIENCE STUDENT</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">FOCUS</span>
              <span className="text-[#00D9FF] font-semibold uppercase">AI + SOFTWARE SYSTEMS</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">STATUS</span>
              <span className="text-[#E6E8EA] flex items-center gap-2 font-semibold">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 absolute" />
                <span className="pl-3.5">CURRENTLY BUILDING</span>
              </span>
            </div>
          </div>
        </div>

        {/* Narrative bio and interests - takes 7 cols on lg */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          {/* Mission statement */}
          <div className="bg-[#0D1013]/30 border-l-2 border-[#00D9FF] p-4 font-sans text-base md:text-lg leading-relaxed text-[#E6E8EA]">
            &ldquo;I enjoy understanding how systems work and building my own versions of them.&rdquo;
          </div>

          {/* Philosophy / Bio */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold flex items-center gap-1.5">
              <Target size={14} />
              TRANSMISSION SYNOPSIS
            </span>
            <p className="font-sans text-sm md:text-base text-[#8D969D] leading-relaxed">
              As a Computer Science student focused on software engineering and AI systems, I prefer hands-on building to validate theoretical concepts. Whether it is compiling neural model weights, designing multi-tier APIs, or analyzing raw TCP network frames, my driving philosophy is to look under the hood.
            </p>
          </div>

          {/* Interests Grid */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold flex items-center gap-1.5">
              <Cpu size={14} />
              CURRENT INTERESTS
            </span>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#090B0D] border border-zinc-800 rounded p-3 flex items-center gap-2 hover:border-[#00D9FF]/40 transition-all group"
                >
                  <BookOpen size={12} className="text-[#8D969D] group-hover:text-[#00D9FF] transition-colors" />
                  <span className="text-xs md:text-sm text-[#E6E8EA] font-semibold">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
