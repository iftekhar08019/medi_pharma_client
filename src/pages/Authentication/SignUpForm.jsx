import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

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

const SignUpForm = ({ onClose, onSignInClick }) => {
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
      onClose();
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
      onClose();
    } catch (err) {
      setError(err.message || "Google sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  px-2 sm:px-4">
      <div className="bg-[#f0fdf4] rounded-3xl  w-full max-w-md sm:max-w-lg lg:max-w-xl max-h-[98vh] overflow-y-auto flex flex-col justify-between relative p-4 sm:p-8">
        <div className="bg-[#f0fdf4] rounded-3xl w-full h-full flex flex-col justify-between relative">
          <button
            className="absolute right-6 top-6 text-2xl text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close"
          >
            <IoMdClose />
          </button>
          <div className="flex-1 flex flex-col justify-center px-10 pt-10 pb-4">
            <h2 className="text-4xl font-bold text-center mb-8 mt-2">
              Sign Up
            </h2>
            {/* Google sign in button */}
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full py-3 mb-4 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition font-semibold text-lg"
              onClick={handleGoogleSignUp}
              disabled={loading}
            >
              <FcGoogle size={28} />
              Continue with Google
            </button>
            {/* Divider */}
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1 h-[1px] bg-gray-300" />
              <span className="text-gray-500 font-semibold text-sm">or</span>
              <div className="flex-1 h-[1px] bg-gray-300" />
            </div>
            {error && <div className="text-red-500 text-center mb-2">{error}</div>}
            {/* Sign Up form */}
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="rounded-2xl border border-[#aad8b2] bg-transparent py-4 px-6 text-lg focus:outline-none focus:border-green-500"
                required
              />
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="rounded-2xl border border-[#aad8b2] bg-transparent py-4 px-6 text-lg focus:outline-none focus:border-green-500"
                required
              />
              <input
                {...register("photo")}
                type="file"
                accept="image/*"
                className="rounded-2xl border border-[#aad8b2] bg-transparent py-2 px-6 text-lg focus:outline-none focus:border-green-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-base file:bg-[#e5f5e1] file:text-black"
              />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="rounded-2xl border border-[#aad8b2] bg-transparent py-4 px-6 text-lg focus:outline-none focus:border-green-500"
                required
              />
              <select
                {...register("role")}
                className="rounded-2xl border border-[#aad8b2] bg-transparent py-4 px-6 text-lg focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
              <button
                type="submit"
                className="mt-2 bg-[#2e7153] text-white text-xl font-semibold rounded-full py-3 hover:bg-[#235b40] transition"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
          {/* Bottom Sign In link */}
          <div className="w-full flex items-center justify-center pb-6">
            <span className="text-base text-black font-medium">
              Already Have an Account?{" "}
              <button
                type="button"
                className="font-semibold text-[#2e7153] hover:underline ml-1"
                onClick={onSignInClick}
              >
                Sign In
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
