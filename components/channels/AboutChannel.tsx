'use client';

import React from 'react';
import { Layers, Compass, Activity } from 'lucide-react';

export default function AboutChannel() {
  const focusAreas = [
    { title: "AI SYSTEMS", desc: "Building local models integration, vector indexes, and reasoning pipelines." },
    { title: "MACHINE LEARNING", desc: "Clustering algorithms, feature scaling, and statistical evaluation parameters." },
    { title: "BACKEND ENGINEERING", desc: "Designing robust web APIs, async routes, and structured database layers." },
    { title: "SOFTWARE DEVELOPMENT", desc: "Understanding low-level hardware up to modern persistent applications." }
  ];

  const buildPhilosophy = [
    { step: "01", name: "UNDERSTAND", desc: "Deconstruct the problem fully before planning code." },
    { step: "02", name: "BUILD", desc: "Implement clean, reliable logic from the ground up." },
    { step: "03", name: "TEST", desc: "Iterate and aggressively discover system limits." },
    { step: "04", name: "IMPROVE", desc: "Refactor bottlenecks and optimize structural paths." }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-10 font-sans select-text selection:bg-[#00D9FF] selection:text-black">
      
      {/* 1. Page Title Header */}
      <div className="border-b border-zinc-900 pb-4 select-none flex flex-col md:flex-row md:justify-between md:items-end gap-2">
        <div>
          <span className="font-mono text-[9px] text-[#8d969d] uppercase tracking-widest block mb-1">
            CH 01 // ON AIR PROFILE
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-[#E6E8EA] tracking-wide uppercase">
            WHO IS KONDA TEJA?
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-[#0d1217]/50 border border-zinc-900 px-3 py-1 rounded-md text-[9px] text-cyan-400 font-mono font-bold select-none w-max">
          <Activity size={10} className="animate-pulse" />
          <span>STATUS // ACTIVE COMPILATION</span>
        </div>
      </div>

      {/* 2. Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Brief Personal Identity Summary */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#E6E8EA] leading-none uppercase">
              KONDA TEJA
            </h2>
            <p className="text-[#00D9FF] font-mono text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
              COMPUTER SCIENCE STUDENT // AI • SOFTWARE • SYSTEMS
            </p>
          </div>

          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl font-light">
            I enjoy understanding how systems work, then building my own versions of them.
          </p>

          <div className="flex flex-col gap-3 font-sans text-sm md:text-base text-[#8D969D] leading-relaxed max-w-2xl border-t border-zinc-900/60 pt-4">
            <p>
              I explore software by taking it apart, analyzing the components underneath, and stitching what I learn back into working systems. My work covers autonomous local AI assistants, clustering anomaly detection models, database index utilities, and information classification tools.
            </p>
          </div>
        </div>

        {/* Right Side: Abstract animated SVG network graphics constellation */}
        <div className="lg:col-span-5 flex justify-center items-center select-none relative h-64 md:h-72 w-full glass-l2 rounded-xl overflow-hidden border border-zinc-900">
          <div className="absolute inset-0 bg-radial-gradient from-cyan-950/10 via-transparent to-transparent opacity-60" />
          <svg className="w-5/6 h-5/6 text-[#00D9FF]/20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Connection Lines */}
            <line x1="100" y1="100" x2="40" y2="60" stroke="currentColor" strokeWidth="0.5" className="animate-pulse" />
            <line x1="100" y1="100" x2="160" y2="60" stroke="currentColor" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="100" y2="160" stroke="currentColor" strokeWidth="0.5" />
            <line x1="40" y1="60" x2="160" y2="60" stroke="currentColor" strokeWidth="0.25" strokeDasharray="3 3" />
            <line x1="40" y1="60" x2="100" y2="160" stroke="currentColor" strokeWidth="0.25" />
            <line x1="160" y1="60" x2="100" y2="160" stroke="currentColor" strokeWidth="0.25" />
            
            {/* Core Node */}
            <circle cx="100" cy="100" r="8" fill="#080A0C" stroke="#00D9FF" strokeWidth="2" />
            <circle cx="100" cy="100" r="14" stroke="#00D9FF" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '10s' }} />

            {/* Orbiting Nodes */}
            <circle cx="40" cy="60" r="5" fill="#080A0C" stroke="#00D9FF" strokeWidth="1.5" />
            <circle cx="160" cy="60" r="5" fill="#080A0C" stroke="#00D9FF" strokeWidth="1.5" />
            <circle cx="100" cy="160" r="5" fill="#080A0C" stroke="#00D9FF" strokeWidth="1.5" />

            {/* Inner Details */}
            <circle cx="100" cy="100" r="2" fill="#00D9FF" />
          </svg>
          <div className="absolute bottom-3 right-4 font-mono text-[8px] text-zinc-550 uppercase tracking-widest">
            Identity constellation map // active
          </div>
        </div>

      </div>

      {/* 3. Deep Visual Division Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-zinc-900 pt-8">
        
        {/* Left Side: Focus Areas (L2 Glass blocks) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="font-mono text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold flex items-center gap-1.5 select-none">
            <Compass size={14} />
            DIAGNOSTIC FOCUS AREAS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusAreas.map((area, idx) => (
              <div 
                key={idx} 
                className="glass-l2 rounded-lg p-4 flex flex-col gap-1.5 transition-all hover:border-[#00D9FF]/20 select-none"
              >
                <span className="text-xs font-black tracking-wider text-[#E6E8EA] uppercase">
                  {area.title}
                </span>
                <p className="text-[11px] text-[#8D969D] leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Build Philosophy (Timeline stack) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="font-mono text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold flex items-center gap-1.5 select-none">
            <Layers size={14} />
            TRANSMISSION CORE PHILOSOPHY
          </span>
          <div className="flex flex-col gap-3 bg-[#0d1217]/50 border border-zinc-900 rounded-lg p-4 select-none">
            {buildPhilosophy.map((phil, idx) => (
              <div key={idx} className="flex gap-4 items-start border-b border-zinc-900/60 pb-3 last:border-0 last:pb-0">
                <span className="font-mono text-xs font-black text-[#00D9FF]">
                  {phil.step}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#E6E8EA] tracking-wide uppercase">
                    {phil.name}
                  </span>
                  <span className="text-[11px] text-[#8D969D] mt-0.5 font-light">
                    {phil.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
