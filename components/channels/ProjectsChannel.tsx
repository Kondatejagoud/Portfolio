'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { projectsData, Project } from '@/data/projects';
import { Play, Code, ExternalLink, X, ShieldAlert, Cpu, BookOpen, Layers } from 'lucide-react';

interface ProjectsChannelProps {
  selectedProjectId?: string;
  onProgramChange?: (title: string) => void;
  registerKeyListener?: (handler: (e: KeyboardEvent) => void) => void;
  unregisterKeyListener?: (handler: (e: KeyboardEvent) => void) => void;
}

export default function ProjectsChannel({
  selectedProjectId,
  onProgramChange,
  registerKeyListener,
  unregisterKeyListener,
}: ProjectsChannelProps) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync selectedProjectId if changed from parent (e.g. from CH04 link)
  useEffect(() => {
    if (selectedProjectId) {
      const idx = projectsData.findIndex(p => p.id === selectedProjectId);
      if (idx !== -1) {
        const timer = setTimeout(() => {
          setActiveProjectIdx(idx);
          setIsDrawerOpen(true);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedProjectId]);

  const activeProject = projectsData[activeProjectIdx];

  // Notify parent of active program change for header updates
  useEffect(() => {
    if (onProgramChange) {
      onProgramChange(activeProject.title);
    }
  }, [activeProject, onProgramChange]);

  // Keyboard navigation inside Projects Channel
  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveProjectIdx(prev => (prev > 0 ? prev - 1 : projectsData.length - 1));
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveProjectIdx(prev => (prev < projectsData.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setIsDrawerOpen(true);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsDrawerOpen(false);
    }
  }, []);

  // Hook up event listener registration if provided by parent
  useEffect(() => {
    if (registerKeyListener && unregisterKeyListener) {
      registerKeyListener(handleKeyboard);
      return () => unregisterKeyListener(handleKeyboard);
    }
  }, [registerKeyListener, unregisterKeyListener, handleKeyboard]);

  // Status badge styles
  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'ACTIVE':
      case 'LIVE':
        return 'text-green-400 bg-green-950/20 border-green-900/40';
      case 'COMPLETED':
        return 'text-cyan-400 bg-cyan-950/20 border-cyan-900/40';
      default:
        return 'text-zinc-500 bg-zinc-950/25 border-zinc-900';
    }
  };

  // Render abstract SVG graphic representing project focus
  const renderProjectVisual = (id: string) => {
    switch (id) {
      case 'jarvis':
        return (
          <svg className="w-full h-full text-cyan-500/20" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '20s' }} />
            <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            <line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" strokeWidth="0.25" />
            <line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="0.25" />
          </svg>
        );
      case 'fake-news':
        return (
          <svg className="w-full h-full text-green-500/20" viewBox="0 0 100 100" fill="none">
            <rect x="25" y="20" width="50" height="60" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <line x1="33" y1="35" x2="67" y2="35" stroke="currentColor" strokeWidth="1" />
            <line x1="33" y1="48" x2="67" y2="48" stroke="currentColor" strokeWidth="1" />
            <line x1="33" y1="61" x2="55" y2="61" stroke="currentColor" strokeWidth="1" />
            <circle cx="65" cy="65" r="7" stroke="currentColor" strokeWidth="1" fill="#080A0C" />
          </svg>
        );
      case 'network-anomaly':
        return (
          <svg className="w-full h-full text-yellow-500/20" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="30" r="5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="25" cy="70" r="5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="75" cy="70" r="5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="47" y1="34" x2="28" y2="66" stroke="currentColor" strokeWidth="1" />
            <line x1="53" y1="34" x2="72" y2="66" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="70" x2="70" y2="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
        );
      case 'studymate':
        return (
          <svg className="w-full h-full text-cyan-400/25" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="25" width="60" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="38" x2="80" y2="38" stroke="currentColor" strokeWidth="1" />
            <circle cx="35" cy="56" r="3" fill="currentColor" />
            <circle cx="65" cy="56" r="3" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full text-zinc-550/20" viewBox="0 0 100 100" fill="none">
            <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1.5" />
            <line x1="25" y1="25" x2="75" y2="75" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        );
    }
  };

  const jarvisProject = projectsData.find(p => p.id === 'jarvis') || projectsData[0];
  const otherProjects = projectsData.filter(p => p.id !== 'jarvis');

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-10 font-sans select-text selection:bg-[#00D9FF] selection:text-black relative">
      
      {/* 1. Page Header */}
      <div className="border-b border-zinc-900 pb-4 select-none">
        <span className="font-mono text-[9px] text-[#8d969d] uppercase tracking-widest block mb-1">
          CH 02 // PROJECT ARCHIVES
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-[#E6E8EA] tracking-wide uppercase">
          PROJECTS
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D9FF] uppercase ml-3">
            {"// THINGS I'VE BUILT"}
          </span>
        </h1>
      </div>

      {/* 2. Featured Project Hero Card (Jarvis) */}
      <section className="relative glass-l3 rounded-xl overflow-hidden min-h-[300px] flex flex-col justify-end p-6 md:p-8 select-none border border-zinc-800/80">
        
        {/* Background Visual Graph */}
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center justify-center opacity-40 md:opacity-90 pointer-events-none p-4 z-0">
          {renderProjectVisual('jarvis')}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent z-10" />

        {/* Content Block */}
        <div className="relative z-20 flex flex-col gap-4 max-w-xl text-left select-text">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-[#8D969D] border border-zinc-800 px-2 py-0.5 rounded bg-zinc-950/60 uppercase">
              {jarvisProject.programNumber}
            </span>
            <span className={`px-2.5 py-0.5 border rounded text-[9px] font-bold font-mono ${getStatusBadge(jarvisProject.status)}`}>
              ● {jarvisProject.status}
            </span>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#E6E8EA] uppercase">
              {jarvisProject.title}
            </h2>
            <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-widest mt-0.5">
              {jarvisProject.subtitle}
            </span>
          </div>

          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed font-sans">
            {jarvisProject.description}
          </p>

          <div className="flex flex-wrap gap-1.5 select-none">
            {jarvisProject.technologies.map((t, idx) => (
              <span key={idx} className="font-mono text-[9px] bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded text-zinc-300">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3.5 mt-3 select-none">
            <button
              onClick={() => {
                const idx = projectsData.findIndex(p => p.id === 'jarvis');
                setActiveProjectIdx(idx !== -1 ? idx : 0);
                setIsDrawerOpen(true);
              }}
              className="px-5 py-2.5 bg-[#00D9FF] hover:bg-cyan-500 text-black font-extrabold text-xs tracking-wider uppercase rounded transition-colors cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,217,255,0.18)]"
            >
              <Play size={12} fill="currentColor" />
              VIEW DOSSIER
            </button>
            
            {jarvisProject.links.sourceCode && (
              <a
                href={jarvisProject.links.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-xs font-bold tracking-wider text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Code size={12} />
                SOURCE CODE
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 3. Horizontal Project Rail */}
      <section className="flex flex-col gap-4 select-none">
        <span className="font-mono text-[10px] text-[#8d969d] tracking-widest uppercase font-bold">
          OTHER PROJECT TRANSMISSIONS
        </span>
        
        <div className="w-full flex gap-5 overflow-x-auto py-2.5 px-1 no-scrollbar snap-x">
          {otherProjects.map((proj) => {
            const pIdx = projectsData.findIndex(p => p.id === proj.id);
            const isSelectedKeyboard = pIdx === activeProjectIdx;
            
            return (
              <div
                key={proj.id}
                onClick={() => {
                  setActiveProjectIdx(pIdx);
                  setIsDrawerOpen(true);
                }}
                className={`snap-center flex-shrink-0 w-64 md:w-72 glass-l2 hover:glass-l3 border rounded-xl overflow-hidden flex flex-col transition-all cursor-pointer ${
                  isSelectedKeyboard ? 'border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.06)]' : 'border-zinc-850'
                }`}
              >
                {/* Visual Thumbnail */}
                <div className="h-32 bg-[#080A0C] border-b border-zinc-900 flex items-center justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.2]" />
                  {renderProjectVisual(proj.id)}
                  
                  {/* Status Indicator */}
                  <span className={`absolute top-3 right-3 px-2 py-0.5 border rounded text-[8px] font-bold font-mono ${getStatusBadge(proj.status)}`}>
                    ● {proj.status}
                  </span>
                </div>

                {/* Info block */}
                <div className="p-4 flex flex-col gap-2.5 text-left flex-1 justify-between select-text">
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-[#8d969d] uppercase">
                      {proj.category}
                    </span>
                    <h3 className="text-sm font-black tracking-tight text-[#E6E8EA] uppercase truncate mt-0.5">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-zinc-450 leading-relaxed font-sans line-clamp-2 h-8 font-light">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-1.5 select-none">
                    {proj.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="font-mono text-[8px] bg-zinc-950/60 border border-zinc-900 px-1.5 py-0.5 rounded text-zinc-450">
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="font-mono text-[8px] text-zinc-600 px-1 py-0.5">
                        +{proj.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Cinematic Slide-Over Project Detail Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-[#000000]/70 z-50 flex justify-end font-sans transition-all duration-300">
          {/* Dismiss Click Mask */}
          <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)} />

          {/* Drawer Body Panel */}
          <div className="relative w-full max-w-xl bg-[#080A0C] border-l border-zinc-800/80 h-full flex flex-col shadow-2xl z-10 animate-slide-in">
            
            {/* Drawer Header */}
            <div className="bg-[#0D1013] border-b border-zinc-900 px-6 py-4 flex justify-between items-center select-none">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-[#8D969D] border border-zinc-800 px-2 py-0.5 rounded bg-zinc-950">
                  {activeProject.programNumber}
                </span>
                <span className={`px-2.5 py-0.5 border rounded text-[9px] font-bold font-mono ${getStatusBadge(activeProject.status)}`}>
                  ● {activeProject.status}
                </span>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-zinc-550 hover:text-white cursor-pointer p-1 rounded hover:bg-zinc-900 transition-colors flex items-center gap-1 font-mono text-[9px] uppercase font-bold"
                aria-label="Close project drawer"
              >
                <X size={14} />
                <span>ESC</span>
              </button>
            </div>

            {/* Scrollable details contents */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 select-text">
              
              {/* Titles block */}
              <div className="flex flex-col border-b border-zinc-900 pb-4">
                <span className="text-[10px] text-[#8d969d] font-mono uppercase tracking-wider">PROJECT PROFILE</span>
                <h2 className="text-2xl font-black text-[#E6E8EA] uppercase mt-0.5">
                  {activeProject.title}
                </h2>
                <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-widest mt-0.5">
                  {activeProject.subtitle}
                </span>
              </div>

              {/* Overview (Objective) */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-[#8d969d] font-mono uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Play size={12} className="text-[#00D9FF]" />
                  MISSION OBJECTIVE
                </span>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {activeProject.objective}
                </p>
              </div>

              {/* Problem */}
              <div className="flex flex-col gap-1.5 border-t border-zinc-900/60 pt-4">
                <span className="text-[10px] text-[#8d969d] font-mono uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <ShieldAlert size={12} className="text-[#00D9FF]" />
                  PROBLEM STATEMENT
                </span>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {activeProject.problem}
                </p>
              </div>

              {/* Approach */}
              <div className="flex flex-col gap-1.5 border-t border-zinc-900/60 pt-4">
                <span className="text-[10px] text-[#8d969d] font-mono uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Layers size={12} className="text-[#00D9FF]" />
                  DEVELOPMENT APPROACH
                </span>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {activeProject.approach}
                </p>
              </div>

              {/* Architecture diagram if present */}
              {activeProject.architecture && (
                <div className="flex flex-col gap-2 border-t border-zinc-900/60 pt-4 select-none">
                  <span className="text-[10px] text-[#8d969d] font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu size={12} className="text-[#00D9FF]" />
                    SYSTEM ARCHITECTURE
                  </span>
                  <pre className="bg-[#080A0C] border border-zinc-900 rounded p-4 text-[10px] text-zinc-400 font-mono overflow-x-auto leading-relaxed select-text">
                    {activeProject.architecture}
                  </pre>
                </div>
              )}

              {/* Core Learnings */}
              <div className="flex flex-col gap-1.5 border-t border-zinc-900/60 pt-4">
                <span className="text-[10px] text-[#8d969d] font-mono uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <BookOpen size={12} className="text-[#00D9FF]" />
                  TECHNICAL TAKEAWAYS
                </span>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {activeProject.lessons}
                </p>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-col gap-2 border-t border-zinc-900/60 pt-4 select-none">
                <span className="text-[10px] text-[#8d969d] font-mono uppercase tracking-wider">COMPILED TECHNOLOGIES</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t, idx) => (
                    <span key={idx} className="font-mono text-[9px] bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="bg-[#0D1013] border-t border-zinc-900 px-6 py-4 flex gap-3 select-none">
              {activeProject.links.sourceCode && (
                <a
                  href={activeProject.links.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded text-xs font-bold tracking-wider text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Code size={12} />
                  SOURCE CODE
                </a>
              )}
              {activeProject.links.liveDemo && (
                <a
                  href={activeProject.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#00D9FF] hover:bg-cyan-500 text-black font-extrabold text-xs tracking-wider uppercase rounded transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,217,255,0.1)]"
                >
                  <ExternalLink size={12} />
                  LIVE DEMO
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
