import connectDB from "@/lib/db";
import Notification from "@/lib/models/Notification";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";
import nodemailer from "nodemailer";

export default async function notifyClient(clientId, type, orderId) {
  try {
    await connectDB();

    const client = await User.findById(clientId);
    if (!client) throw new Error("Client not found");

    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    let message = "";
    let subject = "";
    let title = "";

    // ✅ Build message using orderType + serialNumber
    const orderRef = `${order.orderType} - ${order.serialNumber}`;

    if (type === "order_created") {
      title = "New Order Created";
      subject = "New Order Created";
      message = `Your order #${orderRef} has been created successfully.`;
    }

    if (type === "order_submitted") {
      title = "Order Completed";
      subject = "Order Completed";
      message = `Your order #${orderRef} has been completed and files are ready.`;
    }

    const link = `/client-portal/orders/${order._id}`;

    // ✅ SAVE NOTIFICATION
    await Notification.create({
      userId: clientId,
      type,
      title,
      message,
      link,
    });

    // ✅ EMAIL
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ZS Digitizing" <${process.env.SMTP_USER}>`,
      to: client.email,
      subject,
      html: `
        <p>${message}</p>
        <p>
          <a href="${process.env.SITE_URL}${link}">
            View Order
          </a>
        </p>
      `,
    });

    console.log(`✅ Notification sent to ${client.email}: ${message}`);

  } catch (err) {
    console.error("notifyClient Error:", err);
  }
}