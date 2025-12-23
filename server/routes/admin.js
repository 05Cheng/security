import express from "express";
import { auth } from "../middleware/auth.js";
import { role } from "../middleware/role.js";

const router = express.Router();

router.get("/secret", auth, role("admin"), (req, res) => {
  res.json({ secret: "Admin only data" });
});

export default router;
