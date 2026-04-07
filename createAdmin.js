import bcrypt from "bcrypt";
import connectDB from "./lib/db.js";
import { Admin } from "./lib/models/Admin.js";

const createAdmin = async () => {
  await connectDB();

  const username = "admin"; // change if needed
  const password = "zsdigitize123"; // plain text password

  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if admin already exists
  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log("✅ Admin already exists in DB");
    process.exit(0);
  }

  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();

  console.log("✅ Admin created successfully!");
  process.exit(0);
};

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});
