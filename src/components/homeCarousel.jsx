import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import "./homeCarousel.css";
import { EffectCube, Pagination } from "swiper/modules";

const plans = [
  { name: "Pass Trial", price: "$0", benefits: ["Gym access", "Trainer support"] },
  { name: "Pass Every 3 Days", price: "$19", benefits: ["Unlimited access", "Group classes"] },
  { name: "Pass Free Trial", price: "$49", benefits: ["Trainer session", "Diet plan"] },
  { name: "Pass 1 Month", price: "$65", benefits: ["Full gym access", "Personal trainer"] },
  { name: "Pass 6 Months", price: "$165", benefits: ["Priority booking", "Discounted plans"] },
];

export default function HomeCarousel() {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    console.log(`Subscribed to: ${plan.name}`);
  };

  return (
    <div className="home-carousel">
      <div className="home-carousel-content">
        <Swiper
          effect="cube"
          grabCursor
          cubeEffect={{ shadow: false, slideShadows: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[EffectCube, Pagination]}
          className="home-carousel-content-swiper"
        >
          {plans.map((plan, index) => (
            <SwiperSlide key={index} className="plan-card">
              <div className="plan-card-content">
                <h3 className="plan-title">{plan.name}</h3>
                <p className="plan-price">{plan.price}</p>
                <ul className="plan-benefits">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="plan-benefit">{benefit}</li>
                  ))}
                </ul>
                <button 
                  className="subscribe-btn" 
                  onClick={() => handleSubscribe(plan)}
                >
                  اشتراك
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}