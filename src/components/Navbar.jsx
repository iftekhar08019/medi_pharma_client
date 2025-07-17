import React from "react";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="py-10">
      <div className="navbar shadow-sm bg-[#396961] w-[96%] mx-auto rounded-xl p-5 z-50 sticky top-10">
        <div className="navbar-start hidden lg:flex font-semibold text-white">
          <ul className="menu menu-horizontal px-1 text-xl">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">Item 2</NavLink>
            </li>
            <li>
              <NavLink to="/">Item 3</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-center ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#CEDDD1] rounded-box z-1 mt-3 w-52 p-2 "
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
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
              <rect
                x="20"
                y="30"
                width="30"
                height="10"
                rx="2"
                fill="#5DD39E"
              />
              <rect
                x="33"
                y="15"
                width="10"
                height="35"
                rx="2"
                fill="#5DD39E"
              />
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
              <path
                d="M60 105 Q50 120, 80 130 Q65 115, 60 105 Z"
                fill="#5DD39E"
              />
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
              <ellipse
                cx="80"
                cy="100"
                rx="30"
                ry="8"
                fill="#fff"
                opacity="0.8"
              />
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
        <div className="navbar-end flex items-center gap-4">
          {/* Log in Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-full bg-transparent hover:bg-white hover:text-[#386960] transition">
            <FaRegUser size={22} />
            <span>Log in</span>
          </button>

          {/* Book Appointment Button */}
          <button className="px-8 py-3 bg-white text-[#232323] font-bold rounded-full shadow-md hover:bg-gray-100 transition hidden lg:block">
            Book A Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
