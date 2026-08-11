'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { projectsData } from '@/data/projects';
import ProgramLineup from '@/components/projects/ProgramLineup';
import TransmissionDossier from '@/components/projects/TransmissionDossier';

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

  // Sync selectedProjectId if changed from parent (e.g. from CH04 link)
  useEffect(() => {
    if (selectedProjectId) {
      const idx = projectsData.findIndex(p => p.id === selectedProjectId);
      if (idx !== -1) {
        const timer = setTimeout(() => {
          setActiveProjectIdx(idx);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedProjectId]);

  const activeProject = projectsData[activeProjectIdx];

  // Notify parent of active program change for status header
  useEffect(() => {
    if (onProgramChange) {
      onProgramChange(activeProject.title);
    }
  }, [activeProject, onProgramChange]);

  // Keyboard navigation inside Projects Channel
  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveProjectIdx(prev => (prev > 0 ? prev - 1 : projectsData.length - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveProjectIdx(prev => (prev < projectsData.length - 1 ? prev + 1 : 0));
    }
  }, []);

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
      <div className="border-b border-zinc-800/80 pb-3">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 02 // NOW SHOWING
        </span>
        <h1 className="text-xl md:text-2xl font-extrabold text-[#E6E8EA] tracking-wider uppercase">
          PROJECT TRANSMISSIONS
        </h1>
      </div>

      {/* Content Columns: Program Lineup & Transmission Dossier */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Project Selector List */}
        <ProgramLineup
          projects={projectsData}
          activeProjectId={activeProject.id}
          onProjectSelect={(id) => {
            const idx = projectsData.findIndex(p => p.id === id);
            if (idx !== -1) {
              setActiveProjectIdx(idx);
            }
          }}
        />

        {/* Selected Project Dossier */}
        <TransmissionDossier project={activeProject} />
      </div>
    </div>
  );
}
