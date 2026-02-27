import connectDB from "@/lib/db";
import User from "@/lib/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const clients = await User.find({ role: "client" }).select("name email _id").lean();
    return new Response(JSON.stringify(clients), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
