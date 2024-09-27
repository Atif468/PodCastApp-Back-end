import express from 'express';
import { uploadPodcast, getPodcasts, likePodcast, getUserBoard } from '../controllers/podcastController.js';
import upload from '../uploads/multerConfig.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('audio'), uploadPodcast);

router.get('/', getPodcasts);

router.post('/:id/like', authMiddleware, likePodcast);

router.get('/user', authMiddleware, getUserBoard);

export default router;
