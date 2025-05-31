import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { CheckCircle, ExpandMore, ExpandLess, Star } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import "./GymMembership.css";

const plansData = [
  // === 3 Months Plans ===
  {
    name: "Basic Plan",
    duration: "3 Months",
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
    ],
    popular: false
  },
  {
    name: "Standard Plan",
    duration: "3 Months",
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
      "مراجعه تمرينك وتعديل الأداء",
      "شيت لتسجيل الاوزان لمراقبه تطوك",
      "فايل للكارديو مناسب لهدفك",
      "فايل تعليمي لكسر المعلومات الخاطئه",
      "متابعه يوميه ع الواتساب"
    ],
    popular: true
  },
  {
    name: "Premium Plan",
    duration: "3 Months",
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
      "مراجعه تمرينك وتعديل الأداء",
      "شيت لتسجيل الاوزان لمراقبه تطوك",
      "فايل للكارديو مناسب لهدفك",
      "فايل تعليمي لكسر المعلومات الخاطئه",
      "متابعه ع الواتساب يوميه",
      "مكالمه بدايه الاشتراك 10 دقائق",
      "مكالمه فيديو كل اسبوعين لعمل ابديت",
      "كشف مجانا مع دكتور علاج طبيعي"
    ],
    popular: false
  },
  {
    name: "Steroids Users",
    duration: "3 Months",
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
      "مراجعه تمرينك وتعديل الأداء",
      "شيت لتسجيل الاوزان لمراقبه تطوك",
      "فايل للكارديو مناسب لهدفك",
      "فايل تعليمي لكسر المعلومات الخاطئه",
      "متابعه ع الواتساب يوميه",
      "مكالمه بدايه الاشتراك",
      "مكالمه فيديو كل أسبوع video call",
      "متاح مكالمات تلفونيه ف اي وقت ف اليوم",
      "كشف وجلسه مجانا مع دكتور علاج طبيعي محترف"
    ],
    popular: false
  },

  // === 6 Months Plans ===
  {
    name: "Basic Plan",
    duration: "6 Months",
    prices: {
      USD: "$110",
      EGP: "EGP 2500",
      SAR: "SAR 400",
      AED: "AED 400",
      default: "$110"
    },
    benefits: [
      "نفس مميزات باقة الـ3 شهور الأساسية",
      "تطوير متقدم للجدول كل شهرين",
      "دعم مستمر لتثبيت العادات الصحية",
      "متابعة شهرية مكثفة",
      "تحديثات دورية على النظام الغذائي"
    ],
    popular: false
  },
  {
    name: "Standard Plan",
    duration: "6 Months",
    prices: {
      USD: "$150",
      EGP: "EGP 4500",
      SAR: "SAR 550",
      AED: "AED 550",
      default: "$150"
    },
    benefits: [
      "كل مميزات الباقة الأساسية",
      "إعادة تقييم كل شهر",
      "إضافة جلسة صوتية شهرية",
      "متابعة تدريب بالفيديو كل أسبوعين",
      "تحديثات شاملة كل شهرين",
      "دعم متقدم عبر الواتساب"
    ],
    popular: true
  },
  {
    name: "Premium Plan",
    duration: "6 Months",
    prices: {
      USD: "$200",
      EGP: "EGP 5500",
      SAR: "SAR 800",
      AED: "AED 800",
      default: "$200"
    },
    benefits: [
      "كل مميزات الباقات السابقة",
      "جلسة متابعة فيديو شهرية",
      "خطة مكملات مفصلة حسب الحالة",
      "أولوية الدعم والرد السريع",
      "تقييم شامل كل شهرين",
      "متابعة يومية مكثفة"
    ],
    popular: false
  },
  {
    name: "Steroids Users",
    duration: "6 Months",
    prices: {
      USD: "$400",
      EGP: "EGP 8000",
      SAR: "SAR 3000",
      AED: "AED 3000",
      default: "$400"
    },
    benefits: [
      "كل مميزات باقة الستيرويدز العادية",
      "جدول هرموني مخصص",
      "متابعة تحليل دم ربع سنوية",
      "استشارة طبية متقدمة",
      "متابعة يومية مكثفة",
      "دعم فوري عبر المكالمات"
    ],
    popular: false
  },

  // === 9 Months Plans ===
  {
    name: "Basic Plan",
    duration: "9 Months",
    prices: {
      USD: "$160",
      EGP: "EGP 4000",
      SAR: "SAR 620",
      AED: "AED 620",
      default: "$160"
    },
    benefits: [
      "نفس مميزات الـ6 شهور",
      "متابعة تحليل إنبودي إن أمكن",
      "جداول دايت متنوعة حسب المرحلة",
      "تحديثات شهرية شاملة",
      "دعم متقدم لتحقيق الأهداف"
    ],
    popular: false
  },
  {
    name: "Standard Plan",
    duration: "9 Months",
    prices: {
      USD: "$210",
      EGP: "EGP 7000",
      SAR: "SAR 820",
      AED: "AED 820",
      default: "$210"
    },
    benefits: [
      "كل مميزات Standard 6 شهور",
      "دعم مكثف أثناء الفترات الحرجة",
      "تعديل النظام عند الثبات",
      "جلسات شهرية متقدمة",
      "متابعة يومية مكثفة",
      "تقييم شامل كل شهرين"
    ],
    popular: true
  },
  {
    name: "Premium Plan",
    duration: "9 Months",
    prices: {
      USD: "$550",
      EGP: "EGP 8000",
      SAR: "SAR 1250",
      AED: "AED 1250",
      default: "$550"
    },
    benefits: [
      "نفس مميزات Premium 6 شهور",
      "جلسات تعليمية خاصة",
      "إعدادك لأسلوب حياة طويل الأمد",
      "متابعة يومية مكثفة",
      "دعم فوري عبر المكالمات",
      "تقييم شامل كل شهر"
    ],
    popular: false
  },
  {
    name: "Steroids Users",
    duration: "9 Months",
    prices: {
      USD: "$600",
      EGP: "EGP 12000",
      SAR: "SAR 2250",
      AED: "AED 2250",
      default: "$600"
    },
    benefits: [
      "نفس مميزات Steroids 6 شهور",
      "إشراف طبي أكثر دقة",
      "تحديثات شهرية شاملة",
      "متابعة تحاليل الدم الشهرية",
      "دعم فوري عبر المكالمات",
      "تقييم شامل كل شهر"
    ],
    popular: false
  },

  // === 12 Months Plans ===
  {
    name: "Basic Plan",
    duration: "12 Months",
    prices: {
      USD: "$220",
      EGP: "EGP 5000",
      SAR: "SAR 850",
      AED: "AED 850",
      default: "$220"
    },
    benefits: [
      "جداول مخصصة للمراحل المختلفة",
      "متابعة سنوية دقيقة",
      "استمرارية ودعم لحياة صحية شاملة",
      "+ 3 شهور مجانية",
      "تحديثات شهرية شاملة",
      "دعم متقدم لتحقيق الأهداف"
    ],
    popular: false
  },
  {
    name: "Standard Plan",
    duration: "12 Months",
    prices: {
      USD: "$300",
      EGP: "EGP 9000",
      SAR: "SAR 1000",
      AED: "AED 1000",
      default: "$300"
    },
    benefits: [
      "توسيع للمحتوى التعليمي",
      "جلسات تقييم كل ربع سنة",
      "خطة تطوير تدريجي مستمر",
      "+ 3 شهور مجانية",
      "متابعة يومية مكثفة",
      "دعم فوري عبر المكالمات"
    ],
    popular: true
  },
  {
    name: "Premium Plan",
    duration: "12 Months",
    prices: {
      USD: "$450",
      EGP: "EGP 11000",
      SAR: "SAR 1500",
      AED: "AED 1500",
      default: "$450"
    },
    benefits: [
      "أولوية قصوى في الدعم والتعديلات",
      "جلسات VIP كل شهر",
      "خطة دايت موسمية متغيرة",
      "+ 3 شهور مجانية",
      "متابعة يومية مكثفة",
      "دعم فوري عبر المكالمات"
    ],
    popular: false
  },
  {
    name: "Steroids Users",
    duration: "12 Months",
    prices: {
      USD: "$1600",
      EGP: "EGP 10000",
      SAR: "SAR 3000",
      AED: "AED 3000",
      default: "$1600"
    },
    benefits: [
      "إشراف كامل شامل سنوي",
      "تحاليل دورية وتحكم هرموني دقيق",
      "جلسات دكتور متقدمة حسب الحاجة",
      "+ 3 شهور مجانية",
      "متابعة يومية مكثفة",
      "دعم فوري عبر المكالمات"
    ],
    popular: false
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
    setPaymentDone(false);
  };

  const filteredPlans = plansData.filter(plan => plan.duration === activeDuration);

  const handleDurationChange = (duration) => {
    setActiveDuration(duration);
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
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