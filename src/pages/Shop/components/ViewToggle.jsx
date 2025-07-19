import React from "react";
import { FaThLarge, FaList } from "react-icons/fa";

const ViewToggle = ({ view, setView }) => (
  <div className="flex gap-2">
    <button
      onClick={() => setView("grid")}
      className={`p-2 rounded-full border ${view === "grid" ? "bg-[#2e7153] text-white" : "bg-white text-[#2e7153]"} hover:bg-[#2e7153] hover:text-white transition`}
      aria-label="Grid view"
    >
      <FaThLarge size={18} />
    </button>
    <button
      onClick={() => setView("list")}
      className={`p-2 rounded-full border ${view === "list" ? "bg-[#2e7153] text-white" : "bg-white text-[#2e7153]"} hover:bg-[#2e7153] hover:text-white transition`}
      aria-label="List view"
    >
      <FaList size={18} />
    </button>
  </div>
);

export default ViewToggle;
