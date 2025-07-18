import React from "react";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";
import { NavLink } from "react-router";
import Logo from "../utility/Logo";

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
              <NavLink to="/shop">Shop</NavLink>
            </li>
            {/* Cart icon + text */}

            {/* Language dropdown */}
            <li tabIndex={0}>
              <details>
                <summary className="cursor-pointer flex items-center gap-2">
                  <span role="img" aria-label="flag">
                    🇬🇧
                  </span>
                  <span>English</span>
                </summary>
                <ul className="p-2 bg-[#CEDDD1] text-black rounded-t-none w-36">
                  <li>
                    <button className="flex items-center gap-2 w-full">
                      <span role="img" aria-label="flag">
                        🇬🇧
                      </span>
                      English
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-2 w-full">
                      <span role="img" aria-label="flag">
                        🇩🇪
                      </span>
                      Deutsch
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-center ">
          <div className="dropdown">
            {/* Hamburger Icon Button */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#CEDDD1] text-black rounded-box z-10 mt-3 w-52 p-2"
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/cart" className="flex items-center gap-2">
                  <FaShoppingCart />
                  <span>Cart</span>
                </a>
              </li>
              {/* Language Dropdown */}
              <li>
                <details>
                  <summary className="flex items-center gap-2">
                    <span role="img" aria-label="flag">
                      🇬🇧
                    </span>{" "}
                    English
                  </summary>
                  <ul className="p-2 bg-[#CEDDD1] text-black rounded-box">
                    <li>
                      <button className="flex items-center gap-2 w-full">
                        <span role="img" aria-label="flag">
                          🇬🇧
                        </span>{" "}
                        English
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-2 w-full">
                        <span role="img" aria-label="flag">
                          🇩🇪
                        </span>{" "}
                        Deutsch
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-end flex items-center gap-4 text-xl text-white">
          {/* Log in Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-full bg-transparent hover:bg-yellow-500 hover:text-black transition">
            <FaRegUser size={22} />
            <span>Log in</span>
          </button>

          <NavLink to="/cart" className="lg:flex hidden items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
            <FaShoppingCart size={22} />
            <span>Cart</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
