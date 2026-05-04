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
  const headerImg = isMeccan 
    ? "https://quranmazid.com/assets/images/header_bg.png" 
    : "https://quranmazid.com/assets/images/madinah.png";

  return (
    <>
      <SurahList />
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="mx-auto">
          {/* Surah Header Section */}
          <div className="relative h-[160px] flex items-center px-16 border-b border-border/20 bg-[#0a0a0a] overflow-hidden">
            {/* Left: Revelation Image */}
            <div className="flex-1 flex items-end h-full">
              <div className="opacity-[0.1] grayscale brightness-150 transform scale-125 origin-bottom-left -mb-2">
                 <img src={headerImg} alt="" className="h-32 object-contain" />
              </div>
            </div>

            {/* Center: Surah Title */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center z-10">
              <h1 className="text-[28px] font-bold tracking-tight text-white/90">Surah {surah?.transliteration}</h1>
              <div className="flex items-center justify-center gap-2.5 text-[#b0b0b0] text-[11px] font-bold mt-1">
                <span className="capitalize">Ayah-{surah?.total_verses}</span>
                <span className="w-1 h-1 rounded-full bg-[#b0b0b0]/40"></span>
                <span className="capitalize">{surah?.type}</span>
              </div>
            </div>

            {/* Right: Bismillah (if not Surah 1 or 9) */}
            <div className="flex-1 flex justify-end items-center z-10">
              {surahId !== 1 && surahId !== 9 && (
                <div className="text-[24px] arabic-font text-white/50 opacity-90 leading-none">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
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



