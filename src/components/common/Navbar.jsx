"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className={`${styles.navbar} ${isMobileMenuOpen ? styles.navbarOpen : ''}`}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.logo} data-cursor="hover">
            PALLORA
          </div>
        </Link>
        
        <div className={`${styles.links} ${isMobileMenuOpen ? styles.mobileLinksOpen : ''}`}>
          <MagneticButton>
            <Link href="/about" className={styles.link} data-cursor="hover" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/campaign" className={styles.link} data-cursor="hover" onClick={() => setIsMobileMenuOpen(false)}>CAMPAIGN</Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/collections" className={styles.link} data-cursor="hover" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/shop" className={styles.link} data-cursor="hover" onClick={() => setIsMobileMenuOpen(false)}>SHOP</Link>
          </MagneticButton>
          
          {/* Mobile only contact button inside menu */}
          <MagneticButton>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <span className={`${styles.contactBtn} ${styles.mobileOnlyBtn}`} data-cursor="hover">
                CONTACT US <span>&rarr;</span>
              </span>
            </Link>
          </MagneticButton>
        </div>

        <div className={styles.contactContainer}>
          <div className={styles.icons}>
            <MagneticButton><div data-cursor="hover"><Search size={18} className={styles.icon} /></div></MagneticButton>
            <MagneticButton><div data-cursor="hover"><User size={18} className={styles.icon} /></div></MagneticButton>
            <MagneticButton><div data-cursor="hover"><ShoppingBag size={18} className={styles.icon} /></div></MagneticButton>
          </div>
          <MagneticButton>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <span className={`${styles.contactBtn} ${styles.desktopOnlyBtn}`} data-cursor="hover">
                CONTACT US <span>&rarr;</span>
              </span>
            </Link>
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
