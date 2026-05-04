'use client';

import React from 'react';
import { useSettings } from '@/hooks/useSettings';
import { ChevronDown, ChevronUp, Type, Settings as SettingsIcon, Globe, Book } from 'lucide-react';

const RightSidebar = () => {
  const { settings, updateSettings } = useSettings();
  const [openSection, setOpenSection] = React.useState<string | null>('font');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="hidden xl:flex w-[350px] bg-sidebar border-l border-border flex-col overflow-y-auto custom-scrollbar shrink-0 p-6 gap-8">
      <div className="flex bg-black/40 rounded-xl p-1 border border-border/50">
         <button className="flex-1 py-2.5 rounded-lg text-xs font-bold bg-primary text-white shadow-lg shadow-primary/20">Translation</button>
         <button className="flex-1 py-2.5 rounded-lg text-xs font-bold text-muted/60 hover:text-foreground transition-all">Reading</button>
      </div>

      <div className="space-y-5">
        {/* Reading Settings */}
        <div className="border border-border/50 rounded-xl overflow-hidden bg-black/20">
          <button 
            onClick={() => toggleSection('reading')}
            className="w-full flex items-center justify-between p-4.5 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3.5 text-[13px] font-bold">
              <SettingsIcon size={18} className={openSection === 'reading' ? 'text-primary' : 'text-muted/60'} />
              <span>Reading Settings</span>
            </div>
            {openSection === 'reading' ? <ChevronUp size={16} className="text-muted/40" /> : <ChevronDown size={16} className="text-muted/40" />}
          </button>
          {openSection === 'reading' && (
            <div className="p-5 bg-black/30 space-y-4 border-t border-border/30 animate-fade-in">
              <p className="text-[11px] text-muted/50 font-medium leading-relaxed italic">Reading mode preferences are automatically synced with your profile.</p>
            </div>
          )}
        </div>

        {/* Font Settings */}
        <div className="border border-border/50 rounded-xl overflow-hidden bg-black/20">
          <button 
            onClick={() => toggleSection('font')}
            className="w-full flex items-center justify-between p-4.5 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3.5 text-[13px] font-bold">
              <Type size={18} className={openSection === 'font' ? 'text-primary' : 'text-muted/60'} />
              <span>Font Settings</span>
            </div>
            {openSection === 'font' ? <ChevronUp size={16} className="text-muted/40" /> : <ChevronDown size={16} className="text-muted/40" />}
          </button>
          {openSection === 'font' && (
            <div className="p-5 bg-black/30 space-y-7 border-t border-border/30 animate-fade-in">
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-4">
                  <span className="text-muted/60">Arabic Font Size</span>
                  <span className="text-primary">{settings.arabicFontSize}</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="60" 
                  value={settings.arabicFontSize} 
                  onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                  className="w-full cursor-pointer h-1 bg-border/30 rounded-lg appearance-none accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-4">
                  <span className="text-muted/60">Translation Font Size</span>
                  <span className="text-primary">{settings.translationFontSize}</span>
                </div>
                <input 
                  type="range" 
                  min="14" 
                  max="30" 
                  value={settings.translationFontSize} 
                  onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                  className="w-full cursor-pointer h-1 bg-border/30 rounded-lg appearance-none accent-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted/60 mb-4 block">Arabic Font Face</label>
                <div className="relative">
                  <select 
                    value={settings.arabicFont}
                    onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                    className="w-full bg-black/40 border border-border/50 rounded-xl p-3.5 text-xs font-bold outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="'Scheherazade New', serif">Scheherazade New</option>
                    <option value="'Amiri Quran', serif">Amiri Quran</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/40 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto bg-primary/10 border border-primary/20 rounded-[2rem] p-7 space-y-5 shadow-inner">
        <h3 className="text-[15px] font-black text-foreground/90 leading-tight">Help spread the knowledge of Islam</h3>
        <p className="text-[11px] text-muted font-medium leading-relaxed opacity-80">
          Your regular support helps us reach our religious brothers and sisters with the message of Islam. Join our mission and be part of the big change.
        </p>
        <button className="w-full bg-primary text-white py-3.5 rounded-xl text-xs font-black hover:opacity-90 transition-all shadow-xl shadow-primary/40 uppercase tracking-wider">
          Support Us
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;

