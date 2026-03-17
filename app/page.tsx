'use client';

import { useState } from 'react';
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

  return (
    <div style={{ maxWidth: 375, margin: '0 auto', position: 'relative' }}>
      <SplashSequence />
      <NavBar onMenuOpen={() => setMenuOpen(true)} />
      <HeroSection />
      <VideoSection />
      <WorkSection />
      <MusingsSection />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
