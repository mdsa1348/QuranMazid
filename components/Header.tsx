'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';
import ThemeDropdown from './ThemeDropdown';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="h-[80px] border-b border-border bg-sidebar/80 backdrop-blur-xl flex items-center justify-between px-10 z-40 sticky top-0 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-[18px] font-bold text-foreground tracking-tight leading-none">Quran Mazid</h1>
          <p className="text-[11px] text-muted font-medium mt-1.5 uppercase tracking-wider">Read, Study, and Learn The Quran</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-11 h-11 flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/5 rounded-full transition-all border border-border/30 bg-card/50"
            >
              <Search size={20} />
            </button>
            
            <ThemeDropdown />
          </div>

          <button className="bg-primary text-white px-7 py-3 rounded-full text-[13px] font-black hover:opacity-90 transition-all shadow-xl shadow-primary/30 hidden sm:flex items-center gap-2 group ml-2">
            Support Us
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          </button>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
