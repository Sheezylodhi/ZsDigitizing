import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/lib/db.js";
import User from "./src/lib/models/User.js";
import bcrypt from "bcryptjs";

const ADMIN_EMAILl = process.env.ADMIN_EMAILl || "Maazanxari0099@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ZSdigitize@0099";

async function seedAdmin() {
  try {
    await connectDB();

    // Check if admin exists
    const exists = await User.findOne({ email: ADMIN_EMAILl });
    if (exists) {
      console.log("Admin already exists:", ADMIN_EMAILl);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = await User.create({
      name: "Super Admin",
      email: ADMIN_EMAILl,
      username: "admin",
      password: hashed,
      role: "admin",
      phone: "",
      company: ""
    });

    console.log("Admin created successfully:", admin.email);
    process.exit(0);

  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

seedAdmin();
