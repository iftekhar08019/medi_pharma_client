import React from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

const SignInModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log(data);
    // Handle sign in logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-[#f0fdf4] rounded-3xl shadow-xl w-full max-w-xl p-10">
        <button
          className="absolute right-6 top-6 text-2xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          <IoMdClose />
        </button>
        <h2 className="text-4xl font-bold text-center mb-8 mt-2">Sign In</h2>
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
            <span className="text-base text-black font-medium cursor-pointer hover:underline">
              Sign Up
            </span>
          </div>
          <button
            type="submit"
            className="mt-2 bg-[#2e7153] text-white text-xl font-semibold rounded-full py-3 hover:bg-[#235b40] transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
