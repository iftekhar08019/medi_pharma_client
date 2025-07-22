import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";

const SignInForm = ({ onClose, onSignUpClick, onLoginSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
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
      await signIn(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
      reset();
      if (onLoginSuccess) onLoginSuccess();
      onClose && onClose();
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      // Only post to backend if first sign in (new user)
      if (result && result.user) {
        const { email, displayName, photoURL, metadata, providerData } = result.user;
        // First sign in: creationTime === lastSignInTime
        if (metadata?.creationTime === metadata?.lastSignInTime) {
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
      }
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
      if (onLoginSuccess) onLoginSuccess();
      onClose && onClose();
    } catch (err) {
      setError(err.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0fdf4] rounded-3xl shadow-xl w-full h-full p-10 flex flex-col justify-center relative">
      <button
        className="absolute right-6 top-6 text-2xl text-gray-500 hover:text-gray-800"
        onClick={onClose}
        aria-label="Close"
      >
        <IoMdClose />
      </button>
      <h2 className="text-4xl font-bold text-center mb-8 mt-2">Sign In</h2>
      <button
        type="button"
        className="flex items-center justify-center gap-3 w-full py-3 mb-4 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition font-semibold text-lg"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <FcGoogle size={28} />
        Continue with Google
      </button>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1 h-[1px] bg-gray-300" />
        <span className="text-gray-500 font-semibold text-sm">or</span>
        <div className="flex-1 h-[1px] bg-gray-300" />
      </div>
      {error && <div className="text-red-500 text-center mb-2">{error}</div>}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="rounded-2xl border border-[#aad8b2] bg-transparent py-4 px-6 text-lg focus:outline-none focus:border-green-500"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="rounded-2xl border border-[#aad8b2] bg-transparent py-4 px-6 text-lg focus:outline-none focus:border-green-500"
          required
        />
        <div className="flex items-center justify-between -mt-2">
          <span className="text-base text-black font-medium cursor-pointer hover:underline">
            Forgot your password?
          </span>
          <span
            className="text-base text-black font-medium cursor-pointer hover:underline"
            onClick={onSignUpClick}
          >
            Sign Up
          </span>
        </div>
        <button
          type="submit"
          className="mt-2 bg-[#2e7153] text-white text-xl font-semibold rounded-full py-3 hover:bg-[#235b40] transition"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
