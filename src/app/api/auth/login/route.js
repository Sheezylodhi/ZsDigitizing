import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import LoginHistory from "@/lib/models/LoginHistory";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    /* ---------------- DEVICE + IP DETECT ---------------- */

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "Unknown";

    const device = req.headers.get("user-agent") || "Unknown Device";

    const newDevice =
      user.lastLoginDevice !== device || user.lastLoginIP !== ip;

    /* ---------------- JWT TOKEN ---------------- */

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    /* ---------------- EMAIL SETUP ---------------- */

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const loginTime = new Date().toLocaleString();

    /* ---------------- EMAIL HTML ---------------- */

    const emailHTML = `
<div style="font-family:Arial;background:#f4f6f8;padding:40px">

  <div style="max-width:600px;margin:auto;background:white;border-radius:10px;border:1px solid #e5e7eb">

    <div style="background:[#0e2c1c];padding:25px;text-align:center">
      <h1 style="color:white;margin:0">ZS Digitizing</h1>
      <p style="color:#cbd5e1;margin-top:5px;font-size:13px">
        Account Security Notification
      </p>
    </div>

    <div style="padding:35px">

      <h2 style="margin-top:0">New Login Detected</h2>

      <p>Hello <strong>${user.name || user.email}</strong>,</p>

      <p>A login to your account was detected.</p>

      <div style="background:#f8fafc;padding:15px;border-left:4px solid #0e2c1c;margin:20px 0">

        <p style="margin:4px 0"><strong>Time:</strong> ${loginTime}</p>
        <p style="margin:4px 0"><strong>Device:</strong> ${device}</p>
        <p style="margin:4px 0"><strong>IP Address:</strong> ${ip}</p>

      </div>

      ${
        newDevice
          ? `<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:15px;margin:20px 0">
              <strong>⚠ New Device Login Detected</strong>
              <p style="margin-top:5px">
              This login appears to be from a new device or location.
              If this wasn't you, please reset your password immediately.
              </p>
            </div>`
          : ""
      }

      <p style="margin-top:20px">
        If this was you, you can safely ignore this email.
      </p>

      <hr style="margin:30px 0"/>

      <p style="font-size:13px;color:#666">
        Need help? Contact our support team:
      </p>

      <p style="font-size:13px">
        <a href="mailto:Info@zsdigitizing.com">
        Info@zsdigitizing.com
        </a>
      </p>

    </div>

    <div style="background:#f9fafb;padding:18px;text-align:center;font-size:12px;color:#888">
      © ${new Date().getFullYear()} ZS Digitizing. All rights reserved.
    </div>

  </div>

</div>
`;

    /* ---------------- SEND EMAIL ---------------- */

    

    await LoginHistory.create({
  userId: user._id,
  ip: ip,
  device: device,
});

    /* ---------------- UPDATE DEVICE ---------------- */

    user.lastLoginIP = ip;
    user.lastLoginDevice = device;

    await user.save();

    /* ---------------- RESPONSE ---------------- */

    return NextResponse.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}