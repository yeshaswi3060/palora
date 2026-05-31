"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VisionSection.module.css';

export default function VisionSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const modelRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Horizontal scrolling background carousel
      gsap.to(trackRef.current, {
        x: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Parallax for the main model (cutout)
      gsap.fromTo(modelRef.current, 
        { y: 150 },
        {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Parallax for the text
      gsap.fromTo(textRef.current,
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Using repeated placeholders for the background track
  const carouselImages = Array.from({ length: 10 }).map((_, i) => (
    <img 
      key={i}
      src={i % 2 === 0 ? "/images/jacket.png" : "/images/kurta.png"} 
      alt={`Carousel ${i}`} 
      className={styles.carouselImage}
    />
  ));

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack} ref={trackRef}>
          {carouselImages}
        </div>
      </div>

      <div className={styles.textContainer} ref={textRef}>
        <h2 className={styles.title}>
          UNCOVER A<br />
          NEW VISION<br />
          OF FUSION<br />
          WITH<br />
          PALLORA
        </h2>
      </div>

      <div className={styles.mainModelContainer}>
        <img 
          ref={modelRef}
          src="/images/hero.png" 
          alt="Main Model" 
          className={styles.mainModel}
        />
      </div>

      <div className={styles.subText}>
        <p>Pallora redefines modern ethnic wear and invites you to explore fashion with a fresh, vibrant perspective.</p>
      </div>
    </section>
  );
}
