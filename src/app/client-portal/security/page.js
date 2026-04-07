"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { User } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";

export default function ClientSecurityPage() {

    const [client, setClient] = useState(null);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [message, setMessage] = useState("");

    const rules = {
        length: newPassword.length >= 8,
        uppercase: /[A-Z]/.test(newPassword),
        number: /[0-9]/.test(newPassword),
        special: /[!@#$%^&*]/.test(newPassword),
    };

    const passedRules = Object.values(rules).filter(Boolean).length;

    const strengthText = ["Weak", "Weak", "Medium", "Strong", "Very Strong"];

    const strengthWidth = ["20%", "40%", "60%", "80%", "100%"];

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("/api/client/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data?._id) setClient(data);
            })

    }, [])

    async function changePassword(e) {

        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        const token = localStorage.getItem("token");

        const res = await fetch("/api/change-password", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                oldPassword,
                newPassword
            })

        });

        const data = await res.json();

        if (res.ok) {

            setMessage("Password updated successfully");

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } else {

            setMessage(data.message);

        }

    }

    function Rule({ label, valid }) {

        return (

            <div className={`flex items-center gap-2 text-sm ${valid ? "text-green-600" : "text-gray-500"}`}>

                <CheckCircle size={16} />

                <span>{label}</span>

            </div>

        )

    }

    return (

        <ClientGuard>

            <div className="min-h-screen bg-white py-14 px-6 flex justify-center">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl space-y-16"
                >

                    <div className="bg-white pt-10 mt-10 border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">

                        <div>

                            <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c]">
                                Account Security
                            </h1>

                            <p className="text-gray-500 text-xs sm:text-sm">
                                Change your password to keep your account secure
                            </p>

                        </div>

                        {client && (

                            <div className="flex items-center gap-3">

                                <div className="flex items-center gap-2 px-2 py-1.5 border border-gray-200 bg-gray-50 rounded-lg">

                                    <User size={14} className="text-gray-500" />

                                    <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                                        {client.name}
                                    </span>

                                </div>

                                <NotificationIcon userId={client._id} />

                            </div>

                        )}

                    </div>

                    {message && (

                        <div className="text-center text-green-600 font-medium">
                            {message}
                        </div>

                    )}

                    <form
                        onSubmit={changePassword}
                        className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg flex flex-col gap-6"
                    >

                        {/* OLD PASSWORD */}

                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-semibold">
                                Old Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showOld ? "text" : "password"}
                                    value={oldPassword}
                                    className="w-full h-[80px] px-6 pr-14 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition text-lg"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Enter your current password"
                                />

                                <span
                                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
                                    onClick={() => setShowOld(!showOld)}
                                >
                                    {showOld ? <EyeOff size={22} /> : <Eye size={22} />}
                                </span>

                            </div>

                        </div>

                        {/* NEW PASSWORD */}

                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-semibold">
                                New Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showNew ? "text" : "password"}
                                    value={newPassword}
                                    className="w-full h-[80px] px-6 pr-14 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition text-lg"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                />

                                <span
                                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
                                    onClick={() => setShowNew(!showNew)}
                                >
                                    {showNew ? <EyeOff size={22} /> : <Eye size={22} />}
                                </span>

                            </div>

                            <div className="w-full bg-gray-200 h-2 rounded">

                                <div
                                    className="h-2 bg-green-600 rounded transition-all"
                                    style={{ width: strengthWidth[passedRules] }}
                                ></div>

                            </div>

                            <p className="text-sm text-gray-600">
                                Strength: {strengthText[passedRules]}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">

                                <Rule label="Minimum 8 characters" valid={rules.length} />
                                <Rule label="One uppercase letter" valid={rules.uppercase} />
                                <Rule label="One number" valid={rules.number} />
                                <Rule label="One special character" valid={rules.special} />

                            </div>

                        </div>

                        {/* CONFIRM PASSWORD */}

                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-semibold">
                                Confirm Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showConfirm ? "text" : "password"}
                                    value={confirmPassword}
                                    className="w-full h-[80px] px-6 pr-14 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition text-lg"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your new password"
                                />

                                <span
                                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                >
                                    {showConfirm ? <EyeOff size={22} /> : <Eye size={22} />}
                                </span>

                            </div>

                            {confirmPassword && (

                                <p className={`text-sm ${newPassword === confirmPassword ? "text-green-600" : "text-red-600"}`}>

                                    {newPassword === confirmPassword ? "Passwords match ✔" : "Passwords do not match"}

                                </p>

                            )}

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#0e2c1c] text-white h-[80px] rounded-xl font-semibold text-xl hover:bg-[#123825] transition shadow-lg"
                        >
                            Update Password
                        </button>

                    </form>

                </motion.div>

            </div>

        </ClientGuard>

    )

}