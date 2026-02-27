import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import notifyClient from "@/utils/notifyClient";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function PATCH(req, context) {
  try {
    await connectDB();

    // ✅ NEXT 15 FIX
    const { id } = await context.params;

    const formData = await req.formData();
    const files = formData.getAll("files");
    const note = formData.get("note");

    if (!files.length) {
      return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const savedFiles = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + "-" + file.name;
      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);

      savedFiles.push({
        fileName,
        fileUrl: `/api/files/${fileName}`,
        uploadedAt: new Date()
      });
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        files: savedFiles,
        note: note || "",
        status: "Completed",
        submittedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // ✅ SEND NOTIFICATION
    try {
      await notifyClient(updated.clientId.toString(), "order_submitted", updated._id.toString());
      console.log("✅ Submit notification sent");
    } catch (e) {
      console.error("Notify failed:", e);
    }

    return NextResponse.json(updated);

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
