import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsModal from "../Shop/components/ProductDetailsModal";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

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
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("");
  const [benefit, setBenefit] = useState("");
  const { dispatch } = useCart();
  const axios = useAxios();

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
    dispatch({ type: "ADD", product: { ...product, selectedWeight: weight, selectedBenefit: benefit }, quantity });
    toast.success("Product added to cart!");
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Error loading medicines.</div>;

  return (
    <div className="p-4 sm:p-8">
      {/* Heading and Breadcrumb */}
      <div className="bg-[#396961] rounded-3xl w-full flex flex-col items-center justify-center py-10 sm:py-12 mb-8">
        <h1 className="text-5xl font-bold text-white mb-2 text-center">
          {categoryName} Medicines
        </h1>
        <nav className="flex items-center gap-2 text-white text-lg font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-1">{">"}</span>
          <Link to="/category" className="hover:underline">
            Category
          </Link>
          <span className="mx-1">{">"}</span>
          <span className="capitalize">{categoryName}</span>
        </nav>
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white">
        <table className="min-w-full text-left text-sm md:text-base">
          <thead>
            <tr className="bg-[#eaf3ec]">
              <th className="py-3 px-2 sm:px-4 border border-[#396961]">Name</th>
              <th className="py-3 px-2 sm:px-4 hidden md:table-cell border border-[#396961]">Type</th>
              <th className="py-3 px-2 sm:px-4 border border-[#396961]">Price</th>
              <th className="py-3 px-2 sm:px-4 border border-[#396961]">Stock</th>
              <th className="py-3 px-2 sm:px-4 border border-[#396961]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500 border border-[#396961]">
                  No medicines found in this category.
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-white"
              >
                <td className="py-3 px-2 sm:px-4 font-semibold border border-[#396961] text-black">{product.name}</td>
                <td className="py-3 px-2 sm:px-4 hidden md:table-cell border border-[#396961] text-black">{typeLabels[getType(product.itemForm)] || "Others"}</td>
                <td className="py-3 px-2 sm:px-4 border border-[#396961] text-black">
                  {product.discounted && product.discountPrice
                    ? (
                      <>
                        <span className="text-black font-bold">
                          {product.currency}{product.discountPrice}
                        </span>
                        <span className="ml-2 line-through text-gray-500 text-xs md:text-sm">
                          {product.currency}{product.price}
                        </span>
                      </>
                    )
                    : (
                      <span className="text-black font-bold">
                        {product.currency}{product.price}
                      </span>
                    )
                  }
                </td>
                <td className="py-3 px-2 sm:px-4 border border-[#396961] text-black">
                  {product.inStock ? (
                    <span className="text-[#2e7153] font-bold">In stock ({product.stockCount})</span>
                  ) : (
                    <span className="text-red-200 font-bold">Out of stock</span>
                  )}
                </td>
                <td className="py-3 px-2 sm:px-4 flex gap-2 border border-[#396961] text-black">
                  <button
                    className="bg-[#2e7153] text-white px-3 py-1 rounded-lg hover:bg-[#235b40] transition disabled:opacity-50 text-xs sm:text-base"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-[#eaf3eb] text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-200 transition text-xs sm:text-base"
                    onClick={() => handleViewDetails(product)}
                  >
                    <span role="img" aria-label="View">👁️</span>
                  </button>
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
        onAddToCart={handleAddToCart}
        onBuyNow={handleAddToCart}
      />
    </div>
  );
};

export default CategoryDetails;
