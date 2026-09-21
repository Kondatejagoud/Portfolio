'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, Shield, Key, Sparkles } from 'lucide-react';

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
import ContactChannel from '@/components/channels/ContactChannel';

const programSchedules = [
  { time: '11:30 AM', title: 'ON AIR PROFILE', channel: 1, desc: 'Who is Konda Teja?' },
  { time: '12:00 PM', title: 'PROJECT TRANSMISSIONS', channel: 2, desc: "Things I've Built" },
  { time: '12:30 PM', title: 'TEJA WORKSHOP', channel: 3, desc: 'Building in Progress' },
  { time: '01:00 PM', title: 'SKILL MATRIX', channel: 4, desc: 'Technology Constellation' },
  { time: '01:30 PM', title: 'DOCUMENTARY SERIES', channel: 5, desc: 'The Road So Far' },
  { time: '02:00 PM', title: 'TRANSMIT SIGNAL', channel: 6, desc: 'Open Connection' },
];

const channelToHash: Record<number, string> = {
  1: 'about',
  2: 'projects',
  3: 'workshop',
  4: 'skills',
  5: 'journey',
  6: 'contact',
  0: 'diagnostics',
};

const hashToChannel: Record<string, number> = {
  '#about': 1,
  '#projects': 2,
  '#workshop': 3,
  '#skills': 4,
  '#journey': 5,
  '#contact': 6,
  '#diagnostics': 0,
};

