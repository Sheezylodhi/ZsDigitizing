import TermsContent from "@/components/TermsContent";

export const metadata = {
  title: "Terms & Conditions | ZS Digitizing",
  description: "Read the terms and conditions for using ZS Digitizing services, including payment terms, copyright policy, and our service guidelines.",
  alternates: {
    canonical: "https://www.zsdigitizing.com/terms",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}