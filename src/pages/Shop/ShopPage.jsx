import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SidebarFilters from "./components/SidebarFilters";
import useAxios from "../../hooks/useAxios";
import ProductSection from "./components/ProductSection";
import { Link } from "react-router"; // Use "react-router-dom" if you're using v6+

const fetchProducts = async (axiosInstance) => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

const ShopPage = () => {
  const axiosInstance = useAxios();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(axiosInstance),
  });

  // Handle filter changes from SidebarFilters
  const handleFiltersChange = (filteredResults) => {
    setFilteredProducts(filteredResults);
  };

  return (
    <div className="rounded-3xl p-0 sm:p-0 min-h-screen w-full space-y-10">
      <div className="w-full px-0 sm:px-0">
        <div className="bg-[#396961] rounded-3xl w-full flex flex-col items-center justify-center py-10 sm:py-12">
          <h1 className="text-5xl font-bold text-white mb-2 text-center">
            Shop
          </h1>
          <nav className="flex items-center gap-2 text-white text-lg font-medium">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-1">{">"}</span>
            <Link to="/shops" className="hover:underline">
              Shop
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <SidebarFilters 
          onFiltersChange={handleFiltersChange}
          products={products}
        />
        <div className="flex-1">
          <ProductSection
            products={filteredProducts.length > 0 ? filteredProducts : products}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
