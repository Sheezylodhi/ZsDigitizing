"use client";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      
      <TopAnnouncementBar />
      <Navbar />

      <main className="flex-grow w-full max-w-5xl px-6 py-28 mx-auto mt-16 lg:mt-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">

          <h1 className="text-4xl font-bold text-[#2A4E3B] mb-6">
            Privacy Policy – ZS Digitizing
          </h1>

          <p className="text-gray-700 mb-6 leading-relaxed">
            At ZS Digitizing, we respect your privacy and are committed to protecting the personal
            information you share with us. This policy explains how we collect, use, and safeguard
            your information when you use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Information We Collect</h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            When you place an order or contact us, we may collect basic information such as your
            name, email address, and order details. This information is used only to process your
            order and communicate with you regarding your project.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-5">
            <li>Processing and completing your embroidery digitizing or design order</li>
            <li>Communicating with you about your project</li>
            <li>Providing customer support and updates regarding your order</li>
          </ul>

          <p className="text-gray-700 mb-5">
            We do not sell, trade, or share your personal information with third parties without
            your consent.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Data Protection</h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            ZS Digitizing uses industry-standard security measures to protect your personal
            information from unauthorized access, misuse, or disclosure. We continuously review
            and update our security practices to ensure your data remains safe.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Communication</h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            If you have any questions regarding your order, our services, or this privacy policy,
            you are welcome to contact our support team. We believe in transparent communication
            and always aim to provide reliable and professional customer support.
          </p>

          {/* Refund Policy */}
          <h1 className="text-3xl font-bold text-[#2A4E3B] mb-6">
            Refund Policy – ZS Digitizing
          </h1>

          <p className="text-gray-700 mb-5 leading-relaxed">
            At ZS Digitizing, customer satisfaction is our highest priority. We strive to deliver
            high-quality embroidery digitizing and design services that meet our clients’
            expectations.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Revisions and Adjustments</h2>
          <p className="text-gray-700 mb-5">
            If the delivered design does not meet your expectations, our team will review the design
            and make necessary improvements to ensure the final result matches your requirements.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Refund Eligibility</h2>
          <p className="text-gray-700 mb-5">
            If a customer is not satisfied with the final result, they may request a refund within
            30 days from the date of purchase.
          </p>

          <p className="text-gray-700 mb-5">
            Our team will first review the concern and may offer to revise or recreate the design.
            If the issue cannot be resolved satisfactorily, a refund will be issued.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Refund Process</h2>
          <p className="text-gray-700 mb-10">
            To request a refund, please contact our support team with your order details and
            explanation of the issue. Once approved, the refund will be processed through the
            original payment method.
          </p>

          {/* Delivery Policy */}
          <h1 className="text-3xl font-bold text-[#2A4E3B] mb-6">
            Delivery Policy – ZS Digitizing
          </h1>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Digital Delivery</h2>
          <p className="text-gray-700 mb-5">
            Most orders are delivered digitally. Once your embroidery digitizing or vector design
            is completed, files will be sent via email or secure download link.
          </p>

          <p className="text-gray-700 mb-5">
            We support all major embroidery formats including DST, PES, JEF, and others as
            requested.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Turnaround Times</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Rush Orders: 2–4 hours</li>
            <li>Standard Orders: 12 hours</li>
            <li>Detailed Designs: up to 24 hours</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Physical Delivery (Optional)</h2>
          <p className="text-gray-700 mb-5">
            We can also provide files via physical delivery such as USB. Shipping charges depend on
            your location and courier service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Delivery Confirmation</h2>
          <p className="text-gray-700 mb-5">
            Once your design is completed, you will be notified via email. Our support team is
            available if you face any issues with files or formats.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Customer Support</h2>
          <p className="text-gray-700">
            For any questions regarding your delivery or order status, feel free to contact our
            support team anytime.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}