"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      alert("Signup successful!");
      window.location.href = "/login";
    }
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

          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Name */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
              />
            </motion.div>

            {/* Email */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
              />
            </motion.div>

            {/* Password */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Password</label>
              <input
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
              />
            </motion.div>

            {/* Confirm Password */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="********"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 transition ${
                  confirmPassword && confirmPassword !== password
                    ? "focus:ring-red-500 border-red-500"
                    : "focus:ring-[#0e2c1c]"
                }`}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 rounded-xl bg-[#0e2c1c] text-white font-bold shadow-lg hover:shadow-2xl transition-all"
            >
              Sign Up
            </motion.button>
          </form>

          {/* Login link */}
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
