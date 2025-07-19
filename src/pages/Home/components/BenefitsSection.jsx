import React from "react";

// Progress bar data
const progressData = [
  { label: "Fast Delivery", percent: 95 },
  { label: "Verified Vendors", percent: 88 },
  { label: "Secure Payment", percent: 90 },
  { label: "Expert Support", percent: 85 },
];

const signatureUrl =
  "https://i.ibb.co/0RYRZBpT/Screenshot-2025-07-18-at-23-26-32-removebg-preview.png";


const BenefitsSection = () => (
  <section className="w-full py-8 flex justify-center items-center ">
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-[1700px] px-2">
      {/* Left Card: 2/3 width on desktop */}
      <div className="flex-[2] bg-[#ceddd1] rounded-2xl p-10 flex flex-col">
        {/* Responsive: stack on small screens, flex-row on md+ */}
        <div className="flex flex-col md:flex-row gap-10 w-full h-full">
          {/* Info & Signature */}
          <div className="flex flex-col flex-1 justify-between">
            <h2 className="text-3xl font-extrabold text-black mb-6">
              Trusted Healthcare Platform
            </h2>
            <p className="text-xl text-black mb-8 leading-relaxed">
              Your trusted online pharmacy connecting you with verified healthcare vendors. 
              Quality medicines, expert advice, and secure delivery to your doorstep. 
              Join thousands of satisfied customers who trust us for their healthcare needs.
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
          Why Choose
          <br />
          MediPharma?
        </h3>
        <p className="text-xl text-black mb-7 text-left">
          Experience the future of healthcare shopping. Connect with verified vendors, 
          get expert medical advice, and enjoy secure, fast delivery of quality medicines 
          right to your doorstep.
        </p>
        <button className="bg-[#396961] text-white text-xl font-bold py-3 px-10 rounded-full hover:bg-[#28524c] transition mt-10">
          Shop Now
        </button>
      </div>
    </div>
  </section>
);

export default BenefitsSection;
