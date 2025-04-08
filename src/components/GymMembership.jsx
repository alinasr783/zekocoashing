import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { EffectCube, Pagination } from "swiper/modules";
import { CheckCircle, ExpandMore, ExpandLess } from "@mui/icons-material"; 
import "./GymMembership.css";

const plans = [
  { 
    name: "Basic Plan", 
    price: "$30", 
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
    price: "$40", 
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
    price: "$60", 
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
    price: "$100", 
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

const GymMembership = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentPopup(true);
  };

  return (
    <div className="carousel" id="packages">
      <h2>Packages</h2>
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
            {plans.map((plan, index) => {
              const isExpanded = expandedIndex === index;
              const visibleBenefits = isExpanded ? plan.benefits : plan.benefits.slice(0, 4);

              return (
                <SwiperSlide key={index} className="plan-card">
                  <div className="plan-card-content">
                    <h3 className="plan-title">{plan.name}</h3>
                    <p className="plan-price">{plan.price}</p>
                    <ul className="plan-benefits">
                      {visibleBenefits.map((benefit, i) => (
                        <li key={i} className="plan-benefit">
                          <CheckCircle />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    {plan.benefits.length > 4 && (
                      <button className="show-more-btn" onClick={() => toggleExpand(index)}>
                        {isExpanded ? "Show Less" : "Show More"}
                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                      </button>
                    )}
                    <button className="subscribe-btn" onClick={() => handleSubscribe(plan)}>
                      اشتراك
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* نافذة الدفع */}
      {showPaymentPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>طرق الدفع</h3>
            <ul className="payment-list">
              {paymentMethods.map((method, index) => (
                <li key={index} className="payment-method">
                  <strong>{method.name} :</strong> {method.details}
                </li>
              ))}
            </ul>
            {!paymentDone ? (
              <button className="payment-btn" onClick={() => setPaymentDone(true)}>تمت عملية الدفع</button>
            ) : (
              <a href="https://wa.me/201067203240" className="whatsapp-btn2">
         قم بإرسال اسكرين التحويل وتواصل مع الكابتن 
              </a>
            )}
            <button className="close-btn" onClick={() => setShowPaymentPopup(false)}>إغلاق</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymMembership;