import React, { useRef, useLayoutEffect } from "react";
import { Typography, Button } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";
import heroImage from "../assets/hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const textRef = useRef(null);

  {/*useLayoutEffect(() => {
    const text = textRef.current.textContent; // الحصول على النص الكامل
    textRef.current.innerHTML = ""; // مسح المحتوى الحالي

    // إنشاء عنصر span لكل حرف (بما في ذلك المسافات)
    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      // معالجة المسافات
      if (char === " ") {
        const spaceSpan = document.createElement("span");
        spaceSpan.style.whiteSpace = "pre"; // الحفاظ على المسافات
        spaceSpan.innerHTML = "&nbsp;"; // استخدام مسافة غير قابلة للكسر
        textRef.current.appendChild(spaceSpan);
        continue;
      }

      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.style.display = "inline-block"; // مهم للاتجاه العربي
      textRef.current.appendChild(charSpan);
    }

    let previousScrollY = window.scrollY; // لتتبع موضع التمرير السابق
    const scrollThreshold = 1; // كل 1 بكسل

    ScrollTrigger.create({
      onUpdate: (self) => {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - previousScrollY; // الفرق بين التمرير الحالي والسابق

        // التمرير لأسفل
        if (scrollDelta > 0) {
          if (Math.abs(scrollDelta) >= scrollThreshold) {
            // اختيار عدد عشوائي من الحروف (من 1 إلى 3)
            const randomCharsToMove = gsap.utils.random(1, 3, 1); // 1, 2, أو 3

            // تحديد الحروف التي ستتفتت (الحروف التي لا تزال مرئية)
            const charsToAnimate = [];
            for (let i = 0; i < textRef.current.children.length; i++) {
              if (gsap.getProperty(textRef.current.children[i], "opacity") === 1) {
                charsToAnimate.push(textRef.current.children[i]);
                if (charsToAnimate.length >= randomCharsToMove) break;
              }
            }

            // تحريك الحروف المحددة
            gsap.to(charsToAnimate, {
              opacity: 0,
              x: () => gsap.utils.random(-50, 50), // تقليل المدى الأفقي
              y: () => gsap.utils.random(-100, 50),
              rotate: () => gsap.utils.random(-30, 30), // تقليل الدوران
              scale: 0.5,
              duration: 0.7,
              ease: "power3.out",
            });
          }
        }
        // التمرير لأعلى
        else if (scrollDelta < 0 || scrollY === 0) {
          if (Math.abs(scrollDelta) >= scrollThreshold || scrollY === 0) {
            // تحديد الحروف التي تم تفتيتها (الحروف غير مرئية)
            const charsToReset = [];
            for (let i = 0; i < textRef.current.children.length; i++) {
              if (gsap.getProperty(textRef.current.children[i], "opacity") === 0) {
                charsToReset.push(textRef.current.children[i]);
              }
            }

            // إعادة جميع الحروف إذا كنا في أعلى الصفحة
            if (scrollY === 0) {
              gsap.to(textRef.current.children, {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
              });
            } else {
              gsap.to(charsToReset, {
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

        previousScrollY = scrollY; // تحديث موضع التمرير السابق
      },
    });

    // إضافة event listener للتحقق من الوصول إلى أعلى الصفحة
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        gsap.to(textRef.current.children, {
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
  }, []);*/}

  return (
    <div className="landing">
      <div className="landing-bg">
        <img src={heroImage} alt="Hero Background" />
        <div className="landing-overlay"></div>
      </div>

      <div className="landing-inner">
        <Typography variant="h4" className="landing-text" ref={textRef}>
          <p className="arabic">التدريب جنون والجنون فنون مع البروفيسور المجنون</p> 
          <p className="english">YAHIA ZEKO</p>
        </Typography>
        <Button variant="contained" className="landing-btn">
          Detailed
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;