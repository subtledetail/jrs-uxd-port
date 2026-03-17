'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import styles from './MenuOverlay.module.css';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const setItemRef = useCallback((index: number) => (el: HTMLAnchorElement | HTMLButtonElement | null) => {
    itemsRef.current[index] = el;
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      // Open animation
      const tl = gsap.timeline();
      tlRef.current = tl;

      gsap.set(overlayRef.current, { opacity: 1, pointerEvents: 'auto' });

      tl.to(overlayRef.current, {
        clipPath: 'circle(150% at 359px 32px)',
        duration: 0.6,
        ease: 'expo.out',
      });

      // Stagger nav items in
      const items = itemsRef.current.filter(Boolean);
      tl.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.08,
      }, '-=0.3');
    } else {
      // Close animation
      const tl = gsap.timeline();
      tlRef.current = tl;

      const items = itemsRef.current.filter(Boolean);

      // Items exit
      tl.to(items, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });

      // Clip-path collapse
      tl.to(overlayRef.current, {
        clipPath: 'circle(0% at 359px 32px)',
        duration: 0.4,
        ease: 'expo.in',
        onComplete: () => {
          gsap.set(overlayRef.current, { opacity: 0, pointerEvents: 'none' });
        },
      });
    }

    return () => {
      tlRef.current?.kill();
    };
  }, [isOpen]);

  // Set initial y offset for items
  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    gsap.set(items, { y: 20, opacity: 0 });
  }, []);

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
    >
      <button className={styles.closeBtn} onClick={onClose}>CLOSE</button>

      <a ref={setItemRef(0)} className={`${styles.navItem} ${styles.navWork}`} href="#work">WORK</a>
      <a ref={setItemRef(1)} className={`${styles.navItem} ${styles.navAbout}`} href="#about">ABOUT</a>
      <a ref={setItemRef(2)} className={`${styles.navItem} ${styles.navMusings}`} href="#musings">MUSINGS</a>

      <div className={`${styles.divider} ${styles.div1}`} />
      <div className={`${styles.divider} ${styles.div2}`} />
      <div className={`${styles.divider} ${styles.div3}`} />

      <a ref={setItemRef(3)} className={styles.email} href="mailto:hi@jasonreidscott.com">hi@jasonreidscott.com</a>
      <a ref={setItemRef(4)} className={styles.linkedin} href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  );
}
