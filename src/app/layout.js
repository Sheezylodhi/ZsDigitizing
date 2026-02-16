import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "ZS Digitizing",
  description: "Professional Embroidery Digitizing Services",
  icons: {
     icon: "/logo.png",       // 32x32 recommended
  shortcut: "/logo.png",   // optional for older browsers
  apple: "/logo.png", 
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-normal">
         <VisitorTracker />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
