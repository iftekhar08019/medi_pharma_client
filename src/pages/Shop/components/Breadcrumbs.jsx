import React from "react";
import { Link } from "react-router"; // Or "react-router" if using v5

const Breadcrumbs = () => (
  <nav className="flex items-center text-gray-500 text-sm mb-3" aria-label="Breadcrumb">
    <Link to="/" className="hover:text-[#2e7153] font-medium transition">
      Home
    </Link>
    <span className="mx-2">{">"}</span>
    <span className="text-[#2e7153] font-semibold">Shop</span>
  </nav>
);

export default Breadcrumbs;
