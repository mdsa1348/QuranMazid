'use client';

import React from 'react';
import { Ayah } from '@/lib/types';
import { useSettings } from '@/hooks/useSettings';
import { useAudio } from '@/hooks/useAudio';
import { Play, Pause, BookOpen, Bookmark, MoreHorizontal } from 'lucide-react';

interface AyahCardProps {
  ayah: Ayah;
}

const AyahCard = ({ ayah }: AyahCardProps) => {
  const { settings } = useSettings();
  const { currentAyah, isPlaying, playAyah } = useAudio();
  
  const isCurrentPlaying = currentAyah?.surah === ayah.surah && currentAyah?.verse === ayah.verse;

  return (
    <div 
      id={`ayah-${ayah.verse}`}
      className={`flex border-b border-border/30 transition-all duration-500 group relative ${
        isCurrentPlaying ? 'bg-primary/[0.03] border-primary/20' : 'hover:bg-white/[0.01]'
      }`}
    >
      {/* Active Indicator Line */}
      {isCurrentPlaying && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary shadow-[0_0_15px_rgba(46,125,50,0.5)] z-10" />
      )}

      {/* Left Rail - Action Icons */}
      <div className="w-[60px] py-10 flex flex-col items-center gap-7 border-r border-border/20">
        <span className={`font-bold text-[13px] tracking-tight mb-2 ${isCurrentPlaying ? 'text-primary' : 'text-muted/40'}`}>
          {ayah.surah}:{ayah.verse}
        </span>
        <div className="flex flex-col gap-6">
          <AyahAction 
            icon={isCurrentPlaying && isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} />} 
            onClick={() => playAyah(ayah)} 
            active={isCurrentPlaying && isPlaying}
          />
          <AyahAction icon={<BookOpen size={18} />} />
          <AyahAction icon={<Bookmark size={18} />} />
          <AyahAction icon={<MoreHorizontal size={18} />} />
        </div>
      </div>

      {/* Right Content - Arabic & Translation */}
      <div className="flex-1 py-10 px-8 md:px-14 space-y-10">
        <div 
          className={`text-right leading-[2.2] transition-all duration-500 ${isCurrentPlaying ? 'text-primary' : 'text-foreground/90'}`}
          style={{ 
            fontSize: `${settings.arabicFontSize}px`,
            fontFamily: settings.arabicFont 
          }}
        >
          {ayah.text}
        </div>
        
        <div className="space-y-4">
           <p className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all ${isCurrentPlaying ? 'text-primary/60' : 'text-muted/30'}`}>
             SAHEEH INTERNATIONAL
           </p>
           <div 
            className={`leading-[1.8] font-medium max-w-5xl transition-all duration-500 ${isCurrentPlaying ? 'text-foreground' : 'text-foreground/80'}`}
            style={{ fontSize: `${settings.translationFontSize}px` }}
          >
            {ayah.translation}
          </div>
        </div>
      </div>
    </div>
  );
};

const AyahAction = ({ icon, onClick, active = false }: { icon: React.ReactNode; onClick?: () => void; active?: boolean }) => (
  <button 
    onClick={onClick}
    className={`transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer ${
      active ? 'text-primary' : 'text-muted/30 hover:text-primary'
    }`}
  >
    {icon}
  </button>
);

export default AyahCard;


