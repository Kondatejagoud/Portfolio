'use client';

import React from 'react';
import { Episode } from '@/data/projects';
import { Shield, Sparkles, Terminal, Activity, FileText } from 'lucide-react';

interface ProjectDetailsProps {
  episode: Episode;
}

export default function ProjectDetails({ episode }: ProjectDetailsProps) {
  return (
    <div className="flex-1 bg-[#090909] border border-zinc-800 rounded-lg p-5 font-mono flex flex-col gap-6 md:h-[450px] overflow-y-auto select-text selection:bg-[#00E5FF] selection:text-black">
      {/* Title */}
      <div className="border-b border-zinc-900 pb-3 flex justify-between items-start flex-wrap gap-2">
        <div className="flex flex-col">
          <span className="text-[9px] text-[#00E5FF] font-bold tracking-widest uppercase">
            EPISODE DOSSIER
          </span>
          <h3 className="text-sm md:text-base font-extrabold text-[#F2F2F2]">
            {episode.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-[10px] text-zinc-400">
          <Activity size={10} className="text-[#00E5FF]" />
          <span className="text-[9px] font-bold">STATUS: {episode.status}</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 text-xs md:text-sm leading-relaxed">
        {/* Objective */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-[#777777] uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#00E5FF]" />
            OBJECTIVE
          </span>
          <p className="text-[#F2F2F2] font-sans">{episode.objective}</p>
        </div>

        {/* Problem */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-[#777777] uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <Shield size={12} className="text-red-500" />
            PROBLEM STATEMENT
          </span>
          <p className="text-[#999999] font-sans">{episode.problem}</p>
        </div>

        {/* Approach */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-[#777777] uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <Terminal size={12} className="text-[#00E5FF]" />
            TECHNICAL APPROACH
          </span>
          <p className="text-[#999999] font-sans">{episode.approach}</p>
        </div>

        {/* Architecture Diagram */}
        {episode.architecture && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-[#777777] uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Terminal size={12} />
              SYSTEM ARCHITECTURE DATAFLOW
            </span>
            <pre className="bg-[#050505] border border-zinc-900 rounded p-3 text-[10px] md:text-xs overflow-x-auto text-[#00E5FF] font-mono leading-normal whitespace-pre">
              {episode.architecture}
            </pre>
          </div>
        )}

        {/* Lessons Learned */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-[#777777] uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <FileText size={12} className="text-[#00E5FF]" />
            LESSONS LEARNED
          </span>
          <div className="bg-zinc-950 border border-zinc-900/60 p-3 rounded text-[#999999] italic font-sans">
            &ldquo;{episode.lessonsLearned}&rdquo;
          </div>
        </div>

        {/* Technologies Badges */}
        <div className="flex flex-col gap-2 border-t border-zinc-900 pt-4">
          <span className="text-[10px] text-[#777777] uppercase tracking-wider font-semibold">
            TECHNOLOGIES DEPLOYED
          </span>
          <div className="flex flex-wrap gap-2">
            {episode.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
