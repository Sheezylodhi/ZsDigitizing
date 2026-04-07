import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Auth helper
const checkAuth = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Unauthorized");
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || decoded.role !== "admin") throw new Error("Forbidden");
  return true;
};

// GET single client
export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params; // ✅ unwrap
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return NextResponse.json({ message: "Invalid client ID" }, { status: 400 });

    checkAuth(req);

    const client = await User.findById(id)
      .select("name company phone email")
      .lean();

    if (!client)
      return NextResponse.json({ message: "Client not found" }, { status: 404 });

    return NextResponse.json(client);
  } catch (err) {
    console.error("GET client error:", err);
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}

// PATCH update client
export async function PATCH(req, context) {
  try {
    await connectDB();

    const params = await context.params; // ✅ unwrap
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return NextResponse.json({ message: "Invalid client ID" }, { status: 400 });

    checkAuth(req);

    const body = await req.json();
    const updated = await User.findByIdAndUpdate(id, body, { new: true })
      .select("name company phone email")
      .lean();

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH client error:", err);
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}

// DELETE client
export async function DELETE(req, context) {
  try {
    await connectDB();

    const params = await context.params; // ✅ unwrap
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return NextResponse.json({ message: "Invalid client ID" }, { status: 400 });

    checkAuth(req);

    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "Client deleted successfully ✅" });
  } catch (err) {
    console.error("DELETE client error:", err);
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}