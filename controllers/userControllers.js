import User from "../models/userModel.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password,
    });
    

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created successfully.", token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user." });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    console.log("Entered password:", password);  // Plain password from request
    console.log("Stored password hash:", user.password);  // Hashed password from DB

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is password valid?", isPasswordValid);  // Should log true if match

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};


export const GetUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};