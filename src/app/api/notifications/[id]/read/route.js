import connectDB from "@/lib/db";
import Notification from "@/lib/models/Notification";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(req, context) {
  // ✅ unwrap params
  const params = await context.params;
  const id = params.id;
  console.log("PATCH called with ID:", id);

  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updated = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }

    console.log("Notification marked as read:", updated._id, updated.read);

    return NextResponse.json({
      _id: updated._id,
      title: updated.title,
      message: updated.message,
      link: updated.link,
      read: updated.read,
      createdAt: updated.createdAt,
    });
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}