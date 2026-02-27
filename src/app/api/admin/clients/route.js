import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    // ✅ Check Admin
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // ✅ Fetch all clients
    const clients = await User.find({ role: "client" })
      .select("name company phone email") // only necessary fields
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(clients);
  } catch (err) {
    console.error("GET /admin/clients error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}