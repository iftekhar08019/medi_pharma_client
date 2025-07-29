import React, { useRef, useState } from "react";
import Logo from "../utility/Logo";
import { useLocation, useNavigate } from "react-router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast, { Toaster } from "react-hot-toast";

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceData = location.state?.invoiceData;
  const componentRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!invoiceData) {
    return (
      <div
        style={{ backgroundColor: "#f0fdf4", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center"
      >
        <div
          style={{ backgroundColor: "#fff" }}
          className="p-8 rounded-xl shadow text-center"
        >
          <Logo className="mx-auto mb-4" />
          <h2 style={{ color: "#396961" }} className="text-2xl font-bold mb-2">
            No Invoice Data
          </h2>
          <p className="text-gray-600 mb-4">
            No invoice information was found. Please complete a purchase first.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{ backgroundColor: "#396961" }}
            className="text-white font-bold py-2 px-8 rounded-full shadow hover:bg-[#235b40] transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const data = invoiceData;

  const generatePDF = async () => {
    if (!componentRef.current) {
      toast.error("Invoice content not found. Please try again.");
      return;
    }

    setIsGeneratingPDF(true);

    try {
      const loadingToast = toast.loading("Generating PDF... Please wait while we prepare your invoice.");

      const canvas = await html2canvas(componentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
        width: componentRef.current.scrollWidth,
        height: componentRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileName = `Invoice_${data.invoiceNo}_${new Date()
        .toISOString()
        .split("T")[0]}.pdf`;

      pdf.save(fileName);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success(`PDF Generated Successfully! Invoice has been downloaded as ${fileName}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.dismiss(loadingToast);
      toast.error("PDF Generation Failed. There was an error generating the PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const printInvoice = () => {
    if (!componentRef.current) {
      toast.error("Invoice content not found. Please try again.");
      return;
    }

    const printWindow = window.open("", "_blank");
    const content = componentRef.current.innerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${data.invoiceNo}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 24px; background: #f0fdf4; }
            .invoice-container { max-width: 820px; margin: 0 auto; background: #fff; padding: 24px 30px; border: 1px solid #396961; border-radius: 16px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #396961; padding-bottom: 20px; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #396961; }
            .invoice-info { text-align: right; font-size: 14px; color: #396961; }
            .addresses { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .address-title { font-weight: bold; color: #396961; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #eaf3ec; color: #396961; font-weight: bold; }
            .totals { text-align: right; margin-bottom: 30px; }
            .total-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .amount-due { font-size: 18px; font-weight: bold; color: #fff; background-color: #396961; padding: 10px 24px; border-radius: 7px; }
            .footer { text-align: center; margin-top: 30px; color: #396961; font-weight: bold; }
            @media print {
              body { background: #fff; margin: 0; }
              .invoice-container { border: none; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            ${content}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          loading: {
            duration: Infinity,
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
        }}
      />
      <div
        style={{ backgroundColor: "#f0fdf4", minHeight: "100vh" }}
        className="flex flex-col items-center py-8 px-2"
      >
      <div
        ref={componentRef}
        style={{
          backgroundColor: "#fff",
          border: "1px solid #396961",
          borderRadius: "16px",
          boxShadow: "0 6px 24px 0 rgba(0,0,0,0.06)",
          maxWidth: "820px",
          width: "100%",
          padding: "24px 30px",
          position: "relative",
        }}
      >
        {/* Style override for safe colors */}
        <style>{`
          * {
            background-color: transparent !important;
            color: #222 !important;
          }
          th {
            background-color: #eaf3ec !important;
            color: #396961 !important;
          }
          .amount-due {
            background-color: #396961 !important;
            color: #fff !important;
          }
        `}</style>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #396961",
            paddingBottom: "18px",
            marginBottom: "26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Logo className="h-12 w-12" />
            <span
              style={{ color: "#396961", fontWeight: 700, fontSize: 32 }}
              className="ml-2"
            >
              INVOICE
            </span>
          </div>
          <div style={{ textAlign: "right", color: "#396961", fontSize: 15 }}>
            <div>
              <span style={{ fontWeight: "bold" }}>INVOICE NO:</span> {data.invoiceNo}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>INVOICE DATE:</span> {data.invoiceDate}
            </div>
            {data.dueDate && (
              <div>
                <span style={{ fontWeight: "bold" }}>DUE DATE:</span> {data.dueDate}
              </div>
            )}
          </div>
        </div>

        {/* Addresses */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 40,
            marginBottom: 30,
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: "bold",
                color: "#396961",
                marginBottom: 8,
                fontSize: 17,
              }}
            >
              FROM
            </div>
            <div style={{ fontSize: 15, color: "#222" }}>
              <div style={{ fontWeight: 600 }}>{data.company.name}</div>
              <div>{data.company.address}</div>
              <div>Phone: {data.company.phone}</div>
              <div>Email: {data.company.email}</div>
              <div>Website: {data.company.website}</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: "bold",
                color: "#396961",
                marginBottom: 8,
                fontSize: 17,
              }}
            >
              BILLED TO
            </div>
            <div style={{ fontSize: 15, color: "#222" }}>
              <div style={{ fontWeight: 600 }}>{data.client.name}</div>
              <div>{data.client.address}</div>
              <div>Phone: {data.client.phone}</div>
              <div>Email: {data.client.email}</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto", marginBottom: 24 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: "10px",
              overflow: "hidden",
              fontSize: 15,
              border: "1px solid #396961",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "10px 6px", borderBottom: "1px solid #396961", textAlign: "left" }}>
                  ITEM NO.
                </th>
                <th style={{ padding: "10px 6px", borderBottom: "1px solid #396961", textAlign: "left" }}>
                  PRODUCT/SERVICE
                </th>
                <th style={{ padding: "10px 6px", borderBottom: "1px solid #396961", textAlign: "center" }}>
                  QUANTITY
                </th>
                <th style={{ padding: "10px 6px", borderBottom: "1px solid #396961", textAlign: "right" }}>
                  UNIT PRICE
                </th>
                <th style={{ padding: "10px 6px", borderBottom: "1px solid #396961", textAlign: "right" }}>
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ padding: "10px 6px", borderBottom: "1px solid #eaf3ec" }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: "10px 6px", borderBottom: "1px solid #eaf3ec", fontWeight: 500 }}>
                    {item.name}
                  </td>
                  <td style={{ padding: "10px 6px", borderBottom: "1px solid #eaf3ec", textAlign: "center" }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: "10px 6px", borderBottom: "1px solid #eaf3ec", textAlign: "right" }}>
                    €{item.price.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px 6px", borderBottom: "1px solid #eaf3ec", textAlign: "right", fontWeight: 600 }}>
                    €{item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, marginBottom: 22 }}>
          <div style={{ display: "flex", gap: 38, alignItems: "center" }}>
            <div style={{ color: "#555", fontWeight: 500 }}>SUBTOTAL:</div>
            <div style={{ fontWeight: 700, color: "#396961", width: 100, textAlign: "right" }}>
              €{data.subtotal.toFixed(2)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 38, alignItems: "center" }}>
            <div style={{ color: "#555", fontWeight: 500 }}>DISCOUNT (0%):</div>
            <div style={{ fontWeight: 700, color: "#396961", width: 100, textAlign: "right" }}>
              €0.00
            </div>
          </div>
          <div style={{ display: "flex", gap: 38, alignItems: "center" }}>
            <div style={{ color: "#555", fontWeight: 500 }}>TAX (0%):</div>
            <div style={{ fontWeight: 700, color: "#396961", width: 100, textAlign: "right" }}>
              €0.00
            </div>
          </div>
          <div style={{ display: "flex", gap: 38, alignItems: "center", fontSize: 19, marginTop: 15, paddingTop: 10, borderTop: "2px solid #396961" }}>
            <div style={{ fontWeight: 700, color: "#396961" }}>AMOUNT DUE</div>
            <div className="amount-due" style={{ fontWeight: 700, backgroundColor: "#396961", color: "#fff", padding: "10px 24px", borderRadius: "7px" }}>
              €{data.total.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ fontSize: 13, color: "#666", marginTop: 30, borderTop: "1px solid #eee", paddingTop: 14 }}>
          <div>
            Make all checks payable to <span style={{ fontWeight: 600 }}>{data.company.name}</span>
          </div>
          <div>
            If you have any questions about this invoice, contact us at{" "}
            <span style={{ fontWeight: 600 }}>{data.company.phone}</span> or{" "}
            <span style={{ fontWeight: 600 }}>{data.company.email}</span>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            color: "#396961",
            fontWeight: "bold",
            marginTop: 32,
            fontSize: 18,
          }}
        >
          THANK YOU FOR YOUR BUSINESS!
        </div>
      </div>

      {/* Action Buttons */}
      {invoiceData && (
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            style={{
              backgroundColor: "#396961",
              color: "#fff",
              fontWeight: 700,
              padding: "12px 38px",
              borderRadius: "9999px",
              boxShadow: "0 2px 8px 0 rgba(35,91,64,0.12)",
              transition: "background 0.2s",
              opacity: isGeneratingPDF ? 0.7 : 1,
              cursor: isGeneratingPDF ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {isGeneratingPDF ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PDF
              </>
            )}
          </button>
          <button
            onClick={printInvoice}
            style={{
              backgroundColor: "#2e7153",
              color: "#fff",
              fontWeight: 700,
              padding: "12px 38px",
              borderRadius: "9999px",
              boxShadow: "0 2px 8px 0 rgba(46,113,83,0.12)",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print Invoice
          </button>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#999",
              color: "#fff",
              fontWeight: 700,
              padding: "12px 38px",
              borderRadius: "9999px",
              boxShadow: "0 2px 8px 0 rgba(160,160,160,0.10)",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default InvoicePage;
