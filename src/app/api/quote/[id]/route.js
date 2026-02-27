import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Quote } from "@/lib/models/Quote";

export async function GET(req) {
  try {
    await connectDB();

    // Extract id from URL manually
    const url = new URL(req.url);
    const paths = url.pathname.split("/"); // ["", "api", "quote", "<id>"]
    const id = paths[paths.length - 1];

    if (!id) return NextResponse.json({ error: "Quote ID missing" }, { status: 400 });

    const quote = await Quote.findById(id);
    if (!quote) return NextResponse.json({ error: "Quote not found" }, { status: 404 });

    // Convert to object
    const quoteObj = quote.toObject();

    // ✅ Ensure fileUrl exists and points to public/uploads
    if (quoteObj.fileName && !quoteObj.fileUrl) {
      quoteObj.fileUrl = `/uploads/${quoteObj.fileName}`;
    }

    return NextResponse.json(quoteObj);
  } catch (err) {
    console.error("Quote detail fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}