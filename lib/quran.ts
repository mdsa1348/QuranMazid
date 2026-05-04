import { Surah, Ayah } from './types';

const API_BASE = 'https://api.quran.com/api/v4';

export async function getSurahs(): Promise<Surah[]> {
  const res = await fetch(`${API_BASE}/chapters?language=en`);
  const data = await res.json();
  
  return data.chapters.map((c: any) => ({
    id: c.id,
    name: c.name_arabic,
    transliteration: c.name_simple,
    translation: c.translated_name.name,
    type: c.revelation_place,
    total_verses: c.verses_count,
  }));
}

export async function getSurahAyahs(surahId: number): Promise<Ayah[]> {
  const [araRes, engRes] = await Promise.all([
    fetch(`${API_BASE}/quran/verses/uthmani?chapter_number=${surahId}`),
    fetch(`${API_BASE}/quran/translations/20?chapter_number=${surahId}`)
  ]);

  const araData = await araRes.json();
  const engData = await engRes.json();

  const araVerses = araData?.verses || [];
  const engTranslations = engData?.translations || [];

  return araVerses.map((v: any, index: number) => {
    const translation = engTranslations[index]?.text || '';
    return {
      id: index + 1,
      surah: surahId,
      verse: v.verse_key?.split(':')[1] || (index + 1).toString(),
      text: v.text_uthmani || '',
      translation: translation.replace(/<[^>]*>?/gm, '') // Remove HTML tags
    };
  });
}

export async function searchAyahs(query: string): Promise<Ayah[]> {
  const res = await fetch(`${API_BASE}/search?q=${query}&size=20&page=1`);
  const data = await res.json();
  
  return (data?.search?.results || []).map((r: any) => ({
    id: r.verse_id,
    surah: parseInt(r.verse_key.split(':')[0]),
    verse: r.verse_key.split(':')[1],
    text: r.text, // This is usually snippets with <em> tags
    translation: r.translations?.[0]?.text?.replace(/<[^>]*>?/gm, '') || ''
  }));
}

export async function getJuzs() {
  const res = await fetch(`${API_BASE}/juzs`);
  const data = await res.json();
  return data.juzs;
}
