import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true }, // Image ka URL (Cloudinary ya S3 use karein)
  category: { type: String, required: true },
  desc: { type: String },
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);