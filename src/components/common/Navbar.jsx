"use client";

import { Search, User, ShoppingBag } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        AURA
      </div>
      
      <div className={styles.links}>
        <span className={styles.link}>ABOUT</span>
        <span className={styles.link}>CAMPAIGN</span>
        <span className={styles.link}>COLLECTIONS</span>
        <span className={styles.link}>SHOP</span>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.icons}>
          <Search size={18} className={styles.icon} />
          <User size={18} className={styles.icon} />
          <ShoppingBag size={18} className={styles.icon} />
        </div>
        <span className={styles.contactBtn}>
          CONTACT US <span>&rarr;</span>
        </span>
      </div>
    </nav>
  );
}
