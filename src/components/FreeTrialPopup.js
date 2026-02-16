"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Sparkles } from "lucide-react";
import Image from "next/image";

export default function FreeTrialPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => setOpen(false), 2200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      >
        {/* MAIN CARD */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="relative w-full max-w-4xl rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden border border-gray-200"
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 z-20 text-gray-400 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT IMAGE */}
            <div className="relative hidden md:block">
              <Image
                src="/images/embridorydigitizing.jpeg"
                alt="Free Trial"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e2c1c]/80 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Premium Embroidery Quality
                </h3>
                <p className="text-sm opacity-90">
                  Trusted by global apparel brands & studios
                </p>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {!success ? (
                <>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 w-fit">
                    <Sparkles size={14} />
                    Free Trial Available
                  </div>

                  <h2 className="text-3xl font-extrabold text-[#0e2c1c] leading-tight mb-3">
                    Try Our Service <br />
                    <span className="text-green-600">Absolutely Free</span>
                  </h2>

                  <p className="text-gray-600 text-sm mb-6 max-w-sm">
                    Get your first embroidery digitizing sample done by our
                    professional team — no cost, no commitment.
                  </p>

                  <form onSubmit={submitHandler} className="space-y-4 max-w-sm">
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-700 focus:outline-none text-sm"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="w-full bg-[#0e2c1c] text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:bg-green-800 transition shadow-lg"
                    >
                      {loading ? "Sending..." : "Start Free Trial"}
                    </motion.button>
                  </form>

                  <p className="text-[11px] text-gray-400 mt-5">
                    No credit card required • 100% secure
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <h3 className="text-2xl font-bold text-green-700">
                    🎉 Success!
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Your free trial request has been received.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
