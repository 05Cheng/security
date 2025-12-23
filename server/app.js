import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.js";

const app = express();


app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());


app.get("/", (req, res) => {
  res.send("SERVER OK");
});


app.use("/auth", authRoutes);



const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("=================================");
  cons