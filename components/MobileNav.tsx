'use client';

import React from 'react';
import { Home, BookOpen, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-sidebar border-t border-border flex items-center justify-around z-50">
      <NavIcon href="/" icon={<Home size={20} />} active={pathname === '/'} />
      <NavIcon href="/surah/1" icon={<BookOpen size={20} />} active={pathname.startsWith('/surah')} />
      <NavIcon href="/search" icon={<Search size={20} />} active={pathname === '/search'} />
      <NavIcon href="/settings" icon={<Settings size={20} />} active={pathname === '/settings'} />
    </div>
  );
};

const NavIcon = ({ href, icon, active }: { href: string; icon: React.ReactNode; active: boolean }) => (
  <Link href={href} className={`p-2 rounded-lg ${active ? 'text-primary' : 'text-muted'}`}>
    {icon}
  </Link>
);

export default MobileNav;
