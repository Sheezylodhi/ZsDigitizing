import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  uploadedAt: { type: Date, default: Date.now }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  title: { type: String, required: true },
  description: { type: String },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },

  // ✅ ADMIN FILES (unchanged)
  files: [FileSchema],

  // ✅ NEW CLIENT FILES FIELD
  clientFile: [FileSchema],

  note: String,
  submittedAt: Date,

  turnaround: {
    type: String,
    enum: ["Rush 6 Hours", "12 Hours", "24 Hours"],
    default: "24 Hours",
  },

  orderType: {
    type: String,
    enum: ["Digitizing PPO", "Vector PPV", "Patches PO"],
    required: true,
  },

  serialNumber: { type: String, required: true, unique: true },

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);