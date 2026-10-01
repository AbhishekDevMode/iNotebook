const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

const signToken = (userId) =>
  jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/createuser  (no login required)
router.post(
  "/createuser",
  [
    body("name").trim().isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("email").trim().isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, error: "A user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken(user.id);
    res.status(201).json({ success: true, authtoken: token, authToken: token });
  })
);

// POST /api/auth/login  (no login required)
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password cannot be blank"),
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const ok = user && (await bcrypt.compare(password, user.password));
    // Same message for both cases so attackers can't tell which emails exist
    if (!ok) {
      return res.status(400).json({ success: false, error: "Invalid email or password" });
    }

    const token = signToken(user.id);
    res.json({ success: true, authtoken: token, authToken: token });
  })
);

// POST /api/auth/getuser  (login required)
router.post(
  "/getuser",
  fetchuser,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, user });
  })
);

module.exports = router;
