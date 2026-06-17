console.log("🔥🔥🔥 AUTH ROUTES LOADED - NEW VERSION 🔥🔥🔥");
const express = require("express");
const router = express.Router();
console.log("RESEND KEY:", process.env.RESEND_API_KEY);
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("🔥 AUTH ROUTES LOADED");

// OTP memory store
const otpStore = {};
router.get("/test", (req, res) => {
  res.json({
    message: "AUTH ROUTES NEW VERSION"
  });
});


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("EMAIL:", email);

    const existingUser = await User.findOne({ email });

    console.log("EXISTING USER:", existingUser);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("NEW USER CREATED:", user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= SEND OTP ================= */
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    };

    console.log("Generated OTP:", otp);

    const result = await resend.emails.send({
      from: "Secure Task App <onboarding@resend.dev>",
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("RESEND RESULT:", result);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ================= VERIFY OTP ================= */
router.post("/verify-otp", (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore[email];

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (Date.now() > record.expires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (parseInt(otp) !== record.otp) {
      return res.status(400).json({ message: "Wrong OTP" });
    }

    res.json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= RESET PASSWORD ================= */
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    delete otpStore[email];

    await resend.emails.send({
      from: "Secure Task App <onboarding@resend.dev>",
      to: email,
      subject: "Password Changed Successfully",
      html: `
        <p>Your password was changed successfully at:</p>
        <h3>${new Date().toLocaleString()}</h3>
      `,
    });

    res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
console.log("ALL USERS ROUTE ADDED");

router.get("/all-users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = router;
