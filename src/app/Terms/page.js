"use client";

import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      
      <TopAnnouncementBar />
      <Navbar />

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-28 mt-16 lg:mt-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">

          <h1 className="text-4xl font-bold text-[#2A4E3B] mb-6">
            Terms & Conditions – ZS Digitizing
          </h1>

          <p className="text-gray-600 mb-6">
            Last Updated: {new Date().getFullYear()}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to ZS Digitizing. By accessing or using our website, you agree to comply with
            and be bound by the following terms and conditions. If you do not agree with any part
            of these terms, please do not use our website.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            ZS Digitizing reserves the right to update or modify these terms at any time without
            prior notice. It is your responsibility to review these terms regularly.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Our Services</h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            We specialize in embroidery digitizing, vector conversion, and custom patches,
            ensuring every logo and design is accurate and ready for embroidery.
          </p>

          <p className="text-gray-700 mb-5 leading-relaxed">
            Our services support all major embroidery formats including DST, PES, JEF, and more.
            We provide digital delivery with optional physical delivery upon request.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Website Disclaimer</h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            All information and materials on this website including text, graphics, and services
            are provided for informational purposes only. While we strive for accuracy, we do not
            guarantee that the content will always be complete, accurate, or error-free.
          </p>

          <p className="text-gray-700 mb-5">
            Users access this website at their own risk.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Payment Terms</h2>
          <p className="text-gray-700 mb-5">
            Customers are billed after the completion and delivery of their order. Quotes are
            provided after reviewing your design. Volume pricing may be available upon request.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>PayPal</li>
            <li>Wise</li>
            <li>MasterCard</li>
            <li>Payoneer</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Modification of Site</h2>
          <p className="text-gray-700 mb-5">
            All content and services on this website are subject to change without prior notice.
            While we strive for efficiency, we are not responsible for delays or inaccuracies.
          </p>

          <p className="text-gray-700 mb-5">
            Clients are responsible for verifying all order details before final approval.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Copyright</h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            All content on this website including text, design, layout, graphics, and logos is
            owned by ZS Digitizing. Unauthorized use, reproduction, or distribution is strictly
            prohibited and may result in legal action.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Refund Policy</h2>
          <p className="text-gray-700 mb-5">
            Customer satisfaction is our priority. If you are not satisfied, you may request a
            refund within 30 days of purchase.
          </p>

          <p className="text-gray-700 mb-5">
            Our team may offer revisions or redesign before issuing a refund to meet your
            expectations.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Delivery Policy</h2>
          <p className="text-gray-700 mb-5">
            All orders are delivered digitally via email. Physical delivery is available upon
            request and may include additional charges depending on location.
          </p>

         <h2 className="text-2xl font-semibold mt-8 mb-3">Contact</h2>
<p className="text-gray-700">
  Email:{" "}
  <a
    href="mailto:info@zsdigitizing.com"
    className="font-semibold text-blue-600 hover:underline"
  >
    info@zsdigitizing.com
  </a>
</p>

        </div>
      </main>

      <Footer />
    </div>
  );
}