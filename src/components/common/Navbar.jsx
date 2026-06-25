"use client";

import { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className={`${styles.navbar} ${isMobileMenuOpen ? styles.navbarOpen : ''}`}>
        <div className={styles.logo} data-cursor="hover">
          PALLORA
        </div>
        
        <div className={`${styles.links} ${isMobileMenuOpen ? styles.mobileLinksOpen : ''}`}>
          <MagneticButton><span className={styles.link} data-cursor="hover" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</span></MagneticButton>
          <MagneticButton><span className={styles.link} data-cursor="hover" onClick={() => setIsMobileMenuOpen(false)}>CAMPAIGN</span></MagneticButton>
          <MagneticButton><span className={styles.link} data-cursor="hover" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</span></MagneticButton>
          <MagneticButton><span className={styles.link} data-cursor="hover" onClick={() => setIsMobileMenuOpen(false)}>SHOP</span></MagneticButton>
          
          {/* Mobile only contact button inside menu */}
          <MagneticButton>
            <span className={`${styles.contactBtn} ${styles.mobileOnlyBtn}`} data-cursor="hover">
              CONTACT US <span>&rarr;</span>
            </span>
          </MagneticButton>
        </div>

        <div className={styles.contactContainer}>
          <div className={styles.icons}>
            <MagneticButton><div data-cursor="hover"><Search size={18} className={styles.icon} /></div></MagneticButton>
            <MagneticButton><div data-cursor="hover"><User size={18} className={styles.icon} /></div></MagneticButton>
            <MagneticButton><div data-cursor="hover"><ShoppingBag size={18} className={styles.icon} /></div></MagneticButton>
          </div>
          <MagneticButton>
            <span className={`${styles.contactBtn} ${styles.desktopOnlyBtn}`} data-cursor="hover">
              CONTACT US <span>&rarr;</span>
            </span>
          </MagneticButton>
          <MagneticButton>
            <button 
              className={styles.menuToggle} 
              data-cursor="hover"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </MagneticButton>
        </div>
      </nav>
      
      {/* Overlay background for mobile menu */}
      <div 
        className={`${styles.menuOverlay} ${isMobileMenuOpen ? styles.menuOverlayOpen : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
    </>
  );
}
