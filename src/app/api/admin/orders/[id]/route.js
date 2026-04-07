import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // ✅ unwrap params

    if (!mongoose.Types.ObjectId.isValid(id))
      return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });

    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const order = await Order.findById(id).lean();
    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json(order);
  } catch (err) {
    console.error("GET order error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const updated = await Order.findByIdAndUpdate(id, body, { new: true }).lean();
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH order error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    await Order.findByIdAndDelete(id);
    return NextResponse.json({ message: "Order deleted" });
  } catch (err) {
    console.error("DELETE order error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}