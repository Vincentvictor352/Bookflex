"use client";
import { useForm } from "react-hook-form";
import Loader from "@/helper/Loader";
import { Inputs } from "@/types/types";

export default function ForgotPasswordModal({
  step,
  loading,
  onClose,
  forgotEmail,
  verifyOtp,
  resetPassword,
}: any) {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 mx-4 max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          ×
        </button>

        {step === 1 && (
          <form onSubmit={handleSubmit(forgotEmail)}>
            <input
              {...register("email_username")}
              placeholder="Email"
              className="w-full border px-4 py-2 rounded bg-transparent mt-4"
            />
            <button className="bg-red-600 w-full mt-4 py-2 rounded">
              {loading.forgotStep1 ? <Loader /> : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(verifyOtp)}>
            <input
              {...register("otp")}
              placeholder="OTP"
              className="w-full border px-4 py-2 rounded bg-transparent mt-4"
            />
            <button className="bg-red-600 w-full mt-4 py-2 rounded">
              {loading.forgotStep2 ? <Loader /> : "Verify"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(resetPassword)}>
            <input
              {...register("password")}
              placeholder="New Password"
              className="w-full border px-4 py-2 rounded bg-transparent mt-4"
            />
            <input
              {...register("confirmPassword")}
              placeholder="Confirm"
              className="w-full border px-4 py-2 rounded bg-transparent mt-4"
            />
            <button className="bg-red-600 w-full mt-4 py-2 rounded">
              {loading.forgotStep3 ? <Loader /> : "Reset"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
