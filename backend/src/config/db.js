import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load .env explicitly (from project root)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Alias MONGO_URI → MONGODB_URI for compatibility
if (process.env.MONGO_URI && !process.env.MONGODB_URI) {
  process.env.MONGODB_URI = process.env.MONGO_URI;
}

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not set in environment (see .env)");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
