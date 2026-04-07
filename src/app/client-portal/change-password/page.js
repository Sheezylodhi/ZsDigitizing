"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChangePassword() {

const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [saving, setSaving] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [strength,setStrength] = useState("");

function checkStrength(password){

let score = 0;

if(password.length >= 8) score++;
if(/[A-Z]/.test(password)) score++;
if(/[0-9]/.test(password)) score++;
if(/[!@#$%^&*]/.test(password)) score++;

if(score <=1) setStrength("Weak");
else if(score ===2 || score ===3) setStrength("Medium");
else setStrength("Strong");

}

const handleChangePassword = async () => {

  if(newPassword !== confirmPassword){
    alert("Passwords do not match");
    return;
  }

  setSaving(true);

  const token = localStorage.getItem("token");

  const res = await fetch("/api/change-password",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      oldPassword,
      newPassword
    })
  });

  const data = await res.json();
  setSaving(false);

  if(res.ok){
    // ✅ Show popup
    setShowPopup(true);
  } else {
    alert(data.message);
  }

};

return(

<div className="max-w-lg mx-auto mt-20 bg-white shadow-lg rounded-xl p-8">

<h2 className="text-2xl font-bold mb-6">
Change Password
</h2>

<input
type="password"
placeholder="Old Password"
className="w-full border p-3 rounded mb-4"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
/>

<input
type="password"
placeholder="New Password"
className="w-full border p-3 rounded mb-2"
value={newPassword}
onChange={(e)=>{
setNewPassword(e.target.value);
checkStrength(e.target.value);
}}
/>

<div className="text-sm mb-3">

<span>Password Strength: </span>

<span
className={
strength==="Weak"
? "text-red-500"
: strength==="Medium"
? "text-yellow-500"
: "text-green-600"
}
>
{strength}
</span>

</div>

<ul className="text-sm text-gray-600 mb-4 list-disc ml-5">
<li>Minimum 8 characters</li>
<li>At least one uppercase letter</li>
<li>At least one number</li>
<li>At least one special character</li>
</ul>

<input
type="password"
placeholder="Confirm Password"
className="w-full border p-3 rounded mb-6"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<button
  onClick={handleChangePassword}
  disabled={saving}
  className={`w-full py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition
    ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 text-white"}`}
>
  {saving && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
  {saving ? "Updating..." : "Update Password"}
</button>

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
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-400/30 blur-3xl rounded-full"></div>

        {/* Tick */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
        >
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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

        <h2 className="text-2xl font-bold text-[#0e2c1c] mb-2">
          Password Updated 🎉
        </h2>

        <p className="text-gray-500 mb-6 text-sm">
          Your password has been successfully updated.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowPopup(false);
            // redirect anywhere, e.g., profile page
            window.location.href = "/client-portal/profile";
          }}
          className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition"
        >
          OK
        </motion.button>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

</div>


)

}