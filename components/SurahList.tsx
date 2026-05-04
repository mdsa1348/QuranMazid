'use client';

import React, { useEffect, useState } from 'react';
import { getSurahs, getJuzs } from '@/lib/quran';
import { Surah, Juz } from '@/lib/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search } from 'lucide-react';

type Mode = 'surah' | 'juz' | 'page';

const SurahList = () => {
  const [mode, setMode] = useState<Mode>('surah');
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [juzs, setJuzs] = useState<Juz[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const params = useParams();
  const activeId = params?.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    getSurahs().then(setSurahs);
    getJuzs().then(setJuzs);
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toString() === searchQuery
  );

  return (
    <aside className="hidden lg:flex w-[350px] bg-[#111111] border-r border-border/50 flex-col overflow-hidden shrink-0">
      <div className="p-5 border-b border-border/50 space-y-5">
        <div className="flex bg-black/40 rounded-xl p-1 border border-border/50">
           {(['surah', 'juz', 'page'] as Mode[]).map((m) => (
             <button 
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-[11px] font-bold capitalize transition-all ${
                  mode === m ? 'bg-[#1a1a1a] text-white shadow-sm' : 'text-muted hover:text-foreground'
                }`}
             >
               {m}
             </button>
           ))}
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
          <input 
            type="text" 
            placeholder={`Search ${mode}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/30 border border-border/50 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted/40"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {mode === 'surah' && filteredSurahs.map((surah) => (
          <Link 
            key={surah.id} 
            href={`/surah/${surah.id}`}
            className={`flex items-center py-2 px-5 gap-3.5 hover:bg-white/5 transition-all group border-b border-border/5 ${
              activeId === surah.id ? 'bg-[#1a1a1a] border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-all shrink-0 ${
              activeId === surah.id ? 'bg-primary text-white' : 'bg-black/20 border border-border/30 text-muted group-hover:border-primary/30'
            }`}>
              {surah.id}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`text-[13px] font-bold truncate leading-tight ${activeId === surah.id ? 'text-primary' : 'text-foreground'}`}>
                {surah.transliteration}
              </h3>
              <p className="text-[10px] text-[#b0b0b0]/50 truncate font-medium">{surah.translation}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[13px] font-bold arabic-font text-foreground/90 leading-tight">{surah.name}</div>
              <p className="text-[8px] text-muted/40 uppercase font-bold tracking-wider">{surah.total_verses} Ayah</p>
            </div>
          </Link>
        ))}



        {mode !== 'surah' && (
          <div className="p-8 text-center text-xs text-muted font-medium italic">
             {mode} data is coming soon...
          </div>
        )}
      </div>
    </aside>
  );
};

export default SurahList;
