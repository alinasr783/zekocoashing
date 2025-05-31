import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ai.css';

const Ai = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const chatPopupRef = useRef(null);


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
    { name: "إنستاباي", details: "yahya.mohamed8911@instapay", icon: "💳" },
    { name: "حساب CIB", details: "100045922329", icon: "🏦" },
    { name: "آيبان", details: "EG620010012000000100045922329", icon: "🌐" },
    { name: "باي بال", details: "yahyahatem53@gmail.com", icon: "🔵" },
    { name: "فودافون كاش", details: "0106 720 3240", icon: "📱" },
  ];

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI('AIzaSyDp8ufjKnO1UvAqonZvF1zaRwy3sYOYJI0');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // إغلاق النافذة عند النقر خارجها
    const handleClickOutside = (event) => {
      if (chatPopupRef.current && !chatPopupRef.current.contains(event.target) && 
          !event.target.closest('.assistant-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatResponse = (text) => {
    // تحويل النقاط إلى قوائم
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <li key={i}>{line.substring(2)}</li>;
      } else if (line.match(/^\d+\.\s/)) {
        return <li key={i}>{line.replace(/^\d+\.\s/, '')}</li>;
      } else if (line.trim() === '') {
        return <br key={i} />;
      } else {
        return <p key={i}>{line}</p>;
      }
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // بناء سياق المحادثة بناءً على الرسائل السابقة
      const conversationContext = messages.slice(-6).map(m => 
        `${m.sender === 'user' ? 'العميل' : 'الكابتن'}: ${m.text}`
      ).join('\n');

      const prompt = `
أنت كابتن يحيى حاتم (زيكو) - مدرب كمال أجسام دولي معتمد وأخصائي تغذية من القاهرة.
أنت الآن ترد على عميل محتمل عبر الدردشة المباشرة.

المعلومات الأساسية:
- التواصل: واتساب 01067203240 - الإيميل yahyahatem53@gmail.com
- البرنامج يصل خلال 48-96 ساعة
- لا يوجد استرجاع بعد الدفع
- مدة جميع الباقات: 3 أشهر (90 يوم)

${plansData.length > 0 ? `
الباقات المتاحة:
${plansData.map(p => `
* ${p.name} (${p.prices.EGP}):
${p.benefits.map(b => `  - ${b}`).join('\n')}
`).join('\n')}
` : ''}

${paymentMethods.length > 0 ? `
طرق الدفع:
${paymentMethods.map(p => `- ${p.name}: ${p.details}`).join('\n')}
` : ''}

سجل المحادثة:
${conversationContext}

الرسالة الجديدة من العميل:
"""${inputValue}"""

تعليمات الرد:
1. ركز على الإجابة المباشرة على سؤال العميل
2. استخدم لغة طبيعية غير رسمية
3. اجعل الإجابة مختصرة وواضحة
4. استخدم النقاط عند الحاجة لتنظيم المعلومات
5. لا تكرر المعلومات إلا إذا طلب العميل ذلك
6. اسأل العميل عن أي معلومات إضافية تحتاجها
7. لا تذكر الباقات أو الأسعار إلا إذا سأل عنها العميل
8. تأكد من ذكر مدة الباقات (3 أشهر) عند الحديث عنها
`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const botMessage = { 
        text: formatResponse(text), 
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: "عذراً، حصلت مشكلة في الاتصال. يرجى المحاولة مرة أخرى لاحقاً.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Error calling Gemini API:", error);
    } finally {
      setIsLoading(false);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    if (isOpen && unreadCount > 0) {
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="smart-assistant-container">
      {isOpen && (
        <div 
          className={`chat-popup ${isMinimized ? 'minimized' : ''}`} 
          ref={chatPopupRef}
        >
          <div className="chat-header">
            <div className="header-content">
              <div className="avatar">
                <img src="https://via.placeholder.com/40" alt="كابتن زيكو" />
              </div>
              <div className="header-info">
                <h3>كابتن زيكو</h3>
                <p className="status">متصل الآن</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="minimize-btn" onClick={toggleMinimize}>
                {isMinimized ? '➕' : '➖'}
              </button>
              <button className="close-btn" onClick={toggleChat}>
                ×
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chat-messages">
                <div className="welcome-message">
                  <p>مرحباً! 👋 أنا كابتن زيكو، كيف يمكنني مساعدتك اليوم؟</p>
                  <p>اسألني عن الباقات، البرامج التدريبية، أو أي استفسار آخر!</p>
                </div>

                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <div className="message-content">
                      {msg.text}
                    </div>
                    <div className="message-time">{msg.timestamp}</div>
                  </div>
                ))}

                {isLoading && (
                  <div className="message bot">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-container">
                <div className="quick-questions">
                  <button onClick={() => setInputValue("ما هي الباقات المتاحة؟")}>الباقات</button>
                  <button onClick={() => setInputValue("ما هي طرق الدفع؟")}>طرق الدفع</button>
                  <button onClick={() => setInputValue("ما هي مدة البرنامج؟")}>المدة</button>
                </div>
                <div className="chat-input">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك هنا..."
                    rows="1"
                  />
                  <button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !inputValue.trim()}
                    className="send-btn"
                  >
                    {isLoading ? (
                      <div className="spinner"></div>
                    ) : (
                      'إرسال'
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <button 
        className={`assistant-button ${unreadCount > 0 ? 'has-unread' : ''}`} 
        onClick={toggleChat}
      >
        <div className="button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
          </svg>
        </div>
        {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
      </button>
    </div>
  );
};

export default Ai;