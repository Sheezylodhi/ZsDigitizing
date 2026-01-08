import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ZS Digitizing MD",
  description: "Professional Embroidery Digitizing Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-serif">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
