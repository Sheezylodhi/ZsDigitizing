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
<div style="font-family:Arial;background:#f4f6f8;padding:40px">

  <div style="max-width:600px;margin:auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">

    <!-- HEADER -->
    <div style="background:#0e2c1c;padding:25px;text-align:center">
      <h1 style="color:white;margin:0">ZS Digitizing</h1>
      <p style="color:#cbd5e1;font-size:13px;margin-top:5px">
        Secure Account Recovery
      </p>
    </div>

    <!-- BODY -->
    <div style="padding:30px">

      <h2 style="margin-top:0;color:#111">Reset Your Password</h2>

      <p>Hello <strong>${user.name || user.email}</strong>,</p>

      <p>
        We received a request to reset your account password.
        Click the button below to set a new password.
      </p>

      <!-- BUTTON -->
      <div style="text-align:center;margin:30px 0">
        <a href="${resetLink}" 
           style="background:#0e2c1c;color:white;padding:14px 25px;
           text-decoration:none;border-radius:6px;font-weight:bold;
           display:inline-block">
           Reset Password
        </a>
      </div>

      <p style="font-size:14px;color:#555">
        This link will expire in <strong>10 minutes</strong>.
      </p>

      <p style="font-size:14px;color:#555">
        If you did not request this, you can safely ignore this email.
      </p>

      <hr style="margin:25px 0"/>

      <p style="font-size:13px;color:#777">
        Need help? Contact support:
      </p>

      <p style="font-size:13px">
        <a href="mailto:support@zsdigitizing.com">
          support@zsdigitizing.com
        </a>
      </p>

    </div>

    <!-- FOOTER -->
    <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#999">
      © ${new Date().getFullYear()} ZS Digitizing. All rights reserved.
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