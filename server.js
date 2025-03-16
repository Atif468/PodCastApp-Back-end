import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import podcastRoutes from "./routes/podcastRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
import authMiddleware from "./middleware/authMiddleware.js";
dotenv.config();

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/podcasts", podcastRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
