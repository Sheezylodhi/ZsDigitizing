// app/services/[serviceId]/page.js
import ServiceContent from "@/components/ServiceContent";

export async function generateMetadata({ params }) {
  const { serviceId } = await params;
  
  return {
    title: `${serviceId.replace(/-/g, ' ')} | ZS Digitizing`,
    description: `Professional ${serviceId.replace(/-/g, ' ')} services by ZS Digitizing. High quality, fast turnaround, and affordable pricing.`,
    alternates: {
      canonical: `https://www.zsdigitizing.com/services/${serviceId}`,
    },
  };
}

export default function ServicePage({ params }) {
  // Server component se params pass karenge
  return <ServiceContent params={params} />;
}