import React, { useState } from "react";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router";
import Logo from "../utility/Logo";
import AuthModal from "../utility/AuthModal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="py-4 sm:py-6 lg:py-10">
        <div className="navbar shadow-sm bg-[#396961] w-[96%] mx-auto rounded-xl p-3 sm:p-4 lg:p-5 z-50 sticky top-4 sm:top-6 lg:top-10">
          {/* Desktop Navigation */}
          <div className="navbar-start hidden lg:flex font-semibold text-white">
            <ul className="menu menu-horizontal px-1 text-xl">
              <li>
                <NavLink to="/" className="hover:text-yellow-300 transition-colors">Home</NavLink>
              </li>
              <li>
                <NavLink to="/shops" className="hover:text-yellow-300 transition-colors">Shop</NavLink>
              </li>
              {/* Language dropdown */}
              <li tabIndex={0}>
                <details>
                  <summary className="cursor-pointer flex items-center gap-2 hover:text-yellow-300 transition-colors">
                    <span role="img" aria-label="flag">
                      🇬🇧
                    </span>
                    <span>English</span>
                  </summary>
                  <ul className="p-2 bg-[#CEDDD1] text-black rounded-t-none w-36">
                    <li>
                      <button className="flex items-center gap-2 w-full hover:bg-[#b8c9bc] transition-colors">
                        <span role="img" aria-label="flag">
                          🇬🇧
                        </span>
                        English
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-2 w-full hover:bg-[#b8c9bc] transition-colors">
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

          {/* Mobile Menu Button */}
          <div className="navbar-start lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost text-white hover:bg-[#2e5a52] transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Logo - Centered */}
          <div className="navbar-center">
            <Logo />
          </div>

          {/* Desktop Right Side */}
          <div className="navbar-end hidden lg:flex items-center gap-4 text-xl text-white">
            {/* Log in Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-full bg-transparent hover:bg-yellow-500 hover:text-black transition-colors"
              onClick={() => setShowModal(true)}
            >
              <FaRegUser size={22} />
              <span>Join Us</span>
            </button>

            <NavLink
              to="/cart"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FaShoppingCart size={22} />
              <span>Cart</span>
            </NavLink>
          </div>

          {/* Mobile Right Side - Only Join Us button */}
          <div className="navbar-end lg:hidden">
            <button
              className="flex items-center gap-1 px-2 py-1 text-white font-medium rounded-full bg-transparent hover:bg-yellow-500 hover:text-black transition-colors"
              onClick={() => setShowModal(true)}
            >
              <FaRegUser size={18} />
              <span className="text-sm">Join</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-[96%] mx-auto mt-2 bg-[#CEDDD1] rounded-xl p-4 shadow-lg">
            <ul className="space-y-3 text-black">
              <li>
                <NavLink 
                  to="/" 
                  className="block py-2 px-3 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/shops" 
                  className="block py-2 px-3 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/cart" 
                  className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaShoppingCart size={16} />
                  <span>Cart</span>
                </NavLink>
              </li>
              {/* Language Dropdown for Mobile */}
              <li>
                <details className="dropdown">
                  <summary className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium cursor-pointer">
                    <span role="img" aria-label="flag">
                      🇬🇧
                    </span>
                    <span>English</span>
                  </summary>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>
                      <button className="flex items-center gap-2 w-full py-1 px-3 rounded-lg hover:bg-[#b8c9bc] transition-colors text-sm">
                        <span role="img" aria-label="flag">
                          🇬🇧
                        </span>
                        English
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-2 w-full py-1 px-3 rounded-lg hover:bg-[#b8c9bc] transition-colors text-sm">
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
        )}
      </div>
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
