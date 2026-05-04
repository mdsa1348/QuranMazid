export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
}

export interface Ayah {
  id: number;
  surah: number;
  verse: number;
  text: string;
  translation: string;
}

export interface Settings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  theme: 'light' | 'dark' | 'sepia';
}
