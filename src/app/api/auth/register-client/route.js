import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { sendCredentials } from "@/lib/sendCredentials";
import { generatePassword } from "@/lib/generateCreds";

export async function POST(req) {
  try {
    await connectDB();

    const { name, company, phone, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

    // Auto generate password
    const passwordPlain = generatePassword();
    const hashed = await bcrypt.hash(passwordPlain, 10);

    // Save user with role client
    await User.create({
      name,
      company,
      phone,
      email,
      password: hashed,
      role: "client"
    });

    // Send email with credentials
    await sendCredentials(email, email, passwordPlain);

    return NextResponse.json({ success: true, message: "Account created & email sent" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
