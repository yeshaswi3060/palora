"use client";

import styles from './Footer.module.css';

export default function Footer() {
  const marqueeItems = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className={styles.marqueeItem}>
      FESTIVE ESSENTIALS <span className={styles.marqueeIcon}>✦</span>
    </span>
  ));

  return (
    <footer className={styles.footer}>
      <div className={styles.claimSection}>
        <div className={styles.claimContent}>
          <h2 className={styles.claimText}>CLAIM YOUR STYLE</h2>
          <p className={styles.claimSubtext}>Join the PALLORA insider list for exclusive access to upcoming collections, private sales, and editorial lookbooks.</p>
          <div className={styles.subscribeForm}>
            <input type="email" placeholder="EMAIL ADDRESS" className={styles.emailInput} />
            <button className={styles.subscribeBtn}>SUBSCRIBE &rarr;</button>
          </div>
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        {/* Double the track for seamless infinite scroll */}
        <div className={styles.marqueeTrack}>
          {marqueeItems}
          {marqueeItems}
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerColumn}>
          <span className={styles.footerTitle}>STORES</span>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.footerLink}>SOUTH KOREA</span>
          <span className={styles.footerLink}>AUSTRALIA</span>
          <span className={styles.footerLink}>AUSTRIA</span>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.footerLink}>SOUTH KOREA</span>
          <span className={styles.footerLink}>AUSTRALIA</span>
          <span className={styles.footerLink}>AUSTRIA</span>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.footerLink}>CANADA</span>
          <span className={styles.footerLink}>CHINA</span>
          <span className={styles.footerLink}>FRANCE</span>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.footerTitle}>FOLLOW US</span>
          <div className={styles.contactInfo}>
            <span className={styles.footerLink}>INSTAGRAM</span><br />
            <span className={styles.footerLink}>YOUTUBE</span><br />
            <span className={styles.footerLink}>TWITTER</span>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.footerTitle}>CONTACT</span>
          <div className={styles.contactInfo}>
            <span className={styles.footerLink}>INFO@PALLORA.COM</span><br />
            <span className={styles.footerLink}>PRESS@PALLORA.COM</span>
          </div>
        </div>
      </div>

      <div className={styles.brandNameContainer}>
        <img src="/images/footer_left.png" alt="Model Left" className={styles.bottomModelLeft} />
        <h1 className={styles.hugeBrandName}>PALLORA</h1>
        <img src="/images/footer_right.png" alt="Model Right" className={styles.bottomModelRight} />
      </div>

      <div style={{ textAlign: 'center', padding: '2rem', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #ddd' }}>
        &copy; 2026 PALLORA. All rights reserved. | Terms & Conditions | Privacy Policy
      </div>
    </footer>
  );
}
