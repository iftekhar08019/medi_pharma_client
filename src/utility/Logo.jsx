import React from "react";
import { NavLink } from "react-router";

const Logo = () => {
  return (
    <div>
      <NavLink
        to="/"
        className="lg:text-2xl text-lg flex items-center justify-center lg:font-bold text-white lg:gap-3"
      >
        <svg
          className="h-10 w-10 pb-2"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cross */}
          <rect x="20" y="30" width="30" height="10" rx="2" fill="#5DD39E" />
          <rect x="33" y="15" width="10" height="35" rx="2" fill="#5DD39E" />
          {/* Bowl */}
          <ellipse
            cx="80"
            cy="100"
            rx="55"
            ry="35"
            fill="#EAF3EC"
            stroke="#5DD39E"
            strokeWidth="4"
          />
          {/* Leaf left */}
          <path d="M60 105 Q50 120, 80 130 Q65 115, 60 105 Z" fill="#5DD39E" />
          {/* Leaf right */}
          <path
            d="M100 105 Q110 120, 80 130 Q95 115, 100 105 Z"
            fill="#5DD39E"
          />
          {/* Pestle */}
          <rect
            x="98"
            y="53"
            width="10"
            height="40"
            rx="5"
            transform="rotate(25 98 53)"
            fill="#5DD39E"
          />
          {/* Liquid swirl */}
          <ellipse cx="80" cy="100" rx="30" ry="8" fill="#fff" opacity="0.8" />
          {/* Plant stems */}
          <path
            d="M87 65 Q110 35, 120 60 Q125 72, 122 75"
            stroke="#5DD39E"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="120" cy="60" r="4" fill="#5DD39E" />
          <circle cx="125" cy="72" r="3" fill="#5DD39E" />
          {/* Shadow */}
          <ellipse
            cx="80"
            cy="142"
            rx="45"
            ry="6"
            fill="#C0EFD7"
            opacity="0.6"
          />
        </svg>
        MediPharma
      </NavLink>
    </div>
  );
};

export default Logo;
