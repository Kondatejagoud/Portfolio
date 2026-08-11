'use client';

import React, { useState } from 'react';
import { projectsData } from '@/data/projects';
import { workshopActivities, buildProcess } from '@/data/workshop';
import { Terminal, Calendar, Code, BookOpen, Layers, ArrowRight, ExternalLink } from 'lucide-react';

interface WorkshopChannelProps {
  onNavigateToProject?: (projectId: string) => void;
}

export default function WorkshopChannel({ onNavigateToProject }: WorkshopChannelProps) {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Find Jarvis details from project database (single source of truth)
  const jarvisProject = projectsData.find(p => p.id === 'jarvis');
  const otherProjects = projectsData.filter(p => p.id !== 'jarvis');

  // Map database status string to display labels
  const getStatusLabel = (status: string) => {
    if (status === 'LIVE') return 'DEPLOYED';
    return status;
  };

  // Map database status string to tailwind badge classes
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-400 bg-green-950/20 border-green-900/60';
      case 'LIVE':
      case 'DEPLOYED':
        return 'text-cyan-400 bg-cyan-950/20 border-cyan-900/40';
      case 'COMPLETED':
        return 'text-blue-400 bg-blue-950/20 border-blue-900/40';
      default:
        return 'text-zinc-400 bg-zinc-950/20 border-zinc-800';
    }
  };

  // Filter keys definition for the log selector
  const filterKeys = [
    { label: 'ALL', id: 'ALL' },
    { label: 'JARVIS', id: 'jarvis' },
    { label: 'STUDYMATE', id: 'studymate' },
    { label: 'NETWORK ANOMALY', id: 'network-anomaly' },
    { label: 'SMARTCLASS', id: 'smartclass-room' },
    { label: 'FAKE NEWS', id: 'fake-news' }
  ];

  // Filter development logs based on selection
  const devLogs = workshopActivities.filter(act => act.category === 'development');
  const filteredDevLogs = activeFilter === 'ALL'
    ? devLogs
    : devLogs.filter(log => log.projectId === activeFilter);

  // Load other categories
  const techNotes = workshopActivities.filter(act => act.category === 'technical-note');
  const lessons = workshopActivities.filter(act => act.category === 'lesson');
  const learningTopics = workshopActivities.filter(act => act.category === 'learning');

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-text selection:bg-[#00D9FF] selection:text-black">
      
      {/* Header Panel */}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Currently Building & Projects Status Board */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          
          {/* 1. Currently Building (Featured Build) */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg">
            <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5 select-none">
              <Terminal size={12} />
              CURRENTLY BUILDING // FEATURED BUILD
            </span>
            
            {jarvisProject && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <button 
                    onClick={() => onNavigateToProject?.('jarvis')}
                    className="flex items-center gap-1.5 text-sm font-extrabold text-[#E6E8EA] hover:text-[#00D9FF] transition-colors cursor-pointer text-left"
                    aria-label="Inspect Jarvis project details in channel 2"
                  >
                    <span>{jarvisProject.title}</span>
                    <ExternalLink size={11} className="text-zinc-650" />
                  </button>
                  <span className={`px-2.5 py-0.5 border rounded text-[9px] font-bold select-none ${getStatusBadgeStyle(jarvisProject.status)}`}>
                    ● {jarvisProject.status}
                  </span>
                </div>
                <p className="text-xs text-[#8D969D] font-sans leading-relaxed">
                  {jarvisProject.subtitle}
                </p>

                <div className="flex flex-col gap-1.5 bg-[#080A0C] border border-zinc-900/65 p-3 rounded">
                  <span className="text-[9px] text-zinc-550 uppercase tracking-wider font-bold select-none">
                    CURRENT DEVELOPMENT FOCUS:
                  </span>
                  <ul className="list-disc pl-4 text-xs text-[#8D969D] flex flex-col gap-1 font-sans">
                    <li>Memory retrieval architecture optimization</li>
                    <li>FastAPI backend asynchronous routing</li>
                    <li>Local speech processing modules integration</li>
                    <li>Asynchronous background execution triggers</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Other Project Activity Menu */}
            <div className="mt-2 border-t border-zinc-900 pt-3 flex flex-col gap-2">
              <span className="text-[9px] text-[#8D969D] tracking-wider uppercase font-bold select-none">
                OTHER PROJECT ACTIVITY
              </span>
              <div className="flex flex-col gap-2">
                {otherProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onNavigateToProject?.(p.id)}
                    className="flex justify-between items-center p-2 bg-[#080A0C] border border-zinc-900 hover:border-[#00D9FF]/40 rounded text-left text-xs transition-colors cursor-pointer group"
                    aria-label={`Navigate to ${p.title} project dossier`}
                  >
                    <span className="text-zinc-300 font-bold group-hover:text-[#00D9FF] transition-colors flex items-center gap-1">
                      {p.title}
                      <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className={`px-1.5 py-0.5 border rounded text-[8px] font-bold ${getStatusBadgeStyle(p.status)}`}>
                      ● {getStatusLabel(p.status)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 2. System Status Board Control Room Layout */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg select-none">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <Layers size={12} />
              PORTFOLIO SYSTEM STATUS
            </span>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {projectsData.map((p) => (
                <div key={p.id} className="flex justify-between items-center bg-[#080A0C] border border-zinc-900 p-2.5 rounded">
                  <span className="text-zinc-400 font-semibold truncate max-w-[90px]">{p.title}</span>
                  <span className={`font-bold ${getStatusBadgeStyle(p.status).split(' ')[0]}`}>
                    ● {getStatusLabel(p.status)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center bg-[#080A0C] border border-zinc-900 p-2.5 rounded col-span-2">
                <span className="text-zinc-400 font-semibold">TEJA NETWORK SITE</span>
                <span className="text-cyan-400 font-bold animate-pulse">
                  ● ONLINE
                </span>
              </div>
            </div>
          </section>

          {/* 3. Build Flow Process flowchart */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg select-none">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <Layers size={12} />
              BUILD PROCESS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-3 bg-[#080A0C] border border-zinc-900 rounded-lg">
              {buildProcess.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-2 py-0.5 bg-[#0D1013] border border-zinc-850 rounded font-mono text-[9px] text-[#E6E8EA] font-extrabold uppercase">
                    {step}
                  </div>
                  {idx < buildProcess.length - 1 && (
                    <span className="text-[#00D9FF] font-bold text-[10px]">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Project Activity Board, Development Logs & Filter, Notes, Lessons, Troubleshooting */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          
          {/* 4. Project Activity status summaries */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5 select-none">
              <Code size={12} />
              PROJECT ACTIVITY BOARD
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectsData.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => onNavigateToProject?.(p.id)}
                  className="bg-[#080A0C] border border-zinc-900 hover:border-[#00D9FF]/40 rounded p-3 flex flex-col gap-2 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start border-b border-zinc-900/60 pb-1 select-none">
                    <span className="text-[10px] text-zinc-300 font-extrabold group-hover:text-[#00D9FF] transition-colors">
                      {p.title}
                    </span>
                    <span className={`text-[8px] font-bold border px-1.5 py-0.2 rounded uppercase ${getStatusBadgeStyle(p.status)}`}>
                      {getStatusLabel(p.status)}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#8D969D] select-none uppercase tracking-wide truncate">
                    {p.subtitle}
                  </span>
                  <p className="text-[11px] text-zinc-500 font-sans leading-relaxed select-text line-clamp-2">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Development Log and interactive filters */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 select-none flex-wrap gap-2">
              <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5">
                <Calendar size={12} />
                DEVELOPMENT LOG
              </span>
              
              {/* Filter controls */}
              <div className="flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {filterKeys.map((fKey) => {
                  const isPressed = activeFilter === fKey.id;
                  return (
                    <button
                      key={fKey.id}
                      onClick={() => setActiveFilter(fKey.id)}
                      aria-pressed={isPressed ? "true" : "false"}
                      className={`px-2 py-0.5 rounded text-[8px] md:text-[9px] font-bold border transition-colors cursor-pointer ${
                        isPressed
                          ? 'border-[#00D9FF] text-[#00D9FF] bg-[#00D9FF]/5'
                          : 'border-zinc-900 text-zinc-650 hover:border-zinc-800 hover:text-[#E6E8EA]'
                      }`}
                    >
                      [{fKey.label}]
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredDevLogs.length > 0 ? (
                filteredDevLogs.map((log) => {
                  const proj = projectsData.find(p => p.id === log.projectId);
                  const projName = proj ? proj.title : 'TEJA NETWORK';
                  return (
                    <div key={log.id} className="bg-[#080A0C] border border-zinc-900 rounded p-3 flex flex-col gap-1.5">
                      <div className="flex justify-between items-center border-b border-zinc-900/40 pb-1 select-none">
                        <span className="text-[9px] text-zinc-550">{log.date}</span>
                        <button 
                          onClick={() => log.projectId !== 'network' && onNavigateToProject?.(log.projectId)}
                          className="text-[9px] text-[#00D9FF] font-bold tracking-widest hover:underline cursor-pointer"
                        >
                          {projName}
                        </button>
                      </div>
                      <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide">
                        {log.title}
                      </h4>
                      <p className="text-xs text-[#8D969D] font-sans leading-relaxed select-text">
                        {log.description}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-xs text-zinc-650 italic font-sans bg-[#080A0C] rounded border border-zinc-900 select-none">
                  NO RECENT WORKSHOP ACTIVITY FOUND
                </div>
              )}
            </div>
          </section>

          {/* 6. Technical Notes Section */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5 select-none">
              <Code size={12} />
              TECHNICAL NOTES
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {techNotes.map((note) => {
                const proj = projectsData.find(p => p.id === note.projectId);
                return (
                  <div key={note.id} className="bg-[#080A0C] border border-zinc-900 rounded p-3 flex flex-col gap-2">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider select-none">
                      {note.title}
                    </span>
                    <p className="text-[11px] text-[#8D969D] font-sans leading-relaxed select-text">
                      {note.description}
                    </p>
                    {proj && (
                      <div className="mt-auto pt-2 border-t border-zinc-900/50 flex justify-between items-center text-[8px] text-zinc-650 font-bold select-none">
                        <span>RELATED TO: {proj.title}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 7. Lessons Learned */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5 select-none">
              <BookOpen size={12} />
              LESSONS FROM BUILDING
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {lessons.map((les) => {
                const proj = projectsData.find(p => p.id === les.projectId);
                return (
                  <div key={les.id} className="bg-[#080A0C] border border-zinc-900 rounded p-3 flex flex-col gap-1.5">
                    {proj && (
                      <span className="text-[9px] text-[#00D9FF] font-extrabold uppercase select-none">
                        {proj.title}
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wide select-none">
                      Lesson: {les.title}
                    </span>
                    <p className="text-[11px] text-[#8D969D] font-sans leading-relaxed select-text">
                      {les.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>



          {/* 9. Currently Learning */}
          <section className="flex flex-col gap-3 bg-[#0D1013] border border-zinc-800/60 p-4 rounded-lg select-none">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <BookOpen size={12} />
              CURRENTLY LEARNING
            </span>
            <div className="flex flex-col gap-2">
              {learningTopics.map((l) => (
                <div key={l.id} className="flex justify-between items-center p-2.5 bg-[#080A0C] border border-zinc-900 rounded text-xs">
                  <span className="font-semibold text-zinc-300 uppercase tracking-wide">
                    {l.title}
                  </span>
                  <span className="px-2 py-0.5 border rounded text-[9px] font-bold uppercase text-cyan-400 bg-cyan-950/20 border-cyan-900/40">
                    ● {l.description}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
