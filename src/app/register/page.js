"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: ""
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    const res = await fetch("/api/admin/create-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setMsg("Account created & email sent ✅");
      setForm({ name: "", company: "", phone: "", email: "" });
    }

    setLoading(false);
  };

  return (
    <>
      <TopAnnouncementBar />
      <Navbar />

      <div
        className="min-h-screen font-serif flex items-center justify-center bg-gradient-to-b from-green-50 to-white font-sans px-4"
        style={{ paddingTop: "140px", paddingBottom: "120px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full p-10 bg-white rounded-3xl shadow-2xl z-20 relative"
        >
          <h2 className="text-3xl font-extrabold text-center text-[#0e2c1c] mb-8">
            Create Your Account
          </h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          {msg && <p className="text-green-600 text-sm mb-4 text-center">{msg}</p>}

          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Name */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
              />
            </motion.div>

            {/* Company */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Company</label>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                required
                value={form.company}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
              />
            </motion.div>

            {/* Phone */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
              />
            </motion.div>

            {/* Email */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#0e2c1c] text-white font-bold shadow-lg hover:shadow-2xl transition-all"
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          <p className="text-gray-600 mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0e2c1c] hover:text-green-900 font-semibold transition">
              Login
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
