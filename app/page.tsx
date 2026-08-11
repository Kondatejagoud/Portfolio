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
import WorkshopChannel from '@/components/channels/WorkshopChannel';
import SkillsChannel from '@/components/channels/SkillsChannel';
import JourneyChannel from '@/components/channels/JourneyChannel';
import ArchiveChannel from '@/components/channels/ArchiveChannel';
import ContactChannel from '@/components/channels/ContactChannel';

const programSchedules = [
  { time: '11:30 AM', title: 'ON AIR PROFILE', channel: 1 },
  { time: '12:00 PM', title: 'PROJECT TRANSMISSIONS', channel: 2 },
  { time: '12:30 PM', title: 'TEJA WORKSHOP', channel: 3 },
  { time: '01:00 PM', title: 'PROVEN SKILLSETS', channel: 4 },
  { time: '01:30 PM', title: 'DOCUMENTARY SERIES', channel: 5 },
  { time: '02:00 PM', title: 'RETRO ARCHIVE FEEDS', channel: 6 },
  { time: '02:30 PM', title: 'TRANSMIT SIGNAL', channel: 7 },
];

const channelToHash: Record<number, string> = {
  1: 'about',
  2: 'projects',
  3: 'lab',
  4: 'skills',
  5: 'journey',
  6: 'archive',
  7: 'contact',
  0: 'diagnostics',
};

