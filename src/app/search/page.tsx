"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SearchContent = dynamic(() => import('@/components/search/SearchContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030303] to-[#050505]">
      <div className="text-white/60">Loading search...</div>
    </div>
  ),
});

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030303] to-[#050505]">
        <div className="text-white/60">Loading search...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
