"use client";
import Link from "next/link";
import { Eye, EyeOff, CircleX, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "@/helper/Loader";

type Inputs = {
  email: string;
  username: string;
  password: string;
};
import { useSignup } from "@/hooks/useSignup";

import OtpModal from "./OtpModal";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [email, setEmail] = useState("");

  const { signup, loading, otp, message } = useSignup();
  const [showHelp, setShowHelp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="  text-white w-full  md:max-w-md ">
      <form onSubmit={handleSubmit(signup)} className="">
        <h1 className="text-4xl tracking-tight font-bold">
          Create your account
        </h1>
        <p className="text-[#c2b7ac] text-sm mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-xs text-blue-600">
            Login
          </Link>
        </p>

        <article className="mt-12">
          {message && <p className="text-red-400 text-sm">{message}</p>}
          {/* Email */}
          <div className="relative mt-8">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              id="email"
              className={`peer w-full text-white placeholder:text-xs border ${
                errors.email
                  ? "border-red-700 focus:border-red-800"
                  : "border-gray-500 focus:border-white"
              } px-4 rounded focus:border-2 bg-transparent py-4 text-sm focus:outline-2`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-0 px-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-1 peer-focus:text-xs peer-focus:text-gray-400">
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 flex items-center text-xs mt-2 gap-x-2">
                <CircleX className="text-red-500" size={14} />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="relative mt-8">
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
              id="username"
              className={`peer w-full text-white placeholder:text-gray-400  placeholder:text-xs border ${
                errors.username
                  ? "border-red-700 focus:border-red-800"
                  : "border-gray-500 focus:border-white"
              } px-4 rounded focus:border-2 bg-transparent py-4 text-sm focus:outline-2`}
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute left-0 px-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-1 peer-focus:text-xs peer-focus:text-gray-400">
              Username
            </label>
            {errors.username && (
              <p className="text-red-500 flex items-center text-xs mt-2 gap-x-2">
                <CircleX className="text-red-500" size={14} />
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mt-8">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              id="password"
              className={`peer w-full border px-4 pr-10 rounded focus:border-2 ${
                errors.password
                  ? "border-red-700 focus:border-red-800"
                  : "border-gray-500 focus:border-white"
              } bg-transparent py-4 text-sm focus:outline-2`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-0 px-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-1 peer-focus:text-xs peer-focus:text-gray-400">
              Username Password
            </label>
            {errors.password && (
              <p className="text-red-500 flex items-center text-xs mt-2 gap-x-2">
                <CircleX className="text-red-500" size={14} />
                {errors.password.message}
              </p>
            )}
            {/* Eye toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {/* Error message */}
          </div>
        </article>

        {/* Signup button */}
        <button
          type="submit"
          className="bg-red-600 text-white w-full mt-4 py-3 rounded hover:bg-red-700 transition">
          {loading ? <Loader /> : " Sign Up"}
        </button>

        {/* Help dropdown */}
        <div className="mt-4 text-sm">
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-x-2">
            <p>Need Help?</p>
            <ChevronDown
              className={`transition-transform duration-300 ${
                showHelp ? "rotate-180" : ""
              }`}
              size={18}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              showHelp ? "max-h-20 mt-2" : "max-h-0"
            }`}>
            <Link
              href="/help"
              className="text-blue-500 block mt-2 hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </form>

      {otp.showOtpModal && (
        <OtpModal
          otp={otp.otp}
          verifying={otp.verifying}
          timeLeft={otp.timeLeft}
          formatTime={otp.formatTime}
          onChange={otp.handleOtpChange}
          onKeyDown={otp.handleOtpKeyDown}
          onVerify={otp.verifyOtp}
          onClose={() => otp.setShowOtpModal(false)}
        />
      )}
    </section>
  );
}
