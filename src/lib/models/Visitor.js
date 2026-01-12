import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  ip: { type: String },
  visitedAt: { type: Date, default: Date.now },
});

export const Visitor = mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
