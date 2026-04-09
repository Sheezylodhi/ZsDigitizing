import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    // security: always success message
    if (!user) {
      return NextResponse.json({ message: "If email exists, reset link sent" });
    }

    // generate token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 10; // 10 min

    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const emailHTML = `
<div style="font-family:sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  
  <h2 style="color: #0e2c1c;">Reset Your Password</h2>

  <p>Hello <strong>${user.name || user.email}</strong>,</p>

  <p>
    We received a request to reset your account password.<br><br>
    Click the button below to set a new password.
  </p>

  <!-- BUTTON -->
  <div style="text-align:center; margin: 25px 0;">
    <a href="${resetLink}" 
       style="background: #0e2c1c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
      Reset Password
    </a>
  </div>

  <p style="font-size: 14px; color: #555;">
    This link will expire in <b>10 minutes</b>.
  </p>

  <p style="font-size: 14px; color: #555;">
    If you did not request this, you can safely ignore this email.
  </p>

  <p style="margin-top:20px;">
    If you need any assistance, feel free to contact us anytime.
  </p>

  <p>
    Best regards,
  </p>

  <!-- Footer SAME AS CLIENT PORTAL -->
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #555;">
  
    <div style="display: flex; align-items: center;">
      
      <!-- Logo Circle -->
      <div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; margin-right: 15px; border: 1px solid #eee; flex-shrink: 0;">
        <img 
          src="https://www.zsdigitizing.com/Logoicon.png" 
          alt="ZS Digitizing"
          width="60"
          height="60"
          style="display: block; width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
      </div>

      <!-- Content -->
      <div>
        <div><b>ZS Digitizing</b></div>
        <div style="font-size: 13px; color: #777;">Client Support Team</div>

        <div style="margin: 5px 0;">
          <a href="mailto:Info@zsdigitizing.com" style="color: #0e2c1c; text-decoration: none;">
            Info@zsdigitizing.com
          </a> | 
          <a href="https://www.zsdigitizing.com" style="color: #0e2c1c; text-decoration: none;">
            www.zsdigitizing.com
          </a>
        </div>

        <div style="font-size: 12px; color: #888;">
          Embroidery Digitizing | Vector Art | Custom Patches
        </div>
      </div>

    </div>

  </div>

</div>
`;

    await transporter.sendMail({
      from: `"ZS Digitizing" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Reset Your Password",
      html: emailHTML
    });

    return NextResponse.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}