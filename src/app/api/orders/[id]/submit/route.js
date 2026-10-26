
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import notifyClient from "@/utils/notifyClient";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const runtime = "nodejs";

function verifyAdmin(req) {
  const header = req.headers.get("authorization");
  const token = header?.startsWith("Bearer ")
    ? header.slice(7)
    : null;

  if (!token || !process.env.JWT_SECRET) return false;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return (
      typeof decoded !== "string" &&
      decoded.userId &&
      String(decoded.role).toLowerCase() === "admin"
    );
  } catch {
    return false;
  }
}

export async function PATCH(req, context) {
  try {
    if (!verifyAdmin(req)) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid order ID." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { files, note } = body;

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { message: "At least one uploaded file is required." },
        { status: 400 }
      );
    }

    const safeFiles = files.map((file) => {
      if (
        !file ||
        typeof file.fileName !== "string" ||
        typeof file.fileUrl !== "string"
      ) {
        throw new Error("Invalid uploaded file data.");
      }

      const url = new URL(file.fileUrl);

      if (
        url.protocol !== "https:" ||
        url.hostname !== "res.cloudinary.com"
      ) {
        throw new Error("Invalid Cloudinary file URL.");
      }

      return {
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        uploadedAt: new Date(),
      };
    });

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        files: safeFiles,
        note: typeof note === "string" ? note : "",
        status: "Completed",
        submittedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    try {
      await notifyClient(
        updated.clientId.toString(),
        "order_submitted",
        updated._id.toString()
      );
    } catch (err) {
      console.error("CLIENT NOTIFICATION FAILED:", err);
    }

    return NextResponse.json({
      message: "Submission updated successfully.",
      serialNumber: updated.serialNumber,
      note: updated.note,
      status: updated.status,
      submittedAt: updated.submittedAt,
      files: updated.files || [],
    });
  } catch (err) {
    console.error("SUBMIT API ERROR:", err);

    const message =
      err instanceof SyntaxError
        ? "Invalid request data."
        : err.message || "Server error.";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
