import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });

    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const order = await Order.findById(id).lean();
    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json({
      serialNumber: order.serialNumber,
      title: order.title,
      description: order.description,
      orderType: order.orderType,
      turnaround: order.turnaround,
      status: order.status,
      clientFile: order.clientFile || [],
    });
  } catch (err) {
    console.error("GET CLIENT ORDER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const turnaround = formData.get("turnaround");

    // 🔥 Existing files (same as before)
    const existingFiles = JSON.parse(formData.get("existingFiles") || "[]");

    // 🔥 New files
    const newFiles = formData.getAll("clientFile");

    const uploadedFiles = [];

    // ✅ CLOUDINARY UPLOAD (ONLY CHANGE)
    for (let file of newFiles) {
      if (!file?.name) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "client-orders", // optional
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      uploadedFiles.push({
        fileName: file.name,
        fileUrl: result.secure_url, // 🔥 CLOUDINARY URL
        uploadedAt: new Date(),
      });
    }

    // 🔥 Final files same logic
    const finalFiles = [...existingFiles, ...uploadedFiles];

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        title,
        description,
        turnaround,
        clientFile: finalFiles,
      },
      { new: true }
    ).lean();

    if (!updated)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json(updated);

  } catch (err) {
    console.error("PUT CLIENT ORDER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    // 🔥 FIX FOR NEXT 15
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid order ID" },
        { status: 400 }
      );
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const deletedOrder = await Order.findOneAndDelete({
      _id: id,
      client: decoded.id,
    });

    if (!deletedOrder) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Order deleted successfully",
    });

  } catch (err) {
    console.error("DELETE CLIENT ORDER ERROR:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}