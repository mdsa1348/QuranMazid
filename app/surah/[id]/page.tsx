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

  return (
    <>
      <SurahList />
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="mx-auto">
          {/* Surah Header Section */}
          <div className="relative h-[250px] flex flex-col items-center justify-center border-b border-border/20 overflow-hidden bg-black">
            {/* Kaaba Silhouette */}
            <div className="absolute left-12 bottom-0 opacity-[0.07] pointer-events-none grayscale brightness-150 scale-110 origin-bottom-left">
               <img src="https://quranmazid.com/assets/images/header_bg.png" alt="" className="h-48 object-contain" />
            </div>

            <div className="z-10 text-center animate-fade-in space-y-3">
              <h1 className="text-[32px] font-black tracking-tight text-white/90">Surah {surah?.transliteration}</h1>
              <div className="flex items-center justify-center gap-2.5 text-[#b0b0b0] text-[12px] font-bold">
                <span className="capitalize">Ayah-{surah?.total_verses}</span>
                <span className="w-1 h-1 rounded-full bg-[#b0b0b0]/40"></span>
                <span className="capitalize">{surah?.type}</span>
              </div>
            </div>
          </div>

          {/* Bismillah */}
          {surahId !== 9 && (
            <div className="flex justify-center py-20 border-b border-border/10">
               <div className="text-5xl arabic-font text-white/80 opacity-90 transition-opacity">
                 بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
               </div>
            </div>
          )}


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


