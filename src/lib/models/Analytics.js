import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true }, // user IP for unique visitor
    userAgent: { type: String }, // browser/device info
    page: { type: String }, // page visited e.g. "/quote"
    referrer: { type: String }, // from where they came e.g. "google"
  },
  { timestamps: true }
);

export const Analytics =
  mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema);
