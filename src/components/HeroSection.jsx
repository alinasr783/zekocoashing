import React, { useRef, useLayoutEffect } from "react";
import { Typography, Button } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";
import heroImage from "../assets/hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const text = textRef.current.textContent;
    textRef.current.innerHTML = "";

    // تقسيم النص إلى كلمات ومسافات
    const tokens = text.match(/(\S+|\s+)/g) || [];

    tokens.forEach((token) => {
      if (token.trim() === "") {
        // معالجة المسافات
        const spaceSpan = document.createElement("span");
        spaceSpan.style.whiteSpace = "pre";
        spaceSpan.textContent = token;
        textRef.current.appendChild(spaceSpan);
      } else {
        // إنشاء عنصر لكل كلمة
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.textContent = token;
        textRef.current.appendChild(wordSpan);
      }
    });

    let previousScrollY = window.scrollY;
    const scrollThreshold = 1;

    ScrollTrigger.create({
      onUpdate: (self) => {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - previousScrollY;

        // التمرير لأسفل
        if (scrollDelta > 0) {
          if (Math.abs(scrollDelta) >= scrollThreshold) {
            const words = Array.from(textRef.current.children).filter(
              (child) => child.style.display === "inline-block"
            );

            const randomWordsToMove = gsap.utils.random(1, 3, 1);
            const visibleWords = words.filter(
              (word) => gsap.getProperty(word, "opacity") === 1
            );

            const wordsToAnimate = visibleWords.slice(0, randomWordsToMove);

            gsap.to(wordsToAnimate, {
              opacity: 0,
              x: () => gsap.utils.random(-50, 50),
              y: () => gsap.utils.random(-100, 50),
              rotate: () => gsap.utils.random(-30, 30),
              scale: 0.5,
              duration: 0.7,
              ease: "power3.out",
            });
          }
        }
        // التمرير لأعلى
        else if (scrollDelta < 0 || scrollY === 0) {
          if (Math.abs(scrollDelta) >= scrollThreshold || scrollY === 0) {
            const words = Array.from(textRef.current.children).filter(
              (child) => child.style.display === "inline-block"
            );

            const hiddenWords = words.filter(
              (word) => gsap.getProperty(word, "opacity") === 0
            );

            if (scrollY === 0) {
              gsap.to(words, {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
              });
            } else {
              gsap.to(hiddenWords, {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
              });
            }
          }
        }

        previousScrollY = scrollY;
      },
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        const words = Array.from(textRef.current.children).filter(
          (child) => child.style.display === "inline-block"
        );

        gsap.to(words, {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div className="landing" id="home">
      <div className="landing-bg">
        <img src={heroImage} alt="Hero Background" />
        <div className="landing-overlay"></div>
      </div>

      <div className="landing-inner">
        <Typography variant="h4" className="landing-text">
          <p className="arabic" ref={textRef}>
            التدريب جنون والجنون فنون مع البروفيسور المجنون
          </p>
          <p className="english">YAHIA ZEKO</p>
        </Typography>
        <button variant="contained" className="landing-btn">
          <a href="#packages"> Packages </a>
        </button>
      </div>
    </div>
  );
};

export default HeroSection