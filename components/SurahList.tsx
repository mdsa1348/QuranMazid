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
    <aside className="hidden lg:flex w-[330px] bg-[#0b0b0b] border-r border-border/40 flex-col overflow-hidden shrink-0">
      <div className="p-6 space-y-6">
        <div className="flex bg-white/[0.03] rounded-2xl p-1.5 border border-white/5">
           {(['surah', 'juz', 'page'] as Mode[]).map((m) => (
             <button 
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold capitalize transition-all ${
                  mode === m ? 'bg-[#2e7d32] text-white shadow-lg shadow-primary/20' : 'text-muted/60 hover:text-foreground'
                }`}
             >
               {m}
             </button>
           ))}
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
          <input 
            type="text" 
            placeholder="Search surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-[13px] focus:outline-none focus:border-primary/40 transition-all placeholder:text-muted/20 text-foreground"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 space-y-3">
        {mode === 'surah' && filteredSurahs.map((surah) => {
          const displayName = surah.transliteration.replace(/-/g, ' ');
          const isActive = activeId === surah.id;
          return (
            <Link 
              key={surah.id} 
              href={`/surah/${surah.id}`}
              className={`flex items-center p-4 rounded-2xl border transition-all group relative ${
                isActive 
                  ? 'bg-primary/[0.03] border-[#2e7d32] shadow-[0_0_20px_rgba(46,125,50,0.1)]' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
              }`}
            >
              {/* Diamond ID */}
              <div className="mr-6 relative">
                <div className={`w-10 h-10 rotate-45 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-[#2e7d32] shadow-[0_0_15px_rgba(46,125,50,0.5)]' : 'bg-white/[0.05] border border-white/5'
                }`}>
                  <span className={`-rotate-45 text-[10px] font-black ${isActive ? 'text-white' : 'text-muted/40'}`}>
                    {surah.id}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-[15px] font-bold truncate leading-tight ${isActive ? 'text-[#2e7d32]' : 'text-foreground/90'}`}>
                  {displayName}
                </h3>
                <p className="text-[12px] text-muted/40 truncate font-medium mt-1.5">{surah.translation}</p>
              </div>

              {/* Arabic Name */}
              <div className="text-right shrink-0">
                <div className={`text-[17px] font-bold arabic-font leading-tight ${isActive ? 'text-[#2e7d32]' : 'text-foreground/70'}`}>
                  {surah.name}
                </div>
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
