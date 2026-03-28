const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "ScholarLens API is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error"
  });
});

module.exports = app;
