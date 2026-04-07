import mongoose from "mongoose";

const LoginHistorySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  ip: {
    type: String,
  },

  device: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.models.LoginHistory ||
mongoose.model("LoginHistory", LoginHistorySchema);