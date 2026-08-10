'use client';

import React from 'react';
import { experimentsData, Experiment } from '@/data/experiments';
import { Flame, FlaskConical, AlertTriangle, Lightbulb } from 'lucide-react';

export default function LabChannel() {
  const activeExps = experimentsData.filter(exp => exp.status !== 'FAILED');
  const failedExps = experimentsData.filter(exp => exp.status === 'FAILED');

  const getStatusBadge = (status: Experiment['status']) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="text-green-400 border border-green-900/60 bg-green-950/20 px-2 py-0.5 rounded text-[10px] font-bold">🟢 ACTIVE</span>;
      case 'TESTING':
        return <span className="text-yellow-400 border border-yellow-900/60 bg-yellow-950/20 px-2 py-0.5 rounded text-[10px] font-bold">🟡 TESTING</span>;
      case 'PLANNED':
        return <span className="text-zinc-500 border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 rounded text-[10px] font-bold">⚪ PLANNED</span>;
      default:
        return <span className="text-red-400 border border-red-950 bg-red-950/20 px-2 py-0.5 rounded text-[10px] font-bold">🔴 FAILED</span>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-text selection:bg-[#00E5FF] selection:text-black">
      {/* Channel Header */}
      <div className="border-b border-zinc-800/80 pb-3 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] uppercase tracking-widest block mb-1">
            CH 03 // BROADCAST FEED
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#F2F2F2] tracking-wider uppercase flex items-center gap-2">
            <FlaskConical className="text-[#00E5FF]" size={20} />
            TEJA LAB // RESEARCH IN PROGRESS
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Experiments Stream (takes 7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="text-[10px] text-[#00E5FF] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-2">
            <span>ACTIVE SIGNAL FEEDS</span>
          </div>

          <div className="flex flex-col gap-4">
            {activeExps.map((exp) => (
              <div 
                key={exp.id} 
                className="bg-[#0E0E0E] border border-zinc-800 rounded-lg p-4 flex flex-col gap-3 hover:border-zinc-700 transition-colors"
              >
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#00E5FF] font-bold font-mono">
                      [{exp.id}]
                    </span>
                    <h3 className="text-xs md:text-sm font-extrabold text-[#F2F2F2]">
                      {exp.title}
                    </h3>
                  </div>
                  {getStatusBadge(exp.status)}
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-[#777777] uppercase tracking-wider">HYPOTHESIS</span>
                    <p className="text-zinc-300 font-sans">{exp.hypothesis}</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-[#777777] uppercase tracking-wider">METHODOLOGY</span>
                    <p className="text-zinc-400 font-sans">{exp.method}</p>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t border-zinc-900 pt-2">
                    <span className="text-[9px] text-[#00E5FF] uppercase tracking-wider">RESULT REPORT</span>
                    <p className="text-[#00E5FF] font-sans font-semibold">{exp.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Failed Experiments (takes 5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="text-[10px] text-red-500 tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-2 animate-pulse">
            <Flame size={12} />
            <span>FAILED BROADCASTS (RETIRED LOGS)</span>
          </div>

          <div className="flex flex-col gap-4">
            {failedExps.map((exp) => (
              <div 
                key={exp.id} 
                className="bg-black/40 border border-red-950 rounded-lg p-4 flex flex-col gap-3 relative overflow-hidden"
              >
                {/* Degradation mask */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none degraded-signal bg-red-500" />
                
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-500 font-bold font-mono">
                      [{exp.id}]
                    </span>
                    <h3 className="text-xs md:text-sm font-extrabold text-[#F2F2F2]">
                      {exp.title}
                    </h3>
                  </div>
                  <span className="text-red-500 border border-red-950 bg-red-950/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    RETIRED
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-[#777777] uppercase tracking-wider">RETIRED DATE</span>
                    <p className="text-zinc-400 font-mono">{exp.retiredDate || 'N/A'}</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-[#777777] uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle size={10} className="text-red-500" />
                      FAILURE REASON
                    </span>
                    <p className="text-zinc-400 font-sans leading-relaxed">{exp.reason}</p>
                  </div>
                  <div className="flex flex-col gap-0.5 bg-red-950/10 border border-red-900/20 p-2.5 rounded">
                    <span className="text-[9px] text-red-400 uppercase tracking-wider flex items-center gap-1">
                      <Lightbulb size={10} className="text-red-400" />
                      TAKEAWAY LESSON
                    </span>
                    <p className="text-zinc-300 italic font-sans leading-relaxed">{exp.lesson}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
