"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HorizontalShopSection.module.css';

export default function HorizontalShopSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const products = [
    { id: 1, name: "Midnight Velvet Set", price: "$1,200", image: "/images/kurta.png" },
    { id: 2, name: "Ivory Fusion Lehenga", price: "$2,450", image: "/images/hero.png" },
    { id: 3, name: "Sapphire Draped Saree", price: "$1,800", image: "/images/saree.png" },
    { id: 4, name: "Emerald Rebel Jacket", price: "$950", image: "/images/jacket.png" },
    { id: 5, name: "Crimson Velvet Set", price: "$1,300", image: "/images/kurta.png" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the section and scroll the track horizontally
      const sections = gsap.utils.toArray(`.${styles.productCard}`);
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // base vertical scrolling on how wide the container is so it feels more natural.
          end: () => "+=" + trackRef.current.offsetWidth
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <h2 className={styles.title}>SHOP THE RUNWAY</h2>
        <p className={styles.subtitle}>Scroll to explore</p>
      </div>
      
      <div className={styles.trackContainer}>
        <div className={styles.track} ref={trackRef}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <div className={styles.hoverOverlay}>
                  <button className={styles.quickAddBtn}>QUICK ADD +</button>
                </div>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
