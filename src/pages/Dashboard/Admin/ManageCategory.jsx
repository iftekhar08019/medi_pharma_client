import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { FaEdit, FaTrash } from "react-icons/fa";

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

const ManageCategory = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form, setForm] = useState({ categoryName: "", categoryImage: "" });
  const [formError, setFormError] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch categories
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/categories");
      return res.data;
    },
  });

  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory) => {
      return axios.post("/categories", newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setIsAddModalOpen(false);
      setForm({ categoryName: "", categoryImage: "" });
      setImageFile(null);
      setFormError("");
    },
    onError: (error) => {
      setFormError(error?.response?.data?.error || "Failed to add category");
    },
  });

  // Edit category mutation
  const editCategoryMutation = useMutation({
    mutationFn: async ({ id, updateFields }) => {
      return axios.patch(`/categories/${id}`, updateFields);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setIsEditModalOpen(false);
      setEditCategory(null);
      setForm({ categoryName: "", categoryImage: "" });
      setImageFile(null);
      setFormError("");
    },
    onError: (error) => {
      setFormError(error?.response?.data?.error || "Failed to update category");
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setFormError("");
    let imageUrl = form.categoryImage;
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
    if (!form.categoryName || !imageUrl) {
      setFormError("Both fields are required.");
      return;
    }
    addCategoryMutation.mutate({ categoryName: form.categoryName, categoryImage: imageUrl });
  };

  const handleEditCategory = (cat) => {
    setEditCategory(cat);
    setForm({ categoryName: cat.categoryName, categoryImage: cat.categoryImage });
    setImageFile(null);
    setFormError("");
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setFormError("");
    let imageUrl = form.categoryImage;
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
    if (!form.categoryName || !imageUrl) {
      setFormError("Both fields are required.");
      return;
    }
    editCategoryMutation.mutate({
      id: editCategory._id?.$oid || editCategory._id,
      updateFields: { categoryName: form.categoryName, categoryImage: imageUrl },
    });
  };

  const handleDeleteCategory = (cat) => {
    if (window.confirm(`Are you sure you want to delete category "${cat.categoryName}"?`)) {
      deleteCategoryMutation.mutate(cat._id?.$oid || cat._id);
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-center sm:text-left">Manage Categories</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition font-semibold w-full sm:w-auto"
          onClick={() => { setIsAddModalOpen(true); setForm({ categoryName: "", categoryImage: "" }); setImageFile(null); setFormError(""); }}
        >
          + Add Category
        </button>
      </div>
      {isLoading ? (
        <div>Loading categories...</div>
      ) : isError ? (
        <div className="text-red-500">Failed to load categories.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 md:px-4 border-b text-center">Image</th>
                <th className="py-2 px-2 md:px-4 border-b text-center">Category Name</th>
                <th className="py-2 px-2 md:px-4 border-b text-center">Medicine Count</th>
                <th className="py-2 px-2 md:px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id?.$oid || cat._id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    <img src={cat.categoryImage} alt={cat.categoryName} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full mx-auto border" />
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center font-semibold">{cat.categoryName}</td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">{cat.medicineCount}</td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow transition text-xs md:text-sm font-semibold"
                        onClick={() => handleEditCategory(cat)}
                        title="Edit"
                      >
                        <FaEdit /> <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition text-xs md:text-sm font-semibold"
                        onClick={() => handleDeleteCategory(cat)}
                        disabled={deleteCategoryMutation.isLoading}
                        title="Delete"
                      >
                        <FaTrash /> <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for Add Category */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-2">
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md relative mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => { setIsAddModalOpen(false); setFormError(""); }}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">Add New Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  value={form.categoryName}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Category Image URL</label>
                <input
                  type="text"
                  name="categoryImage"
                  value={form.categoryImage}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Or upload an image below"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              {formError && <div className="text-red-500 mb-2 text-center">{formError}</div>}
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full font-semibold"
                disabled={addCategoryMutation.isLoading || isUploading}
              >
                {addCategoryMutation.isLoading || isUploading ? "Adding..." : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal for Edit Category */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-2">
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md relative mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => { setIsEditModalOpen(false); setFormError(""); }}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">Edit Category</h3>
            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  value={form.categoryName}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Category Image URL</label>
                <input
                  type="text"
                  name="categoryImage"
                  value={form.categoryImage}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Or upload an image below"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              {formError && <div className="text-red-500 mb-2 text-center">{formError}</div>}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 w-full font-semibold"
                disabled={editCategoryMutation.isLoading || isUploading}
              >
                {editCategoryMutation.isLoading || isUploading ? "Updating..." : "Update Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory; 
