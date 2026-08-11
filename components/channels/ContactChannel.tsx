'use client';

import React, { useState } from 'react';
import { Send, FileDown, Terminal, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/site';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.26 1.23-.26 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactChannel() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('SENDING');
    setLogs([]);

    const logSteps = [
      "RESOLVING GATEWAY COGNITIVE NODE...",
      "ACQUIRING ENCRYPTION SYMMETRIC KEYS...",
      "ESTABLISHING SECURE TUNNEL TO TEJA SERVER...",
      "COMPILING PAYLOAD STRUCT...",
      "SHIPPING PACKET BUFFER...",
    ];

    // Simulate retro terminal logs
    for (let i = 0; i < logSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setLogs(prev => [...prev, `[LOG] ${logSteps[i]}`]);
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    setLogs(prev => [...prev, "[OK] TRANSMISSION COMPLETED SUCCESSFULLY. EXITED WITH CODE 0."]);
    
    setStatus('SUCCESS');
    setFormData({ name: '', email: '', message: '' });
  };

  // Helper to check and generate link styles/attributes
  const getLinkProps = (url: string | undefined) => {
    const isConfigured = !!url;
    return {
      href: isConfigured ? url : undefined,
      onClick: isConfigured ? undefined : (e: React.MouseEvent) => e.preventDefault(),
      className: `flex items-center justify-between p-4 bg-[#0D1013] border rounded-lg transition-all text-xs font-mono uppercase font-bold select-none ${
        isConfigured
          ? 'border-zinc-800 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] group cursor-pointer'
          : 'border-zinc-900/60 text-[#8D969D]/40 opacity-60 cursor-not-allowed'
      }`,
      label: isConfigured ? 'CONNECT' : 'STATUS: LINK NOT CONFIGURED',
      sublabel: isConfigured ? 'RETRIEVE' : 'STATUS: LINK NOT CONFIGURED'
    };
  };

  const gitProps = getLinkProps(siteConfig.github);
  const liProps = getLinkProps(siteConfig.linkedin);
  const resProps = getLinkProps(siteConfig.resume);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-none">
      {/* Channel Header */}
      <div className="border-b border-zinc-800/80 pb-3">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 07 // OPEN CONNECTION
        </span>
        <h1 className="text-xl md:text-2xl font-extrabold text-[#E6E8EA] tracking-wider uppercase">
          TRANSMIT SIGNAL
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Terminal Connection Form (takes 7 cols on lg) */}
        <div className="lg:col-span-7 bg-[#0D1013] border border-zinc-800/85 rounded-lg overflow-hidden flex flex-col">
          {/* Window Header */}
          <div className="bg-[#101317] border-b border-zinc-800/80 px-4 py-2 flex justify-between items-center text-[10px] text-[#8D969D]">
            <span className="flex items-center gap-2">
              <Terminal size={12} className="text-[#00D9FF]" />
              TEJA_BROADCAST_TERMINAL.EXE
            </span>
            <span>PORT: 8080 // SECURE</span>
          </div>

          <div className="p-4 md:p-5 flex flex-col gap-4">
            {status !== 'SUCCESS' ? (
              <form onSubmit={executeTransmission} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Name Input */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label htmlFor="name-input" className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold">
                      SENDER NAME
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="ENTER NAME..."
                      className="bg-[#080A0C] border border-zinc-800 rounded p-2.5 text-xs text-[#E6E8EA] placeholder-zinc-700 focus:outline-none focus:border-[#00D9FF] transition-all select-text"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label htmlFor="email-input" className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold">
                      SENDER EMAIL
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ENTER EMAIL..."
                      className="bg-[#080A0C] border border-zinc-800 rounded p-2.5 text-xs text-[#E6E8EA] placeholder-zinc-700 focus:outline-none focus:border-[#00D9FF] transition-all select-text"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message-input" className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold">
                    SIGNAL PAYLOAD MESSAGE
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="ENTER SIGNAL MESSAGE..."
                    className="bg-[#080A0C] border border-zinc-800 rounded p-2.5 text-xs text-[#E6E8EA] placeholder-zinc-700 focus:outline-none focus:border-[#00D9FF] transition-all resize-none select-text"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'SENDING'}
                  className={`w-full py-3 bg-[#080A0C] hover:bg-[#0D1013] border border-zinc-800 rounded hover:border-[#00D9FF] transition-all cursor-pointer font-bold text-xs text-[#E6E8EA] hover:text-[#00D9FF] flex items-center justify-center gap-2 ${
                    status === 'SENDING' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send size={12} />
                  <span>
                    {status === 'SENDING' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                  </span>
                </button>
              </form>
            ) : (
              // Success terminal result
              <div className="flex flex-col items-center justify-center py-6 text-center gap-4 animate-fade-in select-text">
                <CheckCircle2 size={48} className="text-[#00D9FF] animate-bounce" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-extrabold text-[#E6E8EA]">
                    TRANSMISSION RECEIVED.
                  </h2>
                  <span className="text-xs text-[#00D9FF] font-bold">
                    BROADCAST STATUS: DELIVERED
                  </span>
                </div>
                <p className="text-xs text-[#8D969D] max-w-sm font-sans">
                  Your message packet has been routed successfully. Teja will respond shortly.
                </p>
                <button
                  onClick={() => setStatus('IDLE')}
                  className="mt-2 px-4 py-2 bg-[#080A0C] border border-zinc-800 hover:border-zinc-700 rounded text-[10px] text-[#8D969D] hover:text-[#E6E8EA] cursor-pointer"
                >
                  OPEN NEW CONNECTION
                </button>
              </div>
            )}

            {/* Terminal logs block */}
            {logs.length > 0 && (
              <div className="bg-[#080A0C] border border-zinc-900 rounded p-3 text-[10px] text-zinc-550 font-mono flex flex-col gap-1 max-h-32 overflow-y-auto">
                {logs.map((log, idx) => (
                  <div key={idx} className={log.startsWith('[OK]') ? 'text-[#00D9FF]' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Directory Links (takes 5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4 font-bold select-none">
          <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase">
            EXTERNAL ROUTE NETWORKS
          </span>

          <div className="flex flex-col gap-3">
            {/* Github */}
            <a
              href={gitProps.href}
              target={gitProps.href ? "_blank" : undefined}
              rel={gitProps.href ? "noopener noreferrer" : undefined}
              onClick={gitProps.onClick}
              className={gitProps.className}
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-[18px] h-[18px]" />
                <div className="flex flex-col">
                  <span className="text-xs">GITHUB</span>
                  <span className="text-[9px] text-[#8D969D] font-normal uppercase">
                    {siteConfig.github ? 'github.com/Kondatejagoud' : 'UNCONFIGURED'}
                  </span>
                </div>
              </div>
              <span className={`text-[9px] ${siteConfig.github ? 'group-hover:text-[#00D9FF]' : 'text-red-500/60'}`}>
                {gitProps.label}
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href={liProps.href}
              target={liProps.href ? "_blank" : undefined}
              rel={liProps.href ? "noopener noreferrer" : undefined}
              onClick={liProps.onClick}
              className={liProps.className}
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-[18px] h-[18px]" />
                <div className="flex flex-col">
                  <span className="text-xs">LINKEDIN</span>
                  <span className="text-[9px] text-[#8D969D] font-normal uppercase">
                    {siteConfig.linkedin ? 'linkedin.com/in/teja' : 'UNCONFIGURED'}
                  </span>
                </div>
              </div>
              <span className={`text-[9px] ${siteConfig.linkedin ? 'group-hover:text-[#00D9FF]' : 'text-red-500/60'}`}>
                {liProps.label}
              </span>
            </a>

            {/* Resume Download */}
            <a
              href={resProps.href}
              target={resProps.href ? "_blank" : undefined}
              rel={resProps.href ? "noopener noreferrer" : undefined}
              onClick={siteConfig.resume ? resProps.onClick : (e) => {
                e.preventDefault();
                alert('RESUME SOURCE LINK NOT CONFIGURED IN DATA/SITE.TS.');
              }}
              className={resProps.className}
            >
              <div className="flex items-center gap-3">
                <FileDown size={18} />
                <div className="flex flex-col">
                  <span className="text-xs">DOWNLOAD RESUME</span>
                  <span className="text-[9px] text-[#8D969D] font-normal uppercase">
                    {siteConfig.resume ? 'PDF DOCUMENT' : 'UNCONFIGURED'}
                  </span>
                </div>
              </div>
              <span className={`text-[9px] ${siteConfig.resume ? 'group-hover:text-[#00D9FF]' : 'text-red-500/60'}`}>
                {resProps.sublabel}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
