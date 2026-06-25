"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VideoScrubSection.module.css';

export default function VideoScrubSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx;
    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Pin for 1.5 screen heights
          scrub: 1,
          pin: true,
        }
      });

      // Fade out video slightly at the end of the scroll
      tl.to(videoRef.current, {
        opacity: 0.4,
        ease: "none",
        duration: 0.2
      }, 0.5);
      
      // Animate the text over the video smoothly
      tl.fromTo(textRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 
        0
      );
    }, containerRef);

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      {/* Local 4K luxury video asset - Autoplaying smoothly */}
      <video 
        ref={videoRef}
        className={styles.video}
        src="/videos/essence.mp4" 
        autoPlay
        loop
        muted 
        playsInline 
      />
      
      <div className={styles.overlay}></div>
      
      <div className={styles.textContainer} ref={textRef}>
        <h2 className={styles.title} data-cursor="WATCH">THE ESSENCE</h2>
        <p className={styles.subtitle}>Every thread tells a story of heritage and innovation.</p>
      </div>
    </section>
  );
}
