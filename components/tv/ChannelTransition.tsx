'use client';

import React, { useEffect, useRef } from 'react';

interface ChannelTransitionProps {
  isTransitioning: boolean;
  onTransitionEnd?: () => void;
}

export default function ChannelTransition({
  isTransitioning,
  onTransitionEnd,
}: ChannelTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isTransitioning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Set resolution for noise (lower resolution makes it look chunkier and more retro)
    canvas.width = 160;
    canvas.height = 120;

    const renderNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      const length = data.length;

      for (let i = 0; i < length; i += 4) {
        // Random greyscale value
        const rand = Math.floor(Math.random() * 255);
        
        // Add subtle chromatic tint (hint of cyan)
        const isCyanTint = Math.random() > 0.9;
        
        data[i] = isCyanTint ? 0 : rand;       // Red
        data[i + 1] = rand;                    // Green
        data[i + 2] = isCyanTint ? 255 : rand; // Blue
        data[i + 3] = 255;                     // Alpha
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(renderNoise);
    };

    renderNoise();

    // Play a short static burst
    const timer = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      if (onTransitionEnd) {
        onTransitionEnd();
      }
    }, 200); // 200ms burst

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [isTransitioning, onTransitionEnd]);

  if (!isTransitioning) return null;

  return (
    <div className="absolute inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover opacity-80 mix-blend-screen"
      />
      <div className="absolute inset-0 bg-[#0A0A0A]/40 crt-static" />
    </div>
  );
}