export default function Home() {
  // Navigation & UI States
  const [hasEntered, setHasEntered] = useState(false);
  const [introStep, setIntroStep] = useState(0); // 0 to 5 steps
  const [channel, setChannel] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedProjectIdFromSkills, setSelectedProjectIdFromSkills] = useState<string | undefined>(undefined);

  // Easter Egg States
  const keystrokeBufferRef = useRef('');
  const [operatorGranted, setOperatorGranted] = useState(false);

  // Dynamic program text
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
        setDynamicProgramText('TRANSMIT SIGNAL');
        break;
      case 0:
        setDynamicProgramText('SYSTEM DIAGNOSTICS');
        break;
    }
  }, []);

  // Handle Client-Side Intro check & step triggers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentHash = window.location.hash;
      const hasHash = currentHash && hashToChannel[currentHash] !== undefined;
      const introPlayed = localStorage.getItem('teja-intro-played') === 'true';

      if (introPlayed || hasHash) {
        const timer = setTimeout(() => {
          setHasEntered(true);
          if (hasHash) {
            changeChannel(hashToChannel[currentHash], false);
          }
        }, 0);
        return () => clearTimeout(timer);
      } else {
        // Run step-by-step cinematic startup
        const timers = [
          setTimeout(() => setIntroStep(1), 500),   // Fades in "TEJA NETWORK"
          setTimeout(() => setIntroStep(2), 1100),  // Adds "KONDA TEJA // PERSONAL BROADCAST"
          setTimeout(() => setIntroStep(3), 1700),  // Adds "SIGNAL DETECTED"
          setTimeout(() => setIntroStep(4), 2200),  // Adds "TUNING FREQUENCY..."
          setTimeout(() => setIntroStep(5), 2800),  // Adds "CONNECTION ESTABLISHED"
          setTimeout(() => {
            setHasEntered(true);
            localStorage.setItem('teja-intro-played', 'true');
          }, 3400)
        ];
        return () => timers.forEach(clearTimeout);
      }
    }
  }, [changeChannel]);

  // Handle browser URL Hash Routing on manual edit or back button
  useEffect(() => {
    const handleHashSync = () => {
      const currentHash = window.location.hash;
      if (currentHash && hashToChannel[currentHash] !== undefined) {
        const destChannel = hashToChannel[currentHash];
        setHasEntered(true);
        changeChannel(destChannel, false);
      }
    };
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [changeChannel]);

  // Navigate to project helper from Skills Channel (CH04)
  const handleNavigateToProject = (projectId: string) => {
    setSelectedProjectIdFromSkills(projectId);
    changeChannel(2); // Change to Projects
  };

  const handleSkipIntro = () => {
    setHasEntered(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('teja-intro-played', 'true');
    }
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
          handleSkipIntro();
        }
        return;
      }

      // Global navigation shortcuts
      if (e.key === '0') {
        e.preventDefault();
        changeChannel(0);
      } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        e.preventDefault();
        changeChannel(parseInt(e.key, 10));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        let prevCh = channel - 1;
        if (prevCh < 1) prevCh = 6;
        changeChannel(prevCh);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        let nextCh = channel + 1;
        if (nextCh > 6) nextCh = 1;
        changeChannel(nextCh);
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
            
            <div className="flex items-center gap-2 text-[#00D9FF] border-b border-zinc-900 pb-2.5 font-bold text-xs">
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
                <span className="text-zinc-550 font-bold">NEXTJS 16 / TAILWIND v4</span>
              </div>
            </div>

            <button
              onClick={() => changeChannel(1)}
              className="py-2 border border-zinc-850 hover:border-[#00D9FF]/40 rounded bg-[#080A0C] text-xs font-bold text-[#8D969D] hover:text-[#00D9FF] transition-all cursor-pointer"
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
        return <WorkshopChannel onNavigateToProject={handleNavigateToProject} />;
      case 4:
        return <SkillsChannel onNavigateToProject={handleNavigateToProject} />;
      case 5:
        return <JourneyChannel onNavigateToProject={handleNavigateToProject} />;
      case 6:
        return <ContactChannel />;
      default:
        return <AboutChannel />;
    }
  };

  return (
    <main className="w-full h-screen bg-[#040506] flex flex-col relative select-none overflow-hidden">
      
      {/* 1. Cinematic Startup Screen Overlay */}
      {!hasEntered && (
        <div className="absolute inset-0 bg-[#040506] z-50 flex flex-col items-center justify-center p-6 font-mono text-zinc-300">
          
          {/* Subtle scanning sweeps */}
          <div className="absolute inset-0 pointer-events-none z-10 crt-flicker">
            <div className="scanline opacity-10" />
            <div className="crt-vignette opacity-70" />
          </div>

          <div className="max-w-md w-full flex flex-col items-center text-center gap-6 relative select-none">
            
            {/* Step 1 & 2: TEJA NETWORK name */}
            <div className="flex flex-col gap-1.5 items-center transition-all duration-700">
              <h1 className={`font-sans font-black tracking-[0.3em] uppercase text-xl md:text-2xl text-[#E6E8EA] transition-opacity duration-700 ${
                introStep >= 1 ? 'opacity-100' : 'opacity-0'
              }`}>
                TEJA NETWORK
              </h1>
              <span className={`text-[9px] text-[#8D969D] tracking-widest uppercase font-bold leading-none transition-opacity duration-700 ${
                introStep >= 2 ? 'opacity-100' : 'opacity-0'
              }`}>
                KONDA TEJA // PERSONAL BROADCAST
              </span>
            </div>

            {/* Step 3 & 4: Scanning statuses */}
            <div className="flex flex-col items-center gap-1.5 min-h-[40px] mt-4 select-text">
              {introStep >= 3 && (
                <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-[9px] tracking-widest animate-pulse">
                  <Sparkles size={11} className="text-cyan-400 animate-spin" />
                  <span>SIGNAL DETECTED</span>
                </div>
              )}
              {introStep >= 4 && (
                <span className="text-[9px] text-zinc-600 font-semibold tracking-wider uppercase">
                  TUNING STREAMS... CH 01 ABOUT
                </span>
              )}
              {introStep >= 5 && (
                <span className="text-[9px] text-green-400 font-bold tracking-widest uppercase animate-pulse">
                  ● CONNECTION ESTABLISHED // SIGNAL STABLE
                </span>
              )}
            </div>

            {/* Skip Option */}
            <button
              onClick={handleSkipIntro}
              className="mt-6 px-4 py-2 border border-zinc-800 hover:border-[#00D9FF]/40 rounded-full bg-zinc-950/60 hover:bg-[#00D9FF]/5 text-[9px] font-extrabold tracking-widest text-[#8D969D] hover:text-[#00D9FF] transition-all cursor-pointer shadow-md select-none"
            >
              SKIP INTRO
            </button>
          </div>
        </div>
      )}

      {/* 2. Channel noise static screen sweep */}
      <ChannelTransition
        isTransitioning={isTransitioning}
        onTransitionEnd={() => setIsTransitioning(false)}
      />

      {/* 3. Global operator keys sequence popup */}
      {operatorGranted && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-55 px-6 py-3 bg-[#0D1013] border border-[#00D9FF] rounded-md shadow-[0_0_15px_rgba(0,217,255,0.3)] text-xs text-center font-mono animate-bounce flex items-center gap-2">
          <Key size={14} className="text-[#00D9FF]" />
          <div>
            <span className="text-[#00D9FF] font-bold">SIGNAL RECEIVED.</span> ACCESS GRANTED.
          </div>
        </div>
      )}

      {/* 4. Active Main TV Housing shell */}
      <TvShell isPowerOn={isPowerOn} isCrtEnabled={isPowerOn}>
        
        {/* slim menu top header bar */}
        <BroadcastHeader
          channelNumber={channel}
          channelTitle={
            channel === 1 ? 'ABOUT' :
            channel === 2 ? 'PROJECTS' :
            channel === 3 ? 'WORKSHOP' :
            channel === 4 ? 'SKILLS' :
            channel === 5 ? 'JOURNEY' :
            channel === 6 ? 'CONTACT' : 'DIAGNOSTICS'
          }
          currentProgram={dynamicProgramText}
        />

        {/* Channels viewport panels container */}
        <div className="flex-1 w-full flex flex-col min-h-0 overflow-hidden relative">
          
          {/* Main content rendering */}
          {renderChannelContent()}

          {/* Schedule button link inside content container */}
          <button
            onClick={() => setShowSchedule(true)}
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-[#0D1013]/90 border border-zinc-800/80 hover:border-cyan-500/80 rounded text-[9px] font-mono text-[#8D969D] hover:text-[#00D9FF] cursor-pointer shadow-md"
            aria-label="Open network program guide schedule"
          >
            <Calendar size={11} className="text-[#00D9FF]" />
            <span>WHAT&apos;S ON?</span>
          </button>
        </div>

        {/* Sleek bottom channel selector bar */}
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

      {/* 6. "What's On" TV program Schedule Guide Modal */}
      {showSchedule && (
        <div className="fixed inset-0 bg-[#000000]/80 z-50 flex items-center justify-center p-4 font-mono select-none">
          <div className="max-w-md w-full glass-l3 rounded-xl p-5 flex flex-col gap-4 relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
              <span className="flex items-center gap-1.5 text-xs text-[#00D9FF] font-bold">
                <Calendar size={14} />
                WHAT&apos;S ON NOW
              </span>
              <button
                onClick={() => setShowSchedule(false)}
                className="text-[10px] text-zinc-550 hover:text-white cursor-pointer uppercase font-bold"
                aria-label="Close schedule modal"
              >
                [ Close ]
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
                    className={`w-full text-left p-3 rounded border text-xs transition-all duration-300 cursor-pointer flex justify-between items-center focus:outline-none ${
                      isCurrent
                        ? 'bg-zinc-900/50 border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-zinc-950/20 border-zinc-900 text-[#8D969D] hover:text-[#E6E8EA] hover:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold text-zinc-650 font-mono">{slot.time}</span>
                      <div className="flex flex-col">
                        <span className="font-bold uppercase tracking-wider text-[11px]">{slot.title}</span>
                        <span className="text-[9px] text-zinc-550 mt-0.5 font-sans lowercase">{slot.desc}</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-bold font-mono text-zinc-400 border border-zinc-900 px-2 py-0.5 rounded bg-[#080A0C]/80">
                      CH 0{slot.channel}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[8px] text-zinc-600 text-center uppercase tracking-wider font-bold">
              Clicking a scheduled slot tunes the channel directly.
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
