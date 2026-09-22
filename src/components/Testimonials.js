"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Robert J. Smith",
    role: "Ocean Shore Store Owner",
    feedback:
      "The ZS digitizing quality is top-notch! My logos look crisp on every towel and shirt. Highly recommended.",
    img: "/client1.webp",
    flagImg: "/usaflag.webp",
    rating: 5,
  },
  {
    name: "David Smith",
    role: "Apparel Brand Owner",
    feedback:
      "Working with ZS Digitizing was seamless. The results delivered far exceeded what we had envisioned.",
    img: "/client2.webp",
    flagImg: "/finlandflag1.svg",
    rating: 5,
  },
  {
    name: "Emma",
    role: "Textile CEO, Texas",
    feedback:
      "ZS Digitizing's innovative approach and excellent customer support make them a trusted partner for any project.",
    img: "/client3.webp",
    flagImg: "/usaflag.webp",
    rating: 5,
  },
  {
    name: "Alex Miller",
    role: "Startup Owner",
    feedback:
      "I'm incredibly impressed by their ability to deliver top-notch solutions while meeting tight deadlines.",
    img: "/client.webp",
    flagImg: "/ukflag.webp",
    rating: 5,
  },
  {
    name: "Jason Reed",
    role: "Motorsport Team Owner",
    feedback:
      "I've tried many digitizing services, but none compare to the quality here. My logos look sharp on every shirt and cap. If you want your brand to look professional, ZS Digitizing is the way to go!",
    img: "/client5.webp",
    flagImg: "/canadaflag.webp",
    rating: 5,
  },
];

export default function Testimonials() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  const positionRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const [isPaused, setIsPaused] = useState(false);

  /*
    Duplicate testimonials multiple times so the carousel
    can continuously move without showing an empty space.
  */
  const carouselItems = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  const speed = 0.45;

  useEffect(() => {
    const animate = () => {
      if (
        !isPaused &&
        !isDragging.current &&
        trackRef.current
      ) {
        positionRef.current -= speed;

        const firstSetWidth =
          trackRef.current.scrollWidth / 3;

        if (
          Math.abs(positionRef.current) >= firstSetWidth
        ) {
          positionRef.current += firstSetWidth;
        }

        trackRef.current.style.transform =
          `translate3d(${positionRef.current}px, 0, 0)`;
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;

    if (trackRef.current) {
      trackRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const currentX = e.clientX;
    const delta = currentX - lastX.current;

    positionRef.current += delta;
    lastX.current = currentX;

    if (trackRef.current) {
      trackRef.current.style.transform =
        `translate3d(${positionRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;

    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-[#f7f6f1] py-24 md:py-32"
    >
      {/* Ambient luxury glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#dce8df]/50 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#e9e0cf]/50 blur-[120px]"
      />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#234636]/10 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-[#234636] shadow-[0_0_12px_rgba(35,70,54,0.5)]" />

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#234636]">
            Client Experiences
          </span>
        </div>

        <h2
          id="testimonials-heading"
          className="text-4xl font-black tracking-[-0.03em] text-[#173526] sm:text-5xl md:text-6xl"
        >
          Trusted by Clients

          <span className="block text-[#5b7765]">
            Around the World
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          Discover why businesses trust ZS Digitizing for precise,
          production-ready embroidery digitizing and reliable service.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative z-10 mt-16 overflow-hidden md:mt-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        {/* Left fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#f7f6f1] to-transparent md:w-40"
        />

        {/* Right fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-[#f7f6f1] to-transparent md:w-40"
        />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex w-max cursor-grab select-none gap-5 px-5 md:gap-7 md:px-10"
        >
          {carouselItems.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="
                group relative
                w-[82vw]
                max-w-[390px]
                shrink-0
                overflow-hidden
                rounded-[2rem]
                border border-white/80
                bg-white/80
                p-[1px]
                shadow-[0_20px_60px_rgba(35,70,54,0.10)]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_30px_80px_rgba(35,70,54,0.18)]
                sm:w-[390px]
                md:w-[400px]
                lg:w-[420px]
              "
            >
              <div className="relative h-full overflow-hidden rounded-[1.9rem] bg-gradient-to-br from-white via-white to-[#f1f5f1] p-7 md:p-8">

                {/* Decorative glow */}
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#dfe9e2] opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                />

                {/* Quote + Rating */}
                <div className="relative mb-7 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#234636] text-white shadow-lg shadow-[#234636]/20">
                    <Quote
                      size={22}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div
                    className="flex items-center gap-1"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map(
                      (_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={16}
                          className="text-[#C59A4A]"
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Review */}
                <blockquote className="relative">
                  <p className="min-h-[150px] text-[17px] font-medium leading-7 text-[#293a30] md:text-lg">
                    “{testimonial.feedback}”
                  </p>
                </blockquote>

                {/* Divider */}
                <div className="my-7 h-px bg-gradient-to-r from-[#234636]/15 via-[#234636]/5 to-transparent" />

                {/* Client */}
                <footer className="relative flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-lg ring-1 ring-[#234636]/10">
                    <Image
                      src={testimonial.img}
                      alt={`${testimonial.name} - ${testimonial.role}`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-bold text-[#234636]">
                        {testimonial.name}
                      </h3>

                      <Image
                        src={testimonial.flagImg}
                        alt="Country flag"
                        width={24}
                        height={16}
                        className="h-4 w-6 shrink-0 rounded-sm object-cover"
                      />
                    </div>

                    <p className="mt-1 truncate text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>

                  <div className="ml-auto hidden shrink-0 sm:block">
                    <BadgeCheck
                      size={22}
                      className="text-[#557762]"
                      strokeWidth={1.7}
                    />
                  </div>
                </footer>

                {/* Bottom luxury accent */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-8 right-8 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#234636] to-[#C59A4A] transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom information */}
      <div className="relative z-10 mt-12 flex justify-center px-6 md:mt-16">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          <span>Precision</span>

          <span className="h-1 w-1 rounded-full bg-[#C59A4A]" />

          <span>Reliable Service</span>

          <span className="h-1 w-1 rounded-full bg-[#C59A4A]" />

          <span>Production Ready</span>
        </div>
      </div>
    </section>
  );
}