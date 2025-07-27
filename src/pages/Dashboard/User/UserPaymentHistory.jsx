import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../context/AuthContext";

const UserPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["user-payments", user?.email],
    queryFn: async () => {
      // Load all, then filter client-side for this user
      const res = await axios.get("/payments");
      return res.data.filter((p) => p.user === user?.email);
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-4xl mx-auto px-2 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#396961]">My Payment History</h2>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        {isLoading ? (
          <div className="p-6 text-center">Loading payments...</div>
        ) : isError ? (
          <div className="p-6 text-center text-red-500">Failed to load payment history.</div>
        ) : payments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No payment history found.</div>
        ) : (
          <table className="min-w-[360px] w-full text-xs md:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 border-b text-center">Date</th>
                <th className="py-2 px-2 border-b text-center">Order ID</th>
                <th className="py-2 px-2 border-b text-center hidden sm:table-cell">Transaction ID</th>
                <th className="py-2 px-2 border-b text-center">Amount</th>
                <th className="py-2 px-2 border-b text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id.$oid || p._id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-2 border-b text-center">
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-2 px-2 border-b text-center">{p.orderId || "-"}</td>
                  <td className="py-2 px-2 border-b text-center hidden sm:table-cell">
                    {p.paymentIntentId || "-"}
                  </td>
                  <td className="py-2 px-2 border-b text-center font-semibold">
                    €{Number(p.amount).toFixed(2)}
                  </td>
                  <td className="py-2 px-2 border-b text-center">
                    <span className={
                      p.status === "paid"
                        ? "bg-green-100 text-green-700 px-2 py-1 rounded-full"
                        : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                    }>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserPaymentHistory;
