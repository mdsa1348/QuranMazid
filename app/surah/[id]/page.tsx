import React from 'react';
import { getSurahAyahs, getSurahs } from '@/lib/quran';
import AyahCard from '@/components/AyahCard';
import SurahList from '@/components/SurahList';
import SurahHeader from '@/components/SurahHeader';

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
          {/* Surah Header Component (Client Component) */}
          <SurahHeader surah={surah} surahId={surahId} />



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




