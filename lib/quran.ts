import { Surah, Ayah } from './types';

const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions';

export async function getSurahs(): Promise<Surah[]> {
  const res = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/chapters.json');
  const data = await res.json();
  return data.chapters;
}

export async function getSurahAyahs(surahId: number): Promise<Ayah[]> {
  // We need to fetch both Arabic text and English translation
  // The API structure for ayahs is: editions/{edition}/{surah}/{verse}.json
  // Or editions/{edition}/{surah}.json for the whole surah
  
  const [araRes, engRes] = await Promise.all([
    fetch(`${BASE_URL}/ara-quranmanual/${surahId}.json`),
    fetch(`${BASE_URL}/eng-translation/${surahId}.json`)
  ]);

  const araData = await araRes.json();
  const engData = await engRes.json();

  return araData.verses.map((v: any, index: number) => ({
    id: index + 1,
    surah: surahId,
    verse: v.verse,
    text: v.text,
    translation: engData.verses[index].text
  }));
}

export async function searchAyahs(query: string): Promise<Ayah[]> {
  // This is tricky without a real DB. For a clone, we can fetch all or search a specific file.
  // For now, let's keep it simple or implement it later.
  return [];
}
