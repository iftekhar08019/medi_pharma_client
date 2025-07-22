import React, { useState, useContext, useRef, useEffect } from "react";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router";
import Logo from "../utility/Logo";
import AuthModal from "../utility/AuthModal";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdownDesktop, setShowDropdownDesktop] = useState(false);
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);
  const { cart } = useCart();
  const { user, logOut } = useContext(AuthContext);
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const dropdownRefDesktop = useRef(null);
  const dropdownRefMobile = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRefDesktop.current && !dropdownRefDesktop.current.contains(event.target)) {
        setShowDropdownDesktop(false);
      }
    }
    if (showDropdownDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdownDesktop]);

  // Close mobile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRefMobile.current && !dropdownRefMobile.current.contains(event.target)) {
        setShowDropdownMobile(false);
      }
    }
    if (showDropdownMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdownMobile]);

  const handleLogout = async (isDesktop) => {
    await logOut();
    if (isDesktop) setShowDropdownDesktop(false);
    else setShowDropdownMobile(false);
    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "You have been successfully logged out.",
      timer: 1800,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  // Helper for avatar
  const avatarUrl = user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "U")}&background=2e7153&color=fff&rounded=true&size=64`;

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
            {/* Log in Button or Avatar */}
            {!user ? (
              <button
                className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-full bg-transparent hover:bg-yellow-500 hover:text-black transition-colors"
                onClick={() => setShowModal(true)}
              >
                <FaRegUser size={22} />
                <span>Join Us</span>
              </button>
            ) : (
              <div className="relative" ref={dropdownRefDesktop}>
                <button
                  className="flex items-center gap-2 px-2 py-1 bg-white rounded-full hover:bg-gray-200 transition-colors border border-gray-200 focus:outline-none"
                  onClick={() => setShowDropdownDesktop((v) => !v)}
                >
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#2e7153]"
                  />
                  <FaChevronDown className="text-[#2e7153]" />
                </button>
                {showDropdownDesktop && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 flex flex-col text-black">
                    <button className="px-4 py-2 hover:bg-[#eaf3ec] text-left" onClick={() => { setShowDropdownDesktop(false); /* navigate to update profile */ }}>
                      Update Profile
                    </button>
                    <button className="px-4 py-2 hover:bg-[#eaf3ec] text-left" onClick={() => { setShowDropdownDesktop(false); /* navigate to dashboard */ }}>
                      Dashboard
                    </button>
                    <button className="px-4 py-2 hover:bg-red-100 text-left text-red-600 font-semibold" onClick={() => handleLogout(true)}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <NavLink
              to="/cart"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors relative"
            >
              <span className="relative">
                <FaShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute bottom-4 -right-18 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </span>
              <span>Cart</span>
            </NavLink>
          </div>

          {/* Mobile Right Side - Only Join Us button or Avatar */}
          <div className="navbar-end lg:hidden">
            {!user ? (
              <button
                className="flex items-center gap-1 px-2 py-1 text-white font-medium rounded-full bg-transparent hover:bg-yellow-500 hover:text-black transition-colors"
                onClick={() => setShowModal(true)}
              >
                <FaRegUser size={18} />
                <span className="text-sm">Join</span>
              </button>
            ) : (
              <div className="relative" ref={dropdownRefMobile}>
                <button
                  className="flex items-center gap-1 px-1 py-1 bg-white rounded-full hover:bg-gray-200 transition-colors border border-gray-200 focus:outline-none"
                  onClick={() => setShowDropdownMobile((v) => !v)}
                >
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#2e7153]"
                  />
                  <FaChevronDown className="text-[#2e7153] text-xs" />
                </button>
                {showDropdownMobile && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-50 flex flex-col text-black">
                    <button className="px-4 py-2 hover:bg-[#eaf3ec] text-left" onClick={() => { setShowDropdownMobile(false); /* navigate to update profile */ }}>
                      Update Profile
                    </button>
                    <button className="px-4 py-2 hover:bg-[#eaf3ec] text-left" onClick={() => { setShowDropdownMobile(false); /* navigate to dashboard */ }}>
                      Dashboard
                    </button>
                    <button className="px-4 py-2 hover:bg-red-100 text-left text-red-600 font-semibold" onClick={() => handleLogout(false)}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
                  className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="relative">
                    <FaShoppingCart size={16} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[18px] text-center border-2 border-white">
                        {cartCount}
                      </span>
                    )}
                  </span>
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
