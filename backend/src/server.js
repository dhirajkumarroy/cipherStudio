// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import authRoutes from "./routes/authRoutes.js"; // Preserved from your original file
// import errorHandler from "./middleware/errorHandler.js";

// // Load environment variables from the root .env file
// dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// // Create an alias for MONGO_URI for consistency
// if (process.env.MONGO_URI && !process.env.MONGODB_URI) {
//   process.env.MONGODB_URI = process.env.MONGO_URI;
// }

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "2mb" })); // Increased JSON payload limit
// app.use(express.urlencoded({ extended: true })); // Added for parsing URL-encoded bodies
// if (process.env.NODE_ENV !== "production") {
//   app.use(morgan("dev"));
// }

// // Health check route
// app.get("/", (req, res) => {
//   res.json({ ok: true, message: "CipherStudio backend running 🚀" });
// });

// // API routes
// app.use("/api/auth", authRoutes); // Preserved from your original file
// app.use("/api/projects", projectRoutes);

// // Global error handler middleware
// app.use(errorHandler);

// // Asynchronous function to start the server
// const start = async () => {
//   // Check for the MongoDB connection string before starting
//   if (!process.env.MONGODB_URI) {
//     console.error("❌ FATAL: MongoDB URI missing. Set MONGO_URI in .env file.");
//     process.exit(1);
//   }

//   try {
//     // Wait for the database connection to be established
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`✅ Server running at http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Server startup failed:", err.message);
//     process.exit(1);
//   }
// };

// // Execute the start function
// start();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// MongoDB alias
if (process.env.MONGO_URI && !process.env.MONGODB_URI) {
  process.env.MONGODB_URI = process.env.MONGO_URI;
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend dev server
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "CipherStudio backend running 🚀" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// Global error handler
app.use(errorHandler);

// Start server
const start = async () => {
  if (!process.env.MONGODB_URI) {
    console.error(
      "❌ FATAL: MongoDB URI missing. Set MONGO_URI in .env file."
    );
    process.exit(1);
  }

  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err.message);
    process.exit(1);
  }
};

start();
