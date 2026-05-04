import React from 'react';
import SurahList from '@/components/SurahList';

export default function SurahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SurahList />
      {children}
    </>
  );
}
