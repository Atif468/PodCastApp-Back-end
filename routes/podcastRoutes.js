import express from "express";
import upload from "../config/multer.js";
import { getPodCast, uploadPodcast, toggleLike } from "../controllers/podcastController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", upload.fields([
    { name: "audioFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]), uploadPodcast);

router.get("/data", getPodCast);

router.patch('/likes/:podcastId', authMiddleware , toggleLike);


// router.put("/views/:podcastId/views", incrementViews);
export default router;
