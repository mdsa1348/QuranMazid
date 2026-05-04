import React from 'react';
import { getSurahAyahs, getSurahs } from '@/lib/quran';
import SurahPageClient from '@/components/SurahPageClient';

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
    <SurahPageClient 
      surah={surah} 
      surahId={surahId} 
      ayahs={ayahs.map(a => ({ ...a, surah_name: surah?.transliteration }))} 
    />
  );
}
