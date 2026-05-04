'use client';

import React from 'react';
import { Home, BookOpen, Settings, LayoutGrid, Bookmark, Send } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-[70px] bg-sidebar border-r border-border/50 flex-col items-center py-6 z-50 shrink-0">
      <Link href="/surah/1" className="mb-8 transform hover:scale-105 transition-all">
         <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <BookOpen size={20} fill="currentColor" />
         </div>
      </Link>
      
      <div className="flex flex-col gap-5 flex-1">
        <SidebarIcon icon={<Home size={20} />} active />
        <SidebarIcon icon={<LayoutGrid size={20} />} />
        <SidebarIcon icon={<Send size={20} />} />
        <SidebarIcon icon={<Bookmark size={20} />} />
        <SidebarIcon icon={<LayoutGrid size={20} />} />
      </div>

      <div className="mt-auto flex flex-col gap-5">
        <SidebarIcon icon={<Settings size={20} />} />
      </div>
    </aside>
  );
};

const SidebarIcon = ({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) => {
  return (
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 group ${
      active ? 'bg-card/40 text-primary border border-border/50' : 'text-[#b0b0b0] hover:text-foreground hover:bg-card/30'
    }`}>
      {icon}
    </div>
  );
};

export default Sidebar;


