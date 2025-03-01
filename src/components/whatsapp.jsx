import React from "react";
import "./whatsapp.css"; // استيراد ملف الـ CSS

const WhatsApp = () => {
  const phoneNumber = "20106720 3240"; // رقم الواتساب المطلوب
  const message = encodeURIComponent("مرحبًا، أنا مهتم بخدماتكم!"); // الرسالة الافتراضية

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      💬 تواصل معنا
    </a>
  );
};

export default WhatsApp;