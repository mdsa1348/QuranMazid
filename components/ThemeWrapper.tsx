'use client';

import React from 'react';
import { useSettings } from '@/hooks/useSettings';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();

  return (
    <div className={`${settings.theme} flex h-screen overflow-hidden`}>
      {children}
    </div>
  );
}
