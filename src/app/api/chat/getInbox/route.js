import connectDB from "@/lib/db";
import Chat from "@/lib/models/Chat";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Get all clients
    const clients = await User.find({ role: "client" }).select("_id name createdAt");

    // Get all chats
    const chats = await Chat.find();

    const inbox = clients.map((client) => {
      const chat = chats.find(
        (c) => c.clientId.toString() === client._id.toString()
      );

      // unread messages count (from client, not seen by admin)
      const unreadCount = chat?.messages?.filter(m => m.from === "client" && !m.seenByAdmin).length || 0;

      // last message
      const lastMessage = chat?.messages?.[chat.messages.length - 1]?.message || "";

      return {
        clientId: client._id,
        name: client.name,
        lastMessage,
        unreadCount,
        updatedAt: chat?.updatedAt || client.createdAt,
      };
    });

    // Latest first
    inbox.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return NextResponse.json(inbox);

  } catch (error) {
    console.error("Inbox error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}