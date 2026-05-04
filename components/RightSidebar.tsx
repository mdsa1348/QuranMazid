'use client';

import React from 'react';
import { useSettings } from '@/hooks/useSettings';
import { ChevronDown, ChevronUp, Type, BookOpen, Settings as SettingsIcon } from 'lucide-react';

const RightSidebar = () => {
  const { settings, updateSettings } = useSettings();
  const [openSection, setOpenSection] = React.useState<string | null>('font');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="hidden xl:flex w-[330px] bg-[#0b0b0b] border-l border-border/40 flex-col overflow-y-auto custom-scrollbar shrink-0 p-6 gap-6">
      <div className="flex bg-white/[0.03] rounded-2xl p-1 border border-white/5">
         <button className="flex-1 py-3 rounded-xl text-[13px] font-bold bg-[#2e7d32] text-white shadow-lg shadow-primary/20">Translation</button>
         <button className="flex-1 py-3 rounded-xl text-[13px] font-bold text-muted/40 hover:text-foreground transition-all">Reading</button>
      </div>

      <div className="space-y-4">
        {/* Reading Settings */}
        <div className="rounded-2xl overflow-hidden bg-white/[0.02]">
          <button 
            onClick={() => toggleSection('reading')}
            className="w-full flex items-center justify-between p-5 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-4 text-[15px] font-bold">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted/40">
                <BookOpen size={18} />
              </div>
              <span className="text-muted/80">Reading Settings</span>
            </div>
            {openSection === 'reading' ? <ChevronUp size={18} className="text-muted/20" /> : <ChevronDown size={18} className="text-muted/20" />}
          </button>
        </div>

        {/* Font Settings */}
        <div className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5">
          <button 
            onClick={() => toggleSection('font')}
            className="w-full flex items-center justify-between p-5 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-4 text-[15px] font-bold">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${openSection === 'font' ? 'bg-[#2e7d32] text-white' : 'bg-white/5 text-muted/40'}`}>
                <Type size={18} />
              </div>
              <span className={openSection === 'font' ? 'text-[#2e7d32]' : 'text-muted/80'}>Font Settings</span>
            </div>
            {openSection === 'font' ? <ChevronUp size={18} className="text-[#2e7d32]/50" /> : <ChevronDown size={18} className="text-muted/20" />}
          </button>
          
          {openSection === 'font' && (
            <div className="px-5 pb-7 space-y-8 animate-fade-in">
              {/* Arabic Font Size */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[15px] font-bold text-muted/80">Arabic Font Size</span>
                  <span className="text-[15px] font-bold text-[#2e7d32]">{settings.arabicFontSize}</span>
                </div>
                <div className="relative group">
                  <input 
                    type="range" 
                    min="20" 
                    max="60" 
                    value={settings.arabicFontSize} 
                    onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                    style={{
                      background: `linear-gradient(to right, #2e7d32 0%, #2e7d32 ${((settings.arabicFontSize - 20) / 40) * 100}%, rgba(255,255,255,0.1) ${((settings.arabicFontSize - 20) / 40) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                    className="w-full cursor-pointer h-[5px] rounded-lg appearance-none transition-all"
                  />
                </div>
              </div>

              {/* Translation Font Size */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[15px] font-bold text-muted/80">Translation Font Size</span>
                  <span className="text-[15px] font-bold text-[#2e7d32]">{settings.translationFontSize}</span>
                </div>
                <div className="relative">
                  <input 
                    type="range" 
                    min="14" 
                    max="30" 
                    value={settings.translationFontSize} 
                    onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                    style={{
                      background: `linear-gradient(to right, #2e7d32 0%, #2e7d32 ${((settings.translationFontSize - 14) / 16) * 100}%, rgba(255,255,255,0.1) ${((settings.translationFontSize - 14) / 16) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                    className="w-full cursor-pointer h-[5px] rounded-lg appearance-none transition-all"
                  />
                </div>
              </div>

              {/* Arabic Font Face */}
              <div>
                <label className="text-[15px] font-bold text-muted/80 mb-5 block">Arabic Font Face</label>
                <div className="relative group">
                  <select 
                    value={settings.arabicFont}
                    onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-[15px] font-bold outline-none group-hover:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                  >
                    <option value="'Scheherazade New', serif">Scheherazade New</option>
                    <option value="'Amiri Quran', serif">Amiri Quran</option>
                    <option value="KFQG">KFQG</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted/30 pointer-events-none group-hover:text-muted/50 transition-all" size={18} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto bg-[#2e7d32]/[0.05] border border-[#2e7d32]/10 rounded-[32px] p-7 space-y-5">
        <h3 className="text-[16px] font-black text-foreground/90 leading-tight">Help spread the knowledge of Islam</h3>
        <p className="text-[13px] text-muted/40 font-medium leading-relaxed">
          Your support helps us reach our brothers and sisters with the message of Islam.
        </p>
        <button className="w-full bg-[#2e7d32] text-white py-4 rounded-2xl text-[13px] font-black hover:opacity-90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest">
          Support Us
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;


