import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Visitor } from "@/lib/models/Visitor";

export async function POST(req) {
  try {
    await connectDB();

    // Get visitor IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    // Save visitor
    await Visitor.create({ ip });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
