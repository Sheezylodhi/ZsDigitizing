import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


// ✅ GET SINGLE ORDER (DETAIL PAGE)
export async function GET(req, context) {
  try {
    await connectDB();

    // ✅ NEXT 15 STYLE
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ message: "Order ID missing" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid order id" }, { status: 400 });
    }

    const order = await Order.findById(id)
      .populate("clientId", "name email")
      .populate("adminId", "name email");

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...order.toObject(),
      files: order.files || [],
      clientFile: order.clientFile || []
    });

  } catch (err) {
    console.error("GET ORDER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


// ✅ UPDATE STATUS
export async function PATCH(req, context) {
  try {
    await connectDB();

    // ✅ SAME STRUCTURE
    const { id } = await context.params;
    const body = await req.json();
    const { status } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Order ID missing" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid order id" },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { message: "Status required" },
        { status: 400 }
      );
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("clientId", "name email")
      .populate("adminId", "name email");

    if (!updated) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ also safe files return
    const safeUpdated = {
      ...updated.toObject(),
      files: updated.files || [],
       clientFile: updated.clientFile || []
    };

    return NextResponse.json(safeUpdated);

  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


