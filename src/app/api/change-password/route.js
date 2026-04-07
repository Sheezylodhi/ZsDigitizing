import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();

    const { oldPassword, newPassword } = await req.json();

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id || decoded.userId || decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return NextResponse.json(
        { message: "Old password is incorrect" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    /* -------- EMAIL NOTIFICATION -------- */

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ZS Digitizing Security" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Your Account Password Has Been Changed",
      html: `
      
<div style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;padding:40px 0">

  <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb">

    <div style="background:#0e2c1c;padding:25px;text-align:center">
      <h1 style="color:white;margin:0;font-size:22px">
        ZS Digitizing
      </h1>
      <p style="color:#cbd5e1;margin:5px 0 0;font-size:13px">
        Account Security Notification
      </p>
    </div>

    <div style="padding:35px">

      <h2 style="margin-top:0;color:#111;font-size:20px">
        Password Changed Successfully
      </h2>

      <p style="color:#555;font-size:14px">
        Hello <strong>${user.name}</strong>,
      </p>

      <p style="color:#555;font-size:14px;line-height:1.6">
        This is a confirmation that your account password was successfully updated.
        If you made this change, no further action is required.
      </p>

      <div style="background:#f8fafc;border-left:4px solid #0e2c1c;padding:15px;margin:25px 0">
        <p style="margin:0;font-size:13px;color:#444">
          <strong>Security Tip:</strong> Never share your password with anyone.
          Our team will never ask for your password via email.
        </p>
      </div>

      <p style="color:#555;font-size:14px">
        If you did not perform this action, please contact our support team immediately.
      </p>

      <div style="margin-top:30px">
        <a href="${process.env.SITE_URL}"
        style="display:inline-block;background:#0e2c1c;color:white;text-decoration:none;padding:12px 22px;border-radius:6px;font-size:14px">
        Visit Client Portal
        </a>
      </div>

      <hr style="margin:35px 0;border:none;border-top:1px solid #eee"/>

      <p style="font-size:13px;color:#777;margin:0">
        Need help?
      </p>

      <p style="font-size:13px;color:#777;margin:5px 0 0">
        Contact our support team at 
        <a href="mailto:support@zsdigitizing.com" style="color:#0e2c1c">
        support@zsdigitizing.com
        </a>
      </p>

    </div>

    <div style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#999">
      © ${new Date().getFullYear()} ZS Digitizing. All rights reserved.
    </div>

  </div>

</div>

`,
    });

    return NextResponse.json({
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}