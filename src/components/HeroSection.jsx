import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";
import heroImage from "../assets/hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const arabicTextRef = useRef(null);
  const englishTextRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    // Hero entrance animation
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.5 }
    });

    tl.from(bgRef.current, {
      scale: 1.3,
      filter: "brightness(0.3) contrast(1.5)",
      duration: 2
    })
    .from([arabicTextRef.current, englishTextRef.current], {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2
    }, "-=1.5")
    .from(buttonRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 0.8
    }, "-=0.5");

    // Text glow animation
    const textGlow = gsap.to(arabicTextRef.current, {
      textShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const scrollY = self.scroll();

        // Parallax effect
        gsap.to(bgRef.current, {
          y: scrollY * 0.5,
          scale: 1 + scrollY * 0.001,
          duration: 0.1
        });

        // Content fade out effect
        gsap.to(contentRef.current, {
          opacity: 1 - scrollY * 0.003,
          y: scrollY * 0.3,
          duration: 0.1
        });

        // Button stays visible
        gsap.to(buttonRef.current, {
          opacity: 1 - scrollY * 0.002,
          duration: 0.1
        });
      }
    });

    // Button hover animation
    const buttonHover = gsap.to(buttonRef.current, {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(255, 0, 0, 0.8)",
      duration: 0.3,
      paused: true
    });

    buttonRef.current.addEventListener("mouseenter", () => buttonHover.play());
    buttonRef.current.addEventListener("mouseleave", () => buttonHover.reverse());

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      textGlow.kill();
    };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-bg">
        <img 
          ref={bgRef}
          src={heroImage} 
          alt="Hero Background" 
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-particles"></div>
      </div>

      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-text">
          <span 
            ref={arabicTextRef}
            className="hero-arabic"
          >
            التدريب جنون والجنون فنون مع البروفيسور المجنون
          </span>
          <span ref={englishTextRef} className="hero-english">YAHIA ZEKO</span>
        </h1>

        <button 
          ref={buttonRef}
          className="hero-button"
        >
          <a href="#packages">Packages</a>
        </button>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default HeroSection;