import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { generatePassword } from "@/lib/generateCreds";
import { sendCredentials } from "@/lib/sendCredentials";

export async function POST(req) {
  try {
    await connectDB();

    const { name, company, phone, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // generate password only
    const passwordPlain = generatePassword();
    const hashed = await bcrypt.hash(passwordPlain, 10);

    // save user with email as username
    await User.create({
      name,
      company,
      phone,
      email,
      username: email, // email used as username
      password: hashed,
      role: "client"
    });

    // send email
    await sendCredentials(email, email, passwordPlain);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
