import connectDB from "@/lib/db";
import Chat from "@/lib/models/Chat";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    if (!clientId) return NextResponse.json({ error: "ClientId missing" }, { status: 400 });

    const chat = await Chat.findOne({ clientId });
    if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

    // mark all client messages as seen by admin
    chat.messages.forEach(msg => {
      if (msg.from === "client") msg.seenByAdmin = true;
    });
    chat.updatedAt = new Date();
    await chat.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MarkAsSeen error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}