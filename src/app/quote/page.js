
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Get a Free Quote | ZS Digitizing",
  description: "Request a free quote for your embroidery digitizing or vector design projects. Fast turnaround and professional quality.",
  alternates: {
    canonical: "https://www.zsdigitizing.com/quote",
  },
};

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
