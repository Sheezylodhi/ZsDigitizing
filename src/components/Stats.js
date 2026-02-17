"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Completed Orders" },
  { value: 24, suffix: "h", label: "Fast Turnaround" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const [trigger, setTrigger] = useState(0); // triggers CountUp rerender

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          setTrigger((t) => t + 1); // retrigger count-up
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-section"
      className="py-24 relative bg-gradient-to-b from-white to-gray-50"
    >
      {/* Shine Effect Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(0,200,150,0.12),_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center relative z-10">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="p-6 md:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
          >
            <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
              {visible ? <CountUp key={trigger} to={item.value} suffix={item.suffix} /> : `0${item.suffix}`}
            </h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base font-medium">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ to, suffix }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0); // reset before starting
    let start = 0;
    const end = to;
    const duration = 1200;
    const step = 16;
    const increment = (end / duration) * step;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setValue(Math.floor(start));
    }, step);

    return () => clearInterval(timer);
  }, [to]);

  return <span>{value}{suffix}</span>;
}
