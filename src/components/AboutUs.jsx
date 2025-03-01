import React, { useEffect, useState, useRef } from "react";
import "./AboutUs.css";

const text = `كابتن يحيي حاتم الشهير ب يحيي زيكو  
مدرب كمال أجسام معتمد دولياً وأخصائي تغذية  
أمارس رياضه كمال الاجسام منذ عام 2009 
ترعرت في هذه الرياضه وأصبحت كل شغفي وبفضل الله وخبرتي في مجال كمال الاجسام .. قمت بمتابعة عملاء بجداول تمارين وتغذيه ومتابعه احترافيه ليصلوا لمستويات كانت باأحلامهم وأشارك معكم محتويا من خلال موقعي الرسمي ومنصات التواصل الاجتماعي لمساعدة الأشخاص علي تحقيق أهدافهم 🎩
التدريب جنون والجنون فنون
فاأبدأ الآن مع البروفيسور المجنون 
فكن من المحظوظين لصناعه جسم احلامك 
بصحه خارقه بأذن الله`;

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className={`about-container ${isVisible ? "fade-in" : "hidden"}`} id="AboutUs">
      <h2 className="about-title">About Us</h2>
      <p className="about-text">{text}</p>
    </div>
  );
};

export default AboutUs;