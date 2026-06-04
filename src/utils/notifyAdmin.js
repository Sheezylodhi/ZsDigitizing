import connectDB from "@/lib/db";
import Notification from "@/lib/models/Notification";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";

export default async function notifyAdmin(clientId, type, id) {
  try {
    await connectDB();

    const client = await User.findById(clientId);
    if (!client) throw new Error("Client not found");

    // Admin ki ID nikaalna
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.error("Admin user not found in DB");
      return;
    }

    let message = "";
    let title = "";
    let link = "";

    if (type === "client_order_created") {
      const order = await Order.findById(id);
      if (order) {
        title = "New Client Order";
        message = `${client.name} created order #${order.orderType} - ${order.serialNumber}`;
        link = `/admin/orders/${order._id}`;
      }
    } else if (type === "chat_message") {
      title = "New Message from Client";
      message = `${client.name} sent a new message.`;
      link = `/admin/inbox`;
    }

    // Save Notification for Admin
    await Notification.create({
      userId: admin._id, // Zaroori: Admin ki ID save honi chahiye
      type,
      title,
      message: message,
      Notifymessage: message, // Schema ke hisaab se
      link,
      read: false
    });

    console.log(`✅ Admin notified successfully`);
  } catch (err) {
    console.error("notifyAdmin Error:", err);
  }
}