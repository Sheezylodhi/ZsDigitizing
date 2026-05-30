import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Quote } from "@/lib/models/Quote";
import jwt from "jsonwebtoken";

export async function DELETE(req, context) {
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

    // ✅ NEXT.JS RULES: Dynamic params ko await karna lazmi hai
    const params = await context.params;
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

export async function GET(req, context) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = auth.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
    }

    const params = await context.params;
    const id = params?.id;

    if (!id) return NextResponse.json({ message: "Quote ID required" }, { status: 400 });

    await connectDB();
    const quote = await Quote.findById(id);

    if (!quote) {
      return NextResponse.json({ message: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (err) {
    console.error("Fetch Single Quote Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}