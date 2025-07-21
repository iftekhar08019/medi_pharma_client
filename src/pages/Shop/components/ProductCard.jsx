import React from "react";
import { FaStar, FaRegStar, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ product, view, onViewDetails }) => {
  const {
    name,
    category,
    price,
    currency,
    discounted,
    discountPrice,
    discountPercent,
    inStock,
    stockCount,
    imageUrl,
    rating,
    reviewCount,
    productBenefits,
    selectedBenefit,
  } = product;

  // Render stars for rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <div
      className={`flex ${
        view === "list" ? "flex-row" : "flex-col"
      } bg-[#ceddd1] rounded-2xl shadow p-4 gap-4 hover:shadow-lg transition`}
    >
      {/* Image */}
      <div
        className={`${
          view === "list" ? "w-32 h-32" : "w-full h-48"
        } flex-shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-[#f8f8f8]`}
      >
        <img
          src={imageUrl}
          alt={name}
          className={"w-full h-full object-cover"}
        />
      </div>

      {/* Product Info */}
      <div className={`flex flex-col flex-1 ${view === "list" ? "justify-center min-h-0" : "items-center text-center"}`}>
        <div className={view === "list" ? "space-y-1" : "w-full"}>
          <div className={`flex items-center gap-2 text-xs font-semibold text-green-700 mb-1 ${view === "list" ? "" : "justify-center"}`}>
            <span className="uppercase">{category}</span>
            {discounted && (
              <span className="bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full ml-1 text-xs font-bold">
                -{discountPercent}%
              </span>
            )}
          </div>
          <h3 className={`font-bold ${view === "list" ? "text-base mb-1" : "text-lg mb-1 text-center"}`}>{name}</h3>
          <div className={`flex items-center gap-1 mb-2 ${view === "list" ? "" : "justify-center"}`}>
            {renderStars()}
            <span className="ml-2 text-xs text-gray-500">({reviewCount})</span>
          </div>
          {productBenefits && view !== "list" && (
            <div className="text-sm text-gray-600 mb-2 text-center">
              Benefit: <span className="font-medium">{selectedBenefit}</span>
            </div>
          )}
          <div className={`mb-2 ${view === "list" ? "" : "text-center"}`}>
            {discounted ? (
              <div className={`flex items-center gap-2 ${view === "list" ? "" : "justify-center"}`}>
                <span className={`font-bold text-[#2e7153] ${view === "list" ? "text-lg" : "text-xl"}`}>
                  {currency}{discountPrice}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  {currency}{price}
                </span>
              </div>
            ) : (
              <span className={`font-bold text-[#2e7153] ${view === "list" ? "text-lg" : "text-xl"}`}>{currency}{price}</span>
            )}
          </div>
          <div className={`text-xs text-gray-500 ${view === "list" ? "" : "text-center"}`}>
            {inStock ? (
              <span>In stock ({stockCount})</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of stock</span>
            )}
          </div>
        </div>

        {/* Actions - Only show in grid view */}
        {view !== "list" && (
          <div className="flex gap-2 mt-2 justify-center">
            <button
              className="bg-[#2e7153] text-white p-2 rounded-lg hover:bg-[#235b40] transition"
              title="Add to Cart"
              disabled={!inStock}
            >
              <FaShoppingCart />
            </button>
            <button
              className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition"
              title="View Details"
              onClick={() => onViewDetails && onViewDetails(product)}
            >
              <FaEye />
            </button>
          </div>
        )}
      </div>

      {/* Actions for List View - Positioned on the right */}
      {view === "list" && (
        <div className="flex flex-col gap-2 justify-center">
          <button
            className="bg-[#2e7153] text-white p-2 rounded-lg hover:bg-[#235b40] transition"
            title="Add to Cart"
            disabled={!inStock}
          >
            <FaShoppingCart />
          </button>
          <button
            className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition"
            title="View Details"
            onClick={() => onViewDetails && onViewDetails(product)}
          >
            <FaEye />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
