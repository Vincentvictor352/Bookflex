"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useOtpVerification } from "@/hooks/useOtpVerification";

type Inputs = {
  email: string;
  username: string;
  password: string;
};

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<any>();
  const otp = useOtpVerification(email);

  const signup = async (data: Inputs) => {
    if (!data.email || !data.username || !data.password) return;

    setLoading(true);
    setEmail(data.email);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authv1/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_name: data.username,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success(result.message, { duration: 10000 });
        setMessage("");
        otp.setShowOtpModal(true);
      } else {
        setMessage(result.message);
        toast.error(result.message);
      }
    } catch (err: any) {
      setMessage(err.message);
      toast.error(err.message || "Signup failed");
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
    message,
    otp,
  };
}
