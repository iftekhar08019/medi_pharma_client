import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SidebarFilters from "./components/SidebarFilters";
import useAxios from "../../hooks/useAxios";
import ProductSection from "./components/ProductSection";
import { Link } from "react-router"; // Or "react-router-dom" if v6+
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";

const fetchProducts = async (axiosInstance) => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

const ShopPage = () => {
  const axiosInstance = useAxios();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

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

  // Search Logic
  const filteredBySearch = (filteredProducts.length > 0 ? filteredProducts : products)?.filter((product) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(search) ||
      product.genericName?.toLowerCase().includes(search) ||
      product.company?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <Helmet>
        <title>{t('shop.title')}</title>
      </Helmet>
      <div className="rounded-3xl p-0 sm:p-0 min-h-screen w-full space-y-10">
        <div className="w-full px-0 sm:px-0">
          <div className="bg-[#396961] rounded-3xl w-full flex flex-col items-center justify-center py-10 sm:py-12">
            <h1 className="text-5xl font-bold text-white mb-2 text-center">
              {t('navbar.shop')}
            </h1>
            <nav className="flex items-center gap-2 text-white text-lg font-medium">
              <Link to="/" className="hover:underline">
                {t('shop.breadcrumb.home')}
              </Link>
              <span className="mx-1">{">"}</span>
              <Link to="/shops" className="hover:underline">
                {t('shop.breadcrumb.shop')}
              </Link>
            </nav>
          </div>
        </div>

        {/* --- Search Bar --- */}
        <div className="w-full flex justify-center mb-6">
          <input
            type="text"
            placeholder={t('shop.searchPlaceholder')}
            className="w-full max-w-xl border border-gray-300 rounded-xl px-4 py-2 text-lg shadow focus:outline-none focus:ring-2 focus:ring-[#396961]"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <SidebarFilters 
            onFiltersChange={handleFiltersChange}
            products={products}
          />
          <div className="flex-1">
            <ProductSection
              products={filteredBySearch}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
