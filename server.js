import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import podcastRoutes from "./routes/podcastRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.get("/" ,async (req,res)=>{
    console.log("atif");
    res.send({"message":"hello"});
})

app.use('/api', userRoutes);

app.use("/api/podcasts", podcastRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
