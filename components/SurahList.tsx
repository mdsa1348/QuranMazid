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
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-3">
        {mode === 'surah' && filteredSurahs.map((surah) => {
          const displayName = surah.transliteration.replace(/-/g, ' ');
          return (
            <Link 
              key={surah.id} 
              href={`/surah/${surah.id}`}
              className={`flex items-center p-4 rounded-2xl border transition-all group ${
                activeId === surah.id 
                  ? 'bg-primary/5 border-primary/40 shadow-lg shadow-primary/5' 
                  : 'bg-black/20 border-border/30 hover:border-primary/20 hover:bg-black/30'
              }`}
            >
              {/* Diamond ID */}
              <div className="mr-6 relative">
                <div className={`w-9 h-9 rotate-45 rounded-lg flex items-center justify-center transition-all ${
                  activeId === surah.id ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-white/5 border border-border/30'
                }`}>
                  <span className={`-rotate-45 text-[12px] font-black ${activeId === surah.id ? 'text-white' : 'text-muted/60'}`}>
                    {surah.id}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-[15px] font-bold truncate leading-tight ${activeId === surah.id ? 'text-primary' : 'text-foreground/90'}`}>
                  {displayName}
                </h3>
                <p className="text-[12px] text-muted/50 truncate font-medium mt-1">{surah.translation}</p>
              </div>

              {/* Arabic Name */}
              <div className="text-right shrink-0">
                <div className="text-[16px] font-bold arabic-font text-foreground/80 leading-tight">{surah.name}</div>
              </div>
            </Link>
          );
        })}





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
