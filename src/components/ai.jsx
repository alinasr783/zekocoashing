import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ai.css';

const Ai = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Plans and payment data
  const plansData = [
    {
      name: "Basic Plan",
      prices: { USD: "$60", EGP: "EGP 1500", SAR: "SAR 220", AED: "AED 220", default: "$60" },
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
      prices: { USD: "$80", EGP: "EGP 2500", SAR: "SAR 290", AED: "AED 290", default: "$80" },
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
      prices: { USD: "$120", EGP: "EGP 3000", SAR: "SAR 450", AED: "AED 450", default: "$120" },
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
      prices: { USD: "$200", EGP: "EGP 4000", SAR: "SAR 750", AED: "AED 750", default: "$200" },
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

  const greetings = ["مرحباً", "اهلاً", "السلام عليكم", "اهلا وسهلا"];

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI('AIzaSyDp8ufjKnO1UvAqonZvF1zaRwy3sYOYJI0');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const enhanceQuestion = (userMessage) => {
    return `أنت مساعد ذكي تمثل كابتن يحيي حاتم (يحيي زيكو)، مدرب كمال أجسام معتمد دوليًا وأخصائي تغذية من القاهرة. 

    المطلوب:
    - الرد بطريقة طبيعية غير رسمية ولكن ليست مزيفة
    - التركيز على المعلومات المهمة أولاً
    - استخدام جمل قصيرة وواضحة
    - تنظيم المعلومات في نقاط عندما تكون طويلة

    معلومات أساسية:
    - التواصل: واتساب 01067203240 - الإيميل yahyahatem53@gmail.com
    - البرنامج يصل خلال 48-96 ساعة
    - لا يوجد استرجاع بعد الدفع

    السؤال: "${userMessage}"

    أجب بطريقة مفيدة ومنظمة، مع التركيز على:
    - شرح الخطوات بوضوح عند السؤال عن الاشتراك
    - ذكر الأساسيات أولاً ثم التفاصيل
    - عدم الإطالة في الردود غير الضرورية`;
  };

  const formatResponse = (text) => {
    // Convert markdown-like lists to JSX
    const parts = text.split(/(\d+\.\s.+|\-\s.+)/g);

    return parts.map((part, index) => {
      if (part.match(/^\d+\.\s.+/)) {
        return <li key={index}>{part.replace(/^\d+\.\s/, '')}</li>;
      } else if (part.match(/^\-\s.+/)) {
        return <li key={index}>{part.replace(/^\-\s/, '')}</li>;
      } else if (part.trim() !== '') {
        return <p key={index}>{part}</p>;
      }
      return null;
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const enhancedContext = `
  أنت تمثل كابتن يحيى حاتم (زيكو) — مدرب دولي معتمد وأخصائي تغذية من القاهرة.

  البيانات المتاحة:
  - التواصل: واتساب 01067203240 | إيميل: yahyahatem53@gmail.com
  - وقت التسليم: خلال 48 - 96 ساعة
  - لا يوجد استرجاع بعد الدفع

  الباقات:
  ${plansData.map(plan => `* ${plan.name} - ${plan.prices.EGP}\n${plan.benefits.map(b => `  - ${b}`).join('\n')}`).join('\n\n')}

  طرق الدفع:
  ${paymentMethods.map(method => `- ${method.name}: ${method.details}`).join('\n')}

  السؤال: """${inputValue}"""

  الرد المطلوب:
  - يكون طبيعي، مختصر، ويفهم السياق
  - يجاوب على السؤال فقط من غير مقدمات زايدة
  - يستخدم نقاط لو فيه شرح
  - لا تكرر المعلومات 
  - اسأله عن اي معلومة تانيه لو كان السؤال غير واضح
  - لا ترسل له الباقات والاسعار بدون سبب لان هذا مزعج 
  - كل الباقات مدتها 90 يوم يعني ٣ شهور 
  `;

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(enhancedContext);
      const response = await result.response;
      const text = response.text();

      const formattedResponse = formatResponse(text);
      setMessages(prev => [...prev, { text: formattedResponse, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "حصلت مشكلة أثناء المعالجة. جرب تاني بعد شوية.",
        sender: 'bot'
      }]);
      console.error("Error calling Gemini API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return ( 
    <div className="smart-assistant-container">
      {isOpen && ( 
        <div className="chat-popup">
          <div className="chat-header">
            <h3>كابتن زيكو</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}> 
              × 
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => ( 
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text} 
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

          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
            />
            <button onClick={handleSendMessage} disabled={isLoading}>
              إرسال
            </button>
          </div>
        </div>
      )}

      <button className="assistant-button" onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
        </svg>
      </button>
    </div>
  );
};

export default Ai;