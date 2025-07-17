import React from "react";
import { Link } from "react-router"; // for navigation (updated to use react-router-dom)
import { FaArrowRight } from "react-icons/fa"; // for the "Arrow Right" icon

const CategoryCard = ({ category }) => {
  return (
    <div className="card w-80 bg-[#CEDDD1] shadow-xl transition-transform duration-300 hover:scale-105 group">
        
      <figure
        className="flex bg-[#CEDDD1] hover:opacity-100 justify-center transition-all duration-500 group-hover:bg-cover hover:bg-center hover:bg-no-repeat hover:rounded-t-lg"
        style={{
          backgroundImage: `url(${category.image_url})`,
          height: "200px",
        }}
      >
        {" "}
          <img
          src={category.image_url}
          alt={category.category_name}
          className="w-32 h-32 object-cover rounded-full opacity-100 hover:opacity-0 transition-opacity duration-500"
        />
      </figure>
    
      <div className="card-body text-center">
        <h3 className="text-xl font-bold">
          {category.category_name.toUpperCase()}
        </h3>
        <p className="text-sm text-gray-600">
          {category.medicine_count} medicines
        </p>
        <div className="card-actions justify-center mt-6">
          <Link
            to={category.category_link}
            className="bg-[#396961] hover:bg-amber-400 hover:text-black text-white px-8 py-3 rounded-full text-xl"
          >
            <span>Explore</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
