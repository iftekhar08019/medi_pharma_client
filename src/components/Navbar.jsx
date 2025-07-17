import React from "react";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router";
import { NavLink } from "react-router";
import mediPharmaLogo from "../assets/medi_pharma_logo.png";

const Navbar = () => {
  return (
    <div className="py-10">
      <div className="navbar shadow-sm bg-[#396961] w-[96%] mx-auto rounded-xl p-5 z-50 sticky top-10">
        <div className="navbar-start font-semibold text-white">
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
        <div className="navbar-center hidden lg:flex">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
            className="text-2xl flex items-center font-bold text-white"
          >
            <img
              src={mediPharmaLogo}
              alt="Medi Pharma Logo"
              className="h-17 w-17 object-contain"
            />
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
          <button className="px-8 py-3 bg-white text-[#232323] font-bold rounded-full shadow-md hover:bg-gray-100 transition">
            Book A Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
