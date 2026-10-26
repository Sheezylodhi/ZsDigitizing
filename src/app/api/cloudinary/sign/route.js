
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

function verifyAdmin(req) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token || !process.env.JWT_SECRET) {
    return false;
  }

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

export async function POST(req) {
  try {
    if (!verifyAdmin(req)) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    const { fileName } = await req.json();

    if (!fileName || typeof fileName !== "string") {
      return NextResponse.json(
        { message: "File name is required." },
        { status: 400 }
      );
    }

    if (
      !process.env.CLOUD_NAME ||
      !process.env.CLOUD_API_KEY ||
      !process.env.CLOUD_API_SECRET
    ) {
      console.error("Cloudinary environment variables are missing.");

      return NextResponse.json(
        { message: "Cloudinary configuration is missing." },
        { status: 500 }
      );
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const originalName = fileName.split(/[\\/]/).pop();
    const lastDot = originalName.lastIndexOf(".");
    const extension =
      lastDot > 0 ? originalName.slice(lastDot).toLowerCase() : "";
    const baseName =
      lastDot > 0 ? originalName.slice(0, lastDot) : originalName;

    const safeName = baseName
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 100) || "submission";

    // Unique ID prevents different uploads from overwriting each other.
    const publicId = `${randomUUID()}_${safeName}${extension}`;
    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = {
      folder: "orders/submissions",
      public_id: publicId,
      timestamp,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUD_API_SECRET
    );

    return NextResponse.json({
      cloudName: process.env.CLOUD_NAME,
      apiKey: process.env.CLOUD_API_KEY,
      signature,
      timestamp,
      folder: paramsToSign.folder,
      publicId,
    });
  } catch (err) {
    console.error("CLOUDINARY SIGN ERROR:", err);

    return NextResponse.json(
      { message: "Could not prepare secure upload." },
      { status: 500 }
    );
  }
}
