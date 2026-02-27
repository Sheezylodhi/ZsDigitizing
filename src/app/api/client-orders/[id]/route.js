import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { writeFile, unlink } from "fs/promises";
import path from "path";

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

    // 🔥 Existing files from frontend
    const existingFiles = JSON.parse(formData.get("existingFiles") || "[]");

    // 🔥 New files
    const newFiles = formData.getAll("clientFile");

    const uploadedFiles = [];

    for (let file of newFiles) {
      if (!file?.name) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + "-" + file.name;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(filePath, buffer);

      uploadedFiles.push({
        fileName: file.name,
        fileUrl: `/uploads/${fileName}`,
        uploadedAt: new Date(),
      });
    }

    // 🔥 Final file list
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