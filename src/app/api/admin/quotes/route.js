import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Quote } from "@/lib/models/Quote";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");

    if (!auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
    }

    await connectDB();
    const quotes = await Quote.find().sort({ createdAt: -1 });
    return NextResponse.json(quotes);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
