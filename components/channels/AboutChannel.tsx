'use client';

import React from 'react';
import { User, Target, Cpu, BookOpen, Layers } from 'lucide-react';

export default function AboutChannel() {
  const interests = [
    {
      title: "ARTIFICIAL INTELLIGENCE",
      desc: "Building practical AI systems and exploring how models can interact with tools, memory and real-world applications."
    },
    {
      title: "BACKEND ENGINEERING",
      desc: "Designing APIs, services and backend systems that connect different parts of an application."
    },
    {
      title: "MACHINE LEARNING",
      desc: "Working with data, algorithms and models to identify patterns and solve practical problems."
    },
    {
      title: "SYSTEM ARCHITECTURE",
      desc: "Understanding how individual components become reliable and maintainable systems."
    },
    {
      title: "AUTOMATION",
      desc: "Exploring ways software and intelligent systems can reduce repetitive work."
    },
    {
      title: "CONTINUOUS LEARNING",
      desc: "Currently expanding knowledge across AI, backend engineering and system design."
    }
  ];

  const philosophy = [
    { step: "01", name: "UNDERSTAND", desc: "Understand the problem before building the solution." },
    { step: "02", name: "BUILD", desc: "Turn the idea into something that actually works." },
    { step: "03", name: "TEST", desc: "Find where the system breaks." },
    { step: "04", name: "IMPROVE", desc: "Refactor, test and make it better." },
    { step: "05", name: "REPEAT", desc: "There is always another layer worth understanding." }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-8 font-mono select-text selection:bg-[#00D9FF] selection:text-black">
      {/* Title Header */}
      <div className="border-b border-zinc-800/80 pb-4 select-none">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 01 // ON AIR PROFILE
        </span>
        <h1 className="text-xl md:text-3xl font-extrabold text-[#E6E8EA] tracking-wider uppercase">
          WHO IS KONDA TEJA?
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Card (ON AIR PROFILE) - takes 5 cols on lg */}
        <div className="lg:col-span-5 bg-[#0D1013] border border-zinc-800 rounded-lg p-5 flex flex-col gap-5 select-none">
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
              <span className="text-[#E6E8EA] font-semibold">KONDA TEJA</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">ROLE</span>
              <span className="text-[#E6E8EA] font-semibold">COMPUTER SCIENCE STUDENT</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">FOCUS</span>
              <span className="text-[#00D9FF] font-semibold uppercase">AI • SOFTWARE • SYSTEMS</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">STATUS</span>
              <span className="text-[#E6E8EA] flex items-center gap-2 font-semibold">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 absolute" />
                <span className="pl-3.5">● BUILDING</span>
              </span>
            </div>
          </div>
        </div>

        {/* Narrative bio and details - takes 7 cols on lg */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Signature Quote Statement */}
          <div className="bg-[#0D1013] border-l-2 border-[#00D9FF] p-4 text-[#E6E8EA] text-sm md:text-base leading-relaxed font-black">
            &ldquo;I don&apos;t just want to use a system.<br/>
            I want to understand what&apos;s happening underneath it.&rdquo;
          </div>

          {/* Transmission Synopsis (Bio) */}
          <div className="flex flex-col gap-3 font-sans text-sm md:text-base text-[#8D969D] leading-relaxed">
            <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-mono font-bold flex items-center gap-1.5 select-none">
              <Target size={14} />
              TRANSMISSION SYNOPSIS
            </span>
            <p>
              I&apos;m Konda Teja, a Computer Science student who learns by building. I like taking ideas apart, understanding what happens underneath, and turning what I learn into working systems.
            </p>
            <p>
              I&apos;ve built projects ranging from AI assistants and machine-learning pipelines to student-focused systems and information-analysis tools. I&apos;m particularly interested in how individual components come together to create useful and reliable software.
            </p>
            <p>
              I&apos;m still learning, still experimenting, and still improving. Every project gives me something new to understand, rebuild, or refine.
            </p>
          </div>

          {/* Build Philosophy Section */}
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold flex items-center gap-1.5">
              <Layers size={14} />
              BUILD PHILOSOPHY
            </span>
            <div className="flex flex-col gap-2.5 bg-[#0D1013]/50 p-4 border border-zinc-800/40 rounded-lg">
              {philosophy.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start text-xs border-b border-zinc-900/60 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-[#00D9FF] font-black">{step.step}</span>
                  <div className="flex flex-col">
                    <span className="text-[#E6E8EA] font-extrabold tracking-wide">{step.name}</span>
                    <span className="text-[#8D969D] font-sans mt-0.5">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Grid */}
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold flex items-center gap-1.5">
              <Cpu size={14} />
              CURRENT INTERESTS
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#0D1013] border border-zinc-800 rounded p-4 flex flex-col gap-1.5 hover:border-[#00D9FF]/40 transition-all group"
                >
                  <span className="text-xs font-bold text-[#E6E8EA] flex items-center gap-2">
                    <BookOpen size={12} className="text-[#8D969D] group-hover:text-[#00D9FF] transition-colors" />
                    {interest.title}
                  </span>
                  <p className="text-[11px] text-[#8D969D] font-sans leading-relaxed">
                    {interest.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
