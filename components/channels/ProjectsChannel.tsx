'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { projectsData } from '@/data/projects';
import EpisodeList from '@/components/projects/EpisodeList';
import ProjectDetails from '@/components/projects/ProjectDetails';
import { Film, Code, FileCode2 } from 'lucide-react';

interface ProjectsChannelProps {
  selectedProjectId?: string;
  onProgramChange?: (title: string) => void;
  // Expose keyboard trigger handlers to be registered by parent
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
  const [activeEpisodeId, setActiveEpisodeId] = useState(projectsData[0].episodes[0].id);

  // Sync selectedProjectId if changed from parent (e.g. from CH04 link)
  useEffect(() => {
    if (selectedProjectId) {
      const idx = projectsData.findIndex(p => p.id === selectedProjectId);
      if (idx !== -1) {
        const timer = setTimeout(() => {
          setActiveProjectIdx(idx);
          setActiveEpisodeId(projectsData[idx].episodes[0].id);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedProjectId]);

  const activeProject = projectsData[activeProjectIdx];
  const activeEpisode = activeProject.episodes.find(e => e.id === activeEpisodeId) || activeProject.episodes[0];

  // Notify parent of active program change for status header
  useEffect(() => {
    if (onProgramChange) {
      onProgramChange(`${activeProject.title} — ${activeEpisode.title}`);
    }
  }, [activeProject, activeEpisode, onProgramChange]);

  const selectProject = (idx: number) => {
    setActiveProjectIdx(idx);
    setActiveEpisodeId(projectsData[idx].episodes[0].id);
  };

  // Keyboard navigation inside Projects Channel
  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Navigate to previous episode
      const episodes = activeProject.episodes;
      const curIdx = episodes.findIndex(ep => ep.id === activeEpisodeId);
      if (curIdx > 0) {
        setActiveEpisodeId(episodes[curIdx - 1].id);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Navigate to next episode
      const episodes = activeProject.episodes;
      const curIdx = episodes.findIndex(ep => ep.id === activeEpisodeId);
      if (curIdx < episodes.length - 1) {
        setActiveEpisodeId(episodes[curIdx + 1].id);
      }
    } else if (e.key === 'ArrowLeft') {
      // Toggle to previous project (if user holds shift or we override channel swapping)
      // Since ArrowLeft/Right defaults to switching channels, we'll keep that behavior at global level.
    }
  }, [activeProject, activeEpisodeId]);

  // Hook up event listener registration if provided by parent
  useEffect(() => {
    if (registerKeyListener && unregisterKeyListener) {
      registerKeyListener(handleKeyboard);
      return () => unregisterKeyListener(handleKeyboard);
    }
  }, [registerKeyListener, unregisterKeyListener, handleKeyboard]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-none">
      {/* Channel Header Info */}
      <div className="border-b border-zinc-800/80 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] uppercase tracking-widest block mb-1">
            CH 02 // BROADCAST FEED
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#F2F2F2] tracking-wider uppercase">
            NOW SHOWING: PROJECTS
          </h1>
        </div>

        {/* Horizontal Program Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full no-scrollbar py-0.5">
          {projectsData.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => selectProject(idx)}
              className={`px-3 py-1.5 border rounded text-[10px] md:text-xs transition-all duration-200 cursor-pointer font-bold whitespace-nowrap ${
                idx === activeProjectIdx
                  ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]'
                  : 'bg-[#0E0E0E] border-zinc-800 text-[#777777] hover:text-[#F2F2F2] hover:border-zinc-700'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Program Theater Wrapper */}
      <div className="flex flex-col gap-5">
        {/* Project Header Board */}
        <div className="bg-[#0E0E0E] border border-zinc-800 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
          {/* Subtle grid watermark */}
          <div className="absolute inset-0 opacity-10 pointer-events-none degraded-signal" />
          
          <div className="flex flex-col gap-1 z-10 select-text">
            <span className="text-[10px] text-[#00E5FF] tracking-wider font-bold">
              {activeProject.season}
            </span>
            <h2 className="text-lg md:text-xl font-black text-[#F2F2F2] tracking-wide">
              {activeProject.title}
            </h2>
            <span className="text-xs text-[#777777] font-semibold">
              {activeProject.tagline}
            </span>
            <p className="text-xs text-[#999999] max-w-md font-sans mt-2">
              {activeProject.summary}
            </p>
          </div>

          {/* Links Console */}
          <div className="flex flex-col gap-2 w-full md:w-auto z-10 font-bold">
            <div className="text-[9px] text-[#777777] tracking-wider uppercase md:text-right">
              TRANSMISSION ACCESS
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-col gap-2">
              <a
                href={activeProject.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all cursor-pointer"
              >
                <Code size={12} />
                <span>SOURCE CODE</span>
              </a>
              <a
                href={activeProject.demoUrl}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all cursor-pointer"
              >
                <Film size={12} />
                <span>WATCH DEMO</span>
              </a>
              <a
                href={activeProject.reportUrl}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all cursor-pointer col-span-2 md:col-span-1"
              >
                <FileCode2 size={12} />
                <span>TECH REPORT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Columns: Episode List & Episode Details */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Episode Selector */}
          <EpisodeList
            episodes={activeProject.episodes}
            activeEpisodeId={activeEpisodeId}
            onEpisodeSelect={setActiveEpisodeId}
          />

          {/* Episode Dossier details */}
          <ProjectDetails episode={activeEpisode} />
        </div>
      </div>
    </div>
  );
}
