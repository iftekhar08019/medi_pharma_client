import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const columns = [
  { name: "Medicine Name", selector: row => row.medicineName, sortable: true, wrap: true },
  { name: "Seller Email", selector: row => row.sellerEmail, sortable: true, wrap: true },
  { name: "Buyer Email", selector: row => row.buyerEmail, sortable: true, wrap: true },
  { name: "Quantity", selector: row => row.quantity, sortable: true, right: true },
  { name: "Unit Price", selector: row => `€${row.unitPrice}`, sortable: true, right: true },
  { name: "Total Price", selector: row => `€${row.totalPrice}`, sortable: true, right: true },
  { name: "Order ID", selector: row => row.orderId, sortable: true, wrap: true },
  { name: "Date", selector: row => new Date(row.date).toLocaleString(), sortable: true, wrap: true },
];

const SalesReport = () => {
  const axios = useAxios();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data: sales = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["sales-report", from, to],
    queryFn: async () => {
      const params = [];
      if (from) params.push(`from=${from}`);
      if (to) params.push(`to=${to}`);
      const url = `/sales-report${params.length ? `?${params.join("&")}` : ""}`;
      const res = await axios.get(url);
      return res.data;
    },
  });

  const handleFilter = (e) => {
    e.preventDefault();
    refetch();
  };

  // Card view for mobile
  const CardView = ({ sales }) => (
    <div className="block sm:hidden space-y-3">
      {sales.map((row, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-4 border text-xs">
          <div className="font-semibold mb-1">{row.medicineName}</div>
          <div><span className="font-medium">Seller:</span> {row.sellerEmail}</div>
          <div><span className="font-medium">Buyer:</span> {row.buyerEmail}</div>
          <div><span className="font-medium">Quantity:</span> {row.quantity}</div>
          <div><span className="font-medium">Unit Price:</span> €{row.unitPrice}</div>
          <div><span className="font-medium">Total Price:</span> €{row.totalPrice}</div>
          <div><span className="font-medium">Order ID:</span> {row.orderId}</div>
          <div><span className="font-medium">Date:</span> {new Date(row.date).toLocaleString()}</div>
        </div>
      ))}
      {sales.length === 0 && (
        <div className="py-8 text-gray-500 text-center">No sales found for the selected range.</div>
      )}
    </div>
  );

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Sales Report</h2>
        <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
          <form className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto" onSubmit={handleFilter}>
            <label className="text-xs sm:text-sm font-medium w-full sm:w-auto">From:
              <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="ml-1 border rounded px-2 py-1 w-full sm:w-auto" />
            </label>
            <label className="text-xs sm:text-sm font-medium w-full sm:w-auto">To:
              <input type="date" value={to} onChange={e => setTo(e.target.value)} className="ml-1 border rounded px-2 py-1 w-full sm:w-auto" />
            </label>
            <button type="submit" className="bg-[#396961] text-white px-4 py-2 rounded hover:bg-[#28524c] font-semibold w-full sm:w-auto">Filter</button>
          </form>
          <CSVLink
            data={sales}
            headers={columns.map(col => ({ label: col.name, key: col.selector.name || col.selector }))}
            filename={`sales-report-${from || "all"}-${to || "all"}.csv`}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold w-full sm:w-auto text-center"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>
      {/* Card view for mobile */}
      <CardView sales={sales} />
      {/* Table view for desktop */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-x-auto">
        <DataTable
          columns={columns}
          data={sales}
          progressPending={isLoading}
          noDataComponent={<div className="py-8 text-gray-500">No sales found for the selected range.</div>}
          pagination
          responsive
          highlightOnHover
          striped
          dense
        />
      </div>
      {isError && <div className="text-center text-red-500 mt-4">Failed to load sales report.</div>}
    </div>
  );
};

export default SalesReport; 
