import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

export const metadata = {
  title: {
    default: "ZS Digitizing | Professional Embroidery Digitizing & Vector Services",
    template: "%s | ZS Digitizing",
  },

  description:
    "Professional embroidery digitizing, vector artwork, and custom patch services with fast turnaround and production-ready quality worldwide.",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },

  verification: {
    google: "ynu-2uC5kMX8umxG4DlPxHalOFgXhvL-lFeuyrmfFFc",
  },

  openGraph: {
    title: "ZS Digitizing | Professional Embroidery Digitizing Services",
    description:
      "Professional embroidery digitizing, vector artwork, and custom patch services with fast turnaround and production-ready quality.",
    url: "https://www.zsdigitizing.com/",
    siteName: "ZS Digitizing",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="ZJggTEfi7NE5KGQrfG9MVmxInllqpEZ6XZex3MOozz4" />

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