"use client";

import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0e2c1c] text-white relative overflow-hidden">
      {/* Background gradient shapes */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-green-700 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-green-600 opacity-20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">ZS Digitizing</h3>
          <p className="text-gray-200 leading-relaxed">
            Professional embroidery digitizing & design services for logos, patches, 3D puff embroidery and more. High-quality, fast delivery, and affordable pricing worldwide.
          </p>
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} ZS Digitizing. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#home" className="hover:text-[#0f3c24] transition duration-300">Home</Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-[#0f3c24] transition duration-300">Services</Link>
            </li>
            <li>
              <Link href="#prices" className="hover:text-[#0f3c24] transition duration-300">Pricing</Link>
            </li>
            <li>
              <Link href="#quote" className="hover:text-[#0f3c24] transition duration-300">Send Quote</Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-[#0f3c24] transition duration-300">Testimonials</Link>
            </li>
          </ul>
        </div>

        {/* Legal + Social */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-2">Legal & Social</h4>
          <ul className="space-y-2 mb-4">
            <li>
              <Link href="/privacy" className="hover:text-[#0f3c24] transition duration-300">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/Terms" className="hover:text-[#0f3c24] transition duration-300">Terms & Conditions</Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#0f3c24] transition duration-300 transform hover:scale-110">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-[#0f3c24] transition duration-300 transform hover:scale-110">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-[#0f3c24] transition duration-300 transform hover:scale-110">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Footer bottom line */}
     {/* Footer bottom line */}
<div className="border-t border-[#0f3c24] mt-12 pt-6 text-center text-gray-300 text-sm relative z-10">
  Made by{" "}
  <a
    href="https://portfolio-eta-lyart-37.vercel.app/" // ✅ apna portfolio link yaha lagao
    className="text-green-400 font-semibold hover:text-green-600 transition cursor-pointer"
    target="_blank"
    rel="noopener noreferrer"
  >
    Zaib
  </a>
</div>

    </footer>
  );
}
