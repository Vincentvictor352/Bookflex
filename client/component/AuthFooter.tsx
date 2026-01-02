import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  bookflix: [
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ],
  support: [
    { name: "Help Center", link: "/help" },
    { name: "Account", link: "/account" },
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Terms of Use", link: "/teams" },
  ],
};

function AuthFooter() {
  return (
    <footer className="bg-[#171717] text-white py-20 px-6 md:px-20 border-t border-white/10">
      {/* Middle Footer Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm text-gray-400 mb-12">
        <div>
          <h3 className="text-white font-semibold mb-3">BookFlix</h3>
          <ul className="space-y-2">
            {footerLinks.bookflix.map((item, idx) => (
              <li key={idx} className="cursor-pointer">
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            {footerLinks.support.map((item, idx) => (
              <li key={idx} className="cursor-pointer">
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <Facebook className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <Youtube className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-pink-500">BookFlix</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default AuthFooter;
