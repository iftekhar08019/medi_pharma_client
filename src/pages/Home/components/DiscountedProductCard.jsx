import React, { useState } from "react";
import { FiEye, FiShoppingBag } from "react-icons/fi";
import { FaTags } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DiscountedProductCard = ({
    image,
    name,
    price,      // new price (after discount)
    oldPrice,   // old/original price
    discount,   // e.g. "20% OFF"
    onView,
    onAddToCart,
}) => {
    const [hovered, setHovered] = useState(false);
    const { t } = useTranslation();

    return (
        <div
            className="relative rounded-2xl bg-[#CEDDD1] p-6 w-[80%] shadow- flex flex-col items-center transition-all duration-300 group ml-8"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Discount Icon */}
            {discount && (
                <div className="absolute top-4 right-4 z-20 flex items-center bg-white rounded-full shadow px-2 py-1">
                    <FaTags className="text-red-600 mr-1" size={18} />
                    <span className="text-xs font-bold text-red-600">{discount}</span>
                </div>
            )}
            {/* Product Image */}
            <img
                src={image}
                alt={name}
                className="w-[180px] h-[180px] rounded-2xl object-cover mb-4 hover:scale-105 transition-transform duration-300"
            />

            {/* Hover Icons */}
            <div
                className={`absolute top-1/3 right-6 transform -translate-y-1/2 flex flex-col gap-3 transition-all duration-300 ${
                    hovered ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <button
                    className="bg-[#396961] rounded-xl p-2 mb-1 flex items-center justify-center shadow hover:scale-110 transition"
                    onClick={onView}
                    title={t('shop.productCard.viewDetails')}
                >
                    <FiEye size={24} className="text-white" />
                </button>
                <button
                    className="bg-[#396961] rounded-xl p-2 flex items-center justify-center shadow hover:scale-110 transition"
                    onClick={onAddToCart}
                    title={t('shop.productCard.addToCart')}
                >
                    <FiShoppingBag size={24} className="text-white" />
                </button>
            </div>

            {/* Product Details */}
            <div className="mt-2 text-center w-full">
                <h3 className="font-semibold text-xl mb-1">{name}</h3>
                <div className="flex flex-col items-center justify-center gap-1">
                    {oldPrice && (
                        <span className="text-gray-500 text-base line-through">
                            € {oldPrice}
                        </span>
                    )}
                    <span className="text-lg font-bold text-gray-800">€ {price}</span>
                </div>
            </div>
        </div>
    );
};

export default DiscountedProductCard;
