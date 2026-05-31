"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        setLoading(false); // completely remove from DOM
      }
    });

    // 1. Line fills up
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // 2. Fade out the logo and line
    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // 3. Cinematic Split! Top half goes up, bottom half goes down.
    tl.to(topHalfRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "split");

    tl.to(bottomHalfRef.current, {
      yPercent: 100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "split");

    return () => {
      document.body.style.overflow = 'auto';
      tl.kill();
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={styles.preloaderWrapper}>
      {/* The two splitting halves */}
      <div className={styles.topHalf} ref={topHalfRef}></div>
      <div className={styles.bottomHalf} ref={bottomHalfRef}></div>
      
      {/* The Logo and Loading Line */}
      <div className={styles.content} ref={contentRef}>
        <h1 className={styles.logo}>PALLORA</h1>
        <div className={styles.track}>
          <div className={styles.progressLine} ref={lineRef}></div>
        </div>
      </div>
    </div>
  );
}
