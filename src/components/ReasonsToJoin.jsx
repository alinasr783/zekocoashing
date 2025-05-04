import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay, Parallax } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import a1 from "../assets/a1.jpg";
import a2 from "../assets/a2.jpg";
import a3 from "../assets/a3.jpg";
import a4 from "../assets/a4.jpg";
import a5 from "../assets/a5.jpg";
import a6 from "../assets/a6.jpg";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import b4 from "../assets/b4.jpg";
import b5 from "../assets/b5.jpg";
import b6 from "../assets/b6.jpg";
import "./ReasonsToJoin.css";

gsap.registerPlugin(ScrollTrigger);

const ReasonsToJoin = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(".swiper-slide", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        scrub: 1
      },
      y: -50,
      stagger: 0.1
    });
  }, []);

  const slides = [
    { before: b1, after: a1 },
    { before: b2, after: a2 },
    { before: b3, after: a3 },
    { before: b4, after: a4 },
    { before: b5, after: a5 },
    { before: b6, after: a6 }
  ];

  return (
    <section className="transformation-showcase" ref={sectionRef}>
      <div className="blood-drip-overlay"></div>

      <h2 className="section-title-r" ref={titleRef}>
        <span className="title-before">BEFORE</span>
        <span className="title-slash">//</span>
        <span className="title-after">AFTER</span>
      </h2>

      <div className="swiper-container">
        <Swiper
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: true,
              translate: ["120%", 0, -500],
            },
          }}
          grabCursor={true}
          parallax={true}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}">
                <span class="bullet-inner"></span>
                <span class="bullet-pulse"></span>
              </span>`;
            },
          }}
          modules={[EffectCreative, Pagination, Autoplay, Parallax]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          speed={1200}
          className="transformation-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="transformation-slide">
              <div className="comparison-container">
                <div className="image-wrapper before-image">
                  <img 
                    src={slide.before} 
                    alt={`Before ${index + 1}`}
                    className="transformation-img"
                    data-swiper-parallax="-30%"
                  />
                  <div className="image-label before-label">BEFORE</div>
                </div>
                <div className="image-divider"></div>
                <div className="image-wrapper after-image">
                  <img 
                    src={slide.after} 
                    alt={`After ${index + 1}`}
                    className="transformation-img"
                    data-swiper-parallax="30%"
                  />
                  <div className="image-label after-label">AFTER</div>
                  <div className="result-badge">
                    <span className="result-percent">+{Math.floor(Math.random() * 50) + 50}%</span>
                    <span>IMPROVEMENT</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flames-overlay"></div>
    </section>
  );
};

export default ReasonsToJoin;