import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Portfolio from '@/lib/models/Portfolio';
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function GET(req, { params }) {
  const p = await params; // ✅ Params ko await karein
  await connectDB();
  const item = await Portfolio.findById(p.id);
  
  if (!item) return NextResponse.json({ title: "", category: "", desc: "" }); // Fallback
  return NextResponse.json(item);
}


export async function PUT(req, { params }) {
  const p = await params;
  await connectDB();
  const formData = await req.formData();
  
  const file = formData.get("file");
  const title = formData.get("title");
  const category = formData.get("category");
  const desc = formData.get("desc");

  let updateData = { title, category, desc };

  // Agar nayi image upload hui hai
  if (file && file !== "undefined") {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "portfolio" }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }).end(buffer);
    });
    updateData.img = result.secure_url;
  }

  const updated = await Portfolio.findByIdAndUpdate(p.id, updateData, { new: true });
  return NextResponse.json(updated);
}