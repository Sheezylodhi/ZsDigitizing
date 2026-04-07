import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import Client from "@/lib/models/User";
import Notification from "@/lib/models/Notification";
import notifyAdmin from "@/utils/notifyAdmin";
import { v2 as cloudinary } from "cloudinary";

// ✅ CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();

    // ✅ AUTH
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id || decoded.userId || decoded._id;

    const client = await Client.findById(clientId);
    if (!client) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const turnaround = formData.get("turnaround");
    const orderType = formData.get("orderType");
    const status = formData.get("status");

    /* ================= SERIAL NUMBER ================= */
    let prefix = "ORD";
    if (orderType.includes("Digitizing")) prefix = "PPO";
    else if (orderType.includes("Vector")) prefix = "PPV";
    else if (orderType.includes("Patches")) prefix = "PO";

    const lastOrder = await Order.findOne({
      serialNumber: { $regex: `^${prefix}-` },
    }).sort({ createdAt: -1 });

    let nextNumber = 1;
    if (lastOrder?.serialNumber) {
      const num = parseInt(lastOrder.serialNumber.split("-")[1]);
      if (!isNaN(num)) nextNumber = num + 1;
    }

    const serialNumber = `${prefix}-${String(nextNumber).padStart(5, "0")}`;

    /* ================= MULTIPLE FILE UPLOAD ================= */
    const files = formData.getAll("files");
    const clientFiles = [];

    // 👉 Upload all files in parallel (FAST)
    const uploadPromises = files.map(async (file) => {
      if (!file || !file.name) return null;

      // optional size check (10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error(`File too large: ${file.name}`);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "orders",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(buffer);
      });

      return {
        fileName: file.name,
        fileUrl: result.secure_url,
        uploadedAt: new Date(),
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    // remove nulls
    uploadedFiles.forEach((f) => {
      if (f) clientFiles.push(f);
    });

    /* ================= ADMIN ================= */
    const admin = await Client.findOne({ role: "admin" });
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 500 });
    }

    /* ================= CREATE ORDER ================= */
    const order = await Order.create({
      serialNumber,
      clientId: client._id,
      adminId: admin._id,
      title,
      description,
      turnaround,
      orderType,
      status,
      clientFile: clientFiles,
      files: [],
    });

    /* ================= NOTIFICATIONS ================= */
    try {
      await notifyAdmin(client._id, order._id);
    } catch (e) {
      console.error("Admin notify failed:", e);
    }

    await Notification.create({
      userId: admin._id,
      message: `New Order from ${client.name}`,
      orderId: order._id,
      type: "order",
      read: false,
    });

    return NextResponse.json(order);

  } catch (err) {
    console.error("Order create error:", err);

    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}