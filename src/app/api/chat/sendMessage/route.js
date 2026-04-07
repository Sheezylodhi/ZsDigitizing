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

    let attachments = [];

    // ✅ Cloudinary upload
    if (files.length > 0) {
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadRes = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { resource_type: "auto", folder: "chat_uploads" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        });

        attachments.push(uploadRes.secure_url);
      }
    }

    const newMessage = {
      from: "client",
      message,
      attachments,
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
      chat = await Chat.create({
        clientId,
        messages: [newMessage],
        updatedAt: new Date(),
      });
    }

    await notifyAdmin(clientId, "chat_message", chat._id);

    return NextResponse.json({ success: true, chat });

  } catch (err) {
    console.error("Send client message error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}