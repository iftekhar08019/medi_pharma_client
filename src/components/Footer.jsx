import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube,  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcDiscover, FaTwitter } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Logo from "../utility/Logo";


const Footer = () => (
  <footer className="bg-[#191A1A] rounded-3xl  mt-8 mb-4 pb-0 pt-6 px-4 md:px-10">
    <div className="mx-auto flex flex-col gap-10 pb-6">
      {/* Top Area: 3 columns on md+ */}
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        {/* Left - Logo & Info */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex items-center gap-2 mb-3">
            <Logo />
            
          </div>
          <p className="text-gray-300 mb-6 max-w-xs">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.
          </p>
          <div className="flex items-start gap-2 text-gray-300 mb-2">
            <FaMapMarkerAlt className="text-xl mt-1" />
            <span>
              No: 58 A, East Madison Street,<br />
              Baltimore, MD, USA 4508
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaPhoneAlt className="text-lg" />
            <span>000 - 123 - 456789</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaEnvelope className="text-lg" />
            <span>support@example.com</span>
          </div>
          <div className="mt-7">
            <h3 className="font-bold text-white mb-3 text-lg">Stay Connected With Us</h3>
            <div className="flex gap-3">
              <a href="#" className="bg-[#232324] rounded-lg w-10 h-10 flex items-center justify-center text-xl text-gray-200 hover:bg-[#396961] transition"><FaTwitter /></a>
              <a href="#" className="bg-[#232324] rounded-lg w-10 h-10 flex items-center justify-center text-xl text-gray-200 hover:bg-[#396961] transition"><FaFacebookF /></a>
              <a href="#" className="bg-[#232324] rounded-lg w-10 h-10 flex items-center justify-center text-xl text-gray-200 hover:bg-[#396961] transition"><FaInstagram /></a>
              <a href="#" className="bg-[#232324] rounded-lg w-10 h-10 flex items-center justify-center text-xl text-gray-200 hover:bg-[#396961] transition"><FaYoutube /></a>
            </div>
          </div>
        </div>
        {/* Center - Interested in Joining */}
        <div className="flex-1 min-w-[300px] flex justify-center items-center">
          <div className="bg-[#232324] rounded-2xl p-7 w-full max-w-md flex flex-col justify-center items-start">
            <h3 className="text-xl font-bold text-white mb-2">Interested In Joining?</h3>
            <p className="text-gray-300 mb-4">Dignissim cras tincidunt lobortis feugiat vivamus</p>
            <button className="bg-[#F5D377] text-[#191A1A] font-bold text-lg py-2 px-8 rounded-full hover:bg-amber-300 transition">Shop Now</button>
          </div>
        </div>
        {/* Right - Newsletter */}
        <div className="flex-1 min-w-[300px]">
          <h3 className="text-xl font-bold text-white mb-4">Subscribe Our News Letter</h3>
          <form className="flex w-full mb-4">
            <input
              type="email"
              placeholder="Your email address"
              className="rounded-l-full px-5 py-3 flex-1 bg-[#232324] text-gray-200 outline-none"
            />
            <button
              type="submit"
              className="bg-[#B89D56] text-[#191A1A] font-bold px-8 py-3 rounded-r-full hover:bg-[#FFD377] transition"
            >
              Send
            </button>
          </form>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="agree" className="accent-[#396961] w-5 h-5" />
            <label htmlFor="agree" className="text-gray-300 text-sm">
              I agree with the terms & conditions
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#232324] pt-4 flex flex-col md:flex-row justify-between items-center mt-6">
        <div className="flex gap-2">
          <button className="border border-[#393939] rounded-lg px-4 py-2 flex items-center text-white gap-2 bg-[#191A1A]">
            <img src="https://flagcdn.com/24x18/de.png" alt="DE" className="w-6 h-4 mr-2" />
            DE <IoMdArrowDropdown className="ml-1" />
          </button>
          <button className="border border-[#393939] rounded-lg px-4 py-2 flex items-center text-white gap-2 bg-[#191A1A]">
            English <IoMdArrowDropdown className="ml-1" />
          </button>
        </div>
        <div className="text-gray-300 text-center py-2 text-sm">
          All Right Reserved © 2023 Wedesigntech
        </div>
        <div className="flex gap-3">
          <FaCcVisa className="text-3xl text-gray-100" />
          <FaCcMastercard className="text-3xl text-gray-100" />
          <FaCcAmex className="text-3xl text-gray-100" />
          <FaCcPaypal className="text-3xl text-gray-100" />
          <FaCcDiscover className="text-3xl text-gray-100" />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
