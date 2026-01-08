import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import PricesSection from "@/components/PricesSection";
import QuoteSection from "@/components/QuoteSection";
import RegisterSection from "@/components/RegisterSection";
import PrivacyTermsSection from "@/components/PrivacyTermsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="pt-20"> {/* pt-20 for fixed navbar */}
      <section id="home"><Hero /></section>
      <section id="services"><ServicesSection /></section>
      <section id="prices"><PricesSection /></section>
      <section id="quote"><QuoteSection /></section>
      <section id="register"><RegisterSection /></section>
      <section id="privacy"><PrivacyTermsSection /></section>
      <section id="terms"><PrivacyTermsSection isTerms={true} /></section>
      <Footer />
    </main>
  );
}
