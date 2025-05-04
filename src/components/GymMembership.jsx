import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { CheckCircle, ExpandMore, ExpandLess } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import "./GymMembership.css";

const plansData = [
  { 
    name: "Basic Plan", 
    prices: {
      USD: "$60",
      EGP: "EGP 1500",
      SAR: "SAR 220",
      AED: "AED 220",
      default: "$60"
    },
    benefits: [
      "جدول دايت مصمم لهدفك",
      "جدول تدريب احترافي",
      "كتاب بدائل محسوب الكالوري",
      "فايل للاسترتشات قبل وبعد التمرين",
      "متابعه اسبوعيه علي الواتساب"
    ] 
  },
  { 
    name: "Standard Plan", 
    prices: {
      USD: "$80",
      EGP: "EGP 2500",
      SAR: "SAR 290",
      AED: "AED 290",
      default: "$80"
    },
    benefits: [
      "جدول دايت مصمم لهدفك",
      "كتاب وصفات دايت بطريقه الوصفة",
      "كتاب بدائل محسةب الكالوري",
      "فايل للمكملات الغذائيه بانواعها وفوائدها",
      "جدول لاداره وقتك لجعل صحتك اولويه",
      "جدول تدريبي احترافي",
      "فايل للاسترتشات قبل وبعد التمرين",
      "مراجعه تمرينك وتعديل الأداء ",
      "شيت لتسجيل الاوزان لمراقبه تطوك",
      "فايل للكارديو مناسب لهدفك",
      "فايل تعليمي لكسر المعلومات الخاطئه",
      "متابعه يوميه ع الواتساب"
    ] 
  },
  { 
    name: "Premium Plan", 
    prices: {
      USD: "$120",
      EGP: "EGP 3000",
      SAR: "SAR 450",
      AED: "AED 450",
      default: "$120"
    },
    benefits: [
      "جدول دايت مصمم لهدفك",
      "كتاب وصفات دايت بطريقه الوصفه",
      "كتاب بدائل محسوب الكالوري",
      "فايل للمكملات الغذائيه بانواعها وفوائدها",
      "جدول لاداره وقتك لجعل صحتك اولويه",
      "جدول تدريبي احترافي",
      "فايل للاسترتشات قبل وبعد التمرين",
      "مراجعه تمرينك وتعديل الأداء ",
      "شيت لتسجيل الاوزان لمراقبه تطوك",
      "فايل للكارديو مناسب لهدفك",
      "فايل تعليمي لكسر المعلومات الخاطئه",
      "متابعه ع الواتساب يوميه",
      "مكالمه بدايه الاشتراك 10 دقائق",
      "مكالمه فيديو كل اسبوعين لعمل ابديت",
      "كشف مجانا مع دكتور علاج طبيعي"
    ] 
  },
  { 
    name: "Steroids users", 
    prices: {
      USD: "$200",
      EGP: "EGP 4000",
      SAR: "SAR 750",
      AED: "AED 750",
      default: "$200"
    },
    benefits: [
      "جدول دايت مصمم لهدفك",
      "كتاب وصفات دايت بطريقه الوصفه",
      "كتاب بدائل محسوب الكالوري",
      "فايل للمكملات الغذائيه بانواعها وفوائدها",
      "جدول لاداره وقتك لجعل صحتك اولويه",
      "جدول تدريبي احترافي",
      "فايل للاسترتشات قبل وبعد التمرين",
      "مراجعه تمرينك وتعديل الأداء ",
      "شيت لتسجيل الاوزان لمراقبه تطوك",
      "فايل للكارديو مناسب لهدفك",
      "فايل تعليمي لكسر المعلومات الخاطئه",
      "متابعه ع الواتساب يوميه",
      "مكالمه بدايه الاشتراك",
      "مكالمه فيديو كل أسبوع video call ",
      "متاح مكالمات تلفونيه ف اي وقت ف اليوم ",
      "كشف وجلسه مجانا مع دكتور علاج طبيعي محترف"
    ] 
  }
];

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
  // Add more countries as needed
};

const GymMembership = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [userCurrency, setUserCurrency] = useState("default");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const currency = countryCurrencyMap[data.country] || "default";
        setUserCurrency(currency);
      } catch (error) {
        console.error("Failed to fetch location:", error);
        setUserCurrency("default");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserLocation();
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
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Detecting your location for accurate pricing...</p>
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

      <div className="plans-grid">
        {plansData.map((plan, index) => (
          <motion.div
            key={index}
            className="membership-plan"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                {plan.prices[userCurrency] || plan.prices.default}
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
        ))}
      </div>

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
                <h4>{selectedPlan.name}</h4>
                <p>{selectedPlan.displayPrice}</p>
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
                  SEND PAYMENT PROOF VIA WHATSAPP
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