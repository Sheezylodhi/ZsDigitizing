  import mongoose from "mongoose";

  const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true }, // 'order_created' | 'order_submitted'
    message: { type: String, required: true },
    link: { type: String }, // order detail page
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    title: { type: String },
  });

  export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
