import React from "react";
import { ChevronRight } from "lucide-react";
function HerosectionWaitlist() {
  return (
    <div>
      {" "}
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-4">
        <input
          type="email"
          required
          placeholder="Enter email"
          className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-md border border-white/20 focus:outline-none placeholder-gray-300 w-full md:w-auto"
        />
        <div
          role="button"
          className="bg-[#e60914] flex tracking-tight items-center justify-center hover:bg-[#b00610] px-6 py-4 rounded-md font-semibold text-xl text-white mt-3 md:mt-0">
          Get Started <ChevronRight />
        </div>
      </div>
    </div>
  );
}

export default HerosectionWaitlist;
