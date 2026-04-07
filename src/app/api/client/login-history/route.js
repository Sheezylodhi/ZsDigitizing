import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import LoginHistory from "@/lib/models/LoginHistory";
import jwt from "jsonwebtoken";

export async function GET(req) {

  try {

    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const history = await LoginHistory
      .find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json(history);

  } catch (error) {

    return NextResponse.json({ message: "Server error" }, { status: 500 });

  }

}