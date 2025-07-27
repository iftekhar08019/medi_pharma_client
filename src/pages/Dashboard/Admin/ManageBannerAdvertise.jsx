import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const ManageBannerAdvertise = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data: ads = [] } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axios.get("/advertisements");
      return res.data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, showInSlider }) => {
      return axios.patch(`/advertisements/${id}/slider`, { showInSlider });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["advertisements"]);
    },
  });

  const handleToggleSlide = (ad) => {
    toggleMutation.mutate({
      id: ad._id?.$oid || ad._id,
      showInSlider: !ad.showInSlider,
    });
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">Manage Banner Advertise</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-2 md:px-4 border-b text-center">Image</th>
              <th className="py-3 px-2 md:px-4 border-b text-left">Medicine Name</th>
              <th className="py-3 px-2 md:px-4 border-b text-left">Description</th>
              <th className="py-3 px-2 md:px-4 border-b text-center">Toggle Slide</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id?.$oid || ad._id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-2 md:px-4 border-b text-center">
                  <img src={ad.img} alt={ad.title} className="w-20 h-20 object-cover rounded mx-auto border" />
                </td>
                <td className="py-3 px-2 md:px-4 border-b font-semibold">{ad.title}</td>
                <td className="py-3 px-2 md:px-4 border-b text-gray-700 max-w-xs">{ad.description}</td>
                <td className="py-3 px-2 md:px-4 border-b text-center">
                  <button
                    className={`text-2xl transition focus:outline-none ${ad.showInSlider ? "text-green-600" : "text-gray-400"}`}
                    onClick={() => handleToggleSlide(ad)}
                    title={ad.showInSlider ? "Remove from Slide" : "Add to Slide"}
                    disabled={toggleMutation.isLoading}
                  >
                    {toggleMutation.isLoading && toggleMutation.variables?.id === (ad._id?.$oid || ad._id) ? (
                      <span className="animate-pulse">...</span>
                    ) : ad.showInSlider ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Show currently added to slide */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Currently in Homepage Slider:</h3>
        <div className="flex flex-wrap gap-4">
          {ads.filter(ad => ad.showInSlider).length === 0 && (
            <div className="text-gray-500">No medicines added to slider yet.</div>
          )}
          {ads.filter(ad => ad.showInSlider).map((ad) => (
            <div key={ad._id?.$oid || ad._id} className="flex flex-col items-center bg-gray-100 rounded-lg p-2 shadow w-32">
              <img src={ad.img} alt={ad.title} className="w-20 h-20 object-cover rounded mb-2 border" />
              <div className="text-xs font-semibold text-center">{ad.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageBannerAdvertise; 
