import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Visitor } from "@/lib/models/Visitor";
import { Quote } from "@/lib/models/Quote";

export async function GET() {
  try {
    await connectDB();

    // Visitors
    const totalVisitors = await Visitor.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const visitorsToday = await Visitor.countDocuments({ visitedAt: { $gte: today } });

    // Quotes
    const totalQuotes = await Quote.countDocuments();
    const quotesToday = await Quote.countDocuments({ createdAt: { $gte: today } });

    return NextResponse.json({
      totalVisitors,
      visitorsToday,
      totalQuotes,
      quotesToday,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
