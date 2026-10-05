import "dotenv/config";
import express from "express";
import { sql } from "./db/index.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "HRIS API is running",
  });
});

app.get("/api/health/db", async (req, res) => {
  try {
    const result = await sql`SELECT NOW()`;

    res.json({
      success: true,
      message: "Database connection successful",
      time: result[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});