import connectDB from "@/lib/db";
import Notification from "@/lib/models/Notification";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";

export default async function notifyAdmin(clientId, type, id) {
  try {
    await connectDB();

    const client = await User.findById(clientId);
    if (!client) throw new Error("Client not found");

    const admin = await User.findOne({ role: "admin" });
    if (!admin) throw new Error("Admin not found");

    let message = "";
    let title = "";
    let link = "";

    if (type === "client_order_created") {
      // ✅ Order notification for admin
      const order = await Order.findById(id);
      if (!order) throw new Error("Order not found");

      const orderRef = `${order.orderType} - ${order.serialNumber}`;
      title = "New Client Order";
      message = `${client.name} created order #${orderRef}`;
      link = `/admin/orders/${order._id}`;

    } else if (type === "chat_message") {
      // ✅ Chat notification for admin
      title = "New Message from Client";
      message = `${client.name} sent you a message.`;
      link = `/admin/inbox`;
    }

    await Notification.create({
      userId: admin._id,
      type,
      title,
      message,
      link,
    });

    console.log(`✅ Admin notified: ${message}`);

  } catch (err) {
    console.error("notifyAdmin Error:", err);
  }
}