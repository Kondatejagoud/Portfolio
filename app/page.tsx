'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, Shield, Key } from 'lucide-react';

// Shell & Navigation Components
import TvShell from '@/components/tv/TvShell';
import BroadcastHeader from '@/components/tv/BroadcastHeader';
import ChannelNav from '@/components/tv/ChannelNav';
import BroadcastTicker from '@/components/tv/BroadcastTicker';
import RemoteControl from '@/components/tv/RemoteControl';
import ChannelTransition from '@/components/tv/ChannelTransition';

// Channel Content Components
import AboutChannel from '@/components/channels/AboutChannel';
import ProjectsChannel from '@/components/channels/ProjectsChannel';
import LabChannel from '@/components/channels/LabChannel';
import SkillsChannel from '@/components/channels/SkillsChannel';
import JourneyChannel from '@/components/channels/JourneyChannel';
import ArchiveChannel from '@/components/channels/ArchiveChannel';
import ContactChannel from '@/components/channels/ContactChannel';

const programSchedules = [
  { time: '11:30 AM', title: 'WHO IS TEJA?', channel: 1 },
  { time: '12:00 PM', title: 'SYSTEMS I\'VE BUILT', channel: 2 },
  { time: '12:30 PM', title: 'INSIDE THE LAB', channel: 3 },
  { time: '01:00 PM', title: 'TECHNOLOGY TONIGHT', channel: 4 },
  { time: '01:30 PM', title: 'THE JOURNEY DOCUMENTARY', channel: 5 },
  { time: '02:00 PM', title: 'RETRO ARCHIVE FEEDS', channel: 6 },
  { time: '02:30 PM', title: 'OPEN CONNECTION TERMINAL', channel: 7 },
];

