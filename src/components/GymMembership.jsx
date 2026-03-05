import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { CheckCircle, Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import "./GymMembership.css";

const gulfCountries = ["AE", "SA", "KW", "QA", "OM", "BH"];

const useCurrencyLabel = () => {
  const [label, setLabel] = useState("$");
  useEffect(() => {
    const detect = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          const data = await res.json();
          if (data.country === "EG") setLabel("ج.م");
          else if (gulfCountries.includes(data.country)) setLabel("د.إ");
          else setLabel("$");
        } else {
          setLabel("$");
        }
      } catch {
        setLabel("$");
      }
    };
    detect();
  }, []);
  return label;
};

const packages = [
  {
    name: "Professor Base Protocol",
    tagline: "Build the Foundation",
    price: 4000,
    popular: false,
    benefits: [
      "بروتوكول دايت متكامل ومتنوع",
      "أداة تبديل لوجباتك عشان الملل",
      "كتاب وصفات كامل",
      "بروتوكول تمرين مناسب معتمد بخبرة سنين",
      "بروتوكول للموبيلتي والكور لرفع كفاءة الجسم",
      "أداة لتسجيل الأوزان والتكرارات لكل تمرين",
      "جدول كارديو مناسب للياقتك وهدفك",
      "مراجعة أداء التمرين للوصول لأفضل فورم",
      "متابعة يومية على الواتساب",
    ],
  },
  {
    name: "Professor Elite System",
    tagline: "Analyze. Optimize. Dominate.",
    subtitle: "Full Performance Control",
    price: 6000,
    popular: true,
    benefits: [
      "مكالمة فيديو بداية الاشتراك وكل أسبوع",
      "بروتوكول دايت متكامل ومتنوع",
      "أداة تبديل لوجباتك عشان الملل",
      "بروتوكول مكملات يناسب هدفنا",
      "بروتوكول تمرين معتمد بخبرة سنين",
      "العمر البيولوجي لجسمك بالتحليل",
      "بروتوكول للموبيلتي والكور لرفع كفاءة الجسم",
      "بروتوكول للاسترتشات",
      "بروتوكول لتمارين التصحيح",
      "أداة لتسجيل الأوزان والتكرارات لكل تمرين",
      "جدول كارديو مناسب للياقتك وهدفك",
      "مراجعة أداء التمرين للوصول لأفضل فورم",
      "متابعة يومية على الواتساب",
      "تقييم وتحليل لأداءك التدريبي الأسبوعي",
      "تحليل الريكافري والنوم والإجهاد والهضم",
      "أداة لمعرفة NF الخاص بأي وجبة",
    ],
  },
  {
    name: "Professor Black Protocol",
    tagline: "Competition Level Only.",
    price: 10000,
    popular: false,
    benefits: [
      "بـاقة مخصصة للتحضير للبطولات",
      "رفع المستوى الحالي لمستوى لاعب مسرح",
      "للتفاصيل تواصل عبر واتساب",
    ],
    ctaNote: "للتفاصيل أكثر عنها ابعتلي رسالة من هنا 👇🏻",
  },
];

const GymMembership = () => {
  const currencyLabel = useCurrencyLabel();
  const waNumber = "201067203240";

  const displayedPackages = useMemo(() => packages, []);

  const priceText = (amount) => `${amount} ${currencyLabel}`;

  const onSubscribe = (planName) => {
    const message = encodeURIComponent(`حابب أشترك في: ${planName}`);
    window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="gym-membership-container" id="packages">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        باقات <span>الاشتراك</span>
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        اختر الباقة المناسبة لهدفك — العرض بالعملة: {currencyLabel}
      </motion.p>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="plans-swiper"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {displayedPackages.map((plan, index) => (
          <SwiperSlide key={plan.name}>
            <motion.div
              className={`membership-plan ${plan.popular ? "popular-plan" : ""}`}
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
                {plan.tagline && (
                  <div className="plan-duration">
                    <span className="duration-badge">{plan.tagline}</span>
                  </div>
                )}
                {plan.subtitle && (
                  <div className="plan-duration" style={{ marginTop: 8 }}>
                    <span className="duration-badge">{plan.subtitle}</span>
                  </div>
                )}
                <div className="plan-price-container">
                  <div className="plan-price">{priceText(plan.price)}</div>
                </div>
                <div className="price-underline"></div>
              </div>
              <ul className="plan-benefits">
                {plan.benefits.map((benefit, i) => (
                  <motion.li key={i} className="benefit-item" whileHover={{ x: 5 }}>
                    <CheckCircle className="benefit-icon" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              {plan.ctaNote && (
                <div className="section-subtitle" style={{ marginTop: 10 }}>
                  {plan.ctaNote}
                </div>
              )}
              <motion.button
                className="subscribe-btn"
                onClick={() => onSubscribe(plan.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                اشترك الآن عبر واتساب
              </motion.button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GymMembership;
