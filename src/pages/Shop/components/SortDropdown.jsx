import React from "react";

const options = [
  { value: "featured", label: "Featured" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" }
];

const SortDropdown = ({ sort, setSort }) => (
  <div className="flex items-center gap-2">
    <h1 className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">Sort By:</h1>
    <select
      className="border border-gray-300 rounded-xl py-2 px-2 sm:px-4 bg-white text-gray-700 font-medium text-sm sm:text-base min-w-0 flex-1 sm:flex-none"
      value={sort}
      onChange={e => setSort(e.target.value)}
      aria-label="Sort by"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SortDropdown;
