"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FeaturedProductSection.module.css';

export default function FeaturedProductSection() {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imageRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Text reveal
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img 
            ref={imageRef}
            src="/images/jacket.png" 
            alt="Featured Product" 
            className={styles.image}
          />
        </div>
        
        <div className={styles.content} ref={textRef}>
          <h2 className={styles.title}>Embroidered Silk Fusion Jacket</h2>
          <p className={styles.price}>$2,450</p>
          <p className={styles.description}>
            A statement piece from the Festive 2024 collection. This fusion jacket features rich embroidery, premium silk fabric, and a sleek modern cut. Perfect for elevating any modern ethnic wardrobe.
          </p>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}
