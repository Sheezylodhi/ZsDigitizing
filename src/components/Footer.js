"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2A4E3B] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">ZS Digitizing MD</h3>
          <p className="text-gray-200 mb-4">
            Professional embroidery digitizing & design services for logos, patches, 3D puff embroidery and more.
          </p>
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} ZS Digitizing MD. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#home" className="hover:text-green-400 transition">Home</Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-green-400 transition">Services</Link>
            </li>
            <li>
              <Link href="#prices" className="hover:text-green-400 transition">Pricing</Link>
            </li>
            <li>
              <Link href="#quote" className="hover:text-green-400 transition">Send Quote</Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-green-400 transition">Testimonials</Link>
            </li>
          </ul>
        </div>

        {/* Legal + Social */}
        <div>
          <h4 className="font-semibold mb-4">Legal & Social</h4>
          <ul className="space-y-2 mb-4">
            <li>
              <Link href="#privacy" className="hover:text-green-400 transition">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#terms" className="hover:text-green-400 transition">Terms & Conditions</Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-green-400 transition">🐦</a>
            <a href="#" className="hover:text-green-400 transition">📘</a>
            <a href="#" className="hover:text-green-400 transition">📸</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
