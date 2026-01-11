"use client";
import Link from "next/link";
import { Eye, EyeOff, CircleX, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import Loader from "@/helper/Loader";
import ForgotPasswordModal from "../ForgotPasswordModal";
import { useLogin } from "@/hooks/useLogin";
import { Inputs } from "@/types/types";
import OtpModal from "./OtpModal";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const auth = useLogin();

  return (
    <section className="  text-white w-full max-w-md">
      <form onSubmit={handleSubmit(auth.login)} className="">
        <h1 className="text-4xl tracking-tight font-bold">
          Enter your info to sign in
        </h1>
        <p className="text-[#c2b7ac] text-sm mt-2">
          Or get started with a new account.{" "}
          <Link href="/signup" className="text-xs text-blue-600">
            Signup
          </Link>
        </p>

        <article className="mt-12">
          {auth.messages && (
            <p className="text-red-400 text-sm">{auth.messages}</p>
          )}
          {/* Email */}
          <div className="relative mt-8">
            <input
              type="text"
              {...register("email_username", {
                required: "Email or Username is required",
              })}
              id="email"
              className={`peer w-full placeholder:text-xs border ${
                errors.email_username
                  ? "border-red-700 focus:border-red-800"
                  : "border-gray-500 focus:border-white"
              } px-4 rounded focus:border-2 bg-transparent py-4 text-sm focus:outline-2`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-0 px-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-1 peer-focus:text-xs peer-focus:text-gray-400">
              Username Email
            </label>
            {errors.email_username && (
              <p className="text-red-500 flex items-center text-xs mt-2 gap-x-2">
                <CircleX className="text-red-500" size={14} />
                {errors.email_username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mt-8">
            <input
              type={auth.showPassword ? "text" : "password"}
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
              Password
            </label>

            {/* Eye toggle */}
            <button
              type="button"
              onClick={() => auth.setShowPassword((p) => !p)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white">
              {auth.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-500 flex items-center text-xs mt-2 gap-x-2">
                <CircleX className="text-red-500" size={14} />
                {errors.password.message}
              </p>
            )}
          </div>
        </article>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-red-600 text-white w-full mt-4 py-3 rounded hover:bg-red-700 transition">
          {auth.loading.login ? <Loader /> : " Login"}
        </button>

        {/* Help dropdown */}
        <div className="mt-4 text-sm">
          <button
            type="button"
            onClick={() => auth.setShowHelp((p) => !p)}
            className="flex items-center gap-x-2">
            <p>Get Help</p>
            <ChevronDown
              className={`transition-transform duration-300 ${
                auth.showHelp ? "rotate-180" : ""
              }`}
              size={18}
            />
          </button>

          <div
            role="button"
            onClick={() => auth.setShowForgot((p) => !p)}
            className={`overflow-hidden transition-all duration-300 ${
              auth.showHelp ? "max-h-20 mt-2" : "max-h-0"
            }`}>
            <Link href="#" className="text-blue-500 block mt-2 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </form>
      {/* --- Forgot Password Modal --- */}
      {auth.showForgot && (
        <ForgotPasswordModal
          step={auth.step}
          loading={auth.loading}
          forgotEmail={auth.forgotEmail}
          verifyOtp={auth.verifyOtp}
          resetPassword={auth.resetPassword}
          onClose={() => auth.setShowForgot(false)}
        />
      )}
      {auth.otp.showOtpModal && (
        <OtpModal
          otp={auth.otp.otp}
          verifying={auth.otp.verifying}
          timeLeft={auth.otp.timeLeft}
          formatTime={auth.otp.formatTime}
          onChange={auth.otp.handleOtpChange}
          onKeyDown={auth.otp.handleOtpKeyDown}
          onVerify={auth.otp.verifyOtp}
          onClose={() => auth.otp.setShowOtpModal(false)}
        />
      )}
    </section>
  );
}
