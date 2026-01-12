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
        setStatus("✅ Quote sent successfully! We'll contact you soon.");
        e.target.reset();
      } else {
        setStatus("❌ Failed to send quote. Try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-36 lg:pt-40 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-12 border border-gray-200"
      >
        {/* Header */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0e2c1c] mb-2 text-center drop-shadow-md">
          Get a Free Quote
        </h2>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Fill out the form below to receive a detailed quote for your embroidery project.
          Upload your design or describe your requirements.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input name="name" type="text" placeholder="Full Name *" required className="input" />
            <input name="company" type="text" placeholder="Company Name" className="input" />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input name="email" type="email" placeholder="Email Address *" required className="input" />
            <input name="phone" type="tel" placeholder="Phone Number *" required className="input" />
          </div>

          {/* Website */}
          <input name="website" type="text" placeholder="Company Website" className="input" />

          {/* Deadline */}
          <div>
            <label className="label">Delivery Deadline</label>
            <select name="deadline" className="input">
              <option value="">Select Deadline</option>
              <option value="24 Hours">24 Hours</option>
              <option value="2 Days">2 Days</option>
              <option value="3 Days">3 Days</option>
            </select>
          </div>

          {/* Type of Work */}
          <div>
            <label className="label">Type of Work *</label>
            <div className="flex flex-wrap gap-6 mt-3">
              {["Vector", "Digitizing", "Patches", "Other"].map((v) => (
                <label key={v} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#1E7A5B] transition">
                  <input type="radio" name="type" value={v} required className="accent-[#1E7A5B]" />
                  {v}
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="label">Project Details</label>
            <textarea name="message" rows={5} placeholder="Describe your project..." className="input" />
          </div>

          {/* FILE Upload */}
          <input
            name="file"
            type="file"
            accept=".jpg,.png,.jpeg,.dst,.pes,.jef"
            className="input"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn mx-auto bg-[#0e2c1c] text-white block w-48 mt-2 hover:scale-105 hover:shadow-xl transition transform"
          >
            {loading ? "Sending..." : "Send Quote"}
          </button>

          {status && (
            <p className="text-center mt-3 font-medium text-[#0e2c1c]">
              {status}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
