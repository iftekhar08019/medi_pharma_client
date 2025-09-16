import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ProductDetailsModal = ({ product, isOpen, onClose, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("");
  const [benefit, setBenefit] = useState("");
  const { dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setWeight(product.selectedWeight || (product.weightOptions?.[0] || ""));
      setBenefit(product.selectedBenefit || (product.productBenefits?.[0] || ""));
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

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
    rating,
    reviewCount,
    inStock,
    stockCount,
  } = product;

  const handleAddToCart = () => {
    dispatch({ type: "ADD", product: { ...product, selectedWeight: weight, selectedBenefit: benefit }, quantity });
    toast.success("Product added to cart!");
    
  };
  const handleBuyNow = () => {
    onBuyNow && onBuyNow({ ...product, quantity, selectedWeight: weight, selectedBenefit: benefit });
    dispatch({ type: "ADD", product: { ...product, selectedWeight: weight, selectedBenefit: benefit }, quantity });
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto">
      <div className="relative bg-[#eaf3ec] rounded-3xl w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-2 flex flex-col md:flex-row p-2 sm:p-4 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-xl sm:text-2xl text-gray-700 hover:text-black"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Product Image */}
        <div className="flex-1 flex items-center justify-center mb-4 md:mb-0 md:mr-8">
          <img
            src={imageUrl}
            alt={name}
            className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain rounded-2xl bg-white shadow"
          />
        </div>
        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
          <div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 text-gray-900 text-center sm:text-left">{name}</h2>
            <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
              ))}
              <span className="ml-2 text-gray-700 text-xs sm:text-base font-medium hidden sm:inline">{reviewCount} review{reviewCount > 1 ? "s" : ""}</span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center sm:text-left">
              {discounted && discountPrice ? (
                <>
                  <span className="text-[#2e7153]">{currency}{discountPrice}</span>
                  <span className="ml-3 line-through text-gray-400 text-base sm:text-lg">{currency}{price}</span>
                  {discountPercent && (
                    <span className="ml-2 bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold">-{discountPercent}%</span>
                  )}
                </>
              ) : (
                <span className="text-[#2e7153]">{currency}{price}</span>
              )}
            </div>
            <p className="text-gray-700 mb-4 max-w-xl text-xs sm:text-sm md:text-base text-center sm:text-left">
              {description || "No description available for this product."}
            </p>
            {/* Weight Options */}
            {weightOptions.length > 0 && (
              <div className="mb-3 flex flex-wrap items-center justify-center sm:justify-start">
                <span className="font-bold text-gray-900 mr-2 text-xs sm:text-base">Weight:</span>
                {weightOptions.map((w) => (
                  <button
                    key={w}
                    className={`px-3 py-1 rounded-lg border mr-2 mb-2 text-xs sm:text-base ${weight === w ? "bg-black text-white" : "bg-white text-black"}`}
                    onClick={() => setWeight(w)}
                  >
                    {w}
                  </button>
                ))}
              </div>
            )}
            {/* Item Form */}
            {itemForm && (
              <div className="mb-3 flex flex-col items-center sm:items-start">
                <span className="font-bold text-gray-900 mr-2 text-xs sm:text-base">Item Form:</span>
                <span className="inline-block px-3 py-1 rounded-lg border bg-black text-white text-xs sm:text-base mt-1 sm:mt-0">{itemForm}</span>
              </div>
            )}
            {/* Product Benefits (hide on mobile) */}
            {productBenefits.length > 0 && (
              <div className="mb-3 hidden sm:block">
                <span className="font-bold text-gray-900 mr-2">Product Benefits:</span>
                <span className="mr-2">{benefit}</span>
                <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                  {productBenefits.map((b) => (
                    <button
                      key={b}
                      className={`px-4 py-1 rounded-lg border ${benefit === b ? "bg-black text-white" : "bg-white text-black"}`}
                      onClick={() => setBenefit(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Stock */}
            <div className="mb-3 text-gray-700 text-xs sm:text-base text-center sm:text-left">
              <span className="font-bold">{inStock ? `In stock (${stockCount})` : "Out of stock"}</span>
            </div>
          </div>
          {/* Quantity and Actions */}
          <div className="flex flex-col gap-4 mt-6 w-full items-center sm:items-stretch">
            {/* Row: Quantity Selector + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-around w-full gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded-full px-2 py-1 sm:px-3 sm:py-2 bg-white mb-2 sm:mb-0">
                <button
                  className="text-xl sm:text-2xl px-2 text-gray-700 hover:text-black"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  –
                </button>
                <span className="mx-2 sm:mx-3 text-base sm:text-lg font-semibold">{quantity}</span>
                <button
                  className="text-xl sm:text-2xl px-2 text-gray-700 hover:text-black"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
              {/* Add to Cart */}
              <button
                className="min-w-[110px] sm:min-w-[140px] w-28 sm:w-40 bg-[#2e7153] text-white text-sm sm:text-md font-bold py-2 sm:py-3 px-2 rounded-full hover:bg-[#235b40] transition disabled:opacity-50 text-center"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                Add To Cart
              </button>
            </div>
            {/* Buy Now (full width) */}
            <button
              className="w-full bg-[#f5d377] text-black text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full hover:bg-amber-300 transition disabled:opacity-50 text-center"
              onClick={handleBuyNow}
              disabled={!inStock}
            >
              Buy It Now
            </button>
          </div>
          {/* View full details link (optional) */}
          <div className="mt-4 text-center sm:text-right">
            <button
              className="text-[#2e7153] hover:underline font-medium text-sm sm:text-base"
              onClick={() => {
                const id = product._id?.$oid || product._id || product.id;
                if (id) {
                  onClose && onClose();
                  navigate(`/product/${id}`);
                }
              }}
            >
              View full details &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal; 
