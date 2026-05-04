'use client';

import React from 'react';
import { Ayah } from '@/lib/types';
import { useSettings } from '@/hooks/useSettings';
import { Play, BookOpen, Bookmark, MoreHorizontal } from 'lucide-react';

interface AyahCardProps {
  ayah: Ayah;
}

const AyahCard = ({ ayah }: AyahCardProps) => {
  const { settings } = useSettings();

  const playAudio = () => {
    const surahStr = ayah.surah.toString().padStart(3, '0');
    const ayahStr = ayah.verse.toString().padStart(3, '0');
    const audioUrl = `https://audio.qurancdn.com/reciters/7/${surahStr}${ayahStr}.mp3`;
    const audio = new Audio(audioUrl);
    audio.play().catch(err => console.error("Audio playback failed:", err));
  };

  return (
    <div className="flex border-b border-border/30 transition-colors hover:bg-white/[0.01] group">
      {/* Left Rail - Action Icons */}
      <div className="w-[60px] py-10 flex flex-col items-center gap-7 border-r border-border/20">
        <span className="text-[#2e7d32] font-bold text-[13px] tracking-tight mb-2">
          {ayah.surah}:{ayah.verse}
        </span>
        <div className="flex flex-col gap-6">
          <AyahAction icon={<Play size={18} />} onClick={playAudio} />
          <AyahAction icon={<BookOpen size={18} />} />
          <AyahAction icon={<Bookmark size={18} />} />
          <AyahAction icon={<MoreHorizontal size={18} />} />
        </div>
      </div>

      {/* Right Content - Arabic & Translation */}
      <div className="flex-1 py-10 px-8 md:px-14 space-y-10">
        <div 
          className="text-right leading-[2.0] text-foreground/90 transition-all" 
          style={{ 
            fontSize: `${settings.arabicFontSize}px`,
            fontFamily: settings.arabicFont 
          }}
        >
          {ayah.text}
          <span className="inline-flex items-center justify-center w-10 h-10 border border-border/50 rounded-full text-xs ml-6 font-bold text-muted/40">
            {ayah.verse}
          </span>
        </div>
        
        <div className="space-y-4">
           <p className="text-[11px] font-bold text-muted/30 uppercase tracking-[0.25em]">
             SAHEEH INTERNATIONAL
           </p>
           <div 
            className="text-foreground/80 leading-[1.8] font-medium max-w-5xl" 
            style={{ fontSize: `${settings.translationFontSize}px` }}
          >
            {ayah.translation}
          </div>
        </div>
      </div>
    </div>
  );
};

const AyahAction = ({ icon, onClick }: { icon: React.ReactNode; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="text-muted/30 hover:text-primary transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
  >
    {icon}
  </button>
);

export default AyahCard;


