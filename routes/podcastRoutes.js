import express from "express";
import upload from "../config/multer.js";
import { getPodCast, uploadPodcast, toggleLike } from "../controllers/podcastController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getLiked } from "../controllers/podcastController.js";
import { addToPlaylist } from "../controllers/podcastController.js";
const router = express.Router();

router.post("/upload", authMiddleware, upload.fields([
    { name: "audioFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]), uploadPodcast);

router.get("/data", getPodCast);

router.patch('/likes/:podcastId', authMiddleware , toggleLike);

router.get('/Podcast/:id', getLiked);

router.patch('/add-to-playlist/:podcastId', authMiddleware, addToPlaylist);

export default router;