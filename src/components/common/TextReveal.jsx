"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TextReveal.module.css';

export default function TextReveal({ children, delay = 0 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    // Get all the line elements
    const lines = containerRef.current.querySelectorAll(`.${styles.lineInner}`);
    
    gsap.fromTo(lines, 
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Trigger when the top of the text hits 85% of the viewport height
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [delay]);

  // If children is a string, we can split it by <br/> or \n if passed, but typically 
  // the parent handles formatting. Here we expect an array of strings or elements if multiple lines,
  // or we can manually wrap words. For simplicity, we assume the children is a single string or array of strings.
  
  // A robust text splitter for React:
  const content = Array.isArray(children) ? children : [children];

  return (
    <div ref={containerRef} className={styles.revealContainer}>
      {content.map((line, i) => (
        <div key={i} className={styles.lineOuter}>
          <div className={styles.lineInner}>{line}</div>
        </div>
      ))}
    </div>
  );
}
