import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

const PORT = 3002;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("Server started successfully");
  console.log(` Running on http://localhost:${PORT}`);
  console.log("=================================");
});
