import React from "react";
import "./whatsapp.css"; // استيراد ملف الـ CSS

const WhatsApp = () => {
  const phoneNumber = "201067203240"; // رقم الواتساب المطلوب
  const message = encodeURIComponent("مرحبًا، أريد الاشتراك مع The professor coach"); // الرسالة الافتراضية

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      💬 تواصل عبر واتساب
    </a>
  );
};

export default WhatsApp;
