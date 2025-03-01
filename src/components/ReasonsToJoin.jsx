import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
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

const ReasonsToJoin = () => {
  return (
    <div className="carousel2">
      <h2>After / Before</h2>
      <div className="home-carousel2">
        <div className="home-carousel-content2">
          {/* Swiper الأساسي - يتحرك أفقيًا تلقائيًا */}
          <Swiper
            grabCursor
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }} // يتحرك تلقائيًا
            loop={true} // يلف باستمرار
            className="home-carousel-content-swiper2"
          >
              <SwiperSlide key={1} className="slider-item">
                <img src={a1} loading="lazy" alt="Before" />
                <img src={b1} loading="lazy" alt="After" />
              </SwiperSlide>

            <SwiperSlide key={2} className="slider-item">
              <img src={a2} loading="lazy" alt="Before" />
              <img src={b2} loading="lazy" alt="After" />
            </SwiperSlide>
            <SwiperSlide key={3} className="slider-item">
              <img src={a3} loading="lazy" alt="Before" />
              <img src={b3} loading="lazy" alt="After" />
            </SwiperSlide>
            <SwiperSlide key={4} className="slider-item">
              <img src={a4} loading="lazy" alt="Before" />
              <img src={b4} loading="lazy" alt="After" />
            </SwiperSlide>
            <SwiperSlide key={5} className="slider-item">
              <img src={a5} loading="lazy" alt="Before" />
              <img src={b5} loading="lazy" alt="After" />
            </SwiperSlide>
            <SwiperSlide key={6} className="slider-item">
              <img src={a6} loading="lazy" alt="Before" />
              <img src={b6} loading="lazy" alt="After" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReasonsToJoin;