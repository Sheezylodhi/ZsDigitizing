"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // show toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLoading) return; // extra safety

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Invalid credentials", "error");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userId", data.user._id);

      showToast("Login successful!", "success");

      setTimeout(() => {
        if (data.user.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else if (data.user.role === "client") {
          window.location.href = "/client-portal";
        } else {
          window.location.href = "/";
        }
      }, 1500);

    } catch (err) {
      console.error(err);
      showToast("Server error, try again later", "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <TopAnnouncementBar />
      <Navbar />

      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed top-24 right-5 z-50 flex items-center space-x-3 max-w-sm w-full bg-white shadow-lg rounded-xl px-4 py-3 border-l-4"
            style={{ borderColor: toast.type === "success" ? "#22c55e" : "#ef4444" }}
          >
            {toast.type === "success" ? (
              <FaCheckCircle className="text-green-500 w-6 h-6 animate-bounce" />
            ) : (
              <FaTimesCircle className="text-red-500 w-6 h-6 animate-shake" />
            )}
            <p className={`text-sm font-medium ${toast.type === "success" ? "text-green-700" : "text-red-700"}`}>
              {toast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>


      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white font-sans px-4"
        style={{ paddingTop: "140px", paddingBottom: "120px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full p-10 bg-white rounded-3xl shadow-2xl z-20 relative"
        >
          <h2 className="text-3xl font-extrabold text-center text-[#0e2c1c] mb-8">
            Login to Your Account
          </h2>

          <p className="text-right text-sm mt-2">
            <Link href="/forgot-password" className="text-[#0e2c1c] font-semibold hover:underline">
              Forgot Password?
            </Link>
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
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

            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 pr-12 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
              />

              {/* 👁 Eye Icon */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[52px] cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </motion.div>

            <motion.button
              whileHover={!isLoading && { scale: 1.05 }}
              whileTap={!isLoading && { scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className={`w-full cursor-pointer py-4 rounded-xl font-bold shadow-lg transition-all
    ${isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0e2c1c] text-white hover:shadow-2xl"
                }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <p className="text-gray-600 mt-6 text-sm text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#0e2c1c] hover:text-green-900 font-semibold transition">
              Sign Up
            </Link>
          </p>

        </motion.div>
      </div>

      <Footer />
    </>
  );
}
