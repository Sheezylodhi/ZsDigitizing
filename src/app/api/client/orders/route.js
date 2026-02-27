import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import Client from "@/lib/models/User";
import Notification from "@/lib/models/Notification";
import { writeFile } from "fs/promises";
import path from "path";
import notifyAdmin from "@/utils/notifyAdmin";

export async function POST(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ message: "No token" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id || decoded.userId || decoded._id;

    const client = await Client.findById(clientId);
    if (!client)
      return NextResponse.json({ message: "Client not found" }, { status: 404 });

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const turnaround = formData.get("turnaround");
    const orderType = formData.get("orderType");
    const status = formData.get("status");

    // ✅ SERIAL LOGIC
    let prefix = "ORD";
    if (orderType.includes("Digitizing")) prefix = "PPO";
    else if (orderType.includes("Vector")) prefix = "PPV";
    else if (orderType.includes("Patches")) prefix = "PO";

    const lastOrder = await Order.findOne({
      serialNumber: { $regex: `^${prefix}-` }
    }).sort({ createdAt: -1 });

    let nextNumber = 1;
    if (lastOrder?.serialNumber) {
      const num = parseInt(lastOrder.serialNumber.split("-")[1]);
      if (!isNaN(num)) nextNumber = num + 1;
    }

    const serialNumber = `${prefix}-${String(nextNumber).padStart(5, "0")}`;

    // ✅ CLIENT FILE UPLOAD → clientFile
    const files = formData.getAll("files");
    const clientFiles = [];

    for (let file of files) {
      if (!file?.name) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + "-" + file.name;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(filePath, buffer);

      clientFiles.push({
        fileName: file.name,
        fileUrl: `/uploads/${fileName}`,
        uploadedAt: new Date()
      });
    }

    // ✅ ADMIN AUTO GET
    const admin = await Client.findOne({ role: "admin" });
    if (!admin)
      return NextResponse.json({ message: "Admin not found" }, { status: 500 });

    // ✅ CREATE ORDER
    const order = await Order.create({
      serialNumber,
      clientId: client._id,
      adminId: admin._id,
      title,
      description,
      turnaround,
      orderType,
      status,

      // 🔥 IMPORTANT
      clientFile: clientFiles,  // CLIENT FILES HERE
      files: []                 // ADMIN FILES EMPTY
    });

    // ✅ NOTIFY ADMIN
    try {
      await notifyAdmin(client._id, order._id);
    } catch (e) {
      console.error("Admin notify failed:", e);
    }

    // ✅ ADMIN NOTIFICATION
    await Notification.create({
      userId: admin._id,
      message: `New Order from ${client.name}`,
      orderId: order._id,
      type: "order",
      read: false
    });

    return NextResponse.json(order);

  } catch (err) {
    console.error("Order create error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}