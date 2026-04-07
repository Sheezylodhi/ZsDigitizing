import connectDB from "@/lib/db";
import Chat from "@/lib/models/Chat";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    if (!clientId || !mongoose.Types.ObjectId.isValid(clientId)) return new Response("Invalid clientId", { status: 400 });

    const chat = await Chat.findOne({ clientId });
    return new Response(JSON.stringify(chat?.messages || []), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}