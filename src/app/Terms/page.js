"use client";

import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      {/* Announcement Bar */}
      <TopAnnouncementBar />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-28 mt-16 lg:mt-20">
        {/* mt-16/lg:mt-20 offsets fixed navbar + announcement bar height */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <h1 className="text-4xl font-bold text-[#2A4E3B] mb-6">Terms & Conditions</h1>
          <p className="text-gray-600 mb-6">
            Last Updated: {new Date().getFullYear()}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            By using our services you agree to the following terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">1. Scope</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            We provide embroidery digitizing & vector design services as agreed.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">2. Payment & Delivery</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Final files are delivered upon full payment unless otherwise agreed.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">3. Revisions</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Revisions are offered until digitized output matches original artwork.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">4. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            All customer artworks remain the intellectual property of their owners.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">5. Refund Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Refunds are not available for digital services after final file delivery.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">6. Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            We are not responsible for stitching errors caused by machine settings or thread conditions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">7. Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            Email: <span className="font-semibold">support@zsdigitizingmd.com</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
