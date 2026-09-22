"use client";

import Image from "next/image";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2A4E3B] tracking-tight mb-5">
            How It Works
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
            From your artwork to a production-ready embroidery file,
            our process is simple, precise, and designed for fast delivery.
          </p>
        </div>

        {/* Process Image */}
        <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
          <Image
            src="/images/how-it-works.jpeg"
            alt="Embroidery digitizing process"
            width={1536}
            height={1024}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-5 text-sm md:text-base">
            Ready to get your design digitized?
          </p>

          <Link
            href="/quote"
            className="inline-flex items-center justify-center bg-[#0e2c1c] hover:bg-[#1d4b32] text-white px-9 py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Get a Quote
          </Link>
        </div>

      </div>
    </section>
  );
}