export default function Home() {
  // Navigation & UI States
  const [hasEntered, setHasEntered] = useState(false);
  const [channel, setChannel] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isCrtEnabled = true;
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedProjectIdFromSkills, setSelectedProjectIdFromSkills] = useState<string | undefined>(undefined);

  // Easter Egg States
  const keystrokeBufferRef = useRef('');
  const [operatorGranted, setOperatorGranted] = useState(false);

  // Dynamic program text (updated by sub-channels, primarily projects)
  const [dynamicProgramText, setDynamicProgramText] = useState('ON AIR PROFILE');

  // Multi-tier keyboard delegation
  const childKeyListeners = useRef<Array<(e: KeyboardEvent) => void>>([]);

  const registerChildKeyListener = useCallback((handler: (e: KeyboardEvent) => void) => {
    childKeyListeners.current.push(handler);
  }, []);

  const unregisterChildKeyListener = useCallback((handler: (e: KeyboardEvent) => void) => {
    childKeyListeners.current = childKeyListeners.current.filter(h => h !== handler);
  }, []);

  // Channel Transition Executor
  const changeChannel = useCallback((channelNum: number) => {
    if (channelNum === channel && hasEntered) return;
    setIsTransitioning(true);
    setChannel(channelNum);
    // Dynamic text defaults per channel
    switch (channelNum) {
      case 1:
        setDynamicProgramText('WHO IS TEJA?');
        break;
      case 2:
        setDynamicProgramText('SYSTEMS I\'VE BUILT');
        break;
      case 3:
        setDynamicProgramText('INSIDE THE LAB');
        break;
      case 4:
        setDynamicProgramText('TECHNOLOGY TONIGHT');
        break;
      case 5:
        setDynamicProgramText('THE JOURNEY DOCUMENTARY');
        break;
      case 6:
        setDynamicProgramText('RETRO ARCHIVE FEEDS');
        break;
      case 7:
        setDynamicProgramText('OPEN CONNECTION TERMINAL');
        break;
      case 0:
        setDynamicProgramText('SYSTEM DIAGNOSTICS');
        break;
    }
  }, [channel, hasEntered]);

  // Navigate to project helper from Skills Channel (CH04)
  const handleNavigateToProject = (projectId: string) => {
    setSelectedProjectIdFromSkills(projectId);
    changeChannel(2); // Change to Projects
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Run active child handlers first
      for (const listener of childKeyListeners.current) {
        listener(e);
      }

      const key = e.key.toUpperCase();

      // Easter Egg sequence tracking
      keystrokeBufferRef.current = (keystrokeBufferRef.current + key).slice(-4);
      if (keystrokeBufferRef.current === 'TEJA') {
        setOperatorGranted(true);
        // Auto clear notification
        setTimeout(() => setOperatorGranted(false), 4000);
      }

      // 2. Startup screen check
      if (!hasEntered) {
        if (e.key === 'Enter') {
          setIsTransitioning(true);
          setHasEntered(true);
        }
        return;
      }

      // 3. Main network navigation keys
      if (e.key === '0') {
        e.preventDefault();
        changeChannel(0); // CH00 diagnostics easter egg
      } else if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        e.preventDefault();
        changeChannel(parseInt(e.key, 10));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        let prevCh = channel - 1;
        if (prevCh < 1) prevCh = 7;
        changeChannel(prevCh);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        let nextCh = channel + 1;
        if (nextCh > 7) nextCh = 1;
        changeChannel(nextCh);
      } else if (key === 'H') {
        e.preventDefault();
        changeChannel(1); // CH01 (Home)
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (showSchedule) {
          setShowSchedule(false);
        } else if (channel === 0) {
          changeChannel(1); // Return from diagnostics
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered, channel, showSchedule, changeChannel]);

  // Handle D-pad trigger events from Remote
  const handleDpadUp = () => {
    // Dispatch custom arrow event for child content
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    window.dispatchEvent(event);
  };

  const handleDpadDown = () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    window.dispatchEvent(event);
  };

  const handleDpadLeft = () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    window.dispatchEvent(event);
  };

  const handleDpadRight = () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    window.dispatchEvent(event);
  };

  const handleDpadEnter = () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    window.dispatchEvent(event);
  };

  // Render content depending on active channel
  const renderChannelContent = () => {
    if (channel === 0) {
      return (
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center font-mono select-text selection:bg-[#00E5FF] selection:text-black">
          <div className="max-w-md border border-zinc-800 bg-[#0E0E0E] rounded-lg p-6 flex flex-col gap-5 relative overflow-hidden">
            {/* Retro overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none degraded-signal bg-green-500" />
            
            <div className="flex items-center gap-2 text-[#00E5FF] border-b border-zinc-900 pb-2.5 font-bold text-sm">
              <Shield size={16} />
              <span>CHANNEL 00 // SYSTEM DIAGNOSTICS</span>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-left text-[#999999] leading-relaxed">
              <div className="flex justify-between">
                <span>CORE SYSTEM STATUS</span>
                <span className="text-green-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>BROADCAST SIGNAL INTEGRITY</span>
                <span className="text-green-400 font-bold">ONLINE (100%)</span>
              </div>
              <div className="flex justify-between">
                <span>PROJECT TRANSMISSION MODULE</span>
                <span className="text-green-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>EXPERIMENTAL LAB LOGS</span>
                <span className="text-[#00E5FF] font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-2.5">
                <span>DEVELOPER MOTIVATION INDEX</span>
                <span className="text-yellow-500 font-bold">QUESTIONABLE</span>
              </div>
              
              <div className="text-[10px] text-zinc-500 italic mt-1 font-sans">
                Notice: This diagnostics deck is executing locally. All parameters are functioning within regular limits.
              </div>
            </div>

            <button
              onClick={() => changeChannel(1)}
              className="py-2 border border-zinc-800 rounded bg-[#090909] text-xs font-bold hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all cursor-pointer"
            >
              [ BACK TO HOME FEED ]
            </button>
          </div>
        </div>
      );
    }

    switch (channel) {
      case 1:
        return <AboutChannel />;
      case 2:
        return (
          <ProjectsChannel
            selectedProjectId={selectedProjectIdFromSkills}
            onProgramChange={setDynamicProgramText}
            registerKeyListener={registerChildKeyListener}
            unregisterKeyListener={unregisterChildKeyListener}
          />
        );
      case 3:
        return <LabChannel />;
      case 4:
        return <SkillsChannel onNavigateToProject={handleNavigateToProject} />;
      case 5:
        return <JourneyChannel />;
      case 6:
        return <ArchiveChannel />;
      case 7:
        return <ContactChannel />;
      default:
        return <AboutChannel />;
    }
  };

  return (
    <main className="w-full h-screen bg-[#070707] flex flex-col relative select-none">
      
      {/* 1. Cinematic Startup Screen */}
      {!hasEntered && (
        <div className="absolute inset-0 bg-[#0A0A0A] z-50 flex flex-col items-center justify-center p-4 font-mono">
          
          {/* CRT Screen Overlays */}
          <div className="absolute inset-0 pointer-events-none z-10 crt-screen crt-flicker">
            <div className="scanline" />
            <div className="crt-vignette" />
          </div>

          <div className="max-w-md w-full bg-[#0E0E0E]/80 border border-zinc-900 rounded-xl p-8 flex flex-col items-center text-center gap-6 relative md:tv-power-on select-text selection:bg-[#00E5FF] selection:text-black">
            {/* Header info */}
            <div className="flex flex-col gap-1 items-center">
              <h1 className="text-2xl md:text-3xl font-black text-[#F2F2F2] tracking-[0.25em] uppercase glitch-text">
                TEJA NETWORK
              </h1>
              <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] mt-1 tracking-wider animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>● BROADCAST ONLINE</span>
              </div>
            </div>

            {/* Sub headers */}
            <div className="flex flex-col gap-0.5 text-xs text-zinc-500 border-y border-zinc-900 py-4 w-full">
              <div>COMPUTER SCIENCE</div>
              <div className="text-[#00E5FF] font-semibold">AI / SYSTEMS / SOFTWARE</div>
            </div>

            {/* Philosophy quote */}
            <div className="text-xs md:text-sm text-zinc-300 italic max-w-xs font-sans leading-relaxed">
              &ldquo;Building things to understand them.&rdquo;
            </div>

            {/* Enter network Trigger button */}
            <button
              onClick={() => {
                setIsTransitioning(true);
                setHasEntered(true);
              }}
              className="mt-4 px-6 py-3 border border-zinc-800 rounded bg-[#090909] text-xs font-bold tracking-widest text-[#00E5FF] border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all shadow-[0_0_12px_rgba(0,229,255,0.15)] cursor-pointer select-none"
            >
              [ ENTER NETWORK ]
            </button>

            {/* Keyboard shortcut tips */}
            <div className="text-[9px] text-[#555555] tracking-wide mt-2 uppercase">
              Remote Control Compatible // Arrow Keys Keyboard Ready
            </div>
          </div>
        </div>
      )}

      {/* 2. Channel noise static canvas */}
      <ChannelTransition
        isTransitioning={isTransitioning}
        onTransitionEnd={() => setIsTransitioning(false)}
      />

      {/* 3. Global operator egg popups */}
      {operatorGranted && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-55 px-6 py-3 bg-[#0E0E0E] border border-[#00E5FF] rounded-md shadow-[0_0_15px_rgba(0,229,255,0.3)] text-xs text-center font-mono animate-bounce flex items-center gap-2">
          <Key size={14} className="text-[#00E5FF]" />
          <div>
            <span className="text-[#00E5FF] font-bold">ACCESS GRANTED.</span> WELCOME, OPERATOR.
          </div>
        </div>
      )}

      {/* 4. Active Main TV Housing shell */}
      <TvShell isPowerOn={isPowerOn} isCrtEnabled={isCrtEnabled}>
        {/* TV Viewport inner headers */}
        <BroadcastHeader
          channelNumber={channel}
          channelTitle={
            channel === 1 ? 'ABOUT' :
            channel === 2 ? 'PROJECTS' :
            channel === 3 ? 'LAB' :
            channel === 4 ? 'SKILLS' :
            channel === 5 ? 'JOURNEY' :
            channel === 6 ? 'ARCHIVE' :
            channel === 7 ? 'CONTACT' : 'DIAGNOSTICS'
          }
          currentProgram={dynamicProgramText}
        />

        {/* Channels viewport panels container */}
        <div className="flex-1 w-full flex flex-col overflow-hidden relative">
          
          {/* Main content rendering */}
          {renderChannelContent()}

          {/* Schedule button link inside content container */}
          <button
            onClick={() => setShowSchedule(true)}
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-[#0E0E0E]/90 border border-zinc-850 hover:border-[#00E5FF] rounded text-[10px] font-mono text-[#777777] hover:text-[#00E5FF] cursor-pointer"
          >
            <Calendar size={12} />
            <span>WHAT&apos;S ON?</span>
          </button>
        </div>

        {/* Footer channel grid */}
        <ChannelNav currentChannel={channel} onChannelChange={changeChannel} />

        {/* Bottom marquee ticker */}
        <BroadcastTicker />
      </TvShell>

      {/* 5. Virtual floating remote control controller */}
      {hasEntered && (
        <RemoteControl
          currentChannel={channel}
          onChannelChange={changeChannel}
          onDpadUp={handleDpadUp}
          onDpadDown={handleDpadDown}
          onDpadLeft={handleDpadLeft}
          onDpadRight={handleDpadRight}
          onDpadEnter={handleDpadEnter}
          isCrtEnabled={isPowerOn}
          onToggleCrt={() => setIsPowerOn(!isPowerOn)}
        />
      )}

      {/* 6. "What's On?" TV program Schedule Modal */}
      {showSchedule && (
        <div className="fixed inset-0 bg-[#000000]/80 z-50 flex items-center justify-center p-4 font-mono select-none">
          <div className="max-w-md w-full bg-[#0E0E0E] border border-zinc-800 rounded-lg p-5 flex flex-col gap-4 relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
              <span className="flex items-center gap-1.5 text-xs text-[#00E5FF] font-bold">
                <Calendar size={14} />
                WHAT&apos;S ON TEJA NETWORK?
              </span>
              <button
                onClick={() => setShowSchedule(false)}
                className="text-xs text-zinc-500 hover:text-white cursor-pointer"
              >
                [ ESC ]
              </button>
            </div>

            {/* Schedule Slot Items list */}
            <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto">
              {programSchedules.map((slot) => {
                const isCurrent = slot.channel === channel;
                return (
                  <button
                    key={slot.channel}
                    onClick={() => {
                      changeChannel(slot.channel);
                      setShowSchedule(false);
                    }}
                    className={`w-full text-left p-3 rounded border text-xs transition-all duration-150 cursor-pointer flex justify-between items-center ${
                      isCurrent
                        ? 'bg-zinc-900 border-[#00E5FF] text-[#00E5FF]'
                        : 'bg-[#090909] border-zinc-900 hover:border-zinc-850 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-zinc-500">{slot.time}</span>
                      <span className="font-semibold uppercase tracking-wider">{slot.title}</span>
                    </div>
                    <span className="text-[9px] font-bold font-mono text-[#777777] border border-zinc-900 px-1.5 py-0.5 rounded bg-black">
                      CH 0{slot.channel}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[9px] text-[#555555] text-center uppercase">
              Clicking a scheduled slot switches the TV channel directly.
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
