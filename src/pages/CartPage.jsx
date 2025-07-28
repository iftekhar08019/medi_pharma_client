import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRemove = (_id) => dispatch({ type: "REMOVE", _id });
  const handleClear = () => dispatch({ type: "CLEAR" });
  const handleUpdate = (_id, quantity) => dispatch({ type: "UPDATE", _id, quantity });

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  return (
    <>
      <Helmet>
        <title>{t('cart.title')}</title>
      </Helmet>
      <div className="w-full mx-auto p-2 sm:p-4 md:p-8">
        <div className="bg-[#396961] rounded-3xl w-full flex flex-col items-center justify-center py-8 sm:py-10 md:py-12 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 text-center">{t('cart.pageTitle')}</h1>
          <nav className="flex flex-wrap items-center gap-2 text-white text-base sm:text-lg font-medium">
            <Link to="/" className="hover:underline">{t('navbar.home')}</Link>
            <span className="mx-1">{">"}</span>
            <span>{t('cart.pageTitle')}</span>
          </nav>
        </div>
        <div className="bg-[#eaf3ec] rounded-2xl p-2 sm:p-4 md:p-6 shadow mb-8">
          <div className="hidden sm:flex justify-between font-bold text-lg mb-4">
            <span>{t('cart.product')}</span>
            <span>{t('cart.quantity')}</span>
            <span>{t('cart.total')}</span>
          </div>
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-10">{t('cart.empty')}</div>
          ) : (
            cart.map(item => (
              <div key={item._id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#396961] py-4 gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white object-contain" />
                  <div className="flex-1 min-w-[120px]">
                    <div className="font-bold text-base sm:text-lg">{item.name}</div>
                    <div className="text-xs sm:text-sm text-gray-700">
                      {item.currency}{item.discountPrice || item.price} <span className="text-xs text-gray-400">{item.discounted && item.discountPrice ? <span className="line-through">{item.currency}{item.price}</span> : null}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.weightOptions ? `Weight: ${item.selectedWeight || item.weightOptions[0]} | ` : ""}
                      {item.itemForm ? `Item Form: ${item.itemForm} | ` : ""}
                      {item.productBenefits ? `Product Benefits: ${item.selectedBenefit || item.productBenefits[0]}` : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    className="border rounded-full px-2 py-1"
                    onClick={() => handleUpdate(item._id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="border rounded-full px-2 py-1"
                    onClick={() => handleUpdate(item._id, item.quantity + 1)}
                  >+</button>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(item._id)}
                    title="Remove"
                  >🗑️</button>
                </div>
                <div className="font-bold text-right sm:text-left">{item.currency}{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <button
                className="bg-[#396961] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#28524c] transition w-full sm:w-auto"
                onClick={() => navigate('/shops')}
              >
                {t('cart.continueShopping')}
              </button>
              <button
                className="bg-red-100 text-red-700 px-6 py-2 rounded-full font-semibold hover:bg-red-200 transition w-full sm:w-auto"
                onClick={handleClear}
              >
                {t('cart.clearCart')}
              </button>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start bg-[#f5f5f5] rounded-2xl p-4 sm:p-6 shadow">
            <div className="flex-1 mb-4 md:mb-0 w-full">
              <label className="block font-semibold mb-2">{t('cart.addNote')}</label>
              <textarea className="w-full rounded-lg p-3 border border-gray-300 min-h-[80px]" placeholder={t('cart.notePlaceholder')} />
            </div>
            <div className="w-full md:w-80 flex flex-col gap-3">
              <div className="flex justify-between font-bold text-lg mb-2">
                <span>{t('cart.subtotal')}</span>
                <span>{cart[0].currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">{t('cart.taxesInfo')}</div>
              <button
                className="bg-[#396961] text-white py-3 rounded-full font-semibold hover:bg-[#28524c] transition mb-2 w-full"
                onClick={() => navigate('/checkout')}
              >
                {t('cart.checkout')}
              </button>
              <input
                className="w-full rounded-full px-4 py-2 border border-gray-300"
                placeholder={t('cart.discountPlaceholder')}
              />
              <button className="bg-[#396961] text-white py-2 rounded-full font-semibold hover:bg-[#28524c] transition w-full">
                {t('cart.apply')}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage; 
