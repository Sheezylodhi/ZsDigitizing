import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Quote } from "@/lib/models/Quote";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = auth.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try { jwt.verify(token, process.env.JWT_SECRET); } 
    catch { return NextResponse.json({ message: "Invalid Token" }, { status: 403 }); }

    await connectDB();
    const url = new URL(req.url);
    const paths = url.pathname.split("/");
    const id = paths[paths.length - 1];

    if (!id) return NextResponse.json({ error: "Quote ID missing" }, { status: 400 });

    const quote = await Quote.findById(id);
    if (!quote) return NextResponse.json({ error: "Quote not found" }, { status: 404 });

    return NextResponse.json(quote); // fileNameArray included automatically
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}