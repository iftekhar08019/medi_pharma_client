import React from "react";
import { Link } from "react-router"; // for navigation (updated to use react-router-dom)

const CategoryCard = ({ category }) => {
  return (
    <div className="card w-[90%] sm:w-[95%] md:w-full bg-[#CEDDD1] shadow-xl transition-transform duration-300 hover:scale-105 group mx-auto">
        
  
        <figure className="h-48 flex items-center justify-center overflow-hidden rounded-t-lg">
          <img
            src={category.image_url}
            alt={category.category_name}
            className="w-32 h-32 rounded-full object-cover"
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
