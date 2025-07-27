import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useNavigate } from "react-router";
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import useAxios from "../hooks/useAxios";

const PaymentForm = ({ amount, invoiceData, disabled = false }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, dispatch } = useCart();

  const paymentMutation = useMutation({
    mutationFn: async (paymentData) => {
      const res = await axiosInstance.post('/payments', paymentData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Payment recorded successfully!');
    },
    onError: () => {
      toast.error('Failed to record payment.');
    }
  });

  // Stock reduction mutation
  const reduceStockMutation = useMutation({
    mutationFn: async (items) => {
      const res = await axiosInstance.patch('/products/reduce-stock', { items });
      return res.data;
    },
    onSuccess: (data) => {
      // Check if all stock reductions were successful
      const failedItems = data.results.filter(item => !item.success);
      if (failedItems.length > 0) {
        toast.error(`Stock reduction failed for some items: ${failedItems.map(item => item.error).join(', ')}`);
      } else {
        toast.success('Stock updated successfully!');
        dispatch({ type: "CLEAR" }); // Clear cart after successful stock reduction
      }
    },
    onError: () => {
      toast.error('Failed to update stock.');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // 1. Create PaymentIntent on backend
      const { data } = await axiosInstance.post("/create-payment-intent", {
        amount: Math.round(amount * 100), // convert to cents
        currency: "eur",
      });
      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess("Payment successful!");
        
        // 3. Record payment
        const paymentData = {
          user: user?.email,
          amount: amount,
          status: 'pending',
          orderId: invoiceData?.invoiceNo,
          paymentIntentId: result.paymentIntent?.id,
          createdAt: new Date().toISOString(),
          items: cart.map(item => ({
            name: item.name,
            sellerEmail: item.sellerEmail || 'Anonymous Seller',
            sellerName: item.sellerName || 'Anonymous Seller',
            quantity: item.quantity,
            price: item.price
          }))
        };
        await paymentMutation.mutateAsync(paymentData);
        
        // 4. Reduce stock for all items in cart
        const stockReductionItems = cart.map(item => ({
          productId: item._id,
          quantity: item.quantity || 1
        }));
        await reduceStockMutation.mutateAsync(stockReductionItems);
        
        // 5. Redirect to invoice page with invoice data
        setTimeout(() => {
          navigate("/invoice", { state: { invoiceData } });
        }, 1000);
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
      console.error("Payment error:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
      <CardElement className="p-3 border rounded bg-white" />
      <button
        type="submit"
        disabled={!stripe || loading || disabled}
        className="bg-[#396961] text-white font-bold py-2 rounded mt-2 hover:bg-[#235b40] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : disabled ? "Insufficient Stock" : "Pay"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      {disabled && (
        <div className="text-yellow-600 text-sm">
          Some items have insufficient stock. Please update your cart.
        </div>
      )}
    </form>
  );
};

export default PaymentForm; 
