// app/portfolio/page.js
import PortfolioContent from "@/components/PortfolioContent";

export const metadata = {
  title: "Our Embroidery & Design Portfolio | ZS Digitizing",
  description: "Explore our latest embroidery digitizing, vector conversion, and custom logo projects. See the quality of work ZS Digitizing delivers to clients worldwide.",
  alternates: {
    canonical: "https://www.zsdigitizing.com/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}