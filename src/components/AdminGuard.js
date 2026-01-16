"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));

      if (decoded.role === "admin") {
        setAuth(true);
      } else {
        router.replace("/login");
      }
    } catch (err) {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p className="text-center mt-20">Checking authorization...</p>;

  return auth ? children : null;
}
