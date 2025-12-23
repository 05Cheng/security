import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

/* 註冊（防 SQLi：參數化） */
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, hash, "user"],
    err => {
      if (err) return res.status(400).json({ message: "User exists" });
      res.json({ message: "Registered" });
    }
  );
});

/* 登入 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, user) => {
      if (!user) return res.status(401).json({ message: "Invalid" });

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );

      res.json({ token });
    }
  );
});

export default router;
