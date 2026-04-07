import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Quote } from "@/lib/models/Quote";
import { Analytics } from "@/lib/models/Analytics";

export async function GET() {
  await connectDB();

  const quotes = await Quote.countDocuments();
  const visitors = await Analytics.countDocuments();

  const conversion = visitors === 0 ? 0 : Math.round((quotes / visitors) * 100);

  return NextResponse.json({
    quotes,
    visitors,
    conversion,
  });
}
