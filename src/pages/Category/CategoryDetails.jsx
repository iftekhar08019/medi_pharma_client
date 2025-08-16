import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsModal from "../Shop/components/ProductDetailsModal";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import PageLoading from "../../components/PageLoading";

const typeLabels = {
  tablet: "Tablet",
  syrup: "Syrup",
  capsule: "Capsule",
  injection: "Injection",
  liquid: "Liquid",
  others: "Others",
};

function getType(itemForm) {
  if (!itemForm) return "Others";
  const form = itemForm.toLowerCase();
  if (form.includes("tablet")) return "Tablet";
  if (form.includes("syrup")) return "Syrup";
  if (form.includes("capsule")) return "Capsule";
  if (form.includes("injection")) return "Injection";
  if (form.includes("liquid")) return "Liquid";
  return "Others";
}

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [modalProduct, setModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useCart();
  const axios = useAxios();
  const { t } = useTranslation();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products", categoryName],
    queryFn: async () => {
      const res = await axios.get("/products");
      const all = res.data;
      return all.filter(
        (p) => p.category && p.category.toLowerCase() === categoryName.toLowerCase()
      );
    },
  });

  const handleViewDetails = (product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };
  const handleAddToCart = (product) => {
    dispatch({ type: "ADD", product, quantity: 1 });
    toast.success("Product added to cart!");
  };

  if (isLoading) return <PageLoading text={`Loading ${categoryName} Products...`} />;
  if (isError) return <div className="p-8 text-center text-red-500">{t('common.error')}</div>;

  return (
    <div className="p-4 sm:p-8">
      {/* Heading and Breadcrumb */}
      <div className="bg-[#396961] rounded-3xl w-full flex flex-col items-center justify-center py-10 sm:py-12 mb-8">
        <h1 className="text-5xl font-bold text-white mb-2 text-center">
          {categoryName} {t('category.products')}
        </h1>
        <nav className="flex items-center gap-2 text-white text-lg font-medium">
          <Link to="/" className="hover:underline">
            {t('navbar.home')}
          </Link>
          <span className="mx-1">{">"}</span>
          <Link to="/category" className="hover:underline">
            {t('category.title')}
          </Link>
          <span className="mx-1">{">"}</span>
          <span className="capitalize">{categoryName}</span>
        </nav>
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white">
        <table className="min-w-full text-left text-sm md:text-base">
          <thead>
            <tr className="bg-[#eaf3ec]">
              <th className="py-3 px-2 sm:px-4 border border-[#396961]">{t('common.name')}</th>
              <th className="py-3 px-2 sm:px-4 hidden md:table-cell border border-[#396961]">{t('common.description')}</th>
              <th className="py-3 px-2 sm:px-4 border border-[#396961]">{t('common.price')}</th>
              <th className="py-3 px-2 sm:px-4 border border-[#396961]">{t('common.status')}</th>
              <th className="py-3 px-2 sm:px-4 border border-[#396961]">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500 border border-[#396961]">
                  {t('category.noProducts')}
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product._id} className="border-b border-[#396961] hover:bg-gray-50">
                <td className="py-3 px-2 sm:px-4 border border-[#396961]">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.genericName}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 sm:px-4 hidden md:table-cell border border-[#396961]">
                  {typeLabels[getType(product.itemForm)]}
                </td>
                <td className="py-3 px-2 sm:px-4 border border-[#396961]">
                  <div className="font-semibold">
                    {product.currency}{product.discountPrice || product.price}
                  </div>
                  {product.discounted && (
                    <div className="text-xs text-gray-500 line-through">
                      {product.currency}{product.price}
                    </div>
                  )}
                </td>
                <td className="py-3 px-2 sm:px-4 border border-[#396961]">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {product.inStock ? `${t('common.status')} (${product.stockCount})` : t('shop.productCard.outOfStock')}
                  </span>
                </td>
                <td className="py-3 px-2 sm:px-4 border border-[#396961]">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                    >
                      {t('common.view')}
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {t('shop.productCard.addToCart')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductDetailsModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CategoryDetails;
