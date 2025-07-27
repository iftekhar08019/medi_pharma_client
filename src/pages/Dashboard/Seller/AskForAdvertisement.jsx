import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";

// Helper for image upload
const uploadImageToImgbb = async (file) => {
  const apiKey = import.meta.env.VITE_image_upload_key;
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (data.success) return data.data.url;
  throw new Error("Image upload failed");
};

const AskForAdvertisement = () => {
  const { user } = useContext(AuthContext);
  const sellerEmail = user?.email;
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    img: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [formError, setFormError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Fetch advertisements
  const { data: ads = [], isLoading, isError } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axios.get("/advertisements");
      return res.data;
    },
  });

  // Add advertisement
  const addAdMutation = useMutation({
    mutationFn: async (ad) => {
      return axios.post("/advertisements", ad);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["advertisements"]);
      setIsAddModalOpen(false);
      setForm({ title: "", description: "", img: "" });
      setImageFile(null);
      setFormError("");
      Swal.fire({
        icon: "success",
        title: "Advertisement added!",
        toast: true,
        timer: 1200,
        showConfirmButton: false,
        position: "top-end",
      });
    },
    onError: (error) => {
      setFormError(error?.response?.data?.error || "Failed to add advertisement");
    },
  });

  // Add Advertisement Submit
  const handleAddAd = async (e) => {
    e.preventDefault();
    setFormError("");
    let imgUrl = form.img;
    if (imageFile) {
      setIsUploading(true);
      try {
        imgUrl = await uploadImageToImgbb(imageFile);
      } catch {
        setFormError("Image upload failed. Please try again.");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }
    if (!form.title || !form.description || !imgUrl) {
      setFormError("All fields are required.");
      return;
    }
    const newAd = {
      title: form.title,
      description: form.description,
      img: imgUrl,
      showInSlider: false,
      sellerEmail, // Attach seller, so you can filter if needed!
    };
    addAdMutation.mutate(newAd);
  };

  // Filter only seller's ads (optional, if you save sellerEmail with ad)
  const myAds = sellerEmail ? ads.filter(ad => ad.sellerEmail === sellerEmail) : ads;

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">
          Ask For Advertisement
        </h2>
        <button
          className="bg-[#396961] text-white px-4 py-2 rounded-lg shadow hover:bg-[#28524c] font-semibold w-full sm:w-auto"
          onClick={() => { setIsAddModalOpen(true); setFormError(""); }}
        >
          + Add Advertise
        </button>
      </div>

      {isLoading ? (
        <div>Loading advertisements...</div>
      ) : isError ? (
        <div className="text-red-500">Failed to load advertisements.</div>
      ) : myAds.length === 0 ? (
        <div className="text-gray-500">No advertisements found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-[360px] w-full text-xs md:text-sm lg:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 border-b text-center">Image</th>
                <th className="py-2 px-2 border-b text-center">Title</th>
                <th className="py-2 px-2 border-b text-center hidden md:table-cell">Description</th>
                <th className="py-2 px-2 border-b text-center">Slider Status</th>
              </tr>
            </thead>
            <tbody>
              {myAds.map((ad) => (
                <tr key={ad._id?.$oid || ad._id}>
                  <td className="py-2 px-2 border-b text-center">
                    <img src={ad.img} alt={ad.title} className="w-12 h-12 object-cover rounded-lg mx-auto" />
                  </td>
                  <td className="py-2 px-2 border-b text-center">{ad.title}</td>
                  <td className="py-2 px-2 border-b text-center hidden md:table-cell">
                    {ad.description}
                  </td>
                  <td className="py-2 px-2 border-b text-center">
                    <span
                      className={
                        ad.showInSlider
                          ? "bg-green-100 text-green-700 px-2 py-1 rounded-full"
                          : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                      }
                    >
                      {ad.showInSlider ? "In Slider" : "Requested"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Advertisement Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-md mx-auto">
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl w-full relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
                onClick={() => { setIsAddModalOpen(false); setFormError(""); }}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">Add Advertisement</h3>
              <form onSubmit={handleAddAd} className="flex flex-col gap-3">
                <div>
                  <label className="block mb-1 font-semibold">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#396961]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#396961]"
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Image Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files[0])}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                {formError && (
                  <div className="text-red-500 mb-2 text-center">{formError}</div>
                )}
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-[#396961] text-white px-8 py-2 rounded-lg shadow hover:bg-[#28524c] font-semibold w-full"
                    disabled={addAdMutation.isLoading || isUploading}
                  >
                    {addAdMutation.isLoading || isUploading ? "Saving..." : "Add Advertisement"}
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

export default AskForAdvertisement;
