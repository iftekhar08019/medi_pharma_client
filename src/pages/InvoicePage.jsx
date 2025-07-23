import React, { useRef } from "react";
import Logo from "../utility/Logo";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router";

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceData = location.state?.invoiceData;
  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    print: (iframe) => {
      return new Promise((resolve) => {
        console.log("Custom printing, 1.5 second mock delay...");
        setTimeout(() => {
          console.log("Mock custom print of iframe complete", iframe);
          resolve();
        }, 1500);
      });
    },
  });

  if (!invoiceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0fdf4]">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <Logo className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#396961] mb-2">No Invoice Data</h2>
          <p className="text-gray-600 mb-4">No invoice information was found. Please complete a purchase first.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#396961] text-white font-bold py-2 px-8 rounded-full shadow hover:bg-[#235b40] transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const data = invoiceData;

  return (
    <div className="min-h-screen bg-[#f0fdf4] flex flex-col items-center py-8 px-2">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-[#396961]"
        ref={componentRef}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#396961] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Logo className="h-12 w-12" />
            <span className="text-3xl font-bold text-[#396961] ml-2">INVOICE</span>
          </div>
          <div className="text-right text-sm text-[#396961]">
            <div><span className="font-bold">INVOICE NO:</span> {data.invoiceNo}</div>
            <div><span className="font-bold">INVOICE DATE:</span> {data.invoiceDate}</div>
            {data.dueDate && <div><span className="font-bold">DUE DATE:</span> {data.dueDate}</div>}
          </div>
        </div>
        {/* Addresses */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div>
            <div className="font-bold text-[#396961]">FROM</div>
            <div className="text-sm text-gray-700">{data.company.name}</div>
            <div className="text-xs text-gray-500">{data.company.address}</div>
            <div className="text-xs text-gray-500">Phone: {data.company.phone}</div>
            <div className="text-xs text-gray-500">Email: {data.company.email}</div>
            <div className="text-xs text-gray-500">Website: {data.company.website}</div>
          </div>
          <div>
            <div className="font-bold text-[#396961]">BILLED TO</div>
            <div className="text-sm text-gray-700">{data.client.name}</div>
            <div className="text-xs text-gray-500">{data.client.address}</div>
            <div className="text-xs text-gray-500">Phone: {data.client.phone}</div>
            <div className="text-xs text-gray-500">Email: {data.client.email}</div>
          </div>
        </div>
        {/* Table */}
        <table className="w-full text-sm mb-6 border border-[#396961] rounded-xl overflow-hidden">
          <thead className="bg-[#eaf3ec] text-[#396961]">
            <tr>
              <th className="py-2 px-2 border-b border-[#396961]">ITEM NO.</th>
              <th className="py-2 px-2 border-b border-[#396961]">PRODUCT/SERVICE</th>
              <th className="py-2 px-2 border-b border-[#396961]">QUANTITY</th>
              <th className="py-2 px-2 border-b border-[#396961]">UNIT PRICE</th>
              <th className="py-2 px-2 border-b border-[#396961]">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-2 border-b border-[#eaf3ec]">{item.id}</td>
                <td className="py-2 px-2 border-b border-[#eaf3ec]">{item.name}</td>
                <td className="py-2 px-2 border-b border-[#eaf3ec]">{item.quantity}</td>
                <td className="py-2 px-2 border-b border-[#eaf3ec]">€{item.price.toFixed(2)}</td>
                <td className="py-2 px-2 border-b border-[#eaf3ec]">€{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Totals */}
        <div className="flex flex-col items-end gap-1 mb-4">
          <div className="flex gap-8">
            <div className="text-gray-700">SUBTOTAL:</div>
            <div className="font-bold text-[#396961]">€{data.subtotal.toFixed(2)}</div>
          </div>
          <div className="flex gap-8">
            <div className="text-gray-700">DISCOUNT (0%):</div>
            <div className="font-bold text-[#396961]">€0.00</div>
          </div>
          <div className="flex gap-8">
            <div className="text-gray-700">TAX (0%):</div>
            <div className="font-bold text-[#396961]">€0.00</div>
          </div>
          <div className="flex gap-8 text-lg mt-2">
            <div className="font-bold text-[#396961]">AMOUNT DUE</div>
            <div className="font-bold bg-[#396961] text-white px-4 py-1 rounded-lg">€{data.total.toFixed(2)}</div>
          </div>
        </div>
        {/* Footer */}
        <div className="text-xs text-gray-500 mt-4 border-t pt-2">
          <div>Make all checks payable to {data.company.name}</div>
          <div>If you have any questions about this invoice please contact us at {data.company.phone}, {data.company.email}</div>
        </div>
        <div className="text-center text-[#396961] font-bold mt-6">THANK YOU FOR YOUR BUSINESS!</div>
      </div>
      {/* Only show the print button if invoiceData is present and ref is attached */}
      {invoiceData && (
        <button
          onClick={printFn}
          className="mt-6 bg-[#396961] text-white font-bold py-2 px-8 rounded-full shadow hover:bg-[#235b40] transition cursor-pointer"
          disabled={!componentRef.current}
        >
          Print / Download PDF
        </button>
      )}
    </div>
  );
};

export default InvoicePage; 
