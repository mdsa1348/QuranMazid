'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, SunDim, Circle, Check } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { Settings } from '@/lib/types';

const ThemeDropdown = () => {
  const { settings, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { id: Settings['theme']; label: string; icon: React.ReactNode }[] = [
    { id: 'light', label: 'Light', icon: <Sun size={17} /> },
    { id: 'dark', label: 'Dark', icon: <Moon size={17} /> },
    { id: 'sepia', label: 'Sepia', icon: <SunDim size={17} /> },
    { id: 'system', label: 'System', icon: <Circle size={17} className="rotate-180" /> },
  ];

  const currentThemeIcon = themes.find(t => t.id === settings.theme)?.icon || <Moon size={17} />;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 flex items-center justify-center text-muted/60 hover:text-primary hover:bg-primary/5 rounded-full transition-all border border-border/30 bg-card/50"
      >
        {currentThemeIcon}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-[#1a1a1a] border border-white/10 rounded-[20px] shadow-2xl overflow-hidden z-[100] animate-fade-in py-2 backdrop-blur-2xl">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                updateSettings({ theme: theme.id });
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 text-[14px] font-bold transition-all hover:bg-white/5 ${
                settings.theme === theme.id ? 'bg-white/5 text-foreground' : 'text-muted/60 hover:text-foreground'
              }`}
            >
              <div className={`${settings.theme === theme.id ? 'text-primary' : 'text-muted/40'}`}>
                {theme.icon}
              </div>
              <span className="flex-1 text-left">{theme.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
