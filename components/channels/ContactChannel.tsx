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

      for (let i = 0; i < logSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setLogs(prev => [...prev, `[LOG] ${logSteps[i]}`]);
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      const mailtoUrl = `mailto:${siteConfig.email}?subject=TEJA NETWORK Transmission from ${encodeURIComponent(
        formData.name
      )}&body=Sender Email: ${encodeURIComponent(formData.email)}%0A%0AMessage:%0A${encodeURIComponent(
        formData.message
      )}`;

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
    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-10 font-sans select-text selection:bg-[#00D9FF] selection:text-black">
      
      {/* Channel Header */}
      <div className="border-b border-zinc-900 pb-4 select-none">
        <span className="font-mono text-[9px] text-[#8D969D] uppercase tracking-widest block mb-1">
          CH 06 // OPEN CONNECTION
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-[#E6E8EA] tracking-wide uppercase">
          TRANSMIT SIGNAL
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D9FF] uppercase ml-3">
            {"// OPEN CONNECTION"}
          </span>
        </h1>
        <p className="text-sm text-zinc-400 font-light leading-relaxed mt-2.5 max-w-xl">
          Have a project, opportunity, idea, or question? Open a connection and send a transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Terminal Connection Form (Left Column, 7 cols on lg) */}
        <div className="lg:col-span-7 glass-l2 border border-zinc-900 rounded-xl overflow-hidden flex flex-col">
          {/* Window Header */}
          <div className="bg-[#0D1013]/60 border-b border-zinc-900 px-5 py-3 flex justify-between items-center text-[9px] font-mono text-[#8D969D] select-none">
            <span className="flex items-center gap-2">
              <Terminal size={12} className="text-[#00D9FF]" />
              TRANSMISSION INTERFACE
            </span>
            <span className="text-cyan-400 font-bold uppercase tracking-wider">OPEN CONNECTION // SECURE CHANNEL</span>
          </div>

          <div className="p-5 flex flex-col gap-5">
            
            {/* Short Personal Prompt */}
            <div className="text-xs md:text-sm text-zinc-300 leading-relaxed border-b border-zinc-900 pb-4">
              <span className="block font-mono text-[9px] font-bold text-[#00D9FF] uppercase tracking-wider mb-1">
                Open a connection.
              </span>
              I&apos;m interested in building useful software, learning from difficult problems, and connecting with people working on interesting ideas.
            </div>

            {status !== 'SUCCESS' && status !== 'ERROR' ? (
              <form onSubmit={executeTransmission} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 font-sans">
                  {/* Name Input */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label htmlFor="name-input" className="font-mono text-[9px] text-[#8D969D] uppercase tracking-wider font-extrabold select-none">
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
                      className="bg-[#080A0C]/60 border border-zinc-900 rounded-lg p-3 text-xs text-[#E6E8EA] placeholder-zinc-700 focus:outline-none focus:border-[#00D9FF] transition-all select-text font-light"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label htmlFor="email-input" className="font-mono text-[9px] text-[#8D969D] uppercase tracking-wider font-extrabold select-none">
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
                      className="bg-[#080A0C]/60 border border-zinc-900 rounded-lg p-3 text-xs text-[#E6E8EA] placeholder-zinc-700 focus:outline-none focus:border-[#00D9FF] transition-all select-text font-light"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5 font-sans">
                  <label htmlFor="message-input" className="font-mono text-[9px] text-[#8D969D] uppercase tracking-wider font-extrabold select-none">
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
                    className="bg-[#080A0C]/60 border border-zinc-900 rounded-lg p-3 text-xs text-[#E6E8EA] placeholder-zinc-700 focus:outline-none focus:border-[#00D9FF] transition-all resize-none select-text font-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'SENDING'}
                  className={`w-full py-3.5 bg-[#080A0C] hover:bg-zinc-900 border border-zinc-900 hover:border-[#00D9FF] rounded-lg transition-all cursor-pointer font-bold text-xs text-[#E6E8EA] hover:text-[#00D9FF] flex items-center justify-center gap-2 select-none ${
                    status === 'SENDING' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send size={12} />
                  <span className="font-mono uppercase tracking-wider">
                    {status === 'SENDING' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                  </span>
                </button>
              </form>
            ) : status === 'SUCCESS' ? (
              /* Success Telemetry Feedback */
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4 animate-fade-in select-text">
                <CheckCircle2 size={40} className="text-[#00D9FF] animate-pulse" />
                <div className="flex flex-col gap-1 select-none">
                  <h2 className="text-sm font-extrabold text-[#E6E8EA]">
                    TRANSMISSION ROUTED.
                  </h2>
                  <span className="font-mono text-[9px] text-[#00D9FF] font-bold">
                    STATUS: DELEGATED TO MAIL CLIENT
                  </span>
                </div>
                <p className="text-xs text-[#8D969D] max-w-sm leading-relaxed font-sans font-light">
                  Your local email client has been triggered to send this transmission. Direct email: <strong className="text-zinc-300 font-mono select-all font-bold">{siteConfig.email}</strong>
                </p>
                <button
                  onClick={() => setStatus('IDLE')}
                  className="mt-3 px-5 py-2.5 bg-[#080A0C] border border-zinc-900 hover:border-zinc-800 rounded-md font-mono text-[9px] text-[#8D969D] hover:text-[#E6E8EA] cursor-pointer uppercase font-bold"
                >
                  OPEN NEW CONNECTION
                </button>
              </div>
            ) : (
              /* Error telemetry message */
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4 animate-fade-in select-text">
                <AlertCircle size={40} className="text-red-500 animate-pulse" />
                <div className="flex flex-col gap-1 select-none">
                  <h2 className="text-sm font-extrabold text-[#E6E8EA] uppercase">
                    TRANSMISSION FAILED.
                  </h2>
                  <span className="font-mono text-[9px] text-red-500 font-bold">
                    STATUS: DISPATCH ERROR
                  </span>
                </div>
                <p className="text-xs text-[#8D969D] max-w-sm leading-relaxed font-sans font-light">
                  Unable to establish connection. Please transmit directly via your local mail system to: <strong className="text-zinc-300 font-mono select-all font-bold">{siteConfig.email}</strong>
                </p>
                <button
                  onClick={() => setStatus('IDLE')}
                  className="mt-3 px-5 py-2.5 bg-[#080A0C] border border-zinc-900 hover:border-zinc-800 rounded-md font-mono text-[9px] text-[#8D969D] hover:text-[#E6E8EA] cursor-pointer uppercase font-bold"
                >
                  RETRY CONNECTION
                </button>
              </div>
            )}

            {/* Terminal logs block */}
            {logs.length > 0 && (
              <div className="bg-[#080A0C] border border-zinc-950 rounded-lg p-3.5 text-[9.5px] text-zinc-600 font-mono flex flex-col gap-1 max-h-32 overflow-y-auto select-text border-l-2 border-l-[#00D9FF]">
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
            <span className="font-mono text-[9.5px] text-[#00D9FF] tracking-wider uppercase font-bold select-none">
              DIRECT CONNECTIONS
            </span>

            <div className="flex flex-col gap-3">
              {/* GitHub Link */}
              {siteConfig.github ? (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-900 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] rounded-xl transition-all text-xs font-mono uppercase font-bold group cursor-pointer"
                  aria-label="Open Konda Teja's GitHub profile in a new tab"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-[18px] h-[18px]" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs">GITHUB</span>
                      <span className="text-[9px] text-[#8D969D] font-normal uppercase mt-0.5">
                        github.com/Kondatejagoud
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] group-hover:text-[#00D9FF] font-bold">
                    VIEW SOURCE
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between p-4 bg-zinc-900/20 border border-zinc-950 text-zinc-650 opacity-60 rounded-xl text-xs font-mono uppercase font-bold">
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
                  className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-900 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] rounded-xl transition-all text-xs font-mono uppercase font-bold group cursor-pointer"
                  aria-label="Open Konda Teja's LinkedIn profile in a new tab"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-[18px] h-[18px]" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs">LINKEDIN</span>
                      <span className="text-[9px] text-[#8D969D] font-normal uppercase mt-0.5">
                        linkedin.com/in/kondateja06
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] group-hover:text-[#00D9FF] font-bold">
                    CONNECT
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between p-4 bg-zinc-900/20 border border-zinc-955 text-zinc-650 opacity-60 rounded-xl text-xs font-mono uppercase font-bold">
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-[18px] h-[18px]" />
                    <span>LINKEDIN</span>
                  </div>
                  <span className="text-[9px]">NOT CONFIGURED</span>
                </div>
              )}

              {/* Direct Email Link */}
              {siteConfig.email ? (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-900 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] rounded-xl transition-all text-xs font-mono uppercase font-bold group cursor-pointer"
                  aria-label="Open email client to message Konda Teja"
                >
                  <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-[#8D969D] group-hover:text-[#00D9FF]" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs">EMAIL Channel</span>
                      <span className="text-[9px] text-[#8D969D] font-normal uppercase mt-0.5">
                        {siteConfig.email}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] group-hover:text-[#00D9FF] font-bold">
                    SEND EMAIL
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between p-4 bg-zinc-900/20 border border-zinc-950 text-zinc-650 opacity-60 rounded-xl text-xs font-mono uppercase font-bold">
                  <div className="flex items-center gap-3">
                    <Terminal size={18} />
                    <span>EMAIL</span>
                  </div>
                  <span className="text-[9px]">NOT CONFIGURED</span>
                </div>
              )}

              {/* Resume Link */}
              {siteConfig.resume && (
                <a
                  href={siteConfig.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-900 hover:border-[#00D9FF] text-[#E6E8EA] hover:text-[#00D9FF] rounded-xl transition-all text-xs font-mono uppercase font-bold group cursor-pointer"
                  aria-label="View Konda Teja's resume in a new tab"
                >
                  <div className="flex items-center gap-3">
                    <FileDown size={18} />
                    <div className="flex flex-col text-left">
                      <span className="text-xs">RESUME</span>
                      <span className="text-[9px] text-[#8D969D] font-normal uppercase mt-0.5">
                        PDF DOCUMENT
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] group-hover:text-[#00D9FF] font-bold">
                    VIEW RESUME
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Connection Status Board */}
          <div className="flex flex-col gap-3.5 select-none font-mono">
            <span className="text-[9.5px] text-[#8D969D] tracking-wider uppercase font-bold">
              CONNECTION STATUS
            </span>
            <div className="glass-l2 border border-zinc-900 p-4.5 rounded-xl flex flex-col gap-3 text-xs text-zinc-300">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span>EMAIL CHANNEL</span>
                <span className={siteConfig.email ? 'text-green-400 font-bold' : 'text-zinc-650'}>
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
