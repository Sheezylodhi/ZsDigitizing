import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/ServicesSection";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
       <Services />
      <Pricing />
        <Portfolio />  
      <Testimonials/>
      
    </main>
  );
}
