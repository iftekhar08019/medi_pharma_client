import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PaymentHistory = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const sellerEmail = user?.email;

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get("/payments");
      return res.data;
    },
  });

  // Filter payments to those with at least one item for this seller
  const mySales = payments
    .map((payment) => {
      const sellerItems = (payment.items || []).filter(
        (item) => item.sellerEmail === sellerEmail
      );
      if (!sellerItems.length) return null;
      return { ...payment, sellerItems };
    })
    .filter(Boolean);

  // Aggregate paid and pending totals
  const { paidTotal, pendingTotal } = mySales.reduce(
    (totals, p) => {
      const sum = p.sellerItems.reduce(
        (s, item) => s + Number(item.price) * Number(item.quantity),
        0
      );
      if (p.status === "paid") totals.paidTotal += sum;
      else totals.pendingTotal += sum;
      return totals;
    },
    { paidTotal: 0, pendingTotal: 0 }
  );

  // Chart Data
  const chartData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        label: "Total Sales (€)",
        data: [paidTotal, pendingTotal],
        backgroundColor: ["#16a34a", "#facc15"],
        borderRadius: 12,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `€${ctx.parsed.y}` } },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 sm:mb-6 text-center sm:text-left">
        Payment History (Your Sales)
      </h2>

      {/* CHART */}
      <div className="mb-4 sm:mb-8 bg-white rounded-xl shadow p-4 sm:p-8">
        <h3 className="font-semibold mb-2">Sales Overview</h3>
        <div className="w-full max-w-md mx-auto">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <span className="text-green-700 font-medium">Paid: €{paidTotal.toFixed(2)}</span>
          <span className="text-yellow-700 font-medium">Pending: €{pendingTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Responsive TABLE */}
      {isLoading ? (
        <div>Loading payments...</div>
      ) : isError ? (
        <div className="text-red-500">Failed to load payments.</div>
      ) : mySales.length === 0 ? (
        <div className="text-gray-500">No payments found for your medicines.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-[420px] w-full text-xs md:text-sm lg:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 border-b text-center">Order</th>
                <th className="py-2 px-2 border-b text-center hidden sm:table-cell">Buyer</th>
                <th className="py-2 px-2 border-b text-center">Status</th>
                <th className="py-2 px-2 border-b text-center hidden md:table-cell">Date</th>
                <th className="py-2 px-2 border-b text-center">Items</th>
                <th className="py-2 px-2 border-b text-center">Total (€)</th>
              </tr>
            </thead>
            <tbody>
              {mySales.map((p) => (
                <tr key={p._id.$oid || p._id}>
                  <td className="py-2 px-2 border-b text-center">{p.orderId}</td>
                  <td className="py-2 px-2 border-b text-center hidden sm:table-cell">{p.user}</td>
                  <td className="py-2 px-2 border-b text-center">
                    <span
                      className={
                        p.status === "paid"
                          ? "bg-green-100 text-green-700 px-2 py-1 rounded-full"
                          : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                      }
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2 px-2 border-b text-center hidden md:table-cell">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-2 border-b">
                    <ul className="list-disc pl-4">
                      {p.sellerItems.map((item, idx) => (
                        <li key={idx}>
                          <span className="font-semibold">{item.name}</span> (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-2 border-b text-center font-bold">
                    €
                    {p.sellerItems
                      .reduce(
                        (sum, item) =>
                          sum + Number(item.price) * Number(item.quantity),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
