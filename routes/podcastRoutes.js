// import express from 'express';
// import { uploadPodcast, getPodcasts, likePodcast, getUserBoard } from '../controllers/podcastController.js';
// import upload from '../uploads/multerConfig.js';
// // import authMiddleware from '../middleware/authMiddleware.js';

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });

//   const upload = multer({ storage });

// router.post('/upload', upload.single('audioFile'), uploadPodcast);

// export default router;

import express from "express";
import upload from "../config/multer.js";
import { getPodCast, uploadPodcast } from "../controllers/podcastController.js";

const router = express.Router();

router.post("/upload", upload.fields([
    { name: "audioFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]), uploadPodcast);

router.get("/data", getPodCast);

export default router;
