"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]); // ✅ multiple files now
  const [showPopup, setShowPopup] = useState(false);
  const [quoteId, setQuoteId] = useState(""); // To show a reference ID if needed
  const fileInputRef = useRef();
  const router = useRouter();

  // ✅ handle file selection
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  // ✅ drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  // ✅ remove single file
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    files.forEach(f => formData.append("file", f)); // ✅ append all files

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        e.target.reset();
        setFiles([]); // reset files
        setQuoteId(result.quoteId || "Q-" + Date.now()); // Generate or use API ID
        setShowPopup(true); // Show success popup
      } else {
        alert("Failed to send quote. Try again ❌");
      }
    } catch (err) {
      alert("Server error. Please try again ❌");
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
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#0e2c1c]">Request a Quote</h2>
          <p className="text-gray-600 mt-2">
            Share your requirements and get an accurate quote for your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input name="name" required className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input type="email" name="email" required className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition" />
            </div>
          </div>

          {/* Company & Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <input name="company" className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Phone *</label>
              <input type="tel" name="phone" required className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition" />
            </div>
          </div>

          {/* Website & Deadline */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Website</label>
              <input name="website" className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Turnaround Time</label>
              <select name="deadline" className="mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition">
                <option value="">Select...</option>
                <option value="Rush 4 Hours">Rush 4 Hours</option>
                <option value="6 Hours">6 Hours</option>
                <option value="12 Hours">12 Hours</option>
                <option value="24 Hours">24 Hours</option>
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

          {/* ✅ File Upload Section */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Files (optional)</label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 hover:border-green-500 transition"
            >
              {files.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {files.map((f, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-xl">
                      <span className="truncate">{f.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="text-red-500 font-bold hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <p className="text-gray-400 text-sm">Click or drag more files to add</p>
                </div>
              ) : (
                <p>Drag & drop files here, or click to select</p>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="cursor-pointer w-full py-3 bg-[#0e2c1c] text-white rounded-xl font-medium hover:bg-green-700 transition">
            {loading ? "Sending..." : "Send Request"}
          </button>
        </form>
      </motion.div>

      {/* ---------- SUCCESS POPUP ---------- */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.6, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.6, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/20"
            >
              {/* Glow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-400/30 blur-3xl rounded-full"></div>

              {/* Tick */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, delay: 0.2 }}
                className="relative w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
              >
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </svg>
              </motion.div>

              {/* Title & Message */}
              <h2 className="text-2xl font-bold text-[#0e2c1c] mb-2">Quote Sent Successfully</h2>
              <p className="text-gray-500 mb-4 text-sm">
                Your request has been submitted successfully.
              </p>

             

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowPopup(false);
                  router.push("/");
                }}
                className="cursor-pointer w-full bg-gradient-to-r from-[#0e2c1c] to-[#123825] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition"
              >
                Go to Home
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}