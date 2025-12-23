import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();


const users = [];


router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password too short" });
  }

  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  users.push({
    username,
    passwordHash: hash,
    role: "user"
  });

  res.json({
    message: "Register success",
    username
  });
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ mess