'use client';

import React from 'react';
import { 
  currentlyBuilding, 
  developmentLogs, 
  technicalNotes, 
  learning, 
  buildProcess 
} from '@/data/workshop';
import { Terminal, Calendar, Code, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function WorkshopChannel() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-text selection:bg-[#00D9FF] selection:text-black">
      {/* Channel Header */}
      <div className="border-b border-zinc-800/80 pb-3 select-none">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 03 // WORKSHOP
        </span>
        <h1 className="text-xl md:text-2xl font-extrabold text-[#E6E8EA] tracking-wider uppercase">
          TEJA WORKSHOP
          <span className="block text-[10px] text-[#8D969D] font-normal tracking-wide mt-1 lowercase">
            {"// building in progress"}
          </span>
        </h1>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Build Status, Things That Broke, Build Process */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full">
          
          {/* 1. Currently Building Section */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg select-none">
            <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <Terminal size={12} className="text-[#00D9FF]" />
              CURRENTLY BUILDING
            </span>
            {currentlyBuilding.length > 0 ? (
              currentlyBuilding.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-extrabold text-[#E6E8EA] uppercase tracking-wide">
                        {item.project}
                      </h3>
                      <span className="text-[10px] text-[#8D969D]">{item.subtitle}</span>
                    </div>
                    <span className="text-green-400 bg-green-955/20 border border-green-900/60 px-2.5 py-0.5 rounded text-[9px] font-bold animate-pulse">
                      ● {item.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 bg-[#080A0C] border border-zinc-900/60 p-3 rounded">
                    <span className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold">
                      CURRENT DEVELOPMENT FOCUS:
                    </span>
                    <ul className="list-disc pl-4 text-xs text-[#8D969D] flex flex-col gap-1 font-sans select-text">
                      {item.focus.map((f, fidx) => (
                        <li key={fidx}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-xs text-zinc-650 italic font-sans bg-[#080A0C] rounded border border-zinc-900">
                NO ACTIVE BUILD
                <span className="block text-[10px] text-zinc-600 font-mono mt-1 font-normal uppercase">
                  The workshop is currently idle.
                </span>
              </div>
            )}
          </section>



          {/* 6. Build Flow Process */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg select-none">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <Layers size={12} />
              BUILD PROCESS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3.5 p-3.5 bg-[#080A0C] border border-zinc-900 rounded-lg">
              {buildProcess.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-2.5 py-1 bg-[#0D1013] border border-zinc-850 rounded font-mono text-[9px] md:text-[10px] text-[#E6E8EA] font-extrabold uppercase">
                    {step}
                  </div>
                  {idx < buildProcess.length - 1 && (
                    <span className="text-[#00D9FF] font-bold text-xs select-none">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Development Logs, Technical Notes, Currently Learning */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full">
          
          {/* 2. Development Log */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5 select-none">
              <Calendar size={12} />
              DEVELOPMENT LOG
            </span>
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              {developmentLogs.map((log, idx) => (
                <div key={idx} className="bg-[#080A0C] border border-zinc-900/60 rounded p-3.5 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center border-b border-zinc-900/40 pb-1 flex-wrap gap-2 select-none">
                    <span className="text-[9px] text-zinc-550 font-mono">{log.date}</span>
                    <span className="text-[9px] text-[#00D9FF] font-bold tracking-widest">{log.project}</span>
                  </div>
                  <p className="text-xs text-[#8D969D] font-sans leading-relaxed select-text">
                    {log.change}
                  </p>
                  <div className="flex justify-end pt-1 select-none">
                    <span className="text-green-400 bg-green-955/20 px-2 py-0.5 rounded text-[8px] font-bold tracking-widest flex items-center gap-1 uppercase">
                      <CheckCircle2 size={8} />
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Technical Notes */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5 select-none">
              <Code size={12} />
              TECHNICAL NOTES
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {technicalNotes.map((note, idx) => (
                <div key={idx} className="bg-[#080A0C] border border-zinc-900 rounded p-3 flex flex-col gap-2 relative">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider select-none">
                    {note.title}
                  </span>
                  <p className="text-[11px] text-[#8D969D] font-sans leading-relaxed select-text">
                    {note.explanation}
                  </p>
                  <div className="mt-auto pt-2 border-t border-zinc-900/50 flex justify-between items-center text-[8px] text-zinc-650 font-bold select-none">
                    <span>RELATED // {note.relatedProject}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Currently Learning */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg select-none">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <BookOpen size={12} />
              CURRENTLY LEARNING
            </span>
            <div className="flex flex-col gap-2">
              {learning.map((l, idx) => {
                const badgeStyles = {
                  'IN PROGRESS': 'text-cyan-400 bg-cyan-950/20 border-cyan-900/40',
                  EXPLORING: 'text-yellow-500 bg-yellow-950/20 border-yellow-900/30',
                  COMPLETED: 'text-green-400 bg-green-950/20 border-green-900/30'
                };
                return (
                  <div key={idx} className="flex justify-between items-center p-2.5 bg-[#080A0C] border border-zinc-900 rounded text-xs">
                    <span className="font-semibold text-zinc-300 uppercase tracking-wide">
                      {l.topic}
                    </span>
                    <span className={`px-2 py-0.5 border rounded text-[9px] font-bold uppercase ${badgeStyles[l.status]}`}>
                      {l.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
