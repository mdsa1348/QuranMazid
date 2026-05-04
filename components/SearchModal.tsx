'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Book, Sliders, ChevronDown, History, Sparkles } from 'lucide-react';
import { getSurahs } from '@/lib/quran';
import { Surah } from '@/lib/types';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [results, setResults] = useState<Surah[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSurahs().then(setSurahs);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = surahs.filter(s => 
      s.transliteration.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toString() === query
    ).slice(0, 8);
    setResults(filtered);
  }, [query, surahs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center px-4 overflow-y-auto pt-[12vh] pb-10 custom-scrollbar">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        className="bg-[#121212] w-full max-w-[650px] rounded-[32px] border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in relative z-10"
      >
        {/* Header Section */}
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 flex-1">
              <Book className="text-[#2e7d32]" size={22} fill="currentColor" fillOpacity={0.2} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Find wisdom in the Quran"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[16px] font-bold text-foreground/90 placeholder:text-muted/60 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-[12px] font-bold text-muted/80 cursor-pointer hover:bg-white/10 transition-all">
                  Quran
                  <ChevronDown size={14} className="text-muted/40" />
               </div>
               <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-muted/60 transition-all">
                  <Sliders size={18} />
               </button>
            </div>
          </div>

          <div className="h-px bg-white/10 w-full mb-8" />

          {query.trim() === '' ? (
            <div className="space-y-8 pb-4">
              {/* Try to navigate */}
              <div>
                <p className="text-[14px] font-bold text-muted/50 mb-5">Try to navigate</p>
                <div className="flex flex-wrap gap-2.5">
                  {['Al-Fatiha', 'Juz 30', 'Surah Yasin', 'Page 1'].map((item) => (
                    <button 
                      key={item}
                      className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[14px] font-bold text-muted/80 hover:bg-[#2e7d32] hover:text-white hover:border-[#2e7d32] transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Navigation */}
              <div>
                <p className="text-[14px] font-bold text-muted/50 mb-5">Recent Navigation</p>
                <div className="flex flex-col items-center justify-center py-12 opacity-30">
                  <p className="text-[15px] font-bold text-muted">No recent navigation</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1 max-h-[450px] overflow-y-auto custom-scrollbar pr-1 pb-4">
               {results.length > 0 ? (
                 results.map((s) => (
                   <Link
                     key={s.id}
                     href={`/surah/${s.id}`}
                     onClick={onClose}
                     className="flex items-center justify-between p-4.5 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group"
                   >
                     <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-[13px] font-black group-hover:border-primary/20 transition-all">
                          {s.id}
                        </div>
                        <div>
                          <p className="text-[15px] font-bold">{s.transliteration}</p>
                          <p className="text-[12px] text-muted/60 font-bold uppercase tracking-wide">{s.translation}</p>
                        </div>
                     </div>
                     <span className="text-[11px] font-black text-primary uppercase bg-primary/10 px-4 py-2 rounded-lg tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                       Navigate
                     </span>
                   </Link>
                 ))
               ) : (
                 <div className="py-20 text-center">
                   <p className="text-muted/40 font-bold">No results found for "{query}"</p>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
