/* Figma node: 474:109 */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import styles from './NavBar.module.css';

interface NavBarProps {
  onMenuOpen: () => void;
}

const themeStyles = {
  light: { background: 'rgba(255, 255, 255, 0.25)', color: '#010101' },
  dark: { background: 'rgba(10, 10, 10, 0.25)', color: '#ffffff' },
};

export default function NavBar({ onMenuOpen }: NavBarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const prevScrollY = useRef(0);
  const navVisible = useRef(false);
  const currentThemeRef = useRef<'dark' | 'light'>('light');

  const detectTheme = useCallback(() => {
    const sections = document.querySelectorAll('[data-nav-theme]');
    let detected: 'dark' | 'light' = 'light';
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 64 && rect.bottom > 0) {
        detected = (section as HTMLElement).dataset.navTheme as 'dark' | 'light';
      }
    });
    if (detected !== currentThemeRef.current) {
      currentThemeRef.current = detected;
      setTheme(detected);
      if (navRef.current) {
        gsap.to(navRef.current, { ...themeStyles[detected], duration: 0.3 });
      }
    }
  }, []);

  // Show nav: immediately if splash done, otherwise on splashComplete or 1.5s fallback
  useEffect(() => {
    const alreadyDone = (window as unknown as Record<string, unknown>).__splashComplete;

    if (alreadyDone) {
      gsap.set(navRef.current, { top: 0 });
      navVisible.current = true;
      setTimeout(detectTheme, 100);
      return;
    }

    gsap.set(navRef.current, { top: -64 });

    const showNav = () => {
      if (navVisible.current) return;
      navVisible.current = true;
      gsap.to(navRef.current, {
        top: 0,
        duration: 0.6,
        ease: 'expo.out',
        delay: 0.5,
        onComplete: () => { setTimeout(detectTheme, 100); },
      });
    };

    window.addEventListener('splashComplete', showNav);
    const fallback = setTimeout(showNav, 1500);
    return () => {
      window.removeEventListener('splashComplete', showNav);
      clearTimeout(fallback);
    };
  }, [detectTheme]);

  // Scroll hide/show + theme detection
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > prevScrollY.current && currentY > 80) {
        if (navVisible.current) {
          gsap.to(navRef.current, { top: -64, duration: 0.45, ease: 'expo.out' });
          navVisible.current = false;
        }
      } else if (currentY < prevScrollY.current) {
        if (!navVisible.current) {
          gsap.to(navRef.current, { top: 0, duration: 0.55, ease: 'expo.out' });
          navVisible.current = true;
        }
      }

      prevScrollY.current = currentY;
      detectTheme();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [detectTheme]);

  return (
    <div
      ref={navRef}
      className={`${styles.nav} ${theme === 'dark' ? styles.dark : styles.light}`}
      style={{
        backdropFilter: 'blur(8px) saturate(140%)',
        WebkitBackdropFilter: 'blur(8px) saturate(140%)',
        background: themeStyles[theme].background,
      }}
    >
      <span className={styles.wordmark}>JRS_UXD</span>
      <button className={styles.menuTrigger} onClick={onMenuOpen}>
        [ MENU ]
      </button>
    </div>
  );
}
