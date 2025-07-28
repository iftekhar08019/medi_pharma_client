import React from "react";
import { useTranslation } from "react-i18next";

const BenefitsSection = () => {
  const { t } = useTranslation();

  // Progress bar data
  const progressData = [
    { label: t('home.benefits.delivery.title'), percent: 95 },
    { label: t('home.benefits.quality.title'), percent: 88 },
    { label: t('home.benefits.secure.title'), percent: 90 },
    { label: t('home.benefits.support.title'), percent: 85 },
  ];

  const signatureUrl =
    "https://i.ibb.co/0RYRZBpT/Screenshot-2025-07-18-at-23-26-32-removebg-preview.png";

  return (
    <section className="w-full py-8 flex justify-center items-center ">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-[1700px] px-2">
        {/* Left Card: 2/3 width on desktop */}
        <div className="flex-[2] bg-[#ceddd1] rounded-2xl p-10 flex flex-col">
          {/* Responsive: stack on small screens, flex-row on md+ */}
          <div className="flex flex-col md:flex-row gap-10 w-full h-full">
            {/* Info & Signature */}
            <div className="flex flex-col flex-1 justify-between">
              <h2 className="text-3xl font-extrabold text-black mb-6">
                {t('home.benefits.title')}
              </h2>
              <p className="text-xl text-black mb-8 leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <img
                  src={signatureUrl}
                  alt="Signature"
                  className="w-40 object-contain mb-2"
                />
                <span className="text-[#399961] text-lg">
                  – Assured by CEO of MediPharma
                </span>
              </div>
            </div>
            {/* Progress Bars */}
            <div className="flex-1 flex flex-col justify-center max-w-xl w-full min-w-[230px]">
              {progressData.map((item) => (
                <div key={item.label} className="mb-7 last:mb-0 w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-2xl font-bold text-black">
                      {item.label}
                    </span>
                    <span className="text-2xl font-extrabold text-black">
                      {item.percent}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-yellow-300 rounded">
                    <div
                      className="h-2 rounded bg-[#396961] transition-all duration-700"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Benefits Card: 1/3 width */}
        <div
          className="flex-1 bg-[#f5d377] rounded-2xl p-10 flex flex-col items-start justify-between relative"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/7NgkdK0y/istockphoto-1304042415-612x612-removebg-preview.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom right",
            backgroundSize: "60% auto",
          }}
        >
          <h3 className="text-4xl md:text-5xl font-extrabold mb-5 text-black leading-tight text-left">
            {t('home.benefits.title')}
          </h3>
          <p className="text-xl text-black mb-7 text-left">
            {t('footer.description')}
          </p>
          <button className="bg-[#396961] text-white text-xl font-bold py-3 px-10 rounded-full hover:bg-[#28524c] transition mt-10">
            {t('home.hero.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
