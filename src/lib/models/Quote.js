import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  originalName: String,   // client file ka original name
  cloudinaryUrl: String,  // Cloudinary direct URL
});

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
    fileNameArray: [FileSchema], // must match API exactly
  },
  { timestamps: true }
);

export const Quote = mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);