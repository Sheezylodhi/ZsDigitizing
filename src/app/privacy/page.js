// app/privacy/page.js
import PrivacyContent from "@/components/PrivacyContent";

export const metadata = {
  title: "Privacy, Refund & Delivery Policy | ZS Digitizing",
  description: "Read about ZS Digitizing's privacy policy, refund terms, and digital delivery information for embroidery digitizing services.",
  keywords: "privacy policy, refund policy, embroidery digitizing, ZS Digitizing policies",
  alternates: {
    canonical: "https://www.zsdigitizing.com/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}