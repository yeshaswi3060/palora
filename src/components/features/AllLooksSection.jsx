"use client";

import { useState } from 'react';
import styles from './AllLooksSection.module.css';

export default function AllLooksSection() {
  const [activeLook, setActiveLook] = useState(0);

  const images = [
    "/images/hero.png",
    "/images/jacket.png",
    "/images/kurta.png",
    "/images/saree.png"
  ];

  const handleNext = () => setActiveLook((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActiveLook((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className={styles.section}>
      <div className={styles.leftColumn}>
        <h2 className={styles.mainTitle}>ALL LOOKS</h2>

        <div className={styles.infoGroup}>
          <h3 className={styles.infoTitle}>COLLECTION</h3>
          <p className={styles.infoValue}>Pallora</p>
        </div>

        <div className={styles.infoGroup}>
          <h3 className={styles.infoTitle}>EDITION</h3>
          <p className={styles.infoValue}>Festive 2026</p>
        </div>

        <div className={styles.infoGroup}>
          <h3 className={styles.infoTitle}>LINEUP</h3>
          <p className={styles.infoValue}>01-04</p>
        </div>

        <div className={styles.infoGroup}>
          <h3 className={styles.infoTitle}>LOOKS</h3>
          <p className={styles.infoValue}>Looks {activeLook + 1}</p>
        </div>

        <p className={styles.description}>
          With statement kurtas, expansive lehengas, and flowing silks paired with sleek modern silhouettes and vibrant accessories, the Pallora collection exudes a cohesive, elegant fusion aesthetic.
        </p>

        <div className={styles.navigation}>
          <button onClick={handlePrev} className={styles.navArrow}>&larr;</button>
          <span className={styles.navCount}>0{activeLook + 1}/04</span>
          <button onClick={handleNext} className={styles.navArrow}>&rarr;</button>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.mainImageContainer}>
          <img src={images[activeLook]} alt="Main Look" className={styles.mainImage} />
        </div>
        <div className={styles.thumbnailContainer}>
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`${styles.thumbnailWrapper} ${idx === activeLook ? styles.activeThumb : ''}`}
              onClick={() => setActiveLook(idx)}
              onMouseEnter={() => setActiveLook(idx)}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className={styles.thumbnailImage} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
