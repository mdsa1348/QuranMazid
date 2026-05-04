'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Ayah } from '@/lib/types';

interface AudioContextType {
  currentAyah: Ayah | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  playAyah: (ayah: Ayah, list?: Ayah[]) => void;
  pauseAyah: () => void;
  stopAyah: () => void;
  nextAyah: () => void;
  prevAyah: () => void;
  setPlaylist: (list: Ayah[]) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentAyah, setCurrentAyah] = useState<Ayah | null>(null);
  const [ayahList, setAyahListState] = useState<Ayah[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAyahRef = useRef<Ayah | null>(null);
  const ayahListRef = useRef<Ayah[]>([]);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    currentAyahRef.current = currentAyah;
  }, [currentAyah]);

  useEffect(() => {
    ayahListRef.current = ayahList;
  }, [ayahList]);

  const setPlaylist = (list: Ayah[]) => {
    setAyahListState(list);
  };

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    const handleTimeUpdate = () => {
      const cur = audio.currentTime;
      const dur = audio.duration;
      if (!isNaN(dur)) {
        setCurrentTime(cur);
        setDuration(dur);
        setProgress((cur / dur) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
      
      const current = currentAyahRef.current;
      const list = ayahListRef.current;
      
      if (!current || list.length === 0) return;
      const currentIndex = list.findIndex(a => a.verse === current.verse);
      if (currentIndex !== -1 && currentIndex < list.length - 1) {
        playAyah(list[currentIndex + 1]);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const safePlay = async () => {
    if (!audioRef.current) return;
    try {
      isPlayingRef.current = true;
      setIsPlaying(true);
      await audioRef.current.play();
    } catch (err) {
      console.error("Audio play interrupted or failed:", err);
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  };

  const playAyah = (ayah: Ayah, list?: Ayah[]) => {
    if (list) setPlaylist(list);

    if (currentAyah?.surah === ayah.surah && currentAyah?.verse === ayah.verse) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
        isPlayingRef.current = false;
      } else {
        safePlay();
      }
      return;
    }

    setCurrentAyah(ayah);
    const surahStr = ayah.surah.toString().padStart(3, '0');
    const ayahStr = ayah.verse.toString().padStart(3, '0');
    const url = `https://www.everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/${surahStr}${ayahStr}.mp3`;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = url;
      audioRef.current.load();
      safePlay();
    }

    // Scroll to element
    setTimeout(() => {
      const element = document.getElementById(`ayah-${ayah.verse}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const pauseAyah = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const stopAyah = () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentAyah(null);
  };

  const nextAyah = () => {
    // This requires knowing the list of ayahs, which we don't have here.
    // For now, let's just log or implement if possible.
  };

  const prevAyah = () => {
    // Same as next
  };

  return (
    <AudioContext.Provider value={{ 
      currentAyah, isPlaying, progress, duration, currentTime,
      playAyah, pauseAyah, stopAyah, nextAyah, prevAyah, setPlaylist 
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
}
