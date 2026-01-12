"use client";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      {/* Fixed Announcement Bar */}
      <TopAnnouncementBar />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-20 mt-16 lg:mt-20">
        {/* mt-16/lg:mt-20 offsets fixed navbar + announcement bar height */}
        <QuoteForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
