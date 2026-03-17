/* Figma node: 435:1521 */
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './SplashSequence.module.css';

export default function SplashSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);
  const col5Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const jRef = useRef<HTMLSpanElement>(null);
  const uRef = useRef<HTMLSpanElement>(null);
  const rRef = useRef<HTMLSpanElement>(null);
  const xRef = useRef<HTMLSpanElement>(null);
  const sRef = useRef<HTMLSpanElement>(null);
  const dRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduced motion: skip animation, fire splashComplete immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.style.display = 'none';
      (window as unknown as Record<string, unknown>).__splashComplete = true;
      window.dispatchEvent(new Event('splashComplete'));
      return;
    }

    let tl: gsap.core.Timeline | undefined;

    try {
      const letters = [jRef.current, uRef.current, rRef.current, xRef.current, sRef.current, dRef.current];

      // Initial states via gsap.set — never CSS transforms on animated elements
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current], { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(letters, { xPercent: -50, y: 60, opacity: 0 });

      tl = gsap.timeline();

      // t=0: grid lines scaleY 0→1, stagger 0.08 L→R, duration 0.8, ease power2.inOut
      tl.to(line1Ref.current, { scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, 0);
      tl.to(line2Ref.current, { scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, 0.08);
      tl.to(line3Ref.current, { scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, 0.16);
      tl.to(line4Ref.current, { scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, 0.24);

      // t=0.5: letters rise y +60→0, opacity 0→1, stagger 0.1, order J U R X S D
      tl.to(letters, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
      }, 0.5);

      // EXIT: columns animate independently, right to left
      tl.to(col5Ref.current, { yPercent: -120, duration: 1.8, ease: 'expo.out' }, 3.4);
      tl.to(col4Ref.current, { yPercent: -120, duration: 1.8, ease: 'expo.out' }, 3.75);
      tl.to(col3Ref.current, { yPercent: -120, duration: 1.8, ease: 'expo.out' }, 4.1);
      tl.to(col2Ref.current, { yPercent: -120, duration: 1.8, ease: 'expo.out' }, 4.45);
      tl.to(col1Ref.current, { yPercent: -120, duration: 2.0, ease: 'expo.out' }, 4.8);

      // EXIT: lines exit with their adjacent columns
      tl.to(line4Ref.current, { yPercent: -120, duration: 1.8, ease: 'expo.out' }, 3.4);
      tl.to(line3Ref.current, { yPercent: -120, duration: 1.8, ease: 'expo.out' }, 3.75);
      tl.to(line2Ref.current, { yPercent: -120, duration: 1.8, ease: 'expo.out' }, 4.1);
      tl.to(line1Ref.current, { yPercent: -120, duration: 1.8, ease: 'expo.out' }, 4.45);

      // t=7.2: dispatch splashComplete, hide container
      tl.call(() => {
        (window as unknown as Record<string, unknown>).__splashComplete = true;
        window.dispatchEvent(new Event('splashComplete'));
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }, [], 7.2);
    } catch (e) {
      console.error('SplashSequence animation error:', e);
      container.style.display = 'none';
      (window as unknown as Record<string, unknown>).__splashComplete = true;
      window.dispatchEvent(new Event('splashComplete'));
    }

    return () => { tl?.kill(); };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* col1 */}
      <div ref={col1Ref} className={`${styles.column} ${styles.col1}`} />

      {/* col2: J, U */}
      <div ref={col2Ref} className={`${styles.column} ${styles.col2}`}>
        <span ref={jRef} className={`${styles.letter} ${styles.letterTop}`}>J</span>
        <span ref={uRef} className={`${styles.letter} ${styles.letterBottom}`}>U</span>
      </div>

      {/* col3: R, X */}
      <div ref={col3Ref} className={`${styles.column} ${styles.col3}`}>
        <span ref={rRef} className={`${styles.letter} ${styles.letterTop}`}>R</span>
        <span ref={xRef} className={`${styles.letter} ${styles.letterBottom}`}>X</span>
      </div>

      {/* col4: S, D */}
      <div ref={col4Ref} className={`${styles.column} ${styles.col4}`}>
        <span ref={sRef} className={`${styles.letter} ${styles.letterTop}`}>S</span>
        <span ref={dRef} className={`${styles.letter} ${styles.letterBottom}`}>D</span>
      </div>

      {/* col5 */}
      <div ref={col5Ref} className={`${styles.column} ${styles.col5}`} />

      {/* Grid lines — standalone, above columns */}
      <div ref={line1Ref} className={`${styles.gridLine} ${styles.line1}`} />
      <div ref={line2Ref} className={`${styles.gridLine} ${styles.line2}`} />
      <div ref={line3Ref} className={`${styles.gridLine} ${styles.line3}`} />
      <div ref={line4Ref} className={`${styles.gridLine} ${styles.line4}`} />
    </div>
  );
}
