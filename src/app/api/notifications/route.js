import connectDB from "@/lib/db";
import Notification from "@/lib/models/Notification";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const notifications = await Notification.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .select("_id title message link read createdAt") // clean fetch
      .lean();

    return new Response(JSON.stringify(notifications), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("GET notifications error:", err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}