import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

export const metadata = {
  title: "ZS Digitizing  -  Embroidery Digitizing Services",
  description:
    "ZS Digitizing offers professional embroidery digitizing, logo digitizing, and custom patches with fast turnaround, high quality, and affordable pricing worldwide.",
  alternates: { canonical: "https://www.zsdigitizing.com/" },
 icons: {
    icon: [
      { url: "/favicon.ico" }, // Legacy support
      { url: "/icon.png", type: "image/png" }, // Modern browsers & Google
    ],
    apple: "/apple-icon.png", // Safari ke liye (180x180 PNG)
  },
  verification: { google: "ynu-2uC5kMX8umxG4DlPxHalOFgXhvL-lFeuyrmfFFc" },
  openGraph: {
    title: "ZS Digitizing",
    description:
      "Professional embroidery digitizing services with fast turnaround and premium quality.",
    url: "https://www.zsdigitizing.com/",
    siteName: "ZS Digitizing",
   images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="ynu-2uC5kMX8umxG4DlPxHalOFgXhvL-lFeuyrmfFFc"
        />

        {/* Schema for SEO */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ZS Digitizing",
            "url": "https://www.zsdigitizing.com",
            "logo": "https://www.zsdigitizing.com/icon.png"
          }
          `}
        </script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4D8VHWMWTW"
          strategy="afterInteractive"
        />
        <Script id="ga">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4D8VHWMWTW', { page_path: window.location.pathname });
          `}
        </Script>
      </head>
      <body className="font-normal">
        <VisitorTracker />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}