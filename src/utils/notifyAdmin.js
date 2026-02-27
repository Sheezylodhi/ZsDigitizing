import connectDB from "@/lib/db";
import Notification from "@/lib/models/Notification";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";

export default async function notifyAdmin(clientId, orderId) {
  try {
    await connectDB();

    const client = await User.findById(clientId);
    if (!client) throw new Error("Client not found");

    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    // 🔥 admin user find karo
    const admin = await User.findOne({ role: "admin" });
    if (!admin) throw new Error("Admin not found");

    const orderRef = `${order.orderType} - ${order.serialNumber}`;

    // ✅ SAVE ADMIN NOTIFICATION
    await Notification.create({
      userId: admin._id,
      type: "client_order_created",
      title: "New Client Order",
      message: `${client.name} created order #${orderRef}`,
      link: `/admin/orders/${order._id}`,
    });

    console.log("✅ Admin notified:", admin.email);

  } catch (err) {
    console.error("notifyAdmin Error:", err);
  }
}