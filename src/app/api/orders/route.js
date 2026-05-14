import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import notifyClient from "@/utils/notifyClient";

export async function POST(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    // ✅ SAFE AUTH CHECK
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let adminId;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      adminId = decoded.userId;
    } catch (err) {
      console.error("JWT ERROR:", err);

      return new Response(
        JSON.stringify({ message: "Invalid token" }),
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      clientId,
      title,
      description,
      turnaround,
      orderType,
      status,
    } = body;

    if (!clientId || !title || !orderType) {
      return new Response(
        JSON.stringify({
          message: "Client, Title & Order Type required",
        }),
        { status: 400 }
      );
    }

    // ✅ PREFIX
    let prefix =
      orderType === "Digitizing PPO"
        ? "PPO"
        : orderType === "Vector PPV"
        ? "PPV"
        : orderType === "Patches PO"
        ? "PO"
        : "GEN";

   // ✅ SAFE SERIAL NUMBER GENERATOR
let serialNumber;
let isUnique = false;

while (!isUnique) {

  const latestOrder = await Order.findOne({
    serialNumber: { $regex: `^${prefix}-` },
  }).sort({ createdAt: -1 });

  let nextNumber = 1;

  if (latestOrder?.serialNumber) {
    const lastNumber = parseInt(
      latestOrder.serialNumber.split("-")[1]
    );

    nextNumber = lastNumber + 1;
  }

  serialNumber = `${prefix}-${String(nextNumber).padStart(2, "0")}`;

  const existingOrder = await Order.findOne({ serialNumber });

  if (!existingOrder) {
    isUnique = true;
  }
}

    // ✅ CREATE ORDER
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
      clientFile: [],
    });

    // ✅ NOTIFICATION
    try {
      await notifyClient(clientId, "order_created", order._id);
    } catch (e) {
      console.error("Notify failed:", e);
    }

    return new Response(JSON.stringify(order), {
      status: 201,
    });
  } catch (err) {
    console.error("POST /api/orders Error:", err);

    return new Response(
      JSON.stringify({
        message: err.message || "Server error",
      }),
      { status: 500 }
    );
  }
}

// ✅ GET ORDERS
export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    let clientId = null;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        clientId = decoded.userId;
      } catch (err) {
        console.error("JWT VERIFY ERROR:", err);
      }
    }

    let orders;

    // ✅ CLIENT ORDERS
    if (clientId) {
      orders = await Order.find({ clientId })
        .populate("clientId", "name email")
        .populate("adminId", "name email")
        .sort({ createdAt: -1 });
    } else {
      // ✅ ADMIN ALL ORDERS
      orders = await Order.find()
        .populate("clientId", "name email")
        .populate("adminId", "name email")
        .sort({ createdAt: -1 });
    }

    return new Response(JSON.stringify(orders), {
      status: 200,
    });
  } catch (err) {
    console.error("GET /api/orders Error:", err);

    return new Response(
      JSON.stringify({
        message: err.message || "Server error",
      }),
      { status: 500 }
    );
  }
}