import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { getPasswordResetTemplate } from "../utils/emailTemplate.js";

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

    // Remove manual hashing, let model middleware handle it
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

    console.log("Entered password:", password); // Plain password from request
    console.log("Stored password hash:", user.password); // Hashed password from DB

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is password valid?", isPasswordValid); // Should log true if match

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

export const ForgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: getPasswordResetTemplate(resetUrl),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Password reset link sent to email",
      success: true,
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Error processing password reset" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    // Parse the request body
    let data = req.body;
    console.log('Original request body:', data); // Debug log

    // Handle nested body structure if present
    if (data.body && typeof data.body === 'string') {
      try {
        data = JSON.parse(data.body);
      } catch (e) {
        console.error('Body parsing error:', e);
        return res.status(400).json({ message: "Invalid request format" });
      }
    }

    const { token, password } = data;
    console.log('Processing token:', token);

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    // Verify JWT token first
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Find user by ID from decoded token
    const user = await User.findById(decoded.id);
    console.log('Found user by ID:', user?._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify reset token matches
    if (user.resetToken !== token || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    // Update password
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();
    console.log('Password updated successfully');

    res.status(200).json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Error resetting password" });
  }
};

export const GetUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
