import React, { useState, useContext, useRef, useEffect } from "react";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import Logo from "../utility/Logo";
import AuthModal from "../utility/AuthModal";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdownDesktop, setShowDropdownDesktop] = useState(false);
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);
  const [showLanguageDropdownDesktop, setShowLanguageDropdownDesktop] = useState(false);
  const [showLanguageDropdownMobile, setShowLanguageDropdownMobile] = useState(false);
  const { cart } = useCart();
  const { user, logOut } = useContext(AuthContext);
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const dropdownRefDesktop = useRef(null);
  const dropdownRefMobile = useRef(null);
  const languageDropdownRefDesktop = useRef(null);
  const languageDropdownRefMobile = useRef(null);
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRefDesktop.current && !dropdownRefDesktop.current.contains(event.target)) {
        setShowDropdownDesktop(false);
      }
      if (languageDropdownRefDesktop.current && !languageDropdownRefDesktop.current.contains(event.target)) {
        setShowLanguageDropdownDesktop(false);
      }
    }
    if (showDropdownDesktop || showLanguageDropdownDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdownDesktop, showLanguageDropdownDesktop]);

  // Close mobile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRefMobile.current && !dropdownRefMobile.current.contains(event.target)) {
        setShowDropdownMobile(false);
      }
      if (languageDropdownRefMobile.current && !languageDropdownRefMobile.current.contains(event.target)) {
        setShowLanguageDropdownMobile(false);
      }
    }
    if (showDropdownMobile || showLanguageDropdownMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdownMobile, showLanguageDropdownMobile]);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      const mobileMenu = document.querySelector('.mobile-menu-dropdown');
      const mobileMenuButton = document.querySelector('.mobile-menu-button');
      
      if (mobileMenu && !mobileMenu.contains(event.target) && 
          mobileMenuButton && !mobileMenuButton.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }
    
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setShowLanguageDropdownDesktop(false);
    setShowLanguageDropdownMobile(false);
  };

  // Helper for avatar
  const avatarUrl = user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "U")}&background=2e7153&color=fff&rounded=true&size=64`;

  const getLanguageFlag = (lang) => {
    return lang === 'en' ? '🇬🇧' : '🇩🇪';
  };

  const getLanguageName = (lang) => {
    return lang === 'en' ? 'English' : 'Deutsch';
  };

  return (
    <>
      <div className="sticky -top-4 lg:-top-[39px] z-50 py-4 sm:py-6 lg:py-10">
        <div className="navbar shadow-sm bg-[#396961] w-[96%] mx-auto rounded-xl p-3 sm:p-4 lg:p-5">
          {/* Desktop Navigation */}
          <div className="navbar-start hidden lg:flex font-semibold text-white">
            <ul className="menu menu-horizontal px-1 text-xl">
              <li>
                <NavLink to="/" className="hover:text-yellow-300 transition-colors">{t('navbar.home')}</NavLink>
              </li>
              <li>
                <NavLink to="/shops" className="hover:text-yellow-300 transition-colors">{t('navbar.shop')}</NavLink>
              </li>
              {/* Language dropdown */}
              <li className="relative" ref={languageDropdownRefDesktop}>
                <button 
                  className="cursor-pointer flex items-center gap-2 hover:text-yellow-300 transition-colors"
                  onClick={() => setShowLanguageDropdownDesktop(!showLanguageDropdownDesktop)}
                >
                  <span role="img" aria-label="flag">
                    {getLanguageFlag(currentLanguage)}
                  </span>
                  <span>{getLanguageName(currentLanguage)}</span>
                  <FaChevronDown className="text-xs" />
                </button>
                {showLanguageDropdownDesktop && (
                  <ul className="absolute top-full left-0 mt-1 p-2 bg-[#CEDDD1] text-black rounded-lg w-36 shadow-lg z-50">
                    <li>
                      <button 
                        className="flex items-center gap-2 w-full hover:bg-[#b8c9bc] transition-colors p-2 rounded"
                        onClick={() => handleLanguageChange('en')}
                      >
                        <span role="img" aria-label="flag">
                          🇬🇧
                        </span>
                        English
                      </button>
                    </li>
                    <li>
                      <button 
                        className="flex items-center gap-2 w-full hover:bg-[#b8c9bc] transition-colors p-2 rounded"
                        onClick={() => handleLanguageChange('de')}
                      >
                        <span role="img" aria-label="flag">
                          🇩🇪
                        </span>
                        Deutsch
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="navbar-start lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button btn btn-ghost text-white hover:bg-[#2e5a52] transition-colors p-2 min-h-[44px] min-w-[44px]"
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
          <div className="navbar-center flex-1 flex justify-center">
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
                <span>{t('navbar.joinUs')}</span>
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
                    <button className="px-4 py-2 hover:bg-[#eaf3ec] text-left" onClick={() => { setShowDropdownDesktop(false); navigate('/profile'); }}>
                      {t('navbar.updateProfile')}
                    </button>
                    <button className="px-4 py-2 hover:bg-[#eaf3ec] text-left" onClick={() => { setShowDropdownDesktop(false); navigate('/dashboard') }}>
                      {t('navbar.dashboard')}
                    </button>
                    <button className="px-4 py-2 hover:bg-red-100 text-left text-red-600 font-semibold" onClick={() => handleLogout(true)}>
                      {t('navbar.logout')}
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
              <span>{t('navbar.cart')}</span>
            </NavLink>
          </div>

          {/* Mobile Right Side - Only Join Us button or Avatar */}
          <div className="navbar-end lg:hidden">
            {!user ? (
              <button
                className="flex items-center gap-1 px-3 py-2 text-white font-medium rounded-full bg-transparent hover:bg-yellow-500 hover:text-black transition-colors min-h-[44px]"
                onClick={() => setShowModal(true)}
              >
                <FaRegUser size={18} />
                <span className="text-sm">{t('navbar.joinUs')}</span>
              </button>
            ) : (
              <div className="relative" ref={dropdownRefMobile}>
                <button
                  className="flex items-center gap-1 px-2 py-2 bg-white rounded-full hover:bg-gray-200 transition-colors border border-gray-200 focus:outline-none min-h-[44px]"
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
                    <button className="px-4 py-2 hover:bg-[#eaf3ec] text-left" onClick={() => { setShowDropdownMobile(false); navigate('/profile'); }}>
                      {t('navbar.updateProfile')}
                    </button>
                    <button className="px-4 py-2 hover:bg-[#eaf3ec] text-left" onClick={() => { setShowDropdownMobile(false); navigate('/dashboard'); }}>
                      {t('navbar.dashboard')}
                    </button>
                    <button className="px-4 py-2 hover:bg-red-100 text-left text-red-600 font-semibold" onClick={() => handleLogout(false)}>
                      {t('navbar.logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-dropdown lg:hidden w-[96%] mx-auto mt-2 bg-[#CEDDD1] rounded-xl p-4 shadow-lg z-40 relative">
            <ul className="space-y-3 text-black">
              <li>
                <NavLink 
                  to="/" 
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium min-h-[44px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navbar.home')}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/shops" 
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium min-h-[44px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navbar.shop')}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/cart" 
                  className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium relative min-h-[44px]"
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
                  <span>{t('navbar.cart')}</span>
                </NavLink>
              </li>
              {/* Language Dropdown for Mobile */}
              <li className="relative" ref={languageDropdownRefMobile}>
                <button 
                  className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-[#b8c9bc] transition-colors font-medium cursor-pointer w-full text-left min-h-[44px]"
                  onClick={() => setShowLanguageDropdownMobile(!showLanguageDropdownMobile)}
                >
                  <span role="img" aria-label="flag">
                    {getLanguageFlag(currentLanguage)}
                  </span>
                  <span>{getLanguageName(currentLanguage)}</span>
                  <FaChevronDown className="ml-auto" />
                </button>
                {showLanguageDropdownMobile && (
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>
                      <button 
                        className="flex items-center gap-2 w-full py-2 px-4 rounded-lg hover:bg-[#b8c9bc] transition-colors text-sm min-h-[40px]"
                        onClick={() => handleLanguageChange('en')}
                      >
                        <span role="img" aria-label="flag">
                          🇬🇧
                        </span>
                        English
                      </button>
                    </li>
                    <li>
                      <button 
                        className="flex items-center gap-2 w-full py-2 px-4 rounded-lg hover:bg-[#b8c9bc] transition-colors text-sm min-h-[40px]"
                        onClick={() => handleLanguageChange('de')}
                      >
                        <span role="img" aria-label="flag">
                          🇩🇪
                        </span>
                        Deutsch
                      </button>
                    </li>
                  </ul>
                )}
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
