"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-black mb-4 cursor-pointer ">
      <ArrowLeft size={18} />
      <span>Back</span>
    </button>
  );
}
