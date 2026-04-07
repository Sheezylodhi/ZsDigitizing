import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  from: { type: String, enum: ["admin", "client"], required: true },
  message: { type: String, default: "" }, // message optional if file
  attachments: { type: [String], default: [] }, // file URLs
  seenByAdmin: { type: Boolean, default: false },
  seenByClient: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [MessageSchema],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);