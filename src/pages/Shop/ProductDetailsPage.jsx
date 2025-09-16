import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useCart } from "../../context/CartContext";
import PageLoading from "../../components/PageLoading";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["product-details", productId],
    queryFn: async () => {
      // Fetch all, then find locally to be API-safe
      const res = await axios.get("/products");
      return res.data;
    },
  });

  const product = useMemo(() => {
    if (!products?.length) return null;
    return (
      products.find((p) => (p._id?.$oid || p._id || p.id)?.toString() === productId) || null
    );
  }, [products, productId]);

  // Initialize option defaults when product is loaded
  React.useEffect(() => {
    if (product) {
      setSelectedWeight(product.selectedWeight || product.weightOptions?.[0] || "");
      setSelectedBenefit(product.selectedBenefit || product.productBenefits?.[0] || "");
      setQuantity(1);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch({
      type: "ADD",
      product: { ...product, selectedWeight, selectedBenefit },
      quantity,
    });
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    if (!product) return;
    dispatch({
      type: "ADD",
      product: { ...product, selectedWeight, selectedBenefit },
      quantity,
    });
    navigate("/checkout");
  };

  if (isLoading) return <PageLoading text="Loading product..." fullScreen={true} />;
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load product.</div>;
  if (!product) return <div className="p-8 text-center text-gray-500">Product not found.</div>;

  const {
    name,
    imageUrl,
    price,
    discountPrice,
    discounted,
    discountPercent,
    currency,
    description,
    weightOptions = [],
    itemForm,
    productBenefits = [],
    rating = 0,
    reviewCount = 0,
    inStock,
    stockCount,
  } = product;

  return (
    <div className="w-full mx-auto my-6 sm:my-10">
      {/* Header/Breadcrumb */}
      <div className="bg-[#396961] rounded-3xl w-full flex flex-col items-center justify-center py-8 sm:py-10 md:py-12 mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 text-center">{name}</h1>
        <nav className="flex flex-wrap items-center gap-2 text-white text-base sm:text-lg font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">{">"}</span>
          <Link to="/shops" className="hover:underline">Shop</Link>
          <span className="mx-1">{">"}</span>
          <span className="opacity-90">{name}</span>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-[#eaf3ec] rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src={imageUrl}
              alt={name}
              className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain rounded-2xl bg-white shadow"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Price and rating */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                ))}
                <span className="ml-2 text-gray-700 text-sm font-medium">{reviewCount} review{reviewCount > 1 ? "s" : ""}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {discounted && discountPrice ? (
                  <>
                    <span className="text-[#2e7153]">{currency}{discountPrice}</span>
                    <span className="ml-3 line-through text-gray-400 text-lg">{currency}{price}</span>
                    {discountPercent && (
                      <span className="ml-2 bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold">-{discountPercent}%</span>
                    )}
                  </>
                ) : (
                  <span className="text-[#2e7153]">{currency}{price}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-800 leading-relaxed mb-6">{description || "No description available for this product."}</p>

            {/* Options */}
            {weightOptions.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-gray-900 mb-2">Weight</div>
                <div className="flex flex-wrap gap-2">
                  {weightOptions.map((w) => (
                    <button
                      key={w}
                      className={`px-4 py-2 rounded-full border ${selectedWeight === w ? "bg-black text-white" : "bg-white text-black"}`}
                      onClick={() => setSelectedWeight(w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {itemForm && (
              <div className="mb-4">
                <div className="font-semibold text-gray-900 mb-2">Item Form</div>
                <span className="inline-block px-4 py-2 rounded-full border bg-black text-white">{itemForm}</span>
              </div>
            )}

            {productBenefits.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-gray-900 mb-2">Product Benefits</div>
                <div className="flex flex-wrap gap-2">
                  {productBenefits.map((b) => (
                    <button
                      key={b}
                      className={`px-4 py-2 rounded-full border ${selectedBenefit === b ? "bg-black text-white" : "bg-white text-black"}`}
                      onClick={() => setSelectedBenefit(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mb-4 text-gray-800">
              <span className="font-bold">{inStock ? `In stock (${stockCount})` : "Out of stock"}</span>
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <div className="flex items-center border rounded-full px-3 py-2 bg-white">
                <button className="text-2xl px-2 text-gray-700 hover:text-black" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>–</button>
                <span className="mx-3 text-lg font-semibold">{quantity}</span>
                <button className="text-2xl px-2 text-gray-700 hover:text-black" onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
              <button className="bg-[#2e7153] text-white font-bold py-3 px-6 rounded-full hover:bg-[#235b40] transition disabled:opacity-50" onClick={handleAddToCart} disabled={!inStock}>Add To Cart</button>
              <button className="bg-[#f5d377] text-black font-bold py-3 px-6 rounded-full hover:bg-amber-300 transition disabled:opacity-50" onClick={handleBuyNow} disabled={!inStock}>Buy It Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;


