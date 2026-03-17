'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HeroSection.module.css';

const states = [
  { lines: ['IS A HANDS-ON', 'DESIGN DIRECTOR', '& UX STRATEGIST'], color: '#f97068' },
  { lines: ['MAKES DOPE SHIT', 'WITH HUMANS', '& AI'], color: '#00ffce' },
  { lines: ['IS A PARTNER', 'NOT A VENDOR'], color: '#9c5aff' },
  { lines: ['SWEATS THE', 'DETAILS SO', "YOU DON'T HAVE TO"], color: '#c6ff7d' },
];

export default function HeroSection() {
  const linesRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const linesContainer = linesRef.current;
    if (!linesContainer) return;

    let interval: ReturnType<typeof setInterval>;

    try {
      const renderLines = (index: number): HTMLDivElement | null => {
        linesContainer.innerHTML = '';
        let markEl: HTMLDivElement | null = null;

        states[index].lines.forEach((text, i) => {
          const div = document.createElement('div');
          div.className = styles.variableLine;

          const isLastLine = i === states[index].lines.length - 1;

          if (isLastLine) {
            const words = text.split(' ');
            const lastWord = words.pop()!;
            const prefix = words.join(' ');

            if (prefix) {
              div.appendChild(document.createTextNode(prefix + ' '));
            }

            const anchor = document.createElement('span');
            anchor.className = styles.markAnchor;
            anchor.textContent = lastWord;

            const mark = document.createElement('div');
            mark.className = styles.mark;
            mark.style.backgroundColor = states[index].color;
            anchor.appendChild(mark);

            div.appendChild(anchor);
            markEl = mark;
          } else {
            div.textContent = text;
          }

          linesContainer.appendChild(div);
        });

        markRef.current = markEl;
        return markEl;
      };

      const mark = renderLines(0);
      if (mark) gsap.set(mark, { backgroundColor: states[0].color });

      const cycle = () => {
        try {
          const currentState = currentIndex.current;
          const nextState = (currentState + 1) % states.length;
          const currentLines = linesContainer.children;
          const currentMark = markRef.current;

          const exitTl = gsap.timeline({
            onComplete: () => {
              try {
                const newMark = renderLines(nextState);
                const newLines = linesContainer.children;

                gsap.set(Array.from(newLines), { y: 12, opacity: 0 });

                if (newMark) {
                  gsap.set(newMark, { scaleY: -1 });
                }

                gsap.to(Array.from(newLines), {
                  y: 0,
                  opacity: 1,
                  duration: 0.45,
                  ease: 'power2.out',
                  stagger: 0.06,
                  onStart: () => {
                    if (newMark) {
                      gsap.to(newMark, {
                        scaleY: 1,
                        duration: 0.35,
                        ease: 'elastic.out(1, 0.5)',
                      });
                    }
                  },
                });

                currentIndex.current = nextState;
              } catch (e) {
                console.error('HeroSection enter animation error:', e);
              }
            },
          });

          exitTl.to(Array.from(currentLines), {
            y: -8,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in',
          }, 0);

          if (currentMark) {
            exitTl.to(currentMark, {
              scaleY: -1,
              duration: 0.2,
              ease: 'power2.in',
            }, 0);
          }

          if (currentMark) {
            exitTl.to(currentMark, {
              backgroundColor: states[nextState].color,
              duration: 0.35,
              ease: 'power2.inOut',
            }, 0);
          }
        } catch (e) {
          console.error('HeroSection cycle error:', e);
        }
      };

      interval = setInterval(cycle, 4500);
    } catch (e) {
      console.error('HeroSection animation error:', e);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} data-nav-variant="light">
      <div className={styles.staticLine}>JASON REID SCOTT</div>
      <div ref={linesRef} className={styles.variableLines} />
    </section>
  );
}
