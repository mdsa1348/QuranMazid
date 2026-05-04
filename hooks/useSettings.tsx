'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Settings } from '@/lib/types';

const defaultSettings: Settings = {
  arabicFont: 'Amiri Quran',
  arabicFontSize: 30,
  translationFontSize: 17,
  theme: 'dark',
};

const SettingsContext = createContext<{
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
} | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quran-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('quran-settings', JSON.stringify(settings));
      // Apply theme
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings, isLoaded]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
