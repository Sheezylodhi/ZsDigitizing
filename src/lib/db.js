import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connection = {};

async function connectDB() {
  if (connection.isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not defined in .env");
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "myzsdigitize",
  });

  connection.isConnected = db.connections[0].readyState;
  console.log("✅ MongoDB Connected");
}

export default connectDB;
