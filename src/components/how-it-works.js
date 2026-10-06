"use client";

import Image from "next/image";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <section className="bg-gray-50 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Center Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#2A4E3B] sm:text-5xl lg:text-6xl">
            How It Works
          </h2>
        </div>

        {/* Content + Image */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — Content */}
          <div className="max-w-2xl">
            <div className="space-y-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              <p>
                Our process is designed to keep every order simple, organized,
                and easy to follow.
                 You send us your artwork, and our team reviews the design and
                prepares it for digitizing.
                    Once the design is completed, it goes through our release
                process before being made available to you.
                 Your login credentials are sent securely to your email for
                access to the client portal.
                     Your login credentials are sent securely to your email for
                access to the client portal.
                 Through your secure login, you can view and download your
                completed design files whenever you need them.
                This gives you a clear and convenient way to access and manage
                your design files whenever needed.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-9">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-xl bg-[#0e2c1c] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#1d4b32] hover:shadow-xl"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-xl">
            <Image
              src="/images/how-it-works.jpeg"
              alt="ZS Digitizing embroidery digitizing process"
              width={1536}
              height={1024}
              className="h-auto w-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}