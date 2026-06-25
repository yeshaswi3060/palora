"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className }) {
  const containerRef = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = containerRef.current;
    const element = elementRef.current;
    if (!container || !element) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = container.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Move the INNER element slightly towards the cursor
      gsap.to(element, { x: x * 0.3, y: y * 0.3, duration: 1, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ display: 'inline-flex', padding: '10px', cursor: 'pointer' }}
    >
      <div ref={elementRef} style={{ display: 'inline-flex', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}
