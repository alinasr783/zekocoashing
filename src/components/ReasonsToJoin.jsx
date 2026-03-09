import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./ReasonsToJoin.css";

// Import images
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

gsap.registerPlugin(ScrollTrigger);

const BeforeAfterSlide = ({ before, after }) => (
  <div className="ba-card ba-vertical">
    <div className="ba-block">
      <img src={before} alt="قبل" className="ba-image-static" />
      <div className="ba-badge ba-before">قبل</div>
    </div>
    <div className="ba-block">
      <img src={after} alt="بعد" className="ba-image-static" />
      <div className="ba-badge ba-after">بعد</div>
    </div>
  </div>
);

const ReasonsToJoin = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
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
    <section className="transformation-section" ref={sectionRef} id="transformations">
      <div className="section-header">
        <h2 className="section-title-modern" ref={titleRef}>
          <span className="highlight">قبل</span> وبعد
        </h2>
        <p className="section-subtitle">
          نتائج حقيقية لأبطالنا.
        </p>
      </div>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-container-modern"
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50
          }
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <BeforeAfterSlide before={slide.before} after={slide.after} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReasonsToJoin;
