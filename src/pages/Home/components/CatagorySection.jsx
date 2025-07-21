import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const CategorySection = () => {
  const axios = useAxios();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/products");
      return res.data;
    },
  });

  // Extract unique categories with count and a sample image
  const categories = React.useMemo(() => {
    const map = {};
    products.forEach((product) => {
      if (!product.category) return;
      const cat = product.category;
      if (!map[cat]) {
        map[cat] = {
          category_name: cat,
          medicine_count: 1,
          image_url: product.imageUrl,
        };
      } else {
        map[cat].medicine_count += 1;
      }
    });
    return Object.values(map);
  }, [products]);

  if (isLoading) return <div className="text-center py-10">Loading categories...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load categories.</div>;

  return (
    <div className="w-full mx-auto my-10" data-aos="fade-up">
      <h1 className="text-4xl font-bold text-center my-10">Browse Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-aos="fade-up">
        {categories.map((category) => (
          <div
            key={category.category_name}
            className="card w-[90%] sm:w-[95%] md:w-full bg-[#CEDDD1] shadow-xl transition-transform duration-300 hover:scale-105 group mx-auto"
          >
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
                  to={`/category/${encodeURIComponent(category.category_name)}`}
                  className="bg-[#396961] hover:bg-amber-400 hover:text-black text-white px-8 py-3 rounded-full text-xl"
                >
                  <span>Explore</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
