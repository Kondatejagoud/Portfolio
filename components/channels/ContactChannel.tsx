'use client';

import React, { useState } from 'react';
import { Send, FileDown, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
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
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
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

    try {
      const logSteps = [
        "INITIALIZING SECURE LOGICAL ROUTER...",
        "COMPILING SENDER DATA PACKET STRUCTURE...",
        "OPENING CLIENT-SIDE MAIL INTEGRATOR...",
      ];

      // Simulate step-by-step logs for telemetry aesthetic
      for (let i = 0; i < logSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setLogs(prev => [...prev, `[LOG] ${logSteps[i]}`]);
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      // Build genuine mailto trigger link
      const mailtoUrl = `mailto:${siteConfig.email}?subject=TEJA NETWORK Transmission from ${encodeURIComponent(
        formData.name
      )}&body=Sender Email: ${encodeURIComponent(formData.email)}%0A%0AMessage:%0A${encodeURIComponent(
        formData.message
      )}`;

      // Open mail client
      window.location.href = mailtoUrl;

      setLogs(prev => [...prev, "[OK] TRANSMISSION COMPLETED. MAIL CLIENT DELEGATION SECURED."]);
      setStatus('SUCCESS');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setLogs(prev => [...prev, "[ERR] ROUTING INTEGRITY FAILED. EXITED WITH ERROR."]);
      setStatus('ERROR');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 font-mono select-text selection:bg-[#00D9FF] selection:text-black">
      
      {/* Channel Header */}
      <div className="border-b border-zinc-800/80 pb-3 select-none">
        <span className="text-[10px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 06 // OPEN CONNECTION
        </span>
        <h1 className="text-xl md:text-2xl font-extrabold text-[#E6E8EA] tracking-wider uppercase">
          TRANSMIT SIGNAL
        </h1>
        <p className="text-[11px] text-[#8D969D] font-sans leading-relaxed mt-1 max-w-lg select-text">
          Have a project, opportunity, idea, or question? Open a connection and send a transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Terminal Connection Form (Left Column, 7 cols on lg) */}
        <div className="lg:col-span-7 bg-[#0D1013] border border-zinc-800/85 rounded-lg overflow-hidden flex flex-col">
          {/* Window Header - Sanitized title */}
          <div className="bg-[#101317] border-b border-zinc-800/80 px-4 py-2 flex justify-between items-center text-[10px] text-[#8D969D] select-none">
            <span className="flex items-center gap-2">
              <Terminal size={12} className="text-[#00D9FF]" />
              TRANSMISSION INTERFACE
            </span>
            <span className="text-cyan-400 font-bold">OPEN CONNECTION // SECURE CHANNEL</span>
          </div>

          <div className="p-4 md:p-5 flex flex-col gap-4">
            
            {/* Short Personal Prompt */}
            <div className="text-xs text-zinc-300 font-sans leading-relaxed select-text border-b border-zinc-900 pb-3">
              <span className="block font-mono text-[10px] font-bold text-[#00D9FF] uppercase tracking-wider mb-1">
                Open a connection.
              </span>
              I&apos;m interested in building useful software, learning from difficult problems, and connecting with people working on interesting ideas.
            </div>

            {status !== 'SUCCESS' && status !== 'ERROR' ? (
              <form onSubmit={executeTransmission} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Name Input */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label htmlFor="name-input" className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold select-none">
                      SENDER NAME
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="ENTER YOUR NAME..."
                      className="bg-[#080A0C] border border-zinc-800 rounded p-2.5 text-xs text-[#E6E8EA] placeholder-zinc-700 focus:outline-none focus:border-[#00D9FF] transition-all select-text"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label htmlFor="email-input" className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold select-none">
                      SENDER EMAIL
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ENTER YOUR EMAIL..."
                      className="bg-[#080A0C] border border-zinc-800 rounded p-2.5 text-xs text-[#E6E8EA] placeholder-zinc-700 focus:outline-none focus:border-[#00D9FF] transition-all select-text"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message-input" className="text-[9px] text-[#8D969D] uppercase tracking-wider font-bold select-none">
                    SIGNAL PAYLOAD MESSAGE
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="WRITE YOUR MESSAGE..."
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
            ) : status === 'SUCCESS' ? (
              /* Success Telemetry Feedback */
              <div className="flex flex-col items-center justify-center py-6 text-center gap-4 animate-fade-in select-text">
                <CheckCircle2 size={40} className="text-[#00D9FF] animate-bounce" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-extrabold text-[#E6E8EA]">
                    TRANSMISSION ROUTED.
                  </h2>
                  <span className="text-xs text-[#00D9FF] font-bold">
                    STATUS: DELEGATED TO MAIL CLIENT
                  </span>
                </div>
                <p className="text-xs text-[#8D969D] max-w-sm font-sans">
                  Your local email client has been triggered to send this transmission. Direct email: <strong className="text-zinc-300 font-mono select-all font-bold">{siteConfig.email}</strong>
                </p>
                <button
                  onClick={() => setStatus('IDLE')}
                  className="mt-2 px-4 py-2 bg-[#080A0C] border border-zinc-800 hover:border-zinc-700 rounded text-[10px] text-[#8D969D] hover:text-[#E6E8EA] cursor-pointer"
                >
                  OPEN NEW CONNECTION
                </button>
              </div>
            ) : (
              /* Error telemetry message */
              <div className="flex flex-col items-center justify-center py-6 text-center gap-4 animate-fade-in select-text">
                <AlertCircle size={40} className="text-red-500 animate-pulse" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-extrabold text-[#E6E8EA] uppercase">
                    TRANSMISSION FAILED.
                  </h2>
                  <span className="text-xs text-red-500 font-bold">
                    STATUS: DISPATCH ERROR
                  </span>
                </div>
                <p className="text-xs text-[#8D969D] max-w-sm font-sans">
                  Unable to establish connection. Please transmit directly via your local mail system to: <strong className="text-zinc-300 font-mono select-all font-bold">{siteConfig.email}</strong>
                </p>
                <button
                  onClick={() => setStatus('IDLE')}
                  className="mt-2 px-4 py-2 bg-[#080A0C] border border-zinc-800 hover:border-zinc-700 rounded text-[10px] text-[#8D969D] hover:text-[#E6E8EA] cursor-pointer"
                >
                  RETRY CONNECTION
                </button>
              </div>
            )}

            {/* Terminal logs block */}
            {logs.length > 0 && (
              <div className="bg-[#080A0C] border border-zinc-900 rounded p-3 text-[10px] text-zinc-550 font-mono flex flex-col gap-1 max-h-32 overflow-y-auto select-text">
                {logs.map((log, idx) => (
                  <div key={idx} className={log.startsWith('[OK]') ? 'text-[#00D9FF]' : log.startsWith('[ERR]') ? 'text-red-500' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Directory Links & Status Board (Right Column, 5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Direct Connections List */}
          <div className="flex flex-col gap-3.5">
            <span className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold select-none">
              DIRECT CONNECTIONS
            </span>

            <div className="flex flex-col gap-3">
              {/* GitHub Link */}
              {siteConfig.github ? (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#0D1013] border border-zinc-800 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] rounded-lg transition-all text-xs font-mono uppercase font-bold group cursor-pointer"
                  aria-label="Open Konda Teja's GitHub profile in a new tab"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-[18px] h-[18px]" />
                    <div className="flex flex-col">
                      <span className="text-xs">GITHUB</span>
                      <span className="text-[9px] text-[#8D969D] font-normal uppercase">
                        github.com/Kondatejagoud
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] group-hover:text-[#00D9FF]">
                    VIEW SOURCE
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between p-4 bg-[#0D1013] border border-zinc-900/60 text-[#8D969D]/40 opacity-60 rounded-lg text-xs font-mono uppercase font-bold">
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-[18px] h-[18px]" />
                    <span>GITHUB</span>
                  </div>
                  <span className="text-[9px]">NOT CONFIGURED</span>
                </div>
              )}

              {/* LinkedIn Link */}
              {siteConfig.linkedin ? (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#0D1013] border border-zinc-800 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] rounded-lg transition-all text-xs font-mono uppercase font-bold group cursor-pointer"
                  aria-label="Open Konda Teja's LinkedIn profile in a new tab"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-[18px] h-[18px]" />
                    <div className="flex flex-col">
                      <span className="text-xs">LINKEDIN</span>
                      <span className="text-[9px] text-[#8D969D] font-normal uppercase">
                        linkedin.com/in/konda-teja
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] group-hover:text-[#00D9FF]">
                    CONNECT
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between p-4 bg-[#0D1013] border border-zinc-900/60 text-[#8D969D]/40 opacity-60 rounded-lg text-xs font-mono uppercase font-bold">
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-[18px] h-[18px]" />
                    <div className="flex flex-col">
                      <span>LINKEDIN</span>
                      <span className="text-[9.5px] text-[#8D969D]/30 font-normal lowercase">
                        {"// not configured"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px]">NOT CONFIGURED</span>
                </div>
              )}

              {/* Direct Email Link */}
              {siteConfig.email ? (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-between p-4 bg-[#0D1013] border border-zinc-800 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] rounded-lg transition-all text-xs font-mono uppercase font-bold group cursor-pointer"
                  aria-label="Open email client to message Konda Teja"
                >
                  <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-[#8D969D] group-hover:text-[#00D9FF]" />
                    <div className="flex flex-col">
                      <span className="text-xs">EMAIL Channel</span>
                      <span className="text-[9px] text-[#8D969D] font-normal uppercase">
                        {siteConfig.email}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] group-hover:text-[#00D9FF]">
                    SEND EMAIL
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between p-4 bg-[#0D1013] border border-zinc-900/60 text-[#8D969D]/40 opacity-60 rounded-lg text-xs font-mono uppercase font-bold">
                  <div className="flex items-center gap-3">
                    <Terminal size={18} />
                    <span>EMAIL</span>
                  </div>
                  <span className="text-[9px]">NOT CONFIGURED</span>
                </div>
              )}

              {/* Resume Link - Hides if unconfigured, as requested */}
              {siteConfig.resume && (
                <a
                  href={siteConfig.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#0D1013] border border-zinc-800 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] rounded-lg transition-all text-xs font-mono uppercase font-bold group cursor-pointer"
                  aria-label="View Konda Teja's resume in a new tab"
                >
                  <div className="flex items-center gap-3">
                    <FileDown size={18} />
                    <div className="flex flex-col">
                      <span className="text-xs">RESUME</span>
                      <span className="text-[9px] text-[#8D969D] font-normal uppercase">
                        PDF DOCUMENT
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] group-hover:text-[#00D9FF]">
                    VIEW RESUME
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Connection Status Board */}
          <div className="flex flex-col gap-3.5 select-none">
            <span className="text-[10px] text-[#8D969D] tracking-wider uppercase font-bold">
              CONNECTION STATUS
            </span>
            <div className="bg-[#0D1013] border border-zinc-900 p-4 rounded-lg flex flex-col gap-2.5 text-xs text-zinc-300">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span>EMAIL CHANNEL</span>
                <span className={siteConfig.email ? 'text-green-400' : 'text-zinc-650'}>
                  {siteConfig.email ? '● AVAILABLE' : '● OFFLINE'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span>GITHUB NET</span>
                <span className={siteConfig.github ? 'text-cyan-400 font-bold' : 'text-zinc-650'}>
                  {siteConfig.github ? '● ONLINE' : '● OFFLINE'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>LINKEDIN INDEX</span>
                <span className={siteConfig.linkedin ? 'text-cyan-400 font-bold' : 'text-zinc-650'}>
                  {siteConfig.linkedin ? '● ONLINE' : '● NOT CONFIGURED'}
                </span>
              </div>
              {siteConfig.resume && (
                <div className="flex justify-between items-center border-t border-zinc-900 pt-2">
                  <span>RESUME SHEET</span>
                  <span className="text-green-400">● AVAILABLE</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
