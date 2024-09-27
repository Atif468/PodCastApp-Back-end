// routes/userRoutes.js
import express from "express";
import User from "../models/userModel.js"; // Adjust the path if necessary

const router = express.Router();

// POST /api/signup

router.get("/login", async (req, res) => {
  console.log("get request come");
  res.send({ message: "hello" });

  const isuser = await User.find({ email: req.body.email });

  if (!isuser) {
    res.status(401).json({ error: "user not found" });
  }

  res.status(201).json({ error: "login successful" });
});
// router.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;
//     console.log("saiyam");
//     console.log(req.body);
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     try {
//         console.log({ name, email, password });
//         const newUser = new User.create({ name, email, password });
//         await newUser.save();
//         res.status(201).json({ message: "User created successfully." });
//     } catch (error) {
//         // Handle possible errors (e.g., e9\mail already exists)
//         res.status(500).json({ message: "Error creating user." });
//     }
// });
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Request received");
  console.log(req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newUser = await User.create({ name, email, password });

    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: "Error creating user." });
  }
});

export default router;
