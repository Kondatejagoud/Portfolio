'use client';

import React from 'react';
import { Project } from '@/data/projects';
import { Shield, Sparkles, Terminal, FileText, Cpu, ExternalLink, Code } from 'lucide-react';

interface TransmissionDossierProps {
  project: Project;
}

export default function TransmissionDossier({ project }: TransmissionDossierProps) {
  const isFakeNewsSpecial = project.id === 'fake-news';

  const statusConfig = {
    LIVE: { text: '● LIVE BROADCAST', style: 'text-green-400 bg-green-950/20 border-green-900/60' },
    ACTIVE: { text: '● ACTIVE DEVELOPMENT', style: 'text-cyan-400 bg-cyan-950/20 border-[#00D9FF]/30' },
    COMPLETED: { text: '● COMPLETED', style: 'text-zinc-400 bg-zinc-900/50 border-zinc-800' },
    EXPERIMENTAL: { text: '● EXPERIMENTAL', style: 'text-yellow-500 bg-yellow-950/20 border-yellow-900/30' },
    ARCHIVED: { text: '● ARCHIVED', style: 'text-red-500 bg-red-950/20 border-red-900/30' }
  };

  const status = statusConfig[project.status];

  return (
    <div className="flex-1 bg-[#0D1013] border border-zinc-800/80 rounded-lg p-5 md:p-6 font-mono flex flex-col gap-6 md:h-[500px] overflow-y-auto select-text selection:bg-[#00D9FF] selection:text-black" aria-live="polite">
      {/* Dossier Header Info */}
      <div className="border-b border-zinc-800/60 pb-4 flex justify-between items-start flex-wrap gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] text-[#00D9FF] font-bold tracking-widest uppercase">
            TRANSMISSION DOSSIER // {project.programNumber}
          </span>
          <h2 className="text-base md:text-lg font-black text-[#E6E8EA] tracking-wide uppercase">
            {project.title}
          </h2>
          <span className="text-[11px] text-[#8D969D] uppercase tracking-wide">
            {project.subtitle}
          </span>
        </div>
        
        <div className={`flex items-center gap-1.5 border px-2.5 py-1 rounded text-[10px] font-bold uppercase ${status.style}`}>
          {isFakeNewsSpecial ? (
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 absolute" />
              <span className="pl-2">LIVE SYSTEM</span>
            </div>
          ) : (
            <span>{status.text}</span>
          )}
        </div>
      </div>

      {/* Description Summary */}
      <p className="font-sans text-sm text-[#8D969D] leading-relaxed">
        {project.description}
      </p>

      {/* Objective & Status Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Objective */}
        <div className="bg-[#090B0D] border border-zinc-800/60 rounded p-4 flex flex-col gap-1.5">
          <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#00D9FF]" />
            OBJECTIVE
          </span>
          <p className="text-[#E6E8EA] font-sans text-xs md:text-sm leading-relaxed">{project.objective}</p>
        </div>

        {/* Access Links Console */}
        <div className="bg-[#090B0D] border border-zinc-800/60 rounded p-4 flex flex-col gap-2.5">
          <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold">
            TRANSMISSION ACCESS
          </span>
          <div className="flex flex-col gap-2 font-bold mt-0.5">
            {project.links.sourceCode && (
              <a
                href={project.links.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 hover:text-[#00D9FF] hover:border-[#00D9FF] transition-all cursor-pointer"
              >
                <Code size={12} />
                <span>SOURCE CODE</span>
              </a>
            )}
            
            {project.links.liveDemo && (
              <a
                href={project.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-1.5 px-3 py-2 border rounded text-[10px] transition-all cursor-pointer ${
                  isFakeNewsSpecial
                    ? 'bg-[#00D9FF]/10 border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/20 shadow-[0_0_8px_rgba(0,217,255,0.15)]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-[#00D9FF] hover:border-[#00D9FF]'
                }`}
              >
                <ExternalLink size={12} />
                <span>{isFakeNewsSpecial ? 'WATCH LIVE' : 'WATCH DEMO'}</span>
              </a>
            )}

            {project.links.technicalReport && (
              <a
                href={project.links.technicalReport}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 hover:text-[#00D9FF] hover:border-[#00D9FF] transition-all cursor-pointer"
              >
                <span>TECHNICAL REPORT</span>
              </a>
            )}

            {!project.links.sourceCode && !project.links.liveDemo && !project.links.technicalReport && (
              <span className="text-[10px] text-zinc-600 italic font-normal text-center py-2">
                No external links configured for this payload.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Problem & Approach */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 border-t border-zinc-900 pt-4">
          <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Shield size={12} className="text-[#00D9FF]/80" />
            PROBLEM STATEMENT
          </span>
          <p className="text-[#8D969D] font-sans text-xs md:text-sm leading-relaxed">{project.problem}</p>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-zinc-900 pt-4">
          <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Terminal size={12} className="text-[#00D9FF]" />
            TECHNICAL APPROACH
          </span>
          <p className="text-[#8D969D] font-sans text-xs md:text-sm leading-relaxed">{project.approach}</p>
        </div>
      </div>

      {/* System Diagram Visual */}
      {project.architecture && (
        <div className="flex flex-col gap-2 border-t border-zinc-900 pt-4">
          <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold">
            SYSTEM ARCHITECTURE DIAGRAM
          </span>
          <pre className="bg-[#090B0D] border border-zinc-900/60 rounded p-3 text-[10px] md:text-xs overflow-x-auto text-[#00D9FF] font-mono leading-normal whitespace-pre">
            {project.architecture}
          </pre>
        </div>
      )}

      {/* Optional Screenshots Section */}
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-zinc-900 pt-4">
          <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold">
            BROADCAST CAPTURE / SCREENSHOTS
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.screenshots.map((src, idx) => (
              <div key={idx} className="bg-black border border-zinc-800 rounded overflow-hidden aspect-video relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={src} 
                  alt={`${project.title} capture ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy" 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons Learned */}
      <div className="flex flex-col gap-1.5 border-t border-zinc-900 pt-4">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5">
          <FileText size={12} className="text-[#00D9FF]" />
          LESSONS LEARNED
        </span>
        <div className="bg-[#090B0D] border border-zinc-900/60 p-3.5 rounded text-[#8D969D] italic font-sans text-xs md:text-sm">
          &ldquo;{project.lessons}&rdquo;
        </div>
      </div>

      {/* Technologies group */}
      <div className="flex flex-col gap-2 border-t border-zinc-900 pt-4">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-wider font-bold flex items-center gap-1.5">
          <Cpu size={12} />
          TECHNOLOGY STACK DEPLOYED
        </span>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-[#090B0D] border border-zinc-800/80 rounded font-mono text-[10px] text-[#00D9FF] hover:border-[#00D9FF] hover:bg-[#00D9FF]/5 transition-all uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
