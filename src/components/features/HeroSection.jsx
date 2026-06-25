"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

const mobileImages = ["/images/hero.png", "/images/kurta.png", "/images/saree.png"];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleContainerRef = useRef(null);
  const archRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  
  // Scroll Parallax Refs (Y-axis scrolling)
  const leftModelRef = useRef(null);
  const centerModelRef = useRef(null);
  const rightModelRef = useRef(null);
  
  // Mouse Parallax Refs (X-axis, RotY mouse follow)
  const leftMouseRef = useRef(null);
  const centerMouseRef = useRef(null);
  const rightMouseRef = useRef(null);
  
  // Breathing Refs (Infinite sine Y floating)
  const leftBreathRef = useRef(null);
  const centerBreathRef = useRef(null);
  const rightBreathRef = useRef(null);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Cinematic Load Sequence
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Arch grows up
      tl.fromTo(archRef.current,
        { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, duration: 1.5 },
        0.2
      );

      // Title slides up from clipping mask
      tl.fromTo(titleRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5 },
        0.4
      );

      // Models clip-path wipe up
      tl.fromTo([leftModelRef.current, centerModelRef.current, rightModelRef.current],
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 50 },
        { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", y: 0, duration: 1.5, stagger: 0.2 },
        0.6
      );

      // Side text fade in
      tl.fromTo([leftTextRef.current, rightTextRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        1.2
      );

      // 2. Breathing Motion (Continuous infinite float)
      gsap.to(leftBreathRef.current, { y: -15, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.5 });
      gsap.to(centerBreathRef.current, { y: -10, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 });
      gsap.to(rightBreathRef.current, { y: -18, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });

      // 3. Scroll Parallax effects for the models (Desktop only)
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

      // Subtle scale effect on title wrapper to prevent GSAP conflicts
      gsap.to(titleContainerRef.current, {
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

    // 4. Interactive Mouse 3D Parallax
    const handleMouseMove = (e) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const yPos = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      
      // Move the isolated mouse wrappers slightly based on mouse pos
      gsap.to(leftMouseRef.current, { x: xPos * -25, rotateY: xPos * 8, y: yPos * -10, duration: 1, ease: "power2.out" });
      gsap.to(centerMouseRef.current, { x: xPos * 15, rotateY: xPos * -3, y: yPos * 5, duration: 1, ease: "power2.out" });
      gsap.to(rightMouseRef.current, { x: xPos * -40, rotateY: xPos * 12, y: yPos * -15, duration: 1, ease: "power2.out" });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Mobile slideshow interval - slow, luxurious pace
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % mobileImages.length);
    }, 5500);

    return () => {
      ctx.revert();
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.titleContainer} ref={titleContainerRef}>
        <div className={styles.titleMask}>
          <h1 className={styles.title} ref={titleRef}>PALLORA</h1>
        </div>
      </div>
      
      {/* Dedicated Mobile Slideshow Container */}
      <div className={styles.mobileSlideshow}>
        {mobileImages.map((src, idx) => (
          <img 
            key={src} 
            src={src} 
            alt="Mobile Campaign Look" 
            className={`${styles.slideImage} ${idx === currentImageIndex ? styles.active : ''}`} 
          />
        ))}
      </div>

      <div className={styles.modelsContainer}>
        <div className={styles.centerArch} ref={archRef}></div>
        
        {/* Left Model Layers: Scroll -> Mouse -> Breathing */}
        <div className={`${styles.modelWrapper} ${styles.modelLeftWrapper}`} ref={leftModelRef}>
          <div ref={leftMouseRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div ref={leftBreathRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="/images/kurta.png" alt="Fusion Look Left" className={styles.modelImage} />
              <div className={styles.floorShadow}></div>
            </div>
          </div>
        </div>

        {/* Center Model Layers */}
        <div className={`${styles.modelWrapper} ${styles.modelCenterWrapper}`} ref={centerModelRef}>
          <div ref={centerMouseRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div ref={centerBreathRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="/images/hero.png" alt="Fusion Look Center" className={styles.modelImage} />
              <div className={styles.floorShadow}></div>
            </div>
          </div>
        </div>

        {/* Right Model Layers */}
        <div className={`${styles.modelWrapper} ${styles.modelRightWrapper}`} ref={rightModelRef}>
          <div ref={rightMouseRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div ref={rightBreathRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="/images/saree.png" alt="Fusion Look Right" className={styles.modelImage} />
              <div className={styles.floorShadow}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobileTextContainer}>
        <div className={styles.sideTextLeft} ref={leftTextRef}>
          <h3>OUR CAMPAIGN</h3>
          <p>At PALLORA, each season unfolds a new story, a journey through vibrant embroidery, rich silks, and elegant fusion tailoring.</p>
          <button className={styles.ctaButton}>Shop the Campaign</button>
        </div>

        <div className={styles.sideTextRight} ref={rightTextRef}>
          <h3>FESTIVE 2026</h3>
          <p>Redefines the essence of fusion, taking inspiration from deep roots and evolving it into an expression of colorful, modern elegance.</p>
          <button className={styles.ctaButton}>Explore Festive</button>
        </div>
      </div>

      <div className={styles.bottomFade}></div>
    </section>
  );
}
