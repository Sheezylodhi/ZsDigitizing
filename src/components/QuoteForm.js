"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.target);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setStatus("Quote sent successfully ✅");
        e.target.reset();
        setFile(null);
      } else {
        setStatus("Failed to send quote. Try again ❌");
      }
    } catch (err) {
      setStatus("Server error. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-start justify-center bg-gray-50 py-5 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white border border-gray-200 shadow-lg rounded-3xl p-10"
      >
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#0e2c1c]">Request a Quote</h2>
          <p className="text-gray-600 mt-2">
            Share your requirements and get an accurate quote for your project.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name & Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input
                name="name"
                required
                className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>
          </div>

          {/* Company & Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <input
                name="company"
                className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>
          </div>

          {/* Website & Deadline */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Website</label>
              <input
                name="website"
                className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Deadline</label>
              <select
                name="deadline"
                className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              >
                <option value="">Select...</option>
                <option value="Rush">Rush</option>
                <option value="12 Hours">12 Hours</option>
                <option value="24 Hours">24 Hours</option>
                <option value="1 Day">1 Day</option>
              </select>
            </div>
          </div>

          {/* Type of Work */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Type of Work *</label>
            <div className="flex gap-6 flex-wrap">
              {["Vector", "Digitizing", "Patches", "Other"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input type="radio" name="type" value={type} required />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Project Details</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Describe your project..."
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />
          </div>

          {/* Drag & Drop File */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">File (optional)</label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 hover:border-green-500 transition"
            >
              {file ? (
                <p>📄 {file.name}</p>
              ) : (
                <p>Drag & drop a file here, or click to select</p>
              )}
            </div>
            <input
              type="file"
              name="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0e2c1c] text-white rounded-xl font-medium hover:bg-green-700 transition"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

          {/* Status Message */}
          {status && (
            <p className="text-center text-green-700 font-medium mt-2">{status}</p>
          )}

        </form>
      </motion.div>
    </section>
  );
}