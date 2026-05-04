'use client';

import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, X } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { getSurahs } from '@/lib/quran';
import { Surah } from '@/lib/types';
import Link from 'next/link';

const Header = () => {
  const { settings, updateSettings } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchResults, setSearchResults] = useState<Surah[]>([]);

  useEffect(() => {
    getSurahs().then(setSurahs);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = surahs.filter(s => 
      s.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toString() === searchQuery
    ).slice(0, 5);
    setSearchResults(filtered);
  }, [searchQuery, surahs]);

  return (
    <header className="h-[80px] border-b border-border bg-sidebar flex items-center justify-between px-10 z-40 sticky top-0 shrink-0">
      <div className="flex flex-col">
        <h1 className="text-xl font-black text-foreground tracking-tight leading-none">Quran Mazid</h1>
        <p className="text-[10px] text-muted/60 font-bold mt-1.5 uppercase tracking-wider">Read, Study, and Learn The Quran</p>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative group hidden lg:block">
           <div className="flex items-center bg-black/20 border border-border/50 px-5 py-3 rounded-2xl gap-3.5 w-[500px] text-muted focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
              <Search size={18} className="text-muted/40" />
              <input 
                type="text" 
                placeholder="Search Surah (e.g. Fatiha, 2)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[13px] w-full text-foreground placeholder:text-muted/30 font-bold"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={16} className="hover:text-foreground transition-colors text-muted/40" />
                </button>
              )}
           </div>

           {searchResults.length > 0 && (
             <div className="absolute top-full left-0 w-full mt-4 bg-sidebar border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in backdrop-blur-xl">
               {searchResults.map((s) => (
                 <Link 
                   key={s.id} 
                   href={`/surah/${s.id}`}
                   onClick={() => setSearchQuery('')}
                   className="flex items-center justify-between p-4.5 hover:bg-white/5 transition-all border-b border-border/30 last:border-none"
                 >
                   <div className="flex items-center gap-5">
                      <div className="w-9 h-9 rounded-xl bg-black/40 border border-border/50 flex items-center justify-center text-[11px] font-black">{s.id}</div>
                      <div>
                        <p className="text-[13px] font-bold">{s.transliteration}</p>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-wide">{s.translation}</p>
                      </div>
                   </div>
                   <span className="text-[9px] font-black text-primary uppercase bg-primary/10 px-2.5 py-1.5 rounded-lg tracking-widest">Surah</span>
                 </Link>
               ))}
             </div>
           )}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-3 text-muted/40 hover:text-foreground hover:bg-white/5 rounded-2xl transition-all">
            <Search size={22} className="lg:hidden" />
          </button>
          <button 
            onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            className="w-11 h-11 flex items-center justify-center text-muted/40 hover:text-primary hover:bg-primary/5 rounded-full transition-all border border-border/30"
          >
            {settings.theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <button className="bg-primary text-white px-7 py-3 rounded-2xl text-[13px] font-black hover:opacity-90 transition-all shadow-xl shadow-primary/30 hidden sm:flex items-center gap-2 group">
          Support Us
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;

