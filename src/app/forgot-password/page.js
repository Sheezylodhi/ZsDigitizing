"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setShowPopup(true);
    }
  };

  return (
    <>
      <Navbar />

      {/* ✅ SUCCESS POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <h2 className="text-xl font-bold text-[#0e2c1c] mb-3">
                Reset Link Sent ✅
              </h2>

              <p className="text-gray-600 text-sm mb-6">
                A password reset link has been sent to your email.
                Please check your inbox.
              </p>

              <button
                onClick={() => router.push("/login")}
                className="cursor-pointer bg-[#0e2c1c] text-white px-6 py-2 rounded-lg"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="cursor-pointer w-full bg-[#0e2c1c] text-white py-3 rounded-lg">
              Send Reset Link
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}