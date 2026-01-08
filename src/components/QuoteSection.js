"use client";
import { useState } from "react";

export default function QuoteSection() {
  const [name,setName]=useState(""); const [email,setEmail]=useState("");
  const [service,setService]=useState(""); const [details,setDetails]=useState("");

  const handleSubmit = async()=>{
    await fetch("/api/order",{method:"POST",body:JSON.stringify({name,email,service,details})});
    alert("Quote Submitted"); setName(""); setEmail(""); setService(""); setDetails("");
  };

  return (
    <section className="py-20 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-[#2A4E3B] mb-8 text-center">Send Quote / Order Request</h2>
      <div className="space-y-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-3 w-full rounded"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border p-3 w-full rounded"/>
        <input value={service} onChange={e=>setService(e.target.value)} placeholder="Service" className="border p-3 w-full rounded"/>
        <textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="Details" className="border p-3 w-full rounded"/>
        <button onClick={handleSubmit} className="bg-[#2A4E3B] text-white px-6 py-3 rounded hover:bg-green-800 w-full">
          Submit
        </button>
      </div>
    </section>
  );
}
