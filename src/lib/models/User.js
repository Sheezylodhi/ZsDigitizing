import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin","client"], default: "client" },
  createdAt: { type: Date, default: Date.now },
  lastLoginIP: { type: String, default: "" },
lastLoginDevice: { type: String, default: "" },
resetToken: { type: String },
resetTokenExpiry: { type: Date },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
