'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'sliding' | 'done'>('visible');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('sliding'), 1200);
    const t2 = setTimeout(() => {
      setPhase('done');
      window.dispatchEvent(new Event('splashDone'));
    }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-9999 bg-equora-amber flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${
        phase === 'sliding' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Logo + brand */}
      <div className={`flex flex-col items-center gap-5 transition-all duration-500 ${phase === 'sliding' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="relative h-20 w-20 rounded-full bg-white/20 border border-white/40 overflow-hidden">
          <Image
            src="/logo.svg"
            alt="EQUORA"
            fill
            className="object-contain p-3 brightness-0 invert"
            priority
          />
        </div>
        <span className="font-display text-4xl tracking-[8px] text-white">
          EQUORA
        </span>
        <div className="w-12 h-px bg-white/50" />
      </div>
    </div>
  );
}
