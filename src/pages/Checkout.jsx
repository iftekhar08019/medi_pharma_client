import React from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import Logo from "../utility/Logo";
import { FaLock, FaCreditCard } from "react-icons/fa";

const Checkout = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    // Handle order submission
    alert("Order placed! (Demo only)");
  };

  return (
    <div className="min-h-screens">
      <header className="w-full bg-[#396961] py-4 px-2 flex items-center justify-center">
        <Logo />
      </header>
      <main className=" flex flex-col lg:flex-row w-full  mx-auto bg-transparent">
        {/* Left: Forms */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-1/2 bg-[#396961] p-6 sm:p-10 flex flex-col gap-6">
          {/* Contact */}
          <div>
            <h2 className="text-white text-lg font-bold mb-2">Contact</h2>
            <input
              {...register("contact")}
              type="email"
              placeholder="Email or mobile phone number"
              className="w-full mb-2 px-4 py-2 text-white rounded border border-gray-300 focus:outline-none"
              required
            />
            <label className="flex items-center gap-2 text-white text-sm">
              <input type="checkbox" {...register("newsletter")} className="accent-[#2e7153]" />
              Email me with news and offers
            </label>
          </div>
          {/* Delivery */}
          <div className="text-white">
            <h2 className="text-white text-lg font-bold mb-2">Delivery</h2>
            <select {...register("country")} className="w-full mb-2 px-4 text-white py-2 rounded border border-gray-300 focus:outline-none">
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              {/* Add more countries as needed */}
            </select>
            <div className="flex gap-2 mb-2">
              <input {...register("firstName")} type="text" placeholder="First name (optional)" className="w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none text-white" />
              <input {...register("lastName")} type="text" placeholder="Last name" className="w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none text-white" />
            </div>
            <input {...register("address")}
              type="text"
              placeholder="Address"
              className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none"
              required
            />
            <input {...register("apartment")}
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none"
            />
            <div className="flex gap-2 mb-2">
              <input {...register("postalCode")}
                type="text"
                placeholder="Postal code"
                className="w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none"
                required
              />
              <input {...register("city")}
                type="text"
                placeholder="City"
                className="w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none"
                required
              />
            </div>
            <label className="flex items-center gap-2 text-white text-sm">
              <input type="checkbox" {...register("saveInfo")} className="accent-[#2e7153]" />
              Save this information for next time
            </label>
          </div>
          {/* Shipping method */}
          <div>
            <h2 className="text-white text-lg font-bold mb-2">Shipping method</h2>
            <button type="button" className="w-full bg-[#3a8a6b] text-white py-2 rounded mb-2 cursor-default" disabled>
              Enter your shipping address to view available shipping methods.
            </button>
          </div>
          {/* Payment */}
          <div>
            <h2 className="text-white text-lg font-bold mb-2">Payment</h2>
            <p className="text-xs text-white mb-2 flex items-center gap-2"><FaLock /> All transactions are secure and encrypted.</p>
            <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <FaCreditCard className="text-[#2e7153]" />
                <span className="font-semibold">Credit card</span>
              </div>
              <input {...register("cardNumber")}
                type="text"
                placeholder="Card number"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none mb-2"
                required
              />
              <div className="flex gap-2 mb-2">
                <input {...register("expiry")}
                  type="text"
                  placeholder="Expiration date (MM / YY)"
                  className="w-1/2 px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  required
                />
                <input {...register("cvc")}
                  type="text"
                  placeholder="Security code"
                  className="w-1/2 px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  required
                />
              </div>
              <input {...register("cardName")}
                type="text"
                placeholder="Name on card"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none mb-2"
                required
              />
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" {...register("billingSameAsShipping")} className="accent-[#2e7153]" defaultChecked />
                Use shipping address as billing address
              </label>
            </div>
          </div>
          <button type="submit" className="w-full bg-[#f5d377] text-black font-bold py-3 rounded mt-4 hover:bg-amber-300 transition">Pay now</button>
        </form>
        {/* Right: Cart Summary */}
        <aside className="w-full lg:w-1/2 bg-white p-6 sm:p-10 flex flex-col gap-6 min-h-[80vh]">
          <h2 className="text-lg font-bold mb-4">{cart.length > 0 ? `Subtotal · ${totalItems} item${totalItems > 1 ? "s" : ""}` : "Your cart is empty"}</h2>
          <div className="flex flex-col gap-4">
            {cart.map((item, idx) => (
              <div key={item._id || idx} className="flex items-center gap-4 border-b pb-4">
                <div className="relative">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover border" />
                  <span className="absolute -top-2 -right-2 bg-[#2e7153] text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center border-2 border-white">{item.quantity || 1}</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.weight || item.itemForm || ""}</div>
                </div>
                <div className="font-bold">₹{item.price}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Shipping</span>
              <span className="text-gray-500">Enter shipping address</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total</span>
              <span>INR ₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </main>
      <footer className="w-full text-center text-xs text-white py-4 border-t mt-auto bg-black">
      All Rights Reserved © 2024 MediPharma - Multi-Vendor Medicine Platform
      </footer>
    </div>
  );
};

export default Checkout; 
