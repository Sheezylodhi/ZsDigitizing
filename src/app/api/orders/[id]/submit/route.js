import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import notifyClient from "@/utils/notifyClient";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function PATCH(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const formData = await req.formData();
    const files = formData.getAll("files");
    const note = formData.get("note");

    if (!files.length) {
      return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
    }

    const savedFiles = [];

    for (const file of files) {
      if (!file?.name) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 1. Extension nikalein (e.g., ".pptx", ".pdf", ".dst")
      const lastDotIndex = file.name.lastIndexOf('.');
      const extension = lastDotIndex !== -1 ? file.name.substring(lastDotIndex) : "";
      const nameWithoutExtension = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
      
      // 2. Special characters clean karein aur aakhir mein EXTENSION wapas jorrein!
      // ✅ Yeh step Windows icons aur extensions ke liye sab se zaroori hai
      const cleanPublicId = nameWithoutExtension.replace(/[^a-zA-Z0-9-_]/g, "_") + extension;

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "auto", // Automatically detects images or raw docs
            folder: "orders/submissions",
            public_id: cleanPublicId, // ✅ Saved with extension on Cloudinary
            use_filename: true,
            unique_filename: false, 
            overwrite: true
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      // Agar asset raw hai toh result.secure_url perfect extension ke sath banega
      savedFiles.push({
        fileName: file.name, // Original name for DB
        fileUrl: result.secure_url, // Sahi extension wala url (e.g., .../submissions/file.pptx)
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

    if (!updated) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    try {
      await notifyClient(updated.clientId.toString(), "order_submitted", updated._id.toString());
    } catch (e) { console.error("Notify failed:", e); }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}