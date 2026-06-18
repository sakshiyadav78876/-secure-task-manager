console.log("SAKSHI DEBUG SERVER 999");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// Connect DB
connectDB();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://secure-task-manager-iota.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
/* =========================
   HEALTH CHECK ROUTE
========================= */
app.get("/", (req, res) => {
  res.json({
    message: "SAKSHI SERVER 12345"
  });
});

/* =========================
   TEST CORS
========================= */
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS WORKING ✅" });
});


app.get("/hello", (req, res) => {
  res.json({
    message: "HELLO FROM SERVER"
  });
});
/* =========================
   ROUTES
========================= */

// AUTH ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

// TASK ROUTES
const taskRoutes = require("./routes/taskRoutes");

console.log("TASK ROUTES IMPORTED:", taskRoutes);

app.use("/api/tasks", taskRoutes);

/* =========================
   GLOBAL ERROR HANDLER
   (IMPORTANT FOR CLEAN DEBUGGING)
========================= */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});