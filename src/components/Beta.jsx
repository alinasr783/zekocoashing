import React from "react";

const sections = [
  {
    id: "home",
    label: "الرئيسية",
    images: ["https://i.ibb.co/HfLKDMm4/39eb3669-a91d-43f9-b9e6-73e8541a5056.jpg"]
  },
  {
    id: "coach",
    label: "تعريف بالمدرب",
    images: [
      "https://i.ibb.co/mCNC6XjM/30b1d368-024d-4480-8fb3-4fa864b28242.jpg",
      "https://i.ibb.co/HvfqmcF/b00fe469-ec8b-44cf-ac41-78552c8ada60.jpg"
    ]
  },
  {
    id: "packages",
    label: "الأسعار (الباقات)",
    images: ["https://i.ibb.co/jjN66xc/07d85481-2843-4cf3-ab7b-de528890fc2e.jpg"]
  },
  {
    id: "package-1",
    label: "تفاصيل الباقة الأولى",
    images: ["https://i.ibb.co/214V5J4B/08fc6082-2909-41ad-9ebd-8a9b220830e6.jpg"]
  },
  {
    id: "package-2",
    label: "تفاصيل الباقة الثانية",
    images: ["https://i.ibb.co/vxbk4xtV/659df3d4-903b-4ef0-adb8-49fc30ded473.jpg"]
  },
  {
    id: "package-3",
    label: "تفاصيل الباقة الثالثة",
    images: ["https://i.ibb.co/7JQYw5kx/d15840a8-a373-410b-be05-7c902e656db5.jpg"]
  },
  {
    id: "steps",
    label: "خطوات العمل",
    images: ["https://i.ibb.co/vCq2FXVR/425f4a1b-92e5-49df-91c6-55a10a785866.jpg"]
  },
  {
    id: "system",
    label: "نظام العمل",
    images: ["https://i.ibb.co/gbfGh1QJ/64149ad8-6e0b-491c-bb04-b4fcb8d01c65.jpg"]
  },
  {
    id: "contact",
    label: "طرق التواصل",
    images: ["https://i.ibb.co/YTYX6Ff2/d9fb97d3-2a63-4363-9a10-c1e3626337e3.jpg"]
  }
];

const Beta = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div dir="rtl" style={{ width: "100%", background: "#000", color: "#fff" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: "rgba(0, 0, 0, 0.88)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(10px)"
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 12px",
            flexWrap: "wrap"
          }}
        >
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              style={{
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255, 255, 255, 0.18)",
                background: "rgba(255, 255, 255, 0.06)",
                color: "#fff",
                fontFamily: '"Tajawal", sans-serif',
                fontWeight: 700,
                fontSize: 14,
                lineHeight: 1.1
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ width: "100%", paddingTop: 70 }}>
        {sections.map((section) => (
          <section key={section.id} id={section.id} style={{ scrollMarginTop: 80 }}>
            {section.images.map((src, idx) => (
              <img
                key={`${section.id}-${idx}`}
                src={src}
                alt={`${section.id}-${idx + 1}`}
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  margin: 0,
                  padding: 0,
                  objectFit: "cover"
                }}
              />
            ))}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Beta;
