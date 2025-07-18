import React from "react";
import Marquee from "react-fast-marquee";
import { FaLeaf, FaCapsules, FaRegHospital, FaStethoscope, FaHeartbeat, FaStar } from "react-icons/fa";

// Dummy brands; you can add more or use real data/logos
const brandsRow1 = [
  { name: "WYNDHAM", icon: <FaRegHospital /> },
  { name: "dutchie", icon: <FaLeaf /> },
  { name: "Lume.", icon: <FaStar />, bold: true },
  { name: "PurCann", icon: <FaCapsules /> },
  { name: "Emblem", icon: <FaStethoscope /> },
  { name: "GALAXIE", icon: <FaHeartbeat /> },
];

const brandsRow2 = [
  { name: "PROHBTD", icon: <FaRegHospital /> },
  { name: "Hellma", icon: <FaLeaf /> },
  { name: "Supurb.", icon: <FaStar />, bold: true },
  { name: "WYNDHAM", icon: <FaRegHospital /> },
  { name: "dutchie", icon: <FaLeaf /> },
  { name: "Lume.", icon: <FaStar />, bold: true },
];

const CARD_BG = "bg-[#CEDDD1]";
const MAIN_COLOR = "text-[#396961]";

const BrandCard = ({ name, icon, bold }) => (
  <div
    className={`flex items-center justify-center ${CARD_BG} rounded-xl mx-4 shadow px-8 py-4 min-w-[180px]`}
    style={{ minHeight: "72px" }}
  >
    <span className={`text-2xl md:text-3xl mr-3 ${MAIN_COLOR}`}>
      {icon}
    </span>
    <span
      className={`text-xl md:text-2xl ${bold ? "font-extrabold" : "font-semibold"} ${MAIN_COLOR}`}
    >
      {name}
    </span>
  </div>
);

const MarqueeSection = () => (
  <section className="w-full py-12 bg-transparent">
    <h1 className="text-4xl font-bold text-center my-10 text-black">Our Associated Brands</h1>
      <p className="text-center text-black text-lg mb-10">
        Discover our trusted brands and partners in healthcare & medicine.
      </p>
    {/* First Marquee (Left to Right) */}
    <Marquee pauseOnHover={true} speed={40} gradient={false} className="mb-4">
      {brandsRow1.map((brand, idx) => (
        <BrandCard key={idx} {...brand} />
      ))}
    </Marquee>
    {/* Second Marquee (Right to Left) */}
    <Marquee
      pauseOnHover={true}
      speed={40}
      gradient={false}
      direction="right"
      className=""
    >
      {brandsRow2.map((brand, idx) => (
        <BrandCard key={idx} {...brand} />
      ))}
    </Marquee>
  </section>
);

export default MarqueeSection;
