'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import VideoSection from './components/VideoSection';
import WorkSection from './components/WorkSection';
import MusingsSection from './components/MusingsSection';

const SplashSequence = dynamic(() => import('./components/SplashSequence'), { ssr: false });
const NavBar = dynamic(() => import('./components/NavBar'), { ssr: false });
const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false });
const MenuOverlay = dynamic(() => import('./components/MenuOverlay'), { ssr: false });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <SplashSequence />
      <NavBar onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <div style={{ maxWidth: 375, margin: '0 auto', position: 'relative' }}>
        <div data-nav-theme="light">
          <HeroSection />
        </div>
        <div data-nav-theme="dark">
          <VideoSection />
        </div>
        <div data-nav-theme="dark">
          <WorkSection />
        </div>
        <div data-nav-theme="light">
          <MusingsSection />
        </div>
      </div>
    </>
  );
}
