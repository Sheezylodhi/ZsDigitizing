import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    email: String,
    phone: String,
    website: String,
    deadline: String,
    type: String,
    message: String,
    fileUrl: String,
  },
  { timestamps: true }
);

export const Quote = mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);
