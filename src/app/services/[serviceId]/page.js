// app/services/[serviceId]/page.js

import ServiceContent from "@/components/ServiceContent";

const serviceMetadata = {
  "embroidery-digitizing": {
    title: "Embroidery Digitizing Services | ZS Digitizing",
    description:
      "Professional embroidery digitizing services for logos, caps, jackets, appliqué, and detailed designs with clean stitch paths and fast turnaround.",
  },

  rastertovector: {
    title: "Raster to Vector Conversion Services | ZS Digitizing",
    description:
      "Professional raster to vector conversion services for logos and artwork, delivered as clean, scalable AI, EPS, PDF, SVG, and CDR files.",
  },

  "custom-patches": {
    title: "Custom Patch Services | Embroidered & Woven Patches",
    description:
      "Custom embroidered, woven, PVC, chenille, and leather patch services with quality materials, clean detailing, bulk pricing, and worldwide delivery.",
  },
};

export async function generateMetadata({ params }) {
  const { serviceId } = await params;

  const service = serviceMetadata[serviceId];

  if (!service) {
    return {
      title: "Services | ZS Digitizing",
      description:
        "Explore professional embroidery digitizing, vector artwork, and custom patch services from ZS Digitizing.",
    };
  }

  return {
    title: service.title,
    description: service.description,

    alternates: {
      canonical: `https://www.zsdigitizing.com/services/${serviceId}`,
    },

    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://www.zsdigitizing.com/services/${serviceId}`,
      siteName: "ZS Digitizing",
      type: "website",
    },
  };
}

export default function ServicePage({ params }) {
  return <ServiceContent params={params} />;
}