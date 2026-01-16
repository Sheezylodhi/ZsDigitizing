import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "ZS Digitizing",
  description: "Professional Embroidery Digitizing Services",
  icons: {
    icon: "/logo.png", 
  },
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
