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
          <div className="relative h-[280px] flex flex-col items-center justify-center border-b border-border/50 overflow-hidden bg-black">
            {/* Kaaba Silhouette */}
            <div className="absolute left-16 bottom-0 opacity-10 pointer-events-none grayscale brightness-150">
               <img src="https://quranmazid.com/assets/images/header_bg.png" alt="" className="h-44 object-contain" />
            </div>

            <div className="z-10 text-center animate-fade-in space-y-4">
              <h1 className="text-5xl font-black mb-2 tracking-tight text-foreground/90">{surah?.transliteration}</h1>
              <div className="flex items-center justify-center gap-4 text-muted/60 text-[11px] font-black tracking-[0.2em]">
                <span className="uppercase">Ayah - {surah?.total_verses}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                <span className="uppercase">{surah?.type}</span>
              </div>
            </div>
          </div>

          {/* Bismillah */}
          {surahId !== 9 && (
            <div className="flex justify-center py-20 border-b border-border/30">
               <div className="text-5xl arabic-font text-foreground/80 opacity-90 hover:opacity-100 transition-opacity cursor-default">
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

