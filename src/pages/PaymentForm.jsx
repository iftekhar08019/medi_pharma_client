import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useNavigate } from "react-router";
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hooks/useAxios";

const PaymentForm = ({ amount, invoiceData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  // Example: Call this after payment is confirmed
  // paymentMutation.mutate(paymentData);

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
        // Redirect to invoice page with invoice data
        setTimeout(() => {
          navigate("/invoice", { state: { invoiceData } });
        }, 1000);
        // After payment is confirmed:
        const paymentData = {
          user: user?.email, // or userId
          amount: amount, // in euros
          status: 'paid',
          orderId: invoiceData?.invoiceNo, // use invoice number as orderId
          paymentIntentId: result.paymentIntent?.id, // from Stripe result
          createdAt: new Date().toISOString(),
        };
        paymentMutation.mutate(paymentData);
      }
    } catch {
      setError("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
      <CardElement className="p-3 border rounded bg-white" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-[#396961] text-white font-bold py-2 rounded mt-2 hover:bg-[#235b40] transition"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
    </form>
  );
};

export default PaymentForm; 
