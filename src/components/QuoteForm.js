"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
    file: null,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("details", formData.details);
    if (formData.file) form.append("designFile", formData.file);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Quote submitted successfully!");
        setFormData({ name: "", email: "", details: "", file: null });
      } else {
        setStatus("Failed to submit. Try again.");
      }
    } catch (err) {
      console.log(err);
      setStatus("Error submitting form.");
    }
  };

  return (
    <section id="quote" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-[#2A4E3B] text-center mb-8"
        >
          Send a Quote
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg border max-w-2xl mx-auto flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2A4E3B]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2A4E3B]"
          />
          <textarea
            name="details"
            placeholder="Project Details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2A4E3B]"
          />
          <input
            type="file"
            name="file"
            onChange={handleChange}
            accept=".jpg,.png,.jpeg,.dst,.pes,.jef"
            className="text-gray-600"
          />

          <button
            type="submit"
            className="bg-[#2A4E3B] text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Submit Quote
          </button>

          {status && <p className="text-center text-gray-600">{status}</p>}
        </motion.form>
      </div>
    </section>
  );
}
