import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import notifyClient from "@/utils/notifyClient";

export async function POST(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });

    const token = authHeader.split(" ")[1];
    let adminId;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      adminId = decoded.userId;
    } catch {
      return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
    }

    const body = await req.json();
    const { clientId, title, description, turnaround, orderType, status } = body;

    if (!clientId || !title || !orderType)
      return new Response(JSON.stringify({ message: "Client, Title & Order Type required" }), { status: 400 });

    let prefix =
      orderType === "Digitizing PPO" ? "PPO" :
      orderType === "Vector PPV" ? "PPV" :
      orderType === "Patches PO" ? "PO" : "GEN";

    const count = await Order.countDocuments({ orderType });
    const serialNumber = `${prefix}-${String(count + 1).padStart(2, "0")}`;

    const order = await Order.create({
      clientId,
      adminId,
      title,
      description: description || "",
      turnaround: turnaround || "24 Hours",
      orderType,
      serialNumber,
      status: status || "Pending",
      files: [],
    });

    // ✅ NOTIFY CLIENT (SAFE)
    try {
      await notifyClient(clientId, "order_created", order._id);
    } catch (e) {
      console.error("Notify failed:", e);
    }

    return new Response(JSON.stringify(order), { status: 201 });

  } catch (err) {
    console.error("POST /api/orders Error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}

// GET
export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    let clientId = null;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        clientId = decoded.userId;
      } catch {}
    }

    let orders;
    if (clientId) {
      orders = await Order.find({ clientId })
        .populate("clientId", "name email")
        .populate("adminId", "name email")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find()
        .populate("clientId", "name email")
        .populate("adminId", "name email")
        .sort({ createdAt: -1 });
    }

    return new Response(JSON.stringify(orders), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
