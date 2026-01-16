"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setStatus("Quote sent successfully!");
        e.target.reset();
      } else {
        setStatus("Failed to send quote. Try again.");
      }
    } catch (err) {
      setStatus("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-10 pb-24 flex items-start justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl backdrop-blur-xl bg-white/70 border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-3xl p-10"
      >
        <div className="mb-10 text-center space-y-2">
          <h2 className="text-4xl font-semibold tracking-tight text-[#0e2c1c]">
            Request a Quote
          </h2>
          <p className="text-[#0e2c1c] text-sm">
            Share your requirements to receive an accurate quote.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm text-[#0e2c1c] font-medium">Full Name *</label>
            <input
              name="name"
              required
              className="w-full rounded-xl border border-[#0e2c1c] bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
            />
          </div>

          {/* Company */}
          <div className="space-y-1.5">
            <label className="text-sm text-[#0e2c1c] font-medium">Company</label>
            <input
              name="company"
              className="w-full rounded-xl border border-[#0e2c1c] bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm text-[#0e2c1c] font-medium">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-[#0e2c1c] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-sm text-[#0e2c1c] font-medium">Phone *</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-xl border border-[#0e2c1c] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
            />
          </div>

          {/* Website */}
          <div className="space-y-1.5">
            <label className="text-sm text-[#0e2c1c] font-medium">Website</label>
            <input
              name="website"
              className="w-full rounded-xl border border-[#0e2c1c] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
            />
          </div>

          {/* Deadline */}
          <div className="space-y-1.5">
            <label className="text-sm text-[#0e2c1c] font-medium">Deadline</label>
            <select
              name="deadline"
              className="w-full rounded-xl border border-[#0e2c1c] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
            >
              <option value="">Select...</option>
              <option value="24 Hours">24 Hours</option>
              <option value="2 Days">2 Days</option>
              <option value="3 Days">3 Days</option>
            </select>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label className="text-sm text-[#0e2c1c] font-medium">Type of Work *</label>
            <div className="flex gap-4 flex-wrap">
              {["Vector", "Digitizing", "Patches", "Other"].map((v) => (
                <label key={v} className="flex items-center gap-2 text-[#0e2c1c] text-sm cursor-pointer">
                  <input type="radio" name="type" value={v} required />
                  {v}
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-sm text-[#0e2c1c] font-medium">Project Details</label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-xl border border-[#0e2c1c]px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
              placeholder="Describe project requirements..."
            />
          </div>

          {/* File */}
          <div className="space-y-1.5">
            <label className="text-sm text-[#0e2c1c] font-medium">File (optional)</label>
            <input
              type="file"
              name="file"
              className="w-full rounded-xl border border-[#0e2c1c] px-4 py-2 bg-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0e2c1c] text-white font-medium tracking-wide hover:bg-black/90 transition"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

          {status && (
            <p className="text-center text-[#0e2c1c] font-medium">{status}</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
