import  connectDB  from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const exists = await User.findOne({ email });
    if (exists) {
      return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed, role: "user" });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
