import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Quote } from "@/lib/models/Quote";
import jwt from "jsonwebtoken";

// ---------------- GET ALL QUOTES ----------------
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

// ---------------- PERMANENT DELETE QUOTE ----------------
// Note: Yeh function `/api/admin/quotes/[id]/route.js` file me hona chahiye taake `params.id` mil sake.
export async function DELETE(req, { params }) {
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

    // Dynamic Route se ID nikalna
    const id = params?.id; 
    if (!id) {
      return NextResponse.json({ message: "Quote ID is required" }, { status: 400 });
    }

    await connectDB();

    // Database se permanently delete karne ke liye
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return NextResponse.json({ message: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Quote permanently deleted successfully" }, { status: 200 });

  } catch (err) {
    console.error("Delete Error:", err);
    return NextResponse.json({ message: "Server error during deletion" }, { status: 500 });
  }
}