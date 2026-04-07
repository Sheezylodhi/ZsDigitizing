import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Visitor } from "@/lib/models/Visitor";
import { Quote } from "@/lib/models/Quote";
import Order from "@/lib/models/Order";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    if (dateParam) {
      startDate = new Date(dateParam);
      startDate.setHours(0, 0, 0, 0);
    }

    // Visitors
    const totalVisitors = await Visitor.countDocuments();
    const visitorsToday = await Visitor.countDocuments({
      visitedAt: { $gte: startDate },
    });

    // Quotes
    const totalQuotes = await Quote.countDocuments();
    const quotesToday = await Quote.countDocuments({
      createdAt: { $gte: startDate },
    });

    // Orders
    const totalOrders = await Order.countDocuments();
    const ordersToday = await Order.countDocuments({
      createdAt: { $gte: startDate },
    });

    return NextResponse.json({
      totalVisitors,
      visitorsToday,
      totalQuotes,
      quotesToday,
      totalOrders,
      ordersToday,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}