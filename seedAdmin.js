import bcrypt from "bcryptjs";
import  connectDB  from "./src/lib/db.js";
import User from "./src/lib/models/User.js";

async function seedAdmin() {
  await connectDB();

  const email = "maazanxari0099@gmail.com";
  const password = "ZSdigitize@0099"; // change if you want

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists!");
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashed,
    role: "admin",
  });

  console.log("Admin created successfully!");
  process.exit(0);
}

seedAdmin();
