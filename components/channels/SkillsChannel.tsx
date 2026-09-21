'use client';

import React, { useState } from 'react';
import { skillsData, SkillStatus } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { Terminal, Code, Cpu, Database, Server, Settings, Globe, ExternalLink, Milestone, BookOpen } from 'lucide-react';

interface SkillsChannelProps {
  onNavigateToProject: (projectId: string) => void;
}

export default function SkillsChannel({ onNavigateToProject }: SkillsChannelProps) {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('python');

  const selectedSkill = skillsData.find(s => s.id === selectedSkillId) || skillsData[0];

  // Group skills by category (excluding the "Exploring" category for separate rendering)
  const programmingSkills = skillsData.filter(s => s.category === 'Programming');
  const mlSkills = skillsData.filter(s => s.category === 'AI & Machine Learning');
  const dataSkills = skillsData.filter(s => s.category === 'Data & ML Methods');
  const backendSkills = skillsData.filter(s => s.category === 'Backend & APIs');
  const webSkills = skillsData.filter(s => s.category === 'Web Development');
  const toolsSkills = skillsData.filter(s => s.category === 'Development Tools');
  
  // Separate list of exploring topics
  const exploringSkills = skillsData.filter(s => s.category === 'Exploring' || s.status === 'exploring');

  // Find projects associated with the selected skill
  const relatedProjects = projectsData.filter(proj => 
    selectedSkill.projects?.includes(proj.id) || (selectedSkill.id === 'git' || selectedSkill.id === 'github' || selectedSkill.id === 'vscode')
  );

  // Related areas helper
  const getRelatedAreas = (skillId: string) => {
    switch (skillId) {
      case 'python':
        return ['Backend', 'Machine Learning', 'Data Processing', 'Automation'];
      case 'fastapi':
        return ['Asynchronous APIs', 'REST Services', 'JSON Routing'];
      case 'dbscan':
        return ['Unsupervised Machine Learning', 'Anomaly Detection', 'Clustering'];
      case 'scikit-learn':
        return ['Data Science', 'Feature Extraction', 'Model Fitting'];
      case 'pytorch':
        return ['Deep Learning', 'Neural Networks', 'Inference'];
      case 'pandas':
        return ['Data Frames', 'Preprocessing', 'Data Wrangling'];
      case 'sql':
      case 'sqlite':
        return ['Relational DB', 'Structured Data', 'Storage'];
      case 'git':
      case 'github':
        return ['Version Control', 'Repositories', 'CI/CD'];
      default:
        return ['Software Development', 'System Engineering'];
    }
  };

  const getStatusLabel = (status: SkillStatus) => {
    if (status === 'used') return '● USED';
    if (status === 'familiar') return '◐ FAMILIAR';
    return '○ EXPLORING';
  };

  const getStatusBadgeColor = (status: SkillStatus) => {
    if (status === 'used') return 'text-cyan-400 border-cyan-900/40 bg-cyan-950/10';
    if (status === 'familiar') return 'text-yellow-500 border-yellow-900/30 bg-yellow-950/10';
    return 'text-zinc-500 border-zinc-900 bg-zinc-950/10';
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-10 font-sans select-text selection:bg-[#00D9FF] selection:text-black">
      
      {/* 1. Channel Header */}
      <div className="border-b border-zinc-900 pb-4 select-none">
        <span className="font-mono text-[9px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 04 // SKILL MATRIX
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-[#E6E8EA] tracking-wide uppercase">
          SKILLS
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D9FF] uppercase ml-3">
            {"// TOOLS, TECHNOLOGIES & SYSTEMS"}
          </span>
        </h1>
      </div>

      {/* 2. Technical Stack Summary Panel */}
      <section className="glass-l2 rounded-xl p-5 select-none border border-zinc-900">
        <span className="font-mono text-[9px] text-[#00D9FF] tracking-wider uppercase font-bold block mb-3.5">
          PRIMARY STACK REPORT // CORE COMPETENCIES
        </span>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {['PYTHON', 'AI / MACHINE LEARNING', 'BACKEND DEVELOPMENT', 'DATA PROCESSING', 'WEB DEVELOPMENT', 'GIT / GITHUB'].map((stack, idx) => (
            <div 
              key={idx} 
              className="bg-[#080A0C] border border-zinc-900 px-3 py-2.5 rounded-lg text-center text-[10px] text-[#E6E8EA] font-extrabold tracking-wide uppercase border-l-2 border-l-[#00D9FF]"
            >
              {stack}
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Skill categories panels */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full select-none">
          
          {/* Skill Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Programming Group */}
            <div className="glass-l2 rounded-xl p-4.5 flex flex-col gap-3">
              <span className="font-mono text-[9.5px] text-[#8D969D] uppercase tracking-wider font-extrabold flex items-center gap-1.5 border-b border-zinc-900/60 pb-2">
                <Code size={12} className="text-[#00D9FF]" />
                PROGRAMMING
              </span>
              <div className="flex flex-wrap gap-1.5">
                {programmingSkills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    aria-pressed={selectedSkillId === skill.id}
                    aria-label={`Inspect ${skill.name} capability report`}
                    className={`px-2.5 py-1.5 rounded-md text-xs border transition-all duration-200 cursor-pointer focus:outline-none ${
                      selectedSkillId === skill.id
                        ? 'bg-[#080A0C] border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-[#090B0D]/50 border-zinc-900 text-[#8D969D] hover:text-[#E6E8EA] hover:border-zinc-850'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* AI & Machine Learning Group */}
            <div className="glass-l2 rounded-xl p-4.5 flex flex-col gap-3">
              <span className="font-mono text-[9.5px] text-[#8D969D] uppercase tracking-wider font-extrabold flex items-center gap-1.5 border-b border-zinc-900/60 pb-2">
                <Cpu size={12} className="text-[#00D9FF]" />
                AI & MACHINE LEARNING
              </span>
              <div className="flex flex-wrap gap-1.5">
                {mlSkills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    aria-pressed={selectedSkillId === skill.id}
                    aria-label={`Inspect ${skill.name} capability report`}
                    className={`px-2.5 py-1.5 rounded-md text-xs border transition-all duration-200 cursor-pointer focus:outline-none ${
                      selectedSkillId === skill.id
                        ? 'bg-[#080A0C] border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-[#090B0D]/50 border-zinc-900 text-[#8D969D] hover:text-[#E6E8EA] hover:border-zinc-850'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Data & ML Methods Group */}
            <div className="glass-l2 rounded-xl p-4.5 flex flex-col gap-3">
              <span className="font-mono text-[9.5px] text-[#8D969D] uppercase tracking-wider font-extrabold flex items-center gap-1.5 border-b border-zinc-900/60 pb-2">
                <Database size={12} className="text-[#00D9FF]" />
                DATA & ML METHODS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dataSkills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    aria-pressed={selectedSkillId === skill.id}
                    aria-label={`Inspect ${skill.name} capability report`}
                    className={`px-2.5 py-1.5 rounded-md text-xs border transition-all duration-200 cursor-pointer focus:outline-none ${
                      selectedSkillId === skill.id
                        ? 'bg-[#080A0C] border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-[#090B0D]/50 border-zinc-900 text-[#8D969D] hover:text-[#E6E8EA] hover:border-zinc-850'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Backend & APIs Group */}
            <div className="glass-l2 rounded-xl p-4.5 flex flex-col gap-3">
              <span className="font-mono text-[9.5px] text-[#8D969D] uppercase tracking-wider font-extrabold flex items-center gap-1.5 border-b border-zinc-900/60 pb-2">
                <Server size={12} className="text-[#00D9FF]" />
                BACKEND & APIS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {backendSkills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    aria-pressed={selectedSkillId === skill.id}
                    aria-label={`Inspect ${skill.name} capability report`}
                    className={`px-2.5 py-1.5 rounded-md text-xs border transition-all duration-200 cursor-pointer focus:outline-none ${
                      selectedSkillId === skill.id
                        ? 'bg-[#080A0C] border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-[#090B0D]/50 border-zinc-900 text-[#8D969D] hover:text-[#E6E8EA] hover:border-zinc-850'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Web Development Group */}
            <div className="glass-l2 rounded-xl p-4.5 flex flex-col gap-3">
              <span className="font-mono text-[9.5px] text-[#8D969D] uppercase tracking-wider font-extrabold flex items-center gap-1.5 border-b border-zinc-900/60 pb-2">
                <Globe size={12} className="text-[#00D9FF]" />
                WEB DEVELOPMENT
              </span>
              <div className="flex flex-wrap gap-1.5">
                {webSkills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    aria-pressed={selectedSkillId === skill.id}
                    aria-label={`Inspect ${skill.name} capability report`}
                    className={`px-2.5 py-1.5 rounded-md text-xs border transition-all duration-200 cursor-pointer focus:outline-none ${
                      selectedSkillId === skill.id
                        ? 'bg-[#080A0C] border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-[#090B0D]/50 border-zinc-900 text-[#8D969D] hover:text-[#E6E8EA] hover:border-zinc-850'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Development Tools Group */}
            <div className="glass-l2 rounded-xl p-4.5 flex flex-col gap-3">
              <span className="font-mono text-[9.5px] text-[#8D969D] uppercase tracking-wider font-extrabold flex items-center gap-1.5 border-b border-zinc-900/60 pb-2">
                <Settings size={12} className="text-[#00D9FF]" />
                DEVELOPMENT TOOLS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {toolsSkills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    aria-pressed={selectedSkillId === skill.id}
                    aria-label={`Inspect ${skill.name} capability report`}
                    className={`px-2.5 py-1.5 rounded-md text-xs border transition-all duration-200 cursor-pointer focus:outline-none ${
                      selectedSkillId === skill.id
                        ? 'bg-[#080A0C] border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-[#090B0D]/50 border-zinc-900 text-[#8D969D] hover:text-[#E6E8EA] hover:border-zinc-850'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Currently Exploring (Section 3) */}
          <div className="glass-l2 rounded-xl p-5 flex flex-col gap-3.5">
            <span className="font-mono text-[9.5px] text-[#8D969D] uppercase tracking-wider font-extrabold flex items-center gap-1.5 border-b border-zinc-900 pb-2">
              <BookOpen size={12} className="text-[#00D9FF]" />
              CURRENTLY EXPLORING
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exploringSkills.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`flex justify-between items-center p-3 bg-[#080A0C]/50 border hover:border-[#00D9FF]/40 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                    selectedSkillId === skill.id ? 'border-[#00D9FF] text-[#00D9FF]' : 'border-zinc-900 text-zinc-350'
                  }`}
                  aria-pressed={selectedSkillId === skill.id}
                  aria-label={`Inspect ${skill.name} learning scope`}
                >
                  <span className="font-extrabold truncate max-w-[180px]">{skill.name}</span>
                  <span className="text-[9px] font-bold text-yellow-500 uppercase font-mono">
                    ● EXPLORING
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Skill Matrix Visual Grid (Section 6) */}
          <div className="glass-l2 rounded-xl p-5 flex flex-col gap-3.5 border border-zinc-900">
            <span className="font-mono text-[9.5px] text-[#8D969D] uppercase tracking-wider font-extrabold flex items-center gap-1.5 border-b border-zinc-900 pb-2">
              <Milestone size={12} className="text-[#00D9FF]" />
              SKILL MATRIX GRID
            </span>
            <div className="flex flex-col border border-zinc-900 rounded-lg overflow-hidden text-xs bg-[#080A0C]/40">
              <div className="grid grid-cols-12 gap-2 p-3 bg-[#0D1013]/60 border-b border-zinc-900 text-[9px] text-zinc-550 font-bold select-none font-mono">
                <div className="col-span-6 uppercase">TECHNOLOGY</div>
                <div className="col-span-3 text-center uppercase">USED IN BUILDS</div>
                <div className="col-span-3 text-center uppercase">LEARNING FOCUS</div>
              </div>
              
              <div className="flex flex-col max-h-44 overflow-y-auto font-sans">
                {[
                  { name: "PYTHON", used: true },
                  { name: "FASTAPI", used: true },
                  { name: "PYTORCH", used: false, exploring: true },
                  { name: "SCIKIT-LEARN", used: true },
                  { name: "DOCKER", used: true },
                  { name: "AI AGENTS", used: false, exploring: true },
                  { name: "SYSTEM DESIGN", used: false, exploring: true },
                  { name: "VECTOR SEARCH", used: false, exploring: true },
                  { name: "ASYNCHRONOUS SYSTEMS", used: false, exploring: true }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 p-2.5 border-b border-zinc-900/60 last:border-0 hover:bg-[#0D1013]/40 transition-colors">
                    <div className="col-span-6 font-bold text-zinc-300 uppercase font-mono text-[10px]">{row.name}</div>
                    <div className="col-span-3 text-center font-mono text-[#00D9FF]">
                      {row.used ? '●' : '-'}
                    </div>
                    <div className="col-span-3 text-center font-mono text-yellow-500">
                      {row.exploring || !row.used ? '●' : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Selected Skill Details & Project Connections */}
        <div className="lg:col-span-5 glass-l3 rounded-xl p-6 flex flex-col gap-6 select-text border border-zinc-800/80">
          
          {/* Diagnostic Window Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 select-none">
            <span className="text-xs font-bold text-[#00D9FF] tracking-wider uppercase flex items-center gap-2 font-mono">
              <Terminal size={14} />
              SYSTEM REPORT
            </span>
            <span className="text-[9px] text-[#8D969D] font-mono">ID: TECH_LOG</span>
          </div>

          <div className="flex flex-col gap-5 text-xs md:text-sm">
            
            {/* Skill Name */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider select-none font-mono">TECHNOLOGY</span>
              <span className="text-lg font-black text-[#E6E8EA] uppercase tracking-tight">{selectedSkill.name}</span>
            </div>

            {/* Classification Category */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider select-none font-mono">CLASSIFICATION</span>
              <span className="text-[#E6E8EA] font-semibold flex items-center gap-1.5 uppercase text-xs">
                {selectedSkill.category}
              </span>
            </div>

            {/* Skill Status Badge */}
            <div className="flex flex-col gap-1.5 select-none font-mono">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider">PRACTICAL STATUS</span>
              <div>
                <span className={`px-2.5 py-0.5 border rounded text-[9px] font-bold ${getStatusBadgeColor(selectedSkill.status)}`}>
                  {getStatusLabel(selectedSkill.status)}
                </span>
              </div>
            </div>

            {/* Skill Capability Description */}
            <div className="flex flex-col gap-1.5 border-t border-zinc-900 pt-3">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider select-none font-mono">CAPABILITY REPORT</span>
              <p className="text-[#8D969D] font-sans leading-relaxed font-light">
                {selectedSkill.description || 'Exploring foundations and integration routes for upcoming network transmissions.'}
              </p>
            </div>

            {/* Project Connections (Where Used) */}
            <div className="flex flex-col gap-2.5 border-t border-zinc-900 pt-3">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider select-none font-mono">USED IN PROJECTS</span>
              {relatedProjects.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {relatedProjects.map(proj => (
                    <button
                      key={proj.id}
                      onClick={() => onNavigateToProject(proj.id)}
                      className="w-full text-left bg-[#080A0C]/50 border border-zinc-900 hover:border-[#00D9FF] rounded-lg p-3.5 transition-colors text-xs font-semibold text-[#E6E8EA] hover:text-[#00D9FF] flex items-center justify-between group cursor-pointer"
                      aria-label={`Open project details for ${proj.title} on channel 2`}
                    >
                      <div className="flex flex-col">
                        <span className="font-sans font-black text-zinc-200 group-hover:text-[#00D9FF] transition-colors uppercase tracking-tight">{proj.title}</span>
                        <span className="text-[9px] text-zinc-550 lowercase tracking-wider mt-0.5 group-hover:text-[#00D9FF]/80 transition-colors">
                          {proj.subtitle}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-650 group-hover:text-[#00D9FF] flex items-center gap-1 select-none font-bold uppercase">
                        Dossier
                        <ExternalLink size={10} />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-[#080A0C]/40 border border-zinc-900/60 text-zinc-600 rounded-lg p-3.5 text-center text-xs italic font-sans select-none">
                  {selectedSkill.status === 'exploring' 
                    ? 'No production project associations. Currently analyzing integration patterns.' 
                    : 'Used in utility configurations and general local diagnostics.'}
                </div>
              )}
            </div>

            {/* Related Technical Areas list */}
            <div className="flex flex-col gap-2 border-t border-zinc-900 pt-3 select-none">
              <span className="text-[9px] text-[#8D969D] uppercase tracking-wider font-mono">RELATED AREAS</span>
              <div className="flex flex-wrap gap-1.5">
                {getRelatedAreas(selectedSkill.id).map((area, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-0.5 bg-[#080A0C] border border-zinc-900 text-zinc-550 rounded-md text-[9px] font-mono uppercase tracking-wider font-bold"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
