import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Quote } from "@/lib/models/Quote"; // ensure you have Quote model

export async function GET() {
  try {
    await connectDB();
    const quotes = await Quote.find().sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
