'use client';

import React from 'react';
import { Project } from '@/data/projects';

interface ProgramLineupProps {
  projects: Project[];
  activeProjectId: string;
  onProjectSelect: (id: string) => void;
}

export default function ProgramLineup({
  projects,
  activeProjectId,
  onProjectSelect,
}: ProgramLineupProps) {
  return (
    <div className="w-full lg:w-80 flex flex-col gap-4 font-mono select-none" aria-label="Program Lineup">
      <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold border-b border-zinc-800/80 pb-2">
        PROGRAM LINEUP
      </span>
      
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[350px] lg:max-h-[500px] pr-1">
        {projects.map((proj) => {
          const isActive = proj.id === activeProjectId;
          const statusColors = {
            LIVE: 'text-green-400',
            ACTIVE: 'text-cyan-400 animate-pulse',
            COMPLETED: 'text-zinc-400',
            EXPERIMENTAL: 'text-yellow-500',
            ARCHIVED: 'text-red-500'
          };
          
          return (
            <div
              key={proj.id}
              onClick={() => onProjectSelect(proj.id)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col gap-2 relative overflow-hidden group focus-within:ring-1 focus-within:ring-[#00D9FF] ${
                isActive
                  ? 'bg-[#0D1013] border-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.15)]'
                  : 'bg-[#090B0D] border-zinc-800/60 hover:border-zinc-700 text-[#8D969D] hover:text-[#E6E8EA]'
              }`}
              role="button"
              aria-current={isActive ? 'true' : undefined}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onProjectSelect(proj.id);
                }
              }}
            >
              {/* Top Meta info */}
              <div className="flex justify-between items-center text-[9px] tracking-widest text-[#8D969D]">
                <span>{proj.programNumber}</span>
                <span className={`font-extrabold flex items-center gap-1 uppercase ${statusColors[proj.status]}`}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
                  {proj.status}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col">
                <h3 className={`text-sm font-black tracking-wider transition-colors uppercase ${
                  isActive ? 'text-[#00D9FF]' : 'text-[#E6E8EA] group-hover:text-[#00D9FF]'
                }`}>
                  {proj.title}
                </h3>
                <span className="text-[10px] text-[#8D969D] font-medium tracking-wide uppercase truncate">
                  {proj.subtitle}
                </span>
              </div>

              {/* Technologies summary */}
              <div className="text-[9px] text-zinc-600 font-mono mt-1 uppercase flex flex-wrap gap-1">
                {proj.technologies.slice(0, 3).map((t, idx) => (
                  <span key={idx}>
                    {t}{idx < 2 && idx < proj.technologies.length - 1 ? ' · ' : ''}
                  </span>
                ))}
                {proj.technologies.length > 3 && <span>+ MORE</span>}
              </div>

              {/* Visual Action Button representation */}
              <div className="flex justify-end mt-2 pt-2 border-t border-zinc-900/60">
                <span className={`text-[9px] font-bold border px-2 py-0.5 rounded transition-all select-none ${
                  isActive
                    ? 'border-[#00D9FF] text-[#00D9FF] bg-[#00D9FF]/5'
                    : 'border-zinc-800 text-[#8D969D] group-hover:text-[#E6E8EA] group-hover:border-zinc-700'
                }`}>
                  [ OPEN PROGRAM ]
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
