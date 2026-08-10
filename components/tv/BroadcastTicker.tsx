'use client';

import React from 'react';

const tickerItems = [
  "NEW AI EXPERIMENT IN DEVELOPMENT",
  "JARVIS ARCHITECTURE STABLE - VECTOR DATABASE SYNCHRONIZED",
  "CURRENTLY LEARNING ADVANCED AGENT ORCHESTRATION & DEEPER LLM MEMORY RETRIEVAL",
  "HYBRID DETECTOR MODEL ENTERING STAGE 2 LINGUISTIC CALIBRATION",
  "NETWORK ANOMALY CLUSTERING COMPLETE - PACKET FILTERS ONLINE",
  "REMOTE CONTROL ACTIVE - CHANGE CHANNELS USING KEYBOARD SHORTCUTS 1 TO 7",
  "ENTER DEEP MODE: PRESS 0 FOR CONSOLE SYSTEM DIAGNOSTICS",
];

export default function BroadcastTicker() {
  return (
    <div className="w-full bg-[#050505] border-t border-zinc-800/60 py-2 h-9 flex items-center font-mono text-xs select-none">
      <div className="px-4 text-[#00E5FF] font-bold border-r border-zinc-800/60 uppercase flex items-center gap-2 flex-shrink-0 animate-pulse">
        <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping" />
        NEWS TICKER
      </div>
      
      <div className="ticker-wrap flex-1 relative overflow-hidden">
        <div className="ticker-content flex gap-12 text-[#777777]">
          {/* Double content for infinite loop effect */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              <span className="text-[#F2F2F2]">{item}</span>
              <span className="text-[#00E5FF] font-bold">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
