'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './NavBar.module.css';

interface NavBarProps {
  onMenuOpen: () => void;
}

export default function NavBar({ onMenuOpen }: NavBarProps) {
  const navRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const [variant, setVariant] = useState<'light' | 'dark'>('light');
  const prevScrollY = useRef(0);
  const navShown = useRef(false);

  // Start hidden above viewport until splashComplete fires
  useEffect(() => {
    try {
      gsap.set(navRef.current, { yPercent: -100 });
    } catch (e) {
      console.error('NavBar gsap.set error:', e);
    }
  }, []);

  // Splash complete → reveal nav
  useEffect(() => {
    const onSplashComplete = () => {
      try {
        navShown.current = true;
        gsap.to(navRef.current, { y: 0, duration: 0.5, ease: 'expo.out' });

        // Menu button nudge 0.5s after entrance
        setTimeout(() => {
          try {
            gsap.to(menuBtnRef.current, {
              rotateX: 360,
              duration: 0.55,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(menuBtnRef.current, { rotateX: 0 });
              },
            });
          } catch (e) {
            console.error('NavBar nudge error:', e);
          }
        }, 500);
      } catch (e) {
        console.error('NavBar splashComplete error:', e);
      }
    };

    window.addEventListener('splashComplete', onSplashComplete);
    return () => window.removeEventListener('splashComplete', onSplashComplete);
  }, []);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      try {
        const currentY = window.scrollY;

        if (currentY > prevScrollY.current && currentY > 80) {
          if (navShown.current) {
            gsap.to(navRef.current, { y: -64, duration: 0.45, ease: 'expo.out' });
            navShown.current = false;
          }
        } else if (currentY < prevScrollY.current) {
          if (!navShown.current) {
            gsap.to(navRef.current, { y: 0, duration: 0.55, ease: 'expo.out' });
            navShown.current = true;
          }
        }

        prevScrollY.current = currentY;
      } catch (e) {
        console.error('NavBar scroll error:', e);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for variant switching
  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-nav-variant="dark"]');
    const lightSections = document.querySelectorAll('[data-nav-variant="light"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const v = (entry.target as HTMLElement).dataset.navVariant as 'light' | 'dark';
            setVariant(v);
          }
        });
      },
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 }
    );

    darkSections.forEach((s) => observer.observe(s));
    lightSections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${variant === 'dark' ? styles.dark : styles.light}`}
    >
      <span className={styles.wordmark}>JRS</span>
      <button ref={menuBtnRef} className={styles.menuTrigger} onClick={onMenuOpen}>
        MENU
      </button>
    </nav>
  );
}
