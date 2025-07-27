import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import useAxios from "../../../hooks/useAxios";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const axiosInstance = useAxios();
  const { data, isLoading, error } = useQuery({
    queryKey: ["payments-summary"],
    queryFn: async () => {
      const res = await axiosInstance.get("/summary");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading summary</div>;

  const pieData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [data.paidTotal, data.pendingTotal],
        backgroundColor: ["#5DD39E", "#396961"],
        borderColor: ["#eaf3ec", "#eaf3ec"],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#396961",
          font: { size: 16, family: 'Outfit, sans-serif' },
        },
      },
    },
  };

  return (
    <div className="w-[96%] mx-auto my-10" >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#eaf3ec] p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold">€{data.totalRevenue}</p>
        </div>
        <div className="bg-[#eaf3ec] p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Paid Total</h3>
          <p className="text-2xl font-bold">€{data.paidTotal}</p>
        </div>
        <div className="bg-[#eaf3ec] p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Pending Total</h3>
          <p className="text-2xl font-bold">€{data.pendingTotal}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h3 className="text-xl font-bold mb-4 text-[#396961]">Revenue Breakdown</h3>
        <div className="w-full max-w-xs">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
