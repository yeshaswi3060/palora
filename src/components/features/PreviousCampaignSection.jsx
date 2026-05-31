"use client";

import styles from './PreviousCampaignSection.module.css';

export default function PreviousCampaignSection() {
  const campaigns = [
    { name: "PALLORA REGAL", date: "Festive 2022", img: "/images/kurta.png", active: true },
    { name: "THE VELVET EDIT", date: "Winter 2023", img: "/images/hero.png", active: false },
    { name: "MODERN MUSE", date: "Spring 2024", img: "/images/saree.png", active: false },
    { name: "SILK", date: "Spring/Summer 2022", img: "/images/jacket.png" },
    { name: "FUSION", date: "Festive 2021", img: "/images/hero.png" },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>PREVIOUS CAMPAIGN</h2>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {campaigns.map((camp, index) => (
            <div key={index} className={`${styles.campaignCard} ${camp.active ? styles.active : ''}`}>
              <div className={styles.imageWrapper}>
                <img src={camp.img} alt={camp.name} className={styles.image} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.campaignName}>{camp.name}</h3>
                <p className={styles.campaignDate}>{camp.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.navigationArrows}>
        <span className={styles.arrow}>&larr;</span>
        <span>01/12</span>
        <span className={styles.arrow}>&rarr;</span>
      </div>
    </section>
  );
}
