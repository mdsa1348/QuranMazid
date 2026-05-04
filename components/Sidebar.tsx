'use client';

import React from 'react';
import { Home, BookOpen, Settings, LayoutGrid, Bookmark, HelpCircle, Send } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-[80px] bg-sidebar border-r border-border flex-col items-center py-6 z-50 shrink-0">
      <Link href="/surah/1" className="mb-10 transform hover:scale-105 transition-all">
         <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <BookOpen size={24} fill="currentColor" />
         </div>
      </Link>
      
      <div className="flex flex-col gap-5 flex-1">
        <SidebarIcon icon={<Home size={22} />} active />
        <SidebarIcon icon={<LayoutGrid size={22} />} />
        <SidebarIcon icon={<Send size={22} />} />
        <SidebarIcon icon={<Bookmark size={22} />} />
        <SidebarIcon icon={<LayoutGrid size={22} />} />
      </div>

      <div className="mt-auto flex flex-col gap-5">
        <SidebarIcon icon={<Settings size={22} />} />
      </div>
    </aside>
  );
};

const SidebarIcon = ({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) => {
  return (
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 group ${
      active ? 'bg-card/40 text-primary border border-border/50' : 'text-muted/50 hover:text-foreground hover:bg-card/30'
    }`}>
      {icon}
    </div>
  );
};

export default Sidebar;

