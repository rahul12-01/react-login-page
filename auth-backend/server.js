require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/simpleAuthDB";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Consider adding password hashing later
});

const User = mongoose.model("User", UserSchema);

// 1️⃣ Register User (Signup)
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "❌ User already exists" });
    }

    // Save new user
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "✅ User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 2️⃣ Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "❌ Invalid email or password" });
    }

    res.json({ message: "✅ Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
