import React from 'react';

export default function Loading() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
      <div className="mx-auto">
        {/* Skeleton Header */}
        <div className="relative h-[150px] flex items-center px-12 border-b border-border/10 bg-[#0a0a0a] overflow-hidden animate-pulse">
          <div className="flex-1">
            <div className="w-32 h-20 bg-white/5 rounded-lg"></div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-center w-max">
            <div className="w-48 h-8 bg-white/10 rounded-md mb-2"></div>
            <div className="w-24 h-4 bg-white/5 rounded-sm mx-auto"></div>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="w-40 h-10 bg-white/5 rounded-md"></div>
          </div>
        </div>

        {/* Skeleton Ayahs */}
        <div className="p-8 space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex justify-end mb-4">
                <div className="w-3/4 h-12 bg-white/5 rounded-lg"></div>
              </div>
              <div className="w-1/2 h-6 bg-white/5 rounded-md mb-2"></div>
              <div className="w-1/3 h-4 bg-white/5 rounded-sm"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
