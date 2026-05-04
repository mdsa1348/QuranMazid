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
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
      } catch (e) {
        setSettings(defaultSettings);
      }
    } else {
      setSettings(defaultSettings);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('quran-settings', JSON.stringify(settings));
      
      // Apply theme
      const root = document.documentElement;
      root.classList.remove('light', 'dark', 'sepia');
      
      if (settings.theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(settings.theme);
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
