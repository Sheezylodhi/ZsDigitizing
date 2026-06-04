import connectDB from "@/lib/db";
import Chat from "@/lib/models/Chat";
import { NextResponse } from "next/server";
import notifyAdmin from "@/utils/notifyAdmin";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ... import statements same rahengi ...

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const clientId = formData.get("clientId");
    const message = formData.get("message") || "";
    const files = formData.getAll("file");

    if (!clientId || (!message && files.length === 0)) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // ... (Cloudinary Upload logic same rahega) ...

    const newMessage = {
      from: "client",
      message,
      seenByAdmin: false,
      seenByClient: true,
      createdAt: new Date(),
    };

    let chat = await Chat.findOne({ clientId });
    if (chat) {
      chat.messages.push(newMessage);
      chat.updatedAt = new Date();
      await chat.save();
    } else {
      chat = await Chat.create({ clientId, messages: [newMessage], updatedAt: new Date() });
    }

    // ✅ Notify Admin
    await notifyAdmin(clientId, "chat_message", chat._id);

    return NextResponse.json({ success: true, chat });
  } catch (err) {
    console.error("Send client message error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}