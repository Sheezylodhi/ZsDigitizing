import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Quote } from "@/lib/models/Quote";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer"; // ✅ email

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    const files = formData.getAll("file"); // multiple files
    const uploadedFiles = [];

    for (const file of files) {
      if (!file?.name) continue;
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "quotes" },
          (err, res) => (err ? reject(err) : resolve(res))
        );
        uploadStream.end(buffer);
      });

      uploadedFiles.push({
        originalName: file.name,
        cloudinaryUrl: result.secure_url,
      });
    }

    // Save quote
    const quote = await Quote.create({
      ...data,
      fileNameArray: uploadedFiles,
    });

    // ---------- EMAIL ----------
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const fileLinks = uploadedFiles.length
        ? uploadedFiles.map(f => `<li><a href="${f.cloudinaryUrl}" target="_blank">${f.originalName}</a></li>`).join("")
        : "No files attached.";

      const emailHtml = `
        <h2>New Quote Request Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company || "N/A"}</p>
        <p><strong>Website:</strong> ${data.website || "N/A"}</p>
        <p><strong>Turnaround Time:</strong> ${data.deadline || "N/A"}</p>
        <p><strong>Type of Work:</strong> ${data.type}</p>
        <p><strong>Message:</strong> ${data.message || "N/A"}</p>
        <p><strong>Files:</strong></p>
        <ul>${fileLinks}</ul>
      `;

      await transporter.sendMail({
        from: `"ZS Digitizing" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Quote Request - ${data.name}`,
        html: emailHtml,
      });
    } catch (emailErr) {
      console.error("❌ EMAIL ERROR:", emailErr);
      // Email fail hone par bhi DB save ho jaaye
    }

    return NextResponse.json({ success: true, quoteId: quote._id });
  } catch (err) {
    console.error("❌ QUOTE API ERROR:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}