import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { FaCheck, FaTimes, FaEye, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManagePayments = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  // Fetch payments
  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get("/payments");
      return res.data;
    },
  });

  // Update payment status mutation
  const updatePaymentMutation = useMutation({
    mutationFn: async ({ paymentId, status }) => {
      return axios.patch(`/payments/${paymentId}`, { status });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["payments"]);
      toast.success(`Payment status updated to ${data.data.status}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Failed to update payment status");
    },
  });

  const handleAcceptPayment = async (payment) => {
    const result = await Swal.fire({
      title: "Accept Payment?",
      text: `Accept payment of €${payment.amount} from ${payment.user}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Accept!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      updatePaymentMutation.mutate({
        paymentId: payment._id?.$oid || payment._id,
        status: "paid"
      });
    }
  };

  const handleRejectPayment = async (payment) => {
    const result = await Swal.fire({
      title: "Reject Payment?",
      text: `Reject payment of €${payment.amount} from ${payment.user}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      updatePaymentMutation.mutate({
        paymentId: payment._id?.$oid || payment._id,
        status: "cancelled"
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: <FaClock className="w-3 h-3" /> },
      paid: { color: "bg-green-100 text-green-800", icon: <FaCheck className="w-3 h-3" /> },
      cancelled: { color: "bg-red-100 text-red-800", icon: <FaTimes className="w-3 h-3" /> },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        <span className="hidden sm:inline">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) return <div className="p-4 sm:p-6 text-center">Loading payments...</div>;
  if (isError) return <div className="p-4 sm:p-6 text-center text-red-500">Failed to load payments.</div>;

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Payment Management</h2>
        <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-right">
          Total Payments: {payments.length}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {payments.map((payment) => (
          <div key={payment._id?.$oid || payment._id} className="bg-white rounded-lg shadow p-4 border">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="font-semibold text-sm">{payment.user}</div>
                <div className="text-xs text-gray-500">Order #{payment.orderId}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">€{payment.amount}</div>
                {getStatusBadge(payment.status)}
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-3">
              {formatDate(payment.createdAt)}
            </div>
            {payment.status === "pending" && (
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg shadow transition text-sm font-semibold"
                  onClick={() => handleAcceptPayment(payment)}
                  disabled={updatePaymentMutation.isLoading}
                >
                  <FaCheck /> Accept
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow transition text-sm font-semibold"
                  onClick={() => handleRejectPayment(payment)}
                  disabled={updatePaymentMutation.isLoading}
                >
                  <FaTimes /> Reject
                </button>
              </div>
            )}
            {payment.status !== "pending" && (
              <div className="text-xs text-gray-400 text-center">No actions available</div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-2 md:px-4 border-b text-left">User</th>
              <th className="py-3 px-2 md:px-4 border-b text-left">Order ID</th>
              <th className="py-3 px-2 md:px-4 border-b text-center">Amount</th>
              <th className="py-3 px-2 md:px-4 border-b text-center">Status</th>
              <th className="py-3 px-2 md:px-4 border-b text-center">Date</th>
              <th className="py-3 px-2 md:px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id?.$oid || payment._id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-2 md:px-4 border-b">
                  <div className="font-medium">{payment.user}</div>
                  <div className="text-xs text-gray-500">{payment.paymentIntentId}</div>
                </td>
                <td className="py-3 px-2 md:px-4 border-b font-mono text-sm">
                  #{payment.orderId}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-center font-bold">
                  €{payment.amount}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-center">
                  {getStatusBadge(payment.status)}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-center text-sm">
                  {formatDate(payment.createdAt)}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-center">
                  <div className="flex justify-center gap-2">
                    {payment.status === "pending" && (
                      <>
                        <button
                          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow transition text-xs md:text-sm font-semibold"
                          onClick={() => handleAcceptPayment(payment)}
                          disabled={updatePaymentMutation.isLoading}
                          title="Accept Payment"
                        >
                          <FaCheck /> <span className="hidden sm:inline">Accept</span>
                        </button>
                        <button
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition text-xs md:text-sm font-semibold"
                          onClick={() => handleRejectPayment(payment)}
                          disabled={updatePaymentMutation.isLoading}
                          title="Reject Payment"
                        >
                          <FaTimes /> <span className="hidden sm:inline">Reject</span>
                        </button>
                      </>
                    )}
                    {payment.status !== "pending" && (
                      <span className="text-gray-400 text-xs">No actions available</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payments.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No payments found.
        </div>
      )}
    </div>
  );
};

export default ManagePayments; 
