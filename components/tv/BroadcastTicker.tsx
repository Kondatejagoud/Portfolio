'use client';

import React from 'react';

const defaultTickerItems = [
  "JARVIS SYSTEM RUNNING ACTIVE - LOCAL MEMORY RETRIEVAL INTERFACES SYNCHRONIZED",
  "FAKE NEWS DETECTION LIVE ON NETWORK - PUBLIC DEMO DEPLOYED",
  "NETWORK TRAFFIC ANOMALY CLUSTERING COMPLETE - PCA PACKET FILTERS INSTALLED",
  "STUDYMATE PLATFORM SYSTEM INTEGRATED - COURSE DATABASE INDEX STABLE",
  "SMARTCLASS ROOM CONSOLE COMPLETED - ACTIVITY TRACKER PACKETS ONLINE",
  "KEYBOARD OVERLAY COMPATIBLE - CHANGE CHANNELS VIA 1-6 NUMERICS",
];

const workshopTickerItems = [
  "JARVIS ACTIVE",
  "FAKE NEWS DETECTION DEPLOYED",
  "NETWORK ANOMALY PROJECT COMPLETE",
  "STUDYMATE PROJECT COMPLETE",
  "SMARTCLASS ROOM PROJECT COMPLETE",
  "SYSTEM DESIGN CURRENTLY LEARNING",
];

interface BroadcastTickerProps {
  channel?: number;
}

export default function BroadcastTicker({ channel = 1 }: BroadcastTickerProps) {
  const isWorkshop = channel === 3;
  const items = isWorkshop ? workshopTickerItems : defaultTickerItems;
  const label = isWorkshop ? "DEVELOPMENT UPDATE" : "BREAKING";

  return (
    <div className="w-full bg-[#080A0C] border-t border-zinc-800/60 py-2 h-9 flex items-center font-mono text-xs select-none">
      <div className="px-4 text-[#00D9FF] font-bold border-r border-zinc-800/60 uppercase flex items-center gap-2 flex-shrink-0 animate-pulse">
        {!isWorkshop && <span className="inline-block w-2 h-2 rounded-full bg-red-655" />}
        {label}
      </div>
      
      <div className="ticker-wrap flex-1 relative overflow-hidden">
        <div className="ticker-content flex gap-12 text-[#8D969D]" role="marquee">
          {/* Double contents for loop scroll */}
          {[...items, ...items].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 font-medium">
              <span className="text-[#E6E8EA] tracking-wide uppercase">{item}</span>
              <span className="text-[#00D9FF] font-black">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
