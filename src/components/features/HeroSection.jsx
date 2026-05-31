"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftModelRef = useRef(null);
  const centerModelRef = useRef(null);
  const rightModelRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax effects for the models
      gsap.to(leftModelRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(centerModelRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(rightModelRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Subtle scale effect on title
      gsap.to(titleRef.current, {
        scale: 1.05,
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title} ref={titleRef}>AURA</h1>
      </div>

      <div className={styles.modelsContainer}>
        <div className={styles.centerArch}></div>
        
        <div className={`${styles.modelWrapper} ${styles.modelLeftWrapper}`} ref={leftModelRef}>
          <img src="/images/kurta.png" alt="Fusion Look Left" className={styles.modelImage} />
          <div className={styles.floorShadow}></div>
        </div>

        <div className={`${styles.modelWrapper} ${styles.modelCenterWrapper}`} ref={centerModelRef}>
          <img src="/images/hero.png" alt="Fusion Look Center" className={styles.modelImage} />
          <div className={styles.floorShadow}></div>
        </div>

        <div className={`${styles.modelWrapper} ${styles.modelRightWrapper}`} ref={rightModelRef}>
          <img src="/images/saree.png" alt="Fusion Look Right" className={styles.modelImage} />
          <div className={styles.floorShadow}></div>
        </div>
      </div>

      <div className={styles.sideTextLeft}>
        <h3>OUR CAMPAIGN</h3>
        <p>At AURA, each season unfolds a new story, a journey through vibrant embroidery, rich silks, and elegant fusion tailoring.</p>
        <button className={styles.ctaButton}>Shop the Campaign</button>
      </div>

      <div className={styles.sideTextRight}>
        <h3>FESTIVE 2026</h3>
        <p>Redefines the essence of fusion, taking inspiration from deep roots and evolving it into an expression of colorful, modern elegance.</p>
        <button className={styles.ctaButton}>Explore Festive</button>
      </div>

      <div className={styles.bottomFade}></div>
    </section>
  );
}
