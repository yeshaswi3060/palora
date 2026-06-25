"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  
  const isShop = pathname === '/shop';

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    
    // Set initial position to prevent flash at 0,0
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor');
        setHoverText(text === "hover" ? "" : (text || "VIEW"));
        gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "power2.out" });
      } else {
        setIsHovering(false);
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className={`${styles.cursor} ${isHovering ? styles.hovering : ''} ${isShop ? styles.shopCursor : ''}`} ref={cursorRef}>
      {isHovering && hoverText && <span className={styles.cursorText}>{hoverText}</span>}
      {isShop && !isHovering && (
        <>
          <div className={styles.crossLineH}></div>
          <div className={styles.crossLineV}></div>
        </>
      )}
    </div>
  );
}
