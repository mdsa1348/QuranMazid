import React from 'react';
import { getSurahAyahs, getSurahs } from '@/lib/quran';
import AyahCard from '@/components/AyahCard';
import SurahList from '@/components/SurahList';

export async function generateStaticParams() {
  const surahs = await getSurahs();
  return surahs.map((surah) => ({
    id: surah.id.toString(),
  }));
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const surahId = parseInt(id);
  const ayahs = await getSurahAyahs(surahId);
  const surahs = await getSurahs();
  const surah = surahs.find(s => s.id === surahId);

  const isMeccan = surah?.type?.toLowerCase() === 'meccan';
  // Use the exact images from the original site for pinpoint accuracy
  const headerImg = isMeccan 
    ? "https://quranmazid.com/assets/images/header_bg.png" 
    : "https://quranmazid.com/assets/images/madinah.png";

  const bismillahSvg = "https://quranmazid.com/_next/static/media/bismillah.2a2f3d14.svg";

  return (
    <>
      <SurahList />
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="mx-auto">
          {/* Surah Header Section */}
          <div className="relative h-[150px] flex items-center px-12 border-b border-border/10 bg-[#0a0a0a] overflow-hidden">
            {/* Left: Revelation Image */}
            <div className="flex-1 flex items-center h-full">
              <div className="opacity-[0.12] grayscale brightness-[2] transform scale-125 origin-left">
                 <img src={headerImg} alt="" className="h-28 object-contain" />
              </div>
            </div>

            {/* Center: Surah Title */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center z-10 w-max">
              <h1 className="text-[26px] font-bold tracking-tight text-white/90">Surah {surah?.transliteration}</h1>
              <div className="flex items-center justify-center gap-2 text-[#b0b0b0] text-[11px] font-bold mt-0.5">
                <span>Ayah-{surah?.total_verses}</span>
                <span className="w-1 h-1 rounded-full bg-[#b0b0b0]/40"></span>
                <span className="capitalize">{surah?.type}</span>
              </div>
            </div>

            {/* Right: Bismillah SVG */}
            <div className="flex-1 flex justify-end items-center z-10">
              {surahId !== 9 && (
                <div className="opacity-60 brightness-200 contrast-125 hover:opacity-90 transition-opacity">
                  <img 
                    src={bismillahSvg} 
                    alt="Bismillah" 
                    className="h-8 md:h-10 object-contain invert"
                    style={{ filter: 'brightness(0) invert(1) opacity(0.8)' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Ayahs List */}
          <div className="flex flex-col">
            {ayahs.map((ayah) => (
              <AyahCard key={`${ayah.surah}-${ayah.verse}`} ayah={ayah} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}




