import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";

// Helper function to upload image to imgbb
const uploadImageToImgbb = async (file) => {
  const apiKey = import.meta.env.VITE_image_upload_key;
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error("Image upload failed");
  }
};

// You can pass sellerEmail as a prop or get from context
const ManageMedicines = () => {
  const { user } = useContext(AuthContext);
  const sellerEmail = user?.email; // Assuming user email is the seller's email
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    genericName: "",
    shortDescription: "",
    category: "",
    company: "",
    unit: "",
    price: "",
    discountPercent: "",
    stockCount: "",
    weightOption1: "",
    weightOption2: "",
    benefit1: "",
    benefit2: "",
    imageUrl: "",
  });
  const [formError, setFormError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [customCompany, setCustomCompany] = useState("");

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/categories");
      return res.data;
    },
  });

  // Fetch medicines for this seller
  const {
    data: medicines = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-medicines", sellerEmail],
    queryFn: async () => {
      const res = await axios.get(`/products?sellerEmail=${sellerEmail}`);
      return res.data;
    },
    enabled: !!sellerEmail,
  });

  // Add medicine mutation
  const addMedicineMutation = useMutation({
    mutationFn: async (medicine) => {
      return axios.post("/products", medicine);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-medicines", sellerEmail]);
      setIsAddModalOpen(false);
      setForm({
        name: "",
        genericName: "",
        shortDescription: "",
        category: "",
        company: "",
        unit: "",
        price: "",
        discountPercent: "",
        stockCount: "",
        weightOption1: "",
        weightOption2: "",
        benefit1: "",
        benefit2: "",
        imageUrl: "",
      });
      setImageFile(null);
      setFormError("");
      setCustomCompany("");
      Swal.fire({
        icon: "success",
        title: "Medicine added!",
        toast: true,
        timer: 1200,
        showConfirmButton: false,
        position: "top-end",
      });
    },
    onError: (error) => {
      setFormError(error?.response?.data?.error || "Failed to add medicine");
    },
  });

  const companyOptions = [
    "Square Pharmaceuticals Ltd.",
    "Incepta Pharmaceuticals Ltd.",
    "ACI Limited",
    "Beximco Pharmaceuticals Ltd.",
    "Other (Type Company Name)",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "company" && value !== "Other (Type Company Name)") {
      setCustomCompany("");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    setFormError("");
    let imageUrl = form.imageUrl;
    if (imageFile) {
      setIsUploading(true);
      try {
        imageUrl = await uploadImageToImgbb(imageFile);
      } catch {
        setFormError("Image upload failed. Please try again.");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }
    if (
      !form.name ||
      !form.genericName ||
      !form.category ||
      !form.unit ||
      !form.price ||
      !imageUrl
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }
    const medicine = {
      name: form.name,
      genericName: form.genericName,
      shortDescription: form.shortDescription,
      imageUrl,
      category: form.category,
      company:
        form.company === "Other (Type Company Name)"
          ? customCompany
          : form.company,
      unit: form.unit,
      price: Number(form.price),
      discountPercent: Number(form.discountPercent) || 0,
      discounted: !!Number(form.discountPercent),
      discountPrice: form.discountPercent
        ? Number(form.price) * (1 - Number(form.discountPercent) / 100)
        : Number(form.price),
      currency: "€",
      inStock: true,
      stockCount: Number(form.stockCount) || 0,
      weightOptions: [form.weightOption1, form.weightOption2].filter(Boolean),
      selectedWeight: form.weightOption1,
      itemForm: "Capsule",
      productBenefits: [form.benefit1, form.benefit2].filter(Boolean),
      selectedBenefit: form.benefit1,
      rating: 5,
      reviewCount: 0,
      description: form.shortDescription,
      sellerEmail,
    };
    addMedicineMutation.mutate(medicine);
  };

  // No edit/delete here for simplicity, can be added as needed

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-center sm:text-left">
          Manage Medicines
        </h2>
        <button
          className="bg-[#396961] text-white px-4 py-2 rounded-lg shadow hover:bg-[#28524c] transition font-semibold w-full sm:w-auto"
          onClick={() => {
            setIsAddModalOpen(true);
            setFormError("");
          }}
        >
          + Add Medicine
        </button>
      </div>
      {isLoading ? (
        <div>Loading medicines...</div>
      ) : isError ? (
        <div className="text-red-500">Failed to load medicines.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Image
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">Name</th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Generic
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Category
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Company
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">Unit</th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Stock
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Price
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Discount (%)
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Benefits
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m._id}>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    <img
                      src={m.imageUrl}
                      alt={m.name}
                      className="w-12 h-12 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {m.name}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {m.genericName}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {m.category}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {m.company}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {m.unit}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {m.stockCount}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    €{Number(m.price).toFixed(2)}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {m.discountPercent || 0}%
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {(m.productBenefits || []).join(", ")}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {m.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg mx-auto px-2">
            <div
              className="
          bg-white border border-gray-200 rounded-xl shadow-lg w-full relative
          max-h-[90vh] overflow-y-auto
          flex flex-col
          p-5 sm:p-6 md:p-8
        "
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 md:top-3 md:right-3 text-gray-400 hover:text-black text-2xl z-10"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setFormError("");
                }}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4 mt-1 text-center">
                Add New Medicine
              </h3>
              <form
                onSubmit={handleAddMedicine}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {/* Item Name */}
                <div>
                  <label className="block mb-1 font-semibold">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#396961]"
                    required
                  />
                </div>
                {/* Generic Name */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Generic Name
                  </label>
                  <input
                    type="text"
                    name="genericName"
                    value={form.genericName}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#396961]"
                    required
                  />
                </div>
                {/* Short Description */}
                <div className="md:col-span-2">
                  <label className="block mb-1 font-semibold">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#396961]"
                    rows={2}
                  />
                </div>
                {/* Image Upload */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Image Upload
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    required
                  />
                </div>
                {/* Category */}
                <div>
                  <label className="block mb-1 font-semibold">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.categoryName} value={c.categoryName}>
                        {c.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Company */}
                <div>
                  <label className="block mb-1 font-semibold">Company</label>
                  <select
                    name="company"
                    value={form.company}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    required
                  >
                    <option value="">Select company</option>
                    {companyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {form.company === "Other (Type Company Name)" && (
                    <input
                      type="text"
                      value={customCompany}
                      onChange={(e) => setCustomCompany(e.target.value)}
                      placeholder="Enter company name"
                      className="w-full border rounded px-2 py-1.5 mt-2 text-sm"
                      required
                    />
                  )}
                </div>
                {/* Mass Unit */}
                <div>
                  <label className="block mb-1 font-semibold">Mass Unit</label>
                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    required
                  >
                    <option value="">Select unit</option>
                    <option value="Mg">Mg</option>
                    <option value="ML">ML</option>
                  </select>
                </div>
                {/* Stock Count */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    name="stockCount"
                    value={form.stockCount}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    min="0"
                    required
                  />
                </div>
                {/* Per Unit Price */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Per Unit Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                {/* Discount (%) */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discountPercent"
                    value={form.discountPercent}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    min="0"
                    max="100"
                    placeholder="Default 0"
                  />
                </div>
                {/* Weight Option 1 */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Weight Option 1
                  </label>
                  <input
                    type="text"
                    name="weightOption1"
                    value={form.weightOption1}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    placeholder="E.g., 20 Capsules"
                  />
                </div>
                {/* Weight Option 2 */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Weight Option 2
                  </label>
                  <input
                    type="text"
                    name="weightOption2"
                    value={form.weightOption2}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    placeholder="E.g., 40 Capsules"
                  />
                </div>
                {/* Benefit 1 */}
                <div>
                  <label className="block mb-1 font-semibold">Benefit 1</label>
                  <input
                    type="text"
                    name="benefit1"
                    value={form.benefit1}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    placeholder="E.g., Pain Relief"
                  />
                </div>
                {/* Benefit 2 */}
                <div>
                  <label className="block mb-1 font-semibold">Benefit 2</label>
                  <input
                    type="text"
                    name="benefit2"
                    value={form.benefit2}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1.5 rounded text-sm"
                    placeholder="E.g., Anti-inflammatory"
                  />
                </div>
                {/* Error Message */}
                {formError && (
                  <div className="md:col-span-2 text-red-500 mb-2 text-center">
                    {formError}
                  </div>
                )}
                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-[#396961] text-white px-8 py-2 rounded-lg shadow hover:bg-[#28524c] font-semibold w-full md:w-auto"
                    disabled={addMedicineMutation.isLoading || isUploading}
                  >
                    {addMedicineMutation.isLoading || isUploading
                      ? "Saving..."
                      : "Add Medicine"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;
