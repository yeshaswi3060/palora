"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/common/Footer';
import styles from './Shop.module.css';

const TOP_PRODUCTS = [
  { id: 1, name: 'EMBROIDERED SILK KURTA', price: '$850', img: '/images/kurta.png' },
  { id: 2, name: 'FESTIVE FUSION SAREE', price: '$950', oldPrice: '$1,200', isArchive: true, img: '/images/saree.png' },
  { id: 3, name: 'MIDNIGHT VELVET JACKET', price: '$950', img: '/images/hero.png' },
];

const SCROLL_PRODUCTS = [
  { id: 4, name: 'IVORY CHIFFON DRAPE', price: '$600', img: '/images/kurta.png' },
  { id: 5, name: 'ROYAL BLUE LEHENGA', price: '$2,100', img: '/images/saree.png' },
  { id: 6, name: 'CONTEMPORARY SUIT', price: '$1,100', oldPrice: '$1,400', isArchive: true, img: '/images/hero.png' },
  { id: 7, name: 'GOLDEN THREAD DUPATTA', price: '$350', img: '/images/kurta.png' },
  { id: 8, name: 'EMERALD TUNIC', price: '$750', img: '/images/saree.png' },
  { id: 9, name: 'SCARLET SILK GOWN', price: '$1,800', img: '/images/hero.png' },
  { id: 10, name: 'DUSK LINEN SHIRT', price: '$250', oldPrice: '$400', isArchive: true, img: '/images/kurta.png' },
  { id: 11, name: 'MIDNIGHT TROUSERS', price: '$550', img: '/images/saree.png' },
];

