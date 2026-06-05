import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Portfolio from '@/lib/models/Portfolio'; // Make sure this path is correct
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


export async function GET() {
  try {
    await connectDB();
    // Saara data le aaye, aur sort kar diya latest pehle aaye
    const items = await Portfolio.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (err) {
    console.error("GET PORTFOLIO ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const category = formData.get("category");
    const desc = formData.get("desc");

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary upload
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "portfolio" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const newItem = await Portfolio.create({
      title,
      img: result.secure_url,
      category,
      desc
    });

    return NextResponse.json({ success: true, data: newItem });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Portfolio.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}