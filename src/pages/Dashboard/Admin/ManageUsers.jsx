import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import PageLoading from "../../../components/PageLoading";

const ManageUsers = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const { user: currentUser } = useContext(AuthContext);

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosInstance.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Role updated to ${data.role}`);
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });

  const handleRoleChange = (user, newRole) => {
    let actionText =
      newRole === "admin"
        ? "make this user an Admin"
        : newRole === "seller"
        ? "make this user a Seller"
        : "downgrade this user to a normal User";
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${actionText}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#396961",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id: user._id, role: newRole });
      }
    });
  };

  if (isLoading) return <PageLoading text="Loading Users..." />;
  if (error) return <div className="p-8 text-center text-red-500">Error loading users</div>;

  return (
    <div className="w-[96%] mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-[#396961]">Manage Users</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#eaf3ec]">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-[#396961] uppercase">Photo</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-[#396961] uppercase">Name</th>
              <th className="hidden sm:table-cell px-2 py-3 text-left text-xs font-medium text-[#396961] uppercase">Email</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-[#396961] uppercase">Role</th>
              <th className="hidden sm:table-cell px-2 py-3 text-left text-xs font-medium text-[#396961] uppercase">Joined</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-[#396961] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-2 py-2">
                  <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full object-cover border" />
                </td>
                <td className="px-2 py-2 font-semibold">{user.displayName}</td>
                <td className="hidden sm:table-cell px-2 py-2">{user.email}</td>
                <td className="px-2 py-2 capitalize">{user.role}</td>
                <td className="hidden sm:table-cell px-2 py-2">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</td>
                <td className="px-2 py-2 flex flex-col sm:flex-row gap-2">
                  {user.email !== currentUser?.email ? (
                    <>
                      {user.role !== "admin" && (
                        <button
                          className="bg-[#5DD39E] text-white px-3 py-1 rounded hover:bg-[#396961] transition text-xs font-semibold"
                          onClick={() => handleRoleChange(user, "admin")}
                          disabled={roleMutation.isLoading}
                        >
                          Make Admin
                        </button>
                      )}
                      {user.role !== "seller" && (
                        <button
                          className="bg-[#3a8a6b] text-white px-3 py-1 rounded hover:bg-[#28524c] transition text-xs font-semibold"
                          onClick={() => handleRoleChange(user, "seller")}
                          disabled={roleMutation.isLoading}
                        >
                          Make Seller
                        </button>
                      )}
                      {user.role !== "user" && (
                        <button
                          className="bg-[#eaf3ec] text-[#396961] px-3 py-1 rounded border border-[#396961] hover:bg-[#c2e0d6] transition text-xs font-semibold"
                          onClick={() => handleRoleChange(user, "user")}
                          disabled={roleMutation.isLoading}
                        >
                          Downgrade to User
                        </button>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">Cannot change your own role</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