export default function ShopPage() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const titleContainerRef = useRef(null);
  const topGridRef = useRef(null);
  const splitSection1Ref = useRef(null);
  const leftScroll1Ref = useRef(null);
  const rightPinnedRef = useRef(null);
  const heroImg1Ref = useRef(null);

  const splitSection2Ref = useRef(null);
  const rightScroll2Ref = useRef(null);
  const leftPinnedRef = useRef(null);
  const heroImg2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Smooth scroll to top on load since this is a new route
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Initial Page Load Reveal
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.fromTo(title1Ref.current,
        { y: "100%" },
        { y: "0%", duration: 1.2, delay: 0.2 }
      );
      
      tl.fromTo(title2Ref.current,
        { y: "100%" },
        { y: "0%", duration: 1.2 },
        "-=1.1"
      );

      // 1.5 Phase 2: Shrink and Center Title
      tl.to(titleContainerRef.current, {
        scale: 0.4,
        y: "-15vh",
        duration: 1.5,
        ease: "power3.inOut"
      }, "+=0.5");
      
      // Pull the top grid up smoothly as the title shrinks
      tl.to(topGridRef.current, {
        y: "-30vh",
        duration: 1.5,
        ease: "power3.inOut"
      }, "<");

      // 3. GSAP Pinning & Cinematic Parallax for Split Section 1 (Right Pinned)
      gsap.to(heroImg1Ref.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: splitSection1Ref.current,
          start: "top top+=10%",
          end: "bottom bottom",
          scrub: 1, // Tie scale to scroll progress
          pin: rightPinnedRef.current, // True GSAP Pinning
        }
      });

      // 4. GSAP Pinning & Cinematic Parallax for Split Section 2 (Left Pinned)
      gsap.to(heroImg2Ref.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: splitSection2Ref.current,
          start: "top top+=10%",
          end: "bottom bottom",
          scrub: 1, 
          pin: leftPinnedRef.current,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.main} ref={containerRef}>
      <header className={styles.header}>
        <h1 className={styles.title} ref={titleContainerRef} style={{ transformOrigin: "top center", textAlign: "center" }}>
          <span className={styles.titleLine}><span ref={title1Ref} style={{ display: 'block' }}>ALL</span></span>
          <span className={styles.titleLine}><span ref={title2Ref} style={{ display: 'block' }}>EDITIONS</span></span>
        </h1>
      </header>

      {/* Zone 1: Top Row (3 Products) */}
      <div className={styles.topGrid} ref={topGridRef}>
        {TOP_PRODUCTS.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              {product.isArchive && <div className={styles.archiveBadge}>PRIVATE SALE</div>}
              <img src={product.img} alt={product.name} className={styles.image} />
              <div className={styles.overlay}>
                <button className={styles.quickAdd}>Quick Add</button>
              </div>
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{product.name}</h3>
              <div className={styles.priceContainer}>
                {product.oldPrice && <p className={styles.oldPrice}>{product.oldPrice}</p>}
                <p className={styles.price}>{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zone 2: Split Screen 1 (Right Pinned) */}
      <div className={styles.splitSection} ref={splitSection1Ref}>
        {/* Left: Scrolling Products (2 columns) */}
        <div className={styles.scrollGrid} ref={leftScroll1Ref}>
          {SCROLL_PRODUCTS.slice(0, 4).map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                {product.isArchive && <div className={styles.archiveBadge}>PRIVATE SALE</div>}
                <img src={product.img} alt={product.name} className={styles.image} />
                <div className={styles.overlay}>
                  <button className={styles.quickAdd}>Quick Add</button>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.priceContainer}>
                  {product.oldPrice && <p className={styles.oldPrice}>{product.oldPrice}</p>}
                  <p className={styles.price}>{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Sticky Hero Image with UI Overlay */}
        <div className={styles.rightPinned} ref={rightPinnedRef}>
          <img 
            ref={heroImg1Ref}
            src="/images/shop_hero.jpeg"
            alt="Luxury Western Dress"
            className={styles.pinnedImage}
          />
          <div className={styles.heroOverlay}>
            <h2 className={styles.heroTitle}>MIDNIGHT DRAPE</h2>
            <p className={styles.heroDesc}>Exquisite hand-woven silk with cascading architectural ruffles, perfect for the evening avant-garde.</p>
            <div className={styles.heroBottomRow}>
              <span className={styles.heroPrice}>$1,850</span>
              <button className={styles.heroBtn}>Discover</button>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 3: Middle Interstitial Row (3 Products) */}
      <div className={styles.topGrid}>
        {TOP_PRODUCTS.map((product) => (
          <div key={`mid-${product.id}`} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              {product.isArchive && <div className={styles.archiveBadge}>PRIVATE SALE</div>}
              <img src={product.img} alt={product.name} className={styles.image} />
              <div className={styles.overlay}>
                <button className={styles.quickAdd}>Quick Add</button>
              </div>
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{product.name}</h3>
              <div className={styles.priceContainer}>
                {product.oldPrice && <p className={styles.oldPrice}>{product.oldPrice}</p>}
                <p className={styles.price}>{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zone 4: Split Screen 2 (Left Pinned - Zig Zag) */}
      <div className={styles.splitSection} ref={splitSection2Ref}>
        
        {/* Left: Sticky Hero Image with UI Overlay */}
        <div className={styles.leftPinned} ref={leftPinnedRef}>
          <img 
            ref={heroImg2Ref}
            src="/images/shop_hero_2.jpeg"
            alt="Beautiful Western Dress"
            className={styles.pinnedImage}
          />
          <div className={styles.heroOverlay}>
            <h2 className={styles.heroTitle}>IVORY SILHOUETTE</h2>
            <p className={styles.heroDesc}>A masterclass in restraint. Sculptural lines meet fluid movement in this stunning ivory ensemble.</p>
            <div className={styles.heroBottomRow}>
              <span className={styles.heroPrice}>$2,100</span>
              <button className={styles.heroBtn}>Discover</button>
            </div>
          </div>
        </div>

        {/* Right: Scrolling Products (2 columns) */}
        <div className={styles.scrollGrid} ref={rightScroll2Ref}>
          {SCROLL_PRODUCTS.slice(4, 8).map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                {product.isArchive && <div className={styles.archiveBadge}>PRIVATE SALE</div>}
                <img src={product.img} alt={product.name} className={styles.image} />
                <div className={styles.overlay}>
                  <button className={styles.quickAdd}>Quick Add</button>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.priceContainer}>
                  {product.oldPrice && <p className={styles.oldPrice}>{product.oldPrice}</p>}
                  <p className={styles.price}>{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
