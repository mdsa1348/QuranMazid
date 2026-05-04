'use client';

import React from 'react';
import { useAudio } from '@/hooks/useAudio';
import { Play, Pause, SkipBack, SkipForward, X, MoreHorizontal } from 'lucide-react';

const GlobalPlayer = () => {
  const { currentAyah, isPlaying, playAyah, stopAyah, progress, currentTime, duration } = useAudio();

  if (!currentAyah) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] animate-slide-up">
      {/* Progress Bar */}
      <div className="h-1 bg-white/5 w-full relative">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      {/* Main Player Bar */}
      <div className="bg-[#111111]/95 backdrop-blur-xl border-t border-white/5 h-[80px] flex items-center justify-between px-10">
        
        {/* Left: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-bold text-foreground/90 truncate">
              {currentAyah.surah_name || 'Surah'} : {currentAyah.verse}
            </span>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex-[2] flex items-center justify-center gap-8">
          <button className="text-muted/40 hover:text-foreground transition-all">
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button 
            onClick={() => playAyah(currentAyah)}
            className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:scale-110 transition-all active:scale-95"
          >
            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} className="ml-1" fill="currentColor" />}
          </button>

          <button className="text-muted/40 hover:text-foreground transition-all">
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button className="text-muted/40 hover:text-foreground transition-all">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Right: Time & Close */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="flex items-center gap-2 text-[12px] font-bold text-muted/40 tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          <button 
            onClick={stopAyah}
            className="text-muted/30 hover:text-foreground transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalPlayer;
