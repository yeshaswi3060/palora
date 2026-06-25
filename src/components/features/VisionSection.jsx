"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VisionSection.module.css';
import TextReveal from '../common/TextReveal';

export default function VisionSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Sequence Configuration
  const frameCount = 60; // Set to the total number of images you export
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set high-res canvas size (can adjust based on actual image dimensions)
    canvas.width = 1000;
    canvas.height = 1000;

    const images = [];
    const airpods = { frame: 0 };
    let imagesLoaded = 0;
    let sequenceFailed = false;

    // Fallback image in case sequence isn't uploaded yet
    const fallbackImage = new Image();
    fallbackImage.src = "/images/hero.png";
    fallbackImage.onload = () => {
      if (imagesLoaded === 0) renderFallback();
    };

    function renderFallback() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Center the fallback image
      const hRatio = canvas.width / fallbackImage.width;
      const vRatio = canvas.height / fallbackImage.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShift_x = (canvas.width - fallbackImage.width * ratio) / 2;
      const centerShift_y = (canvas.height - fallbackImage.height * ratio) / 2;
      context.drawImage(fallbackImage, 0, 0, fallbackImage.width, fallbackImage.height, centerShift_x, centerShift_y, fallbackImage.width * ratio, fallbackImage.height * ratio);
    }

    // Try to load the image sequence (e.g., public/sequence/frame_001.png)
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Expecting format like: frame_001.png, frame_002.png
      const frameNum = (i + 1).toString().padStart(3, '0');
      img.src = `/sequence/frame_${frameNum}.png`;
      
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 1) {
          // Draw first frame immediately when loaded
          renderSequence();
        }
      };
      
      img.onerror = () => {
        sequenceFailed = true; // If they haven't uploaded images, it will fallback
      };
      
      images.push(img);
    }

    function renderSequence() {
      if (sequenceFailed || imagesLoaded === 0) {
        renderFallback();
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[airpods.frame];
      if (img && img.complete && img.naturalHeight !== 0) {
        // Draw the sequence image maintaining aspect ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    }

    const ctx = gsap.context(() => {
      // Horizontal scrolling background carousel
      gsap.to(trackRef.current, {
        x: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Parallax for the text
      gsap.fromTo(textRef.current,
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Scrub through the Canvas Image Sequence on scroll
      gsap.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Starts when section enters viewport
          end: "bottom top",   // Ends when section leaves viewport
          scrub: 0.5,          // Smooth scrubbing
        },
        onUpdate: renderSequence // Update canvas every frame
      });
      
      // We also add the vertical parallax movement to the canvas itself so it still floats
      gsap.fromTo(canvasRef.current, 
        { y: 150 },
        {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Using repeated placeholders for the background track
  const carouselImages = Array.from({ length: 10 }).map((_, i) => (
    <img 
      key={i}
      src={i % 2 === 0 ? "/images/jacket.png" : "/images/kurta.png"} 
      alt={`Carousel ${i}`} 
      className={styles.carouselImage}
    />
  ));

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack} ref={trackRef}>
          {carouselImages}
        </div>
      </div>

      <div className={styles.textContainer} ref={textRef}>
        <h2 className={styles.title}>
          <TextReveal delay={0.2}>
            {["UNCOVER A", "NEW VISION", "OF FUSION", "WITH", "PALLORA"]}
          </TextReveal>
        </h2>
      </div>

      <div className={styles.mainModelContainer}>
        {/* The canvas replaces the static image for Apple-style sequence animations */}
        <canvas 
          ref={canvasRef} 
          className={styles.mainModel}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      <div className={styles.subText}>
        <p>Pallora redefines modern ethnic wear and invites you to explore fashion with a fresh, vibrant perspective.</p>
      </div>
    </section>
  );
}
