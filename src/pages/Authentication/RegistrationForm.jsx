import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";

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

const RegistrationForm = ({ onSignInClick, onRegisterSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  // Helper to post user info to backend
  const postUserToBackend = async (userObj) => {
    try {
      await axios.post("/users", userObj);
    } catch {
      // Optionally handle error
    }
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      await createUser(data.email, data.password);
      // Upload photo to imgbb if provided
      let photoURL = undefined;
      if (data.photo && data.photo[0]) {
        try {
          photoURL = await uploadImageToImgbb(data.photo[0]);
        } catch {
          setError("Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }
      await updateUserProfile({ displayName: data.username, photoURL });
      // Post user info to backend
      const now = new Date().toISOString();
      const userObj = {
        email: data.email,
        displayName: data.username,
        photoURL,
        role: data.role,
        provider: "password",
        createdAt: now,
        lastLogin: now,
      };
      await postUserToBackend(userObj);
      Swal.fire({
        icon: "success",
        title: "Sign up successful!",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
      reset();
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      setError(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      // Only post to backend if first sign in (new user)
      if (result && result.user) {
        const { email, displayName, photoURL, metadata, providerData } = result.user;
        const now = new Date().toISOString();
        const userObj = {
          email,
          displayName,
          photoURL,
          role: "user",
          provider: providerData?.[0]?.providerId || "google.com",
          createdAt: metadata?.creationTime || now,
          lastLogin: now,
        };
        await postUserToBackend(userObj);
      }
      Swal.fire({
        icon: "success",
        title: "Sign up successful!",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      setError(err.message || "Google sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[95%] max-w-md bg-[#f0fdf4] rounded-3xl shadow-xl p-6 flex flex-col items-center ">
        <h2 className="text-3xl font-bold text-center mb-8 mt-2 text-black">Sign Up</h2>
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-full py-2 mb-4 border border-[#aad8b2] rounded-full bg-white hover:bg-gray-100 transition font-medium text-base shadow"
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          <FcGoogle size={22} />
          <span className="font-medium">Continue with Google</span>
        </button>
        <div className="flex items-center w-full mb-4">
          <div className="flex-1 h-[1px] bg-[#aad8b2]" />
          <span className="mx-2 text-[#aad8b2] font-semibold text-xs">or</span>
          <div className="flex-1 h-[1px] bg-[#aad8b2]" />
        </div>
        {error && <div className="text-red-500 text-center mb-2 w-full text-sm">{error}</div>}
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="rounded-2xl border border-[#aad8b2] bg-[#f0fdf4] py-2 px-4 text-base focus:outline-none focus:border-[#396961] placeholder:text-[#396961]"
            required
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="rounded-2xl border border-[#aad8b2] bg-[#f0fdf4] py-2 px-4 text-base focus:outline-none focus:border-[#396961] placeholder:text-[#396961]"
            required
          />
          <input
            {...register("photo")}
            type="file"
            accept="image/*"
            className="rounded-2xl border border-[#aad8b2] bg-[#f0fdf4] py-1 px-4 text-base focus:outline-none focus:border-[#396961] file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-[#e5f5e1] file:text-black"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="rounded-2xl border border-[#aad8b2] bg-[#f0fdf4] py-2 px-4 text-base focus:outline-none focus:border-[#396961] placeholder:text-[#396961]"
            required
          />
          <select
            {...register("role")}
            className="rounded-2xl border border-[#aad8b2] bg-[#f0fdf4] py-2 px-4 text-base focus:outline-none focus:border-[#396961] text-[#396961]"
            required
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
          <button
            type="submit"
            className="mt-2 bg-[#396961] text-white text-base font-semibold rounded-full py-2 hover:bg-[#235b40] transition w-full shadow"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="w-full flex items-center justify-center pt-4">
          <span className="text-sm text-black font-medium">
            Already Have an Account?{" "}
            <button
              type="button"
              className="font-semibold text-[#2e7153] hover:underline ml-1 text-sm"
              onClick={onSignInClick}
            >
              Sign In
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 
