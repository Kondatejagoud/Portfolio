'use client';

import React from 'react';

const tickerItems = [
  "JARVIS SYSTEM RUNNING ACTIVE - LOCAL MEMORY RETRIEVAL INTERFACES SYNCHRONIZED",
  "FAKE NEWS DETECTION LIVE BROADCAST ONLINE - DEMO LINK CONFIGURED",
  "NETWORK ANOMALY CLUSTERING COMPLETE - PCA Packet Filters Installed",
  "STUDYMATE PLATFORM SYSTEM INTEGRATED - COURSE DATABASE INDEX STABLE",
  "SMARTCLASS ROOM CONSOLE COMPLETED - ACTIVITY TRACKER PACKETS ONLINE",
  "KEYBOARD OVERLAY COMPATIBLE - CHANGE CHANNELS VIA 1-7 NUMERICS",
];

export default function BroadcastTicker() {
  return (
    <div className="w-full bg-[#080A0C] border-t border-zinc-800/60 py-2 h-9 flex items-center font-mono text-xs select-none">
      <div className="px-4 text-[#00D9FF] font-bold border-r border-zinc-800/60 uppercase flex items-center gap-2 flex-shrink-0 animate-pulse">
        <span className="inline-block w-2 h-2 rounded-full bg-red-655" />
        BREAKING
      </div>
      
      <div className="ticker-wrap flex-1 relative overflow-hidden">
        <div className="ticker-content flex gap-12 text-[#8D969D]" role="marquee">
          {/* Double contents for loop scroll */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 font-medium">
              <span className="text-[#E6E8EA] tracking-wide">{item}</span>
              <span className="text-[#00D9FF] font-black">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
