import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import Client from "@/lib/models/User";
import Notification from "@/lib/models/Notification";
import notifyAdmin from "@/utils/notifyAdmin";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "No token" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id || decoded.userId || decoded._id;

    const client = await Client.findById(clientId);
    if (!client) return NextResponse.json({ message: "Client not found" }, { status: 404 });

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const turnaround = formData.get("turnaround");
    const orderType = formData.get("orderType");
    const status = formData.get("status") || "Pending";

    // SERIAL NUMBER LOGIC
    let prefix = "ORD";
    if (orderType.includes("Digitizing")) prefix = "PPO";
    else if (orderType.includes("Vector")) prefix = "PPV";
    else if (orderType.includes("Patches")) prefix = "PO";

    const lastOrder = await Order.findOne({ serialNumber: { $regex: `^${prefix}-` } }).sort({ createdAt: -1 });
    let nextNumber = 1;
    if (lastOrder?.serialNumber) {
      const num = parseInt(lastOrder.serialNumber.split("-")[1]);
      if (!isNaN(num)) nextNumber = num + 1;
    }
    const serialNumber = `${prefix}-${String(nextNumber).padStart(5, "0")}`;

    // MULTIPLE FILE UPLOAD (Original Name Fix)
    const files = formData.getAll("files");
    const uploadPromises = files.map(async (file) => {
      if (!file || !file.name) return null;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 1. File name se extension alag karein (e.g., "Assignment#03.pdf" -> "Assignment#03")
      const nameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      
      // 2. Cloudinary ke public_id ke liye special characters clean karein (sirf letters, numbers, hyphens, underscores)
      const cleanPublicId = nameWithoutExtension.replace(/[^a-zA-Z0-9-_]/g, "_");

      // Extension check taake har format support ho
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "auto", 
            folder: "orders/client_uploads",
            public_id: cleanPublicId, // ✅ Cleaned name without extension & hash
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            flags: "attachment" // ✅ Adds metadata context for correct downloads
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      return {
        fileName: file.name, // ✅ Database me bilkul ORIGINAL name hi jayega (Assignment#03.pdf)
        fileUrl: result.secure_url,
        uploadedAt: new Date(),
      };
    });

    const uploadedFilesResults = await Promise.all(uploadPromises);
    const clientFiles = uploadedFilesResults.filter((f) => f !== null);

    const admin = await Client.findOne({ role: "admin" });
    if (!admin) return NextResponse.json({ message: "Admin not found" }, { status: 500 });

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

    try {
      await notifyAdmin(client._id, order._id);
    } catch (e) {
      console.error("Admin notify failed:", e);
    }

    await Notification.create({
      userId: admin._id,
      title: "New Order Received",
      message: `New Order from ${client.name}`,
      Notifymessage: `A new order (${serialNumber}) has been placed by ${client.name}.`,
      orderId: order._id,
      type: "order",
      read: false,
    });

    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}