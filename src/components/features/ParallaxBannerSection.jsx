"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ParallaxBannerSection.module.css';

export default function ParallaxBannerSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Text Reveal Animation
      gsap.fromTo(textRef.current, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.bgContainer}>
        {/* Using the hero image as a cinematic full-bleed background */}
        <img ref={bgRef} src="/images/hero.png" alt="The Velvet Edit" className={styles.bgImage} />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content} ref={textRef}>
        <h2 className={styles.title}>THE VELVET EDIT</h2>
        <p className={styles.subtitle}>Opulent textures. Modern silhouettes.</p>
        <button className={styles.shopBtn}>SHOP COLLECTION</button>
      </div>
    </section>
  );
}
