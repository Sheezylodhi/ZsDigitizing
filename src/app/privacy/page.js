"use client";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      {/* Fixed Announcement Bar */}
      <TopAnnouncementBar />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow w-full max-w-5xl px-6 py-28 mx-auto mt-16 lg:mt-20">
        {/* mt-16 or mt-20 to offset fixed navbar + announcement bar height */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <h1 className="text-4xl font-bold text-[#2A4E3B] mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">
            Last Updated: {new Date().getFullYear()}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            At ZS Digitizing MD, we respect your privacy and are committed to protecting your personal information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">1. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            We may collect personal information such as your name, email, artwork files, and project details for service delivery.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">2. Use of Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-5">
            <li>Order processing & delivery</li>
            <li>Revisions & communication</li>
            <li>Support and service improvements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">3. Data Protection</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            We do not share or sell client data to third parties unless required by law.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">4. Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Our website may use cookies to enhance analytics and performance.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">5. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            You may request data deletion or export by contacting us.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">6. Contact</h2>
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
