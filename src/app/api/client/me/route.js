import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Client from "@/lib/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ message: "No token" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ SAFE ID EXTRACTION
    const clientId =
      decoded.id || decoded.userId || decoded._id;

    const client = await Client.findById(clientId).select("-password");

    if (!client)
      return NextResponse.json({ message: "Client not found" }, { status: 404 });

    return NextResponse.json(client);
  } catch (err) {
    console.error("Client auth error:", err);
    return NextResponse.json({ message: "Auth error" }, { status: 401 });
  }
}