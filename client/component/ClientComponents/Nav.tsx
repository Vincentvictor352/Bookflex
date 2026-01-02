import Image from "next/image";
import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <section>
      <nav className="flex items-center justify-between px-5 md:px-28 fixed top-0 left-0 right-0 z-50  py-3">
        <div className="flex items-center">
          {" "}
          <Link href="/">
            <Image
              src="/logo/IMG-20251020-WA0133-removebg-preview.png"
              alt="logo"
              width={128} // Set proper width
              height={32} // Set proper height
              className="object-contain"
            />
          </Link>
        </div>
        <Link href="/login">
          <button className="flex items-center bg-[#e60914] px-5 py-1.5 cursor-pointer hover:bg-red-500 text-white rounded-[5px] text-sm">
            Signup
          </button>
        </Link>
      </nav>
    </section>
  );
}

export default Nav;
