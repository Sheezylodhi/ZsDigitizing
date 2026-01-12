import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "ZS Digitizing MD",
  description: "Professional Embroidery Digitizing Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-serif">
         <VisitorTracker />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
