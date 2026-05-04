'use client';

import React from 'react';
import { Ayah, Surah } from '@/lib/types';
import AyahCard from '@/components/AyahCard';
import SurahHeader from '@/components/SurahHeader';
import { useAudio } from '@/hooks/useAudio';

interface SurahPageClientProps {
  surah: Surah | undefined;
  surahId: number;
  ayahs: Ayah[];
}

const SurahPageClient = ({ surah, surahId, ayahs }: SurahPageClientProps) => {
  const { setPlaylist } = useAudio();

  React.useEffect(() => {
    setPlaylist(ayahs);
  }, [ayahs, setPlaylist]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
      <div className="max-w-[1000px] mx-auto border-x border-border/10 min-h-screen">
        <SurahHeader surah={surah} surahId={surahId} />

        <div className="flex flex-col bg-card/5">
          {ayahs.map((ayah) => (
            <AyahCard 
              key={`${ayah.surah}-${ayah.verse}`} 
              ayah={ayah} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurahPageClient;
