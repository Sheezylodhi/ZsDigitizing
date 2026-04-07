import { NextResponse } from "next/server";
import { Analytics } from "@/lib/models/Analytics";
import connectDB from "@/lib/db";

export async function POST(req) {
  await connectDB();

  const { ip, userAgent, page, referrer } = await req.json();

  await Analytics.create({ ip, userAgent, page, referrer });

  return NextResponse.json({ success: true });
}
