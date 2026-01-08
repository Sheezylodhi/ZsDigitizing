"use client";

import { useState } from "react";

export default function Order() {
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");

  const submitOrder = async () => {
    await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({ service, details }),
    });
    alert("Order Submitted");
  };

  return (
    <div className="p-12">
      <h2 className="text-3xl font-bold mb-4">Place Order</h2>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Service"
        onChange={(e) => setService(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Order Details"
        onChange={(e) => setDetails(e.target.value)}
      />
      <button
        onClick={submitOrder}
        className="bg-black text-white px-6 py-2"
      >
        Submit
      </button>
    </div>
  );
}
