import connectDB from "@/lib/db";
import Notification from "@/lib/models/Notification";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";
import nodemailer from "nodemailer";

export default async function notifyClient(clientId, type, id) {
  try {
    await connectDB();

    const client = await User.findById(clientId);
    if (!client) throw new Error("Client not found");

    let title = "";
    let subject = "";
    let message = "";      // HTML for email
    let Notifymessage = ""; // Plain text for dashboard
    let link = "";

    // Fetch order only if needed
    let order = null;
    if (type === "order_created" || type === "order_submitted") {
      order = await Order.findById(id);
      if (!order) throw new Error("Order not found");
      link = `/client-portal/orders/${order._id}`;
    }

    // ========================
    // ORDER CREATED
    // ========================
    if (type === "order_created") {
      title = "New Order Created";
      subject = "New Order Created";
      message = `Your order #${order.orderType} - ${order.serialNumber} has been created successfully.`;
      Notifymessage = message; // same for dashboard
    }

    // ========================
    // ORDER SUBMITTED (DELIVERED)
    // ========================
    if (type === "order_submitted") {
      title = "Order Delivered";
      subject = "Your Order Has Been Delivered";

      // Dashboard message (plain text)
      Notifymessage = `Your order #${order.orderType} - ${order.serialNumber} has been delivered.`;

      // Email message (HTML + files)
      let filesHTML = "";
      if (order.files && order.files.length > 0) {
        // ZIP link
        const publicIds = order.files.map(f => {
          const urlParts = f.fileUrl.split("/upload/")[1];
          const withoutVersion = urlParts.replace(/^v\d+\//, "");
          return withoutVersion.replace(/\.[^/.]+$/, "");
        });

        const zipUrl = `https://res.cloudinary.com/${process.env.CLOUD_NAME}/raw/download?${publicIds
          .map(id => `public_ids[]=${id}`)
          .join("&")}&fl_attachment=order_${order.serialNumber}.zip`;

        filesHTML += `
          <div style="margin:20px 0; text-align:center;">
            <a href="${zipUrl}" 
               style="background:#16a34a; color:#fff; padding:12px 25px; text-decoration:none; border-radius:6px; display:inline-block; font-size:14px; font-weight:600;">
              Download All Files (ZIP)
            </a>
          </div>
        `;

        filesHTML += order.files.map(file => {
          const downloadUrl =
            file.fileUrl.replace("/upload/", `/upload/fl_attachment/`) +
            `?filename=${encodeURIComponent(file.fileName)}`;
          return `
            <div style="margin:10px 0; text-align:center;">
              <a href="${downloadUrl}" 
                 style="background:#0e2c1c; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block; font-size:14px;">
                Download ${file.fileName}
              </a>
            </div>
          `;
        }).join("");
      }

      message = `
        Your order #${order.orderType} - ${order.serialNumber} has been delivered.<br/><br/>
        You can download your files directly using the buttons below:<br/>
        ${filesHTML}
      `;

      // Send email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"ZS Digitizing" <${process.env.SMTP_USER}>`,
        to: client.email,
        subject,
        html: `<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.05);">
            <div style="background:#0e2c1c; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px;">ZS Digitizing</h1>
              <p style="color:#cbd5e1; margin:5px 0 0; font-size:12px;">Professional Embroidery Digitizing Services</p>
            </div>
            <div style="padding:30px;">
              <h2 style="color:#0e2c1c; margin-bottom:10px;">${title}</h2>
              <p style="color:#444; font-size:14px; line-height:1.6;">${message}</p>
              <p style="color:#444; font-size:14px; margin-top:20px;">Thank you for choosing <strong>ZS Digitizing</strong>. We truly appreciate your trust in our services.</p>
              <div style="text-align:center; margin:30px 0;">
                <a href="${process.env.SITE_URL}${link}" style="background:#0e2c1c; color:#ffffff; padding:12px 25px; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600;">View Order</a>
              </div>
              <p style="color:#777; font-size:13px;">If you have any questions, feel free to contact our support team anytime.</p>
            </div>
            <div style="background:#f1f5f9; padding:20px; text-align:center; font-size:12px; color:#666;">
              <p style="margin:0;">© ${new Date().getFullYear()} ZS Digitizing. All rights reserved.</p>
              <p style="margin:5px 0;">Karachi, Pakistan</p>
              <p style="margin:5px 0;">Need help? Contact us anytime.</p>
            </div>
          </div>
        </div>`,
      });
    }

    // ========================
    // SAVE DASHBOARD NOTIFICATION
    // ========================
    await Notification.create({
      userId: clientId,
      type,
      title,
      message: Notifymessage, // dashboard sees plain text
      Notifymessage,
      link,
    });

    console.log(`✅ Notification sent for type=${type} to ${client.email}`);
  } catch (err) {
    console.error("notifyClient Error:", err);
  }
}