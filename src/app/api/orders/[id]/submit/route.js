import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import notifyClient from "@/utils/notifyClient";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ✅ CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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

    const savedFiles = [];

    // ✅ CLOUDINARY UPLOAD
    for (const file of files) {
      if (!file?.name) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "orders/submissions", // optional
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      savedFiles.push({
        fileName: file.name,
        fileUrl: result.secure_url,
        uploadedAt: new Date(),
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
      await notifyClient(
        updated.clientId.toString(),
        "order_submitted",
        updated._id.toString()
      );
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