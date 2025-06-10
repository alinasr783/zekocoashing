import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { CheckCircle, ExpandMore, ExpandLess, Star } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import "./GymMembership.css";
import { supabase } from "./supabase.js";

const email = "alinasreldin784@gmail.com";

const paymentMethods = [
  { name: "Instapay", details: "yahya.mohamed8911@instapay" },
  { name: "CIB Account", details: "100045922329" },
  { name: "IBAN", details: "EG620010012000000100045922329" },
  { name: "PayPal", details: "yahyahatem53@gmail.com" },
  { name: "Vodafone Cash", details: "0106 720 3240" },
];

const countryCurrencyMap = {
  US: "USD",
  EG: "EGP",
  SA: "SAR",
  AE: "AED",
};

const durationTabs = ["3 Months", "6 Months", "9 Months", "12 Months"];

const GymMembership = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [userCurrency, setUserCurrency] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [activeDuration, setActiveDuration] = useState("3 Months");
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [plansData, setPlansData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // جلب بيانات الموقع أولاً
        const locationResponse = await fetch("https://ipapi.co/json/");
        const locationData = await locationResponse.json();
        const currency = countryCurrencyMap[locationData.country] || "default";
        setUserCurrency(currency);

        // ثم جلب بيانات الباقات من Supabase
        const { data, error } = await supabase
          .from('UDB')
          .select('packages')
          .eq('email', email)
          .single();

        if (error) throw error;

        if (data && data.packages) {
          setPlansData(data.packages);
        } else {
          console.error('No packages data found');
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setUserCurrency("default");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSubscribe = (plan) => {
    setSelectedPlan({
      ...plan,
      displayPrice: plan.prices[userCurrency] || plan.prices.default
    });
    setShowPaymentPopup(true);
    setPaymentDone(false);
  };

  const filteredPlans = plansData.filter(plan => plan.duration === activeDuration);

  const handleDurationChange = (duration) => {
    setActiveDuration(duration);
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
  };

  if (isLoading || plansData.length === 0) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Loading packages data...</p>
      </div>
    );
  }

  return (
    <div className="gym-membership-container" id="packages">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        PREMIUM <span>PACKAGES</span>
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Choose the perfect plan for your fitness journey
      </motion.p>

      <div className="currency-notice">
        {userCurrency !== "default" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="currency-badge"
          >
            Displaying prices in {userCurrency}
          </motion.div>
        )}
      </div>

      <div className="duration-tabs-container">
        <div className="duration-tabs">
          {durationTabs.map((duration) => (
            <button
              key={duration}
              className={`duration-tab ${activeDuration === duration ? 'active' : ''}`}
              onClick={() => handleDurationChange(duration)}
            >
              {duration}
              {duration === "12 Months" && (
                <span className="free-months-badge">+3 FREE</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 }
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="plans-swiper"
        onSwiper={setSwiperInstance}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {filteredPlans.map((plan, index) => (
          <SwiperSlide key={`${plan.name}-${plan.duration}`}>
            <motion.div
              className={`membership-plan ${plan.popular ? 'popular-plan' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Star className="star-icon" /> Most Popular
                </div>
              )}
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price-container">
                  <div className="plan-price">
                    {plan.prices[userCurrency] || plan.prices.default}
                  </div>
                  <div className="plan-duration">
                    <span className="duration-badge">{plan.duration}</span>
                  </div>
                </div>
                <div className="price-underline"></div>
              </div>
              <ul className="plan-benefits">
                {plan.benefits.slice(0, 5).map((benefit, i) => (
                  <motion.li 
                    key={i} 
                    className="benefit-item"
                    whileHover={{ x: 5 }}
                  >
                    <CheckCircle className="benefit-icon" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              {plan.benefits.length > 5 && (
                <motion.button 
                  className="toggle-benefits-btn" 
                  onClick={() => toggleExpand(index)}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedIndex === index ? (
                    <>
                      <span>Show Less</span>
                      <ExpandLess className="toggle-icon" />
                    </>
                  ) : (
                    <>
                      <span>Show More</span>
                      <ExpandMore className="toggle-icon" />
                    </>
                  )}
                </motion.button>
              )}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.ul
                    className="additional-benefits"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.benefits.slice(5).map((benefit, i) => (
                      <motion.li
                        key={i + 5}
                        className="benefit-item"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <CheckCircle className="benefit-icon" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              <motion.button
                className="subscribe-btn"
                onClick={() => handleSubscribe(plan)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SUBSCRIBE NOW
              </motion.button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {showPaymentPopup && (
          <motion.div 
            className="payment-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="payment-popup-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="payment-header">
                <h3>PAYMENT METHODS</h3>
                <motion.button 
                  className="close-popup-btn"
                  onClick={() => setShowPaymentPopup(false)}
                  whileHover={{ rotate: 90 }}
                >
                  ×
                </motion.button>
              </div>
              <div className="selected-plan-info">
                <h4>{selectedPlan.name} - {selectedPlan.duration}</h4>
                <div className="selected-plan-price">
                  {selectedPlan.displayPrice}
                </div>
                <div className="selected-plan-duration">
                  <span className="duration-highlight">
                    {selectedPlan.duration} PROGRAM
                    {selectedPlan.duration === "12 Months" && (
                      <span className="free-months-highlight"> + 3 MONTHS FREE</span>
                    )}
                  </span>
                </div>
              </div>
              <ul className="payment-methods-list">
                {paymentMethods.map((method, index) => (
                  <motion.li 
                    key={index} 
                    className="payment-method"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="method-name">{method.name}</div>
                    <div className="method-details">{method.details}</div>
                  </motion.li>
                ))}
              </ul>
              {!paymentDone ? (
                <motion.button
                  className="confirm-payment-btn"
                  onClick={() => setPaymentDone(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CONFIRM PAYMENT
                </motion.button>
              ) : (
                <motion.a
                  href="https://wa.me/201067203240"
                  className="whatsapp-contact-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span>SEND PAYMENT PROOF VIA WHATSAPP</span>
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GymMembership;