const hashToChannel: Record<string, number> = {
  '#about': 1,
  '#projects': 2,
  '#lab': 3,
  '#skills': 4,
  '#journey': 5,
  '#archive': 6,
  '#contact': 7,
  '#diagnostics': 0,
};

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
  const changeChannel = useCallback((channelNum: number, updateHash = true) => {
    setIsTransitioning(true);
    setChannel(channelNum);

    // Sync browser URL hash fragment for deep linking
    if (updateHash) {
      const hashStr = channelToHash[channelNum];
      if (hashStr) {
        window.location.hash = hashStr;
      } else {
        window.location.hash = '';
      }
    }

    // Dynamic text defaults per channel
    switch (channelNum) {
      case 1:
        setDynamicProgramText('ON AIR PROFILE');
        break;
      case 2:
        setDynamicProgramText('PROJECT TRANSMISSIONS');
        break;
      case 3:
        setDynamicProgramText('BUILDING IN PROGRESS');
        break;
      case 4:
        setDynamicProgramText('PROVEN SKILLSETS');
        break;
      case 5:
        setDynamicProgramText('DOCUMENTARY SERIES');
        break;
      case 6:
        setDynamicProgramText('RETRO ARCHIVE FEEDS');
        break;
      case 7:
        setDynamicProgramText('TRANSMIT SIGNAL');
        break;
      case 0:
        setDynamicProgramText('SYSTEM DIAGNOSTICS');
        break;
    }
  }, []);

  // Handle browser URL Hash Routing on mount or hash change
  useEffect(() => {
    const handleHashSync = () => {
      const currentHash = window.location.hash;
      if (currentHash && hashToChannel[currentHash] !== undefined) {
        const destChannel = hashToChannel[currentHash];
        setHasEntered(true); // Jump directly past the startup screen for deep linking
        changeChannel(destChannel, false);
      }
    };

    // Run on initial page load
    handleHashSync();

    // Listen for manual hash edits or browser back/forward routing
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [changeChannel]);

  // Navigate to project helper from Skills Channel (CH04)
  const handleNavigateToProject = (projectId: string) => {
    setSelectedProjectIdFromSkills(projectId);
    changeChannel(2); // Change to Projects
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // INTERCEPT INPUT FOCUS: If focused on writing inputs, ignore global navigations
      const activeEl = document.activeElement;
      if (activeEl) {
        const tagName = activeEl.tagName.toLowerCase();
        const isContentEditable = activeEl.getAttribute('contenteditable') === 'true';
        if (
          tagName === 'input' ||
          tagName === 'textarea' ||
          tagName === 'select' ||
          isContentEditable
        ) {
          // Let normal typing occur
          return;
        }
      }

      // Dispatch to active child handlers (like project selection up/down arrows)
      for (const listener of childKeyListeners.current) {
        listener(e);
      }

      const key = e.key.toUpperCase();

      // Easter Egg sequence tracking
      keystrokeBufferRef.current = (keystrokeBufferRef.current + key).slice(-4);
      if (keystrokeBufferRef.current === 'TEJA') {
        setOperatorGranted(true);
        setTimeout(() => setOperatorGranted(false), 4000);
      }

      // Startup screen key check
      if (!hasEntered) {
        if (e.key === 'Enter') {
          setIsTransitioning(true);
          setHasEntered(true);
        }
        return;
      }

      // Global navigation shortcuts
      if (e.key === '0') {
        e.preventDefault();
        changeChannel(0); // Diagnostics Deck
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
        changeChannel(1); // Return Home
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (showSchedule) {
          setShowSchedule(false);
        } else if (channel === 0) {
          changeChannel(1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered, channel, showSchedule, changeChannel]);

  // Handle D-pad trigger events from Remote Control
  const handleDpadUp = () => {
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

  // Render active channel
  const renderChannelContent = () => {
    if (channel === 0) {
      return (
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center font-mono select-text selection:bg-[#00D9FF] selection:text-black">
          <div className="max-w-md border border-zinc-800 bg-[#0D1013] rounded-lg p-6 flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none degraded-signal bg-green-500" />
            
            <div className="flex items-center gap-2 text-[#00D9FF] border-b border-zinc-900 pb-2.5 font-bold text-sm">
              <Shield size={16} />
              <span>CHANNEL 00 // SYSTEM DIAGNOSTICS</span>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-left text-[#8D969D] leading-relaxed">
              <div className="flex justify-between">
                <span>CORE SYSTEM SECURE</span>
                <span className="text-green-400 font-bold">STABLE</span>
              </div>
              <div className="flex justify-between">
                <span>SIGNAL ROUTE MATRIX</span>
                <span className="text-green-400 font-bold">READY</span>
              </div>
              <div className="flex justify-between">
                <span>PROJECT PAYLOAD MODULE</span>
                <span className="text-[#00D9FF] font-bold">5 UNITS ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>SKILLS METADATA STORE</span>
                <span className="text-[#00D9FF] font-bold">SYNCED</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-2.5">
                <span>SYSTEM VERSION CORE</span>
                <span className="text-zinc-550 font-bold">NEXTJS 15 / TAILWIND v4</span>
              </div>
              
              <div className="text-[10px] text-zinc-550 italic mt-1 font-sans">
                Notice: All parameters running within normal thresholds. Designed and developed by Teja.
              </div>
            </div>

            <button
              onClick={() => changeChannel(1)}
              className="py-2 border border-zinc-800 rounded bg-[#080A0C] text-xs font-bold text-[#8D969D] hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all cursor-pointer"
            >
              [ BACK TO PROFILE FEED ]
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
        return <WorkshopChannel />;
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
    <main className="w-full h-screen bg-[#080A0C] flex flex-col relative select-none">
      
      {/* 1. Cinematic Startup Screen */}
      {!hasEntered && (
        <div className="absolute inset-0 bg-[#080A0C] z-50 flex flex-col items-center justify-center p-4 font-mono">
          
          {/* CRT Screen Overlays */}
          <div className="absolute inset-0 pointer-events-none z-10 crt-screen crt-flicker">
            <div className="scanline" />
            <div className="crt-vignette" />
          </div>

          <div className="max-w-md w-full bg-[#0D1013]/90 border border-zinc-800 rounded-xl p-8 flex flex-col items-center text-center gap-6 relative md:tv-power-on select-text selection:bg-[#00D9FF] selection:text-black">
            <div className="flex flex-col gap-1 items-center">
              <h1 className="text-2xl md:text-3xl font-black text-[#E6E8EA] tracking-[0.25em] uppercase glitch-text">
                TEJA NETWORK
              </h1>
              <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] mt-1 tracking-wider animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>● BROADCAST ONLINE</span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 text-xs text-[#8D969D] border-y border-zinc-900 py-4 w-full">
              <div>COMPUTER SCIENCE RESEARCH</div>
              <div className="text-[#00D9FF] font-semibold">AI / SYSTEMS / SOFTWARE</div>
            </div>

            <div className="text-xs md:text-sm text-zinc-300 italic max-w-xs font-sans leading-relaxed">
              &ldquo;I enjoy understanding how systems work and building my own versions of them.&rdquo;
            </div>

            <button
              onClick={() => {
                setIsTransitioning(true);
                setHasEntered(true);
              }}
              className="mt-4 px-6 py-3 border border-[#00D9FF] rounded bg-[#080A0C] text-xs font-bold tracking-widest text-[#00D9FF] hover:bg-[#00D9FF]/5 transition-all shadow-[0_0_12px_rgba(0,217,255,0.15)] cursor-pointer select-none"
            >
              [ ENTER NETWORK ]
            </button>

            <div className="text-[9px] text-zinc-600 tracking-wide mt-2 uppercase">
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

      {/* 3. Global operator keys sequence popup */}
      {operatorGranted && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-55 px-6 py-3 bg-[#0D1013] border border-[#00D9FF] rounded-md shadow-[0_0_15px_rgba(0,217,255,0.3)] text-xs text-center font-mono animate-bounce flex items-center gap-2">
          <Key size={14} className="text-[#00D9FF]" />
          <div>
            <span className="text-[#00D9FF] font-bold">ACCESS GRANTED.</span> WELCOME, OPERATOR.
          </div>
        </div>
      )}

      {/* 4. Active Main TV Housing shell */}
      <TvShell isPowerOn={isPowerOn} isCrtEnabled={isCrtEnabled}>
        <BroadcastHeader
          channelNumber={channel}
          channelTitle={
            channel === 1 ? 'ABOUT' :
            channel === 2 ? 'PROJECTS' :
            channel === 3 ? 'WORKSHOP' :
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
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-[#0D1013]/90 border border-zinc-800 hover:border-[#00D9FF] rounded text-[10px] font-mono text-[#8D969D] hover:text-[#00D9FF] cursor-pointer"
            aria-label="Open network schedule calendar"
          >
            <Calendar size={12} />
            <span>WHAT&apos;S ON?</span>
          </button>
        </div>

        {/* Footer channel grid */}
        <ChannelNav currentChannel={channel} onChannelChange={changeChannel} />

        {/* Bottom marquee ticker */}
        <BroadcastTicker channel={channel} />
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
          <div className="max-w-md w-full bg-[#0D1013] border border-zinc-800 rounded-lg p-5 flex flex-col gap-4 relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
              <span className="flex items-center gap-1.5 text-xs text-[#00D9FF] font-bold">
                <Calendar size={14} />
                WHAT&apos;S ON TEJA NETWORK?
              </span>
              <button
                onClick={() => setShowSchedule(false)}
                className="text-xs text-zinc-550 hover:text-white cursor-pointer"
                aria-label="Close schedule modal"
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
                    className={`w-full text-left p-3 rounded border text-xs transition-all duration-150 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-[#00D9FF] ${
                      isCurrent
                        ? 'bg-[#080A0C] border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-[#090B0D] border-zinc-800 text-[#8D969D] hover:text-[#E6E8EA] hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-zinc-650">{slot.time}</span>
                      <span className="font-semibold uppercase tracking-wider">{slot.title}</span>
                    </div>
                    <span className="text-[9px] font-bold font-mono text-zinc-550 border border-zinc-900 px-1.5 py-0.5 rounded bg-[#080A0C]">
                      CH 0{slot.channel}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[9px] text-zinc-550 text-center uppercase">
              Clicking a scheduled slot switches the TV channel directly.
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
