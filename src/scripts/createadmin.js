import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import connectDB from "../lib/db.js";
import { Admin } from "../lib/models/Admin.js";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    await connectDB();

    const username = "zsdigitize";
    const plainPassword = "zsdigitize$@123";

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log("⚠️ Admin already exists!");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully!");
    console.log("Username:", newAdmin.username);
    console.log("Password:", plainPassword, "(Keep this safe!)");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
