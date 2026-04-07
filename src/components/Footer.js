"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0e2c1c] text-white relative overflow-hidden">
      {/* Background gradient shapes */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-green-700 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-green-600 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid columns ko 4 kar diya hai taake gap control mein rahe */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">

        {/* 1. Company Info */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">ZS Digitizing</h3>
          <p className="text-gray-200 leading-relaxed text-sm">
            Professional embroidery digitizing & design services for logos, patches, 3D puff embroidery and more. High-quality, fast delivery, and affordable pricing worldwide.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div className="space-y-4 md:pl-8">
          <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-green-400 transition duration-300">Home</Link></li>
            <li><Link href="/about-us" className="hover:text-green-400 transition duration-300">About</Link></li>
            <li><Link href="/#services" className="hover:text-green-400 transition duration-300">Services</Link></li>
            <li><Link href="/#prices" className="hover:text-green-400 transition duration-300">Pricing</Link></li>
            <li><Link href="/quote" className="hover:text-green-400 transition duration-300">Send Quote</Link></li>
            <li><Link href="/#testimonials" className="hover:text-green-400 transition duration-300">Testimonials</Link></li>
          </ul>
        </div>

        {/* 3. Legal & Social */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-2">Legal & Social</h4>
          <ul className="space-y-2 mb-4">
            <li><Link href="/privacy" className="hover:text-green-400 transition duration-300">Privacy Policy</Link></li>
            <li><Link href="/Terms" className="hover:text-green-400 transition duration-300">Terms & Conditions</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=100086903257419" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300 transform hover:scale-110"><FaFacebookF size={20} /></a>
            <a href="https://www.instagram.com/zs_digitizing/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300 transform hover:scale-110"><FaInstagram size={20} /></a>
            <a href="https://www.tiktok.com/@zs_digitizing?_r=1&_t=ZS-9319IRmPQJx" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300 transform hover:scale-110"><FaTiktok size={20} /></a>
            <a href="https://www.pinterest.com/zsdesignerpk/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300 transform hover:scale-110"><FaPinterestP size={20} /></a>
          </div>
        </div>

        {/* 4. Contact Us */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-2">Contact Us</h4>
          <p className="text-white text-sm">
            Email:<br />
            <a href="mailto:info@zsdigitizing.com" className="font-semibold text-blue-400 hover:underline break-words">
              info@zsdigitizing.com
            </a>
          </p>
        </div>

      </div>

      {/* Footer bottom line */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-300 text-sm relative z-10">
        <p>
          © {new Date().getFullYear()} ZS Digitizing. All rights reserved.
        </p>
        <p className="mt-1">
          Developed by{" "}
          <a href="https://portfolio-eta-lyart-37.vercel.app/" className="text-green-400 font-semibold hover:text-green-600 transition" target="_blank" rel="noopener noreferrer">
            Zaib
          </a>
        </p>
      </div>
    </footer>
  );
}