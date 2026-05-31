"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Scissors, Leaf } from 'lucide-react';
import styles from './BrandPerksSection.module.css';

export default function BrandPerksSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.perkCard}`);
      
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.perkCard}>
          <div className={styles.iconWrapper}>
            <Globe strokeWidth={1} size={40} />
          </div>
          <h3 className={styles.perkTitle}>Worldwide Shipping</h3>
          <p className={styles.perkDesc}>Complimentary express delivery on all orders over $500. Fully insured and tracked to your doorstep.</p>
        </div>

        <div className={styles.perkCard}>
          <div className={styles.iconWrapper}>
            <Scissors strokeWidth={1} size={40} />
          </div>
          <h3 className={styles.perkTitle}>Bespoke Tailoring</h3>
          <p className={styles.perkDesc}>Every garment is crafted to your exact measurements, ensuring a flawless fit and unparalleled comfort.</p>
        </div>

        <div className={styles.perkCard}>
          <div className={styles.iconWrapper}>
            <Leaf strokeWidth={1} size={40} />
          </div>
          <h3 className={styles.perkTitle}>Sustainable Fabrics</h3>
          <p className={styles.perkDesc}>We source only ethically produced, low-impact silks and organic cottons for a better tomorrow.</p>
        </div>
      </div>
    </section>
  );
}
