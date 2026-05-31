"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DeeperLookSection.module.css';

export default function DeeperLookSection() {
  const sectionRef = useRef(null);
  const mainImageRef = useRef(null);
  const offsetImageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax for main image
      gsap.to(mainImageRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: mainImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Parallax for offset image
      gsap.to(offsetImageRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: offsetImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Reveal title
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <h2 className={styles.title} ref={titleRef}>A DEEPER LOOK INSIDE THE COLLECTION</h2>

      <div className={styles.gridContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.highlightText}>
            <h3>HIGHLIGHTS</h3>
            <p>Collection features a balance of traditional motifs and modern draping, from billowing lehengas to tailored fusion jackets.</p>
          </div>
          
          <div className={styles.imageMainWrapper}>
            <img 
              ref={mainImageRef}
              src="/images/saree.png" 
              alt="Fusion Look Main" 
              className={styles.imageMain}
            />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.imageOffsetWrapper}>
            <img 
              ref={offsetImageRef}
              src="/images/kurta.png" 
              alt="Fusion Look Offset" 
              className={styles.imageOffset}
            />
          </div>

          <div className={styles.textBlock}>
            <h2>THE FESTIVE COLLECTION</h2>
            <p>PALLORA's Festive collection channels the spirit of celebration, presenting vivid colors and intricate zari work.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
