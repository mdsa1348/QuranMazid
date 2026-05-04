'use client';

import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Surah } from '@/lib/types';

interface SurahHeaderProps {
  surah: Surah | undefined;
  surahId: number;
}

const SurahHeader = ({ surah, surahId }: SurahHeaderProps) => {
  const isMeccan = surah?.type?.toLowerCase() === 'makkah';

  // Exact URLs provided by the user for pinpoint accuracy
  const headerImg = isMeccan 
    ? "https://quranmazid.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmakkah.a06c3e3e.png&w=828&q=75" 
    : "https://quranmazid.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmadinah.d27df76f.png&w=750&q=75";

  const bismillahSvg = "https://quranmazid.com/_next/static/media/bismillah.2a2f3d14.svg";

  return (
    <div className="relative h-[150px] flex items-center px-12 border-b border-border/10 bg-[#0a0a0a] overflow-hidden">
      {/* Left: Revelation Image */}
      <div className="flex-1 flex items-center h-full">
        <div className="opacity-[0.4] transform scale-125 origin-left pointer-events-none">
           <img 
              src={headerImg} 
              alt="" 
              className="h-32 object-contain invert brightness-[300%]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = isMeccan 
                  ? "https://quranmazid.com/assets/images/header_bg.png"
                  : "https://quranmazid.com/assets/images/madina.png";
              }}
           />
        </div>
      </div>

      {/* Center: Surah Title */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center z-10 w-max">
        <div className="flex items-center justify-center gap-4 mb-2">
          <h1 className="text-[28px] font-black tracking-tight text-white/95">Surah {surah?.transliteration}</h1>
        </div>
        <div className="flex items-center justify-center gap-3 text-muted/60 text-[12px] font-bold uppercase tracking-wider">
          <span>Ayah - {surah?.total_verses}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
          <span>{surah?.type}</span>
        </div>
      </div>

      {/* Right: Bismillah SVG */}
      <div className="flex-1 flex justify-end items-center z-10">
        {surahId !== 1 && surahId !== 9 && (
          <div className="opacity-95 brightness-[500%] contrast-[200%] hover:opacity-100 transition-opacity">
            <img 
              src={bismillahSvg} 
              alt="Bismillah" 
              className="h-8 md:h-10 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahHeader;
