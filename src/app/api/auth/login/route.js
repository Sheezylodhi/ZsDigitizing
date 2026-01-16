import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // Create JWT
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(
      JSON.stringify({
        token,
        user: { email: user.email, role: user.role }
      }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
