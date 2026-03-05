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
    {
      name: "Professor Base Protocol",
      tagline: "Build the Foundation",
      prices: {
        EGP: "4000 EGP",
        USD: "$130",
        AED: "470 AED"
      },
      benefits: [
        "بروتوكول دايت متكامل ومتنوع",
        "أداة تبديل لوجباتك عشان الملل",
        "كتاب وصفات كامل",
        "بروتوكول تمرين مناسب معتمد بخبرة سنين",
        "بروتوكول للموبيلتي والكور لرفع كفاءة الجسم",
        "أداة لتسجيل الأوزان والتكرارات لكل تمرين",
        "جدول كارديو مناسب للياقتك وهدفك",
        "مراجعة أداء التمرين للوصول لأفضل فورم",
        "متابعة يومية على الواتساب"
      ],
      popular: false
    },
    {
      name: "Professor Elite System",
      tagline: "Analyze. Optimize. Dominate.",
      prices: {
        EGP: "6000 EGP",
        USD: "$195",
        AED: "705 AED"
      },
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
        "أداة لمعرفة NF الخاص بأي وجبة"
      ],
      popular: true
    },
    {
      name: "Professor Black Protocol",
      tagline: "Competition Level Only",
      prices: {
        EGP: "10000 EGP",
        USD: "$320",
        AED: "1170 AED"
      },
      benefits: [
        "بـاقة مخصصة للتحضير للبطولات",
        "رفع المستوى الحالي لمستوى لاعب مسرح",
        "للتفاصيل تواصل عبر واتساب"
      ],
      popular: false
    }
  ];

  const paymentMethods = [
    { name: "إنستاباي", details: "yahya.mohamed8911@instapay", icon: "💳" },
    { name: "فودافون كاش", details: "0106 720 3240", icon: "📱" },
    { name: "حساب CIB", details: "100045922329", icon: "🏦" },
    { name: "آيبان", details: "EG620010012000000100045922329", icon: "🌐" },
    { name: "باي بال", details: "yahyahatem53@gmail.com", icon: "🔵" },
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
        `${m.sender === 'user' ? 'العميل' : 'The Professor'}: ${m.text}`
      ).join('\n');

      const prompt = `
أنت "The Professor Coach" (كابتن يحيى حاتم) - مدرب كمال أجسام دولي معتمد وأخصائي تغذية.
أنت الآن ترد على عميل محتمل عبر الدردشة المباشرة.

المعلومات الأساسية:
- التواصل: واتساب 01067203240 - الإيميل yahyahatem53@gmail.com
- البرنامج يصل خلال 48-96 ساعة
- لا يوجد استرجاع بعد الدفع

${plansData.length > 0 ? `
الباقات المتاحة (The Professor Protocols):
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
2. استخدم لغة قوية واحترافية (أسلوب البروفيسور)
3. اجعل الإجابة مختصرة وواضحة
4. استخدم النقاط عند الحاجة لتنظيم المعلومات
5. لا تكرر المعلومات إلا إذا طلب العميل ذلك
6. اسأل العميل عن أي معلومات إضافية تحتاجها
7. لا تذكر الباقات أو الأسعار إلا إذا سأل عنها العميل
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
                <img src="/logo.png" alt="The Professor" />
              </div>
              <div className="header-info">
                <h3>The Professor Coach</h3>
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
                  <p>مرحباً! 👋 أنا The Professor Coach، كيف يمكنني مساعدتك اليوم؟</p>
                  <p>اسألني عن باقات البروفيسور، البرامج التدريبية، أو أي استفسار آخر!</p>
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