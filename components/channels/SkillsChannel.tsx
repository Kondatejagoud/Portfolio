'use client';

import React, { useState } from 'react';
import { skillsData, Skill } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { Code2, Server, Database, Hammer, TerminalSquare, ArrowUpRight } from 'lucide-react';

interface SkillsChannelProps {
  onNavigateToProject: (projectId: string) => void;
}

export default function SkillsChannel({ onNavigateToProject }: SkillsChannelProps) {
  const [selectedSkillName, setSelectedSkillName] = useState<string>(skillsData[0].name);

  const selectedSkill = skillsData.find(s => s.name === selectedSkillName) || skillsData[0];

  // Group skills by category
  const programmingSkills = skillsData.filter(s => s.category === 'PROGRAMMING');
  const backendSkills = skillsData.filter(s => s.category === 'BACKEND');
  const mlSkills = skillsData.filter(s => s.category === 'MACHINE_LEARNING');
  const toolsSkills = skillsData.filter(s => s.category === 'TOOLS');

  // Find actual project objects related to this skill
  const relatedProjects = projectsData.filter(proj => 
    selectedSkill.projectIds.includes(proj.id)
  );

  const renderCategoryIcon = (category: Skill['category']) => {
    switch (category) {
      case 'PROGRAMMING': return <Code2 size={14} className="text-[#00E5FF]" />;
      case 'BACKEND': return <Server size={14} className="text-[#00E5FF]" />;
      case 'MACHINE_LEARNING': return <Database size={14} className="text-[#00E5FF]" />;
      case 'TOOLS': return <Hammer size={14} className="text-[#00E5FF]" />;
    }
  };

  const getCategoryTitle = (category: Skill['category']) => {
    switch (category) {
      case 'PROGRAMMING': return 'Programming Tonight';
      case 'BACKEND': return 'Backend & Databases';
      case 'MACHINE_LEARNING': return 'Machine Learning Stack';
      case 'TOOLS': return 'Developer Tools';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-none">
      {/* Channel Header */}
      <div className="border-b border-zinc-800/80 pb-3">
        <span className="text-[10px] text-[#777777] uppercase tracking-widest block mb-1">
          CH 04 // BROADCAST FEED
        </span>
        <h1 className="text-xl md:text-2xl font-extrabold text-[#F2F2F2] tracking-wider uppercase">
          TECHNOLOGY TONIGHT // PROVEN SKILLSETS
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Categories grid (takes 7 cols on lg) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Programming group */}
          <div className="border border-zinc-900 bg-black/20 rounded-lg p-4 flex flex-col gap-2.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <Code2 size={12} />
              PROGRAMMING
            </span>
            <div className="flex flex-wrap gap-1.5">
              {programmingSkills.map(skill => (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkillName(skill.name)}
                  className={`px-2.5 py-1.5 rounded text-xs border transition-all duration-150 cursor-pointer ${
                    selectedSkillName === skill.name
                      ? 'bg-zinc-900 border-[#00E5FF] text-[#00E5FF]'
                      : 'bg-[#0E0E0E] border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Backend group */}
          <div className="border border-zinc-900 bg-black/20 rounded-lg p-4 flex flex-col gap-2.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <Server size={12} />
              BACKEND
            </span>
            <div className="flex flex-wrap gap-1.5">
              {backendSkills.map(skill => (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkillName(skill.name)}
                  className={`px-2.5 py-1.5 rounded text-xs border transition-all duration-150 cursor-pointer ${
                    selectedSkillName === skill.name
                      ? 'bg-zinc-900 border-[#00E5FF] text-[#00E5FF]'
                      : 'bg-[#0E0E0E] border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Machine Learning group */}
          <div className="border border-zinc-900 bg-black/20 rounded-lg p-4 flex flex-col gap-2.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <Database size={12} />
              MACHINE LEARNING
            </span>
            <div className="flex flex-wrap gap-1.5">
              {mlSkills.map(skill => (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkillName(skill.name)}
                  className={`px-2.5 py-1.5 rounded text-xs border transition-all duration-150 cursor-pointer ${
                    selectedSkillName === skill.name
                      ? 'bg-zinc-900 border-[#00E5FF] text-[#00E5FF]'
                      : 'bg-[#0E0E0E] border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tools group */}
          <div className="border border-zinc-900 bg-black/20 rounded-lg p-4 flex flex-col gap-2.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
              <Hammer size={12} />
              TOOLS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {toolsSkills.map(skill => (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkillName(skill.name)}
                  className={`px-2.5 py-1.5 rounded text-xs border transition-all duration-150 cursor-pointer ${
                    selectedSkillName === skill.name
                      ? 'bg-zinc-900 border-[#00E5FF] text-[#00E5FF]'
                      : 'bg-[#0E0E0E] border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Selected Skill Details (takes 5 cols on lg) */}
        <div className="lg:col-span-5 bg-[#0E0E0E] border border-zinc-800 rounded-lg p-5 flex flex-col gap-5 select-text selection:bg-[#00E5FF] selection:text-black">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <span className="text-xs font-bold text-[#00E5FF] tracking-wider uppercase flex items-center gap-2">
              <TerminalSquare size={14} />
              SYSTEM REPORT
            </span>
            <span className="text-[9px] text-[#777777]">ID: TECH_LOG</span>
          </div>

          <div className="flex flex-col gap-4 text-xs md:text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#777777] uppercase tracking-wider">TECHNOLOGY</span>
              <span className="text-base font-extrabold text-[#F2F2F2]">{selectedSkill.name}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#777777] uppercase tracking-wider">CLASSIFICATION</span>
              <span className="text-[#00E5FF] font-semibold flex items-center gap-1.5 uppercase text-xs">
                {renderCategoryIcon(selectedSkill.category)}
                {getCategoryTitle(selectedSkill.category)}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 border-t border-zinc-900 pt-3">
              <span className="text-[9px] text-[#777777] uppercase tracking-wider">CAPABILITY REPORT</span>
              <p className="text-zinc-300 font-sans leading-relaxed">{selectedSkill.description}</p>
            </div>

            {/* Proof through Projects */}
            <div className="flex flex-col gap-2 border-t border-zinc-900 pt-3">
              <span className="text-[9px] text-[#777777] uppercase tracking-wider">USED IN BROADCASTS</span>
              {relatedProjects.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {relatedProjects.map(proj => (
                    <button
                      key={proj.id}
                      onClick={() => onNavigateToProject(proj.id)}
                      className="w-full text-left bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded p-2.5 transition-all text-xs font-semibold text-zinc-300 hover:text-[#00E5FF] flex items-center justify-between group cursor-pointer"
                    >
                      <span className="font-mono">{proj.title}</span>
                      <span className="text-[9px] font-mono text-zinc-600 group-hover:text-[#00E5FF] flex items-center gap-0.5">
                        VIEW PROGRAM
                        <ArrowUpRight size={10} />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-950/40 border border-zinc-900 text-zinc-600 rounded p-3 text-center text-xs italic font-sans">
                  No active public programs listed for this skill. Used in internal systems diagnostics.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
