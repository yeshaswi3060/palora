"use client";

import styles from './ProductGridSection.module.css';

export default function ProductGridSection() {
  const products = [
    { id: 1, name: "Shop Kurtas", image: "/images/kurta.png", className: styles.bentoLarge },
    { id: 2, name: "Shop Lehengas", image: "/images/hero.png", className: styles.bentoSmall1 },
    { id: 3, name: "Shop Sarees", image: "/images/saree.png", className: styles.bentoSmall2 },
    { id: 4, name: "Shop Fusion", image: "/images/jacket.png", className: styles.bentoSmall3 },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>CURATED EDITIONS</h2>
        <p className={styles.subtitle}>Discover the defining silhouettes of the season</p>
      </div>

      <div className={styles.bentoGrid}>
        {products.map((product) => (
          <div key={product.id} className={`${styles.bentoItem} ${product.className}`}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.overlay}>
              <span className={styles.shopBtn}>{product.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
