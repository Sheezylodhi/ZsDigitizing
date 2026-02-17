import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeExtras from "@/components/HomeExtras";
import Stats from "@/components/Stats";
import Services from "@/components/ServicesSection";
import Pricing from "@/components/Pricing";
import HowItWorksPage from "@/components/how-it-works";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FreeTrialPopup from "@/components/FreeTrialPopup";

import Footer from "@/components/Footer";




export default function Home() {
  return (
    <main className="bg-gray-50">
      {/* Top moving announcement bar */}
      <TopAnnouncementBar />

      {/* Navbar */}
      <Navbar />
        <FreeTrialPopup />

      {/* Sections */}
      <Hero />
      <HomeExtras />
      <Stats />
      <Services />
      <Pricing />
      <HowItWorksPage />
      <Testimonials />
      <FAQ/>
        <Footer />


    </main>
  );
}
