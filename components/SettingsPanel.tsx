'use client';

import React from 'react';
import { useSettings } from '@/hooks/useSettings';
import { X } from 'lucide-react';

const SettingsPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { settings, updateSettings } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[320px] bg-sidebar border-l border-border z-50 shadow-2xl flex flex-col">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-bold">Settings</h2>
        <button onClick={onClose} className="text-muted hover:text-foreground">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
        <div>
          <label className="text-sm font-medium text-muted mb-4 block uppercase tracking-wider">Arabic Font</label>
          <select 
            value={settings.arabicFont}
            onChange={(e) => updateSettings({ arabicFont: e.target.value })}
            className="w-full bg-card border border-border rounded-lg p-2 text-sm outline-none focus:border-primary"
          >
            <option value="Amiri Quran">Amiri Quran</option>
            <option value="Scheherazade New">Scheherazade New</option>
            <option value="'KFGQPC Uthman Taha Naskh', serif">KFGQPC Uthman</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-medium text-muted uppercase tracking-wider">Arabic Font Size</label>
            <span className="text-xs text-primary font-bold">{settings.arabicFontSize}px</span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="60" 
            value={settings.arabicFontSize}
            onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
            className="w-full accent-primary h-1 bg-border rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-medium text-muted uppercase tracking-wider">Translation Font Size</label>
            <span className="text-xs text-primary font-bold">{settings.translationFontSize}px</span>
          </div>
          <input 
            type="range" 
            min="12" 
            max="30" 
            value={settings.translationFontSize}
            onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
            className="w-full accent-primary h-1 bg-border rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted mb-4 block uppercase tracking-wider">Theme</label>
          <div className="grid grid-cols-2 gap-2">
            {['light', 'dark', 'sepia', 'system'].map((t) => (
              <button
                key={t}
                onClick={() => updateSettings({ theme: t as any })}
                className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                  settings.theme === t ? 'bg-primary/10 border-primary/50 text-primary' : 'bg-card border-border text-muted/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
