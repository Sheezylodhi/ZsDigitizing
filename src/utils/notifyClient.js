import connectDB from "@/lib/db";
import Notification from "@/lib/models/Notification";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";

export default async function notifyClient(clientId, type, id) {
  try {
    await connectDB();

    const client = await User.findById(clientId);
    if (!client) throw new Error("Client not found");

    let title = "";
    let subject = "";
    let message = "";
    let Notifymessage = "";
    let link = "";

    // Fetch order if needed
    let order = null;
    if (type === "order_created" || type === "order_submitted") {
      order = await Order.findById(id);
      if (!order) throw new Error("Order not found");
      link = `/client-portal/orders/${order._id}`;
    }

    // ========================
    // ORDER CREATED or SUBMITTED
    // ========================
    if (type === "order_created" || type === "order_submitted") {
      if (type === "order_created") {
        title = "New Order Created";
        subject = "New Order Created";
        Notifymessage = `Your order #${order.orderType} - ${order.serialNumber} has been created successfully.`;
      } else if (type === "order_submitted") {
        title = "Order Delivered";
        subject = "Your Order Has Been Delivered";
        Notifymessage = `Your order #${order.orderType} - ${order.serialNumber} has been delivered.`;
      }

      // Files HTML (for download buttons)
  let filesHTML = "";
      if (order.files && order.files.length > 0) {
// ✅ notifyClient.js mein filesHTML wala part isse replace karein
filesHTML = order.files
  .map((file) => {
    let downloadUrl = file.fileUrl;

    // Cloudinary raw files ke liye transformation link break kar deti hai
    // Is liye hum direct link use karenge aur browser ko 'download' attribute se handle karenge
    if (downloadUrl.includes('cloudinary.com')) {
       // Kuch cases mein Cloudinary HTTPS ke bajaye HTTP deta hai, usay fix karein
       downloadUrl = downloadUrl.replace('http://', 'https://');
    }

    return `
      <div style="margin:10px 0; text-align:center;">
        <a href="${downloadUrl}" 
           download="${file.fileName}" 
           target="_blank"
           style="background:#0e2c1c; color:#fff; padding:12px 25px; text-decoration:none; border-radius:5px; display:inline-block; font-size:14px; font-weight:bold;">
           Download: ${file.fileName}
        </a>
        <p style="font-size:11px; color:#666; margin-top:5px;">File: ${file.fileName}</p>
      </div>
    `;
  })
  .join("");
      }

      message = `
       <div style="font-family:sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  
  <h2 style="color: #0e2c1c;">
    ${type === "order_created" ? "Thank You for Your Order" : "Your Order is Ready for Download"}
  </h2>

  <p>Hello,</p>

  ${type === "order_created"
    ? `<p>
        Thank you for your order.<br>
        Your order <b>${order.serialNumber}</b> has been successfully received and is now being processed.<br>
        Our team has started working on your design. Once completed, the files will be made available for download in your client portal.
      </p>`
    : `<p>
        Your order <b>${order.serialNumber}</b> has been successfully completed and is now ready for download.<br>
        You can access your files directly using the buttons below:
      </p>`}

  <div style="margin:20px 0; overflow: visible;">
    ${filesHTML}
  </div>

  <div style="margin:20px 0;">
    <a href="${process.env.SITE_URL}${link}" 
       style="background: #0e2c1c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; display:inline-block;">
      View Order
    </a>
  </div>

  <p style="font-size: 13px; color: #555;">
    ${type === "order_created"
      ? "If you have any questions or need assistance, please feel free to contact our support team at any time."
      : "Thank you for choosing ZS Digitizing. We truly appreciate your trust and look forward to assisting you with your future projects. If you have any questions or need assistance, our support team is always happy to help."}
  </p>

  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #555; clear: both;">
    <div style="display: flex; align-items: flex-start;">
      <div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; margin-right: 15px; border: 1px solid #eee; flex-shrink: 0;">
        <img src="https://www.zsdigitizing.com/Logoicon.png" alt="ZS Digitizing" width="60" height="60" style="display: block; width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
      </div>
      <div style="line-height: 1.4;">
        <div><b>ZS Digitizing</b></div>
        <div style="font-size: 13px; color: #777;">Client Support Team</div>
        <div style="margin: 5px 0; font-size: 13px;">
          <a href="mailto:Info@zsdigitizing.com" style="color: #0e2c1c; text-decoration: none;">Info@zsdigitizing.com</a> | 
          <a href="https://www.zsdigitizing.com" style="color: #0e2c1c; text-decoration: none;">www.zsdigitizing.com</a>
        </div>
        <div style="font-size: 12px; color: #888;">Embroidery Digitizing | Vector Art | Custom Patches</div>
      </div>
    </div>
  </div>
</div>
      `;
    }

    // ========================
    // SEND EMAIL
    // ========================
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"ZS Digitizing" <${process.env.SMTP_USER}>`,
        to: client.email,
        subject,
        html: `<p>${message}</p>`,
      });

      console.log(`📧 Email sent for type=${type} to ${client.email}`);
    } catch (e) {
      console.error("❌ Failed to send email:", e);
    }

    // ========================
    // SAVE DASHBOARD NOTIFICATION
    // ========================
    await Notification.create({
      userId: clientId,
      type,
      title,
      message: Notifymessage,
      Notifymessage,
      link,
    });

    console.log(`✅ Notification saved for type=${type} to ${client.email}`);
  } catch (err) {
    console.error("notifyClient Error:", err);
  }
}