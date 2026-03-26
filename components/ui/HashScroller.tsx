'use client';

import { useEffect } from 'react';

export default function HashScroller() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Delay to allow the page to finish rendering before scrolling
    const timer = setTimeout(scrollToHash, 150);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return null;
}
