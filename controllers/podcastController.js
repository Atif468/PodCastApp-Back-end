import Podcast from '../models/Podcast.js';
import User from '../models/userModel.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// Upload Podcast
export const uploadPodcast = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',
    });

    const newPodcast = new Podcast({
      title: req.body.title,
      description: req.body.description,
      audioUrl: result.secure_url,
      createdBy: req.user._id,
    });

    const podcast = await newPodcast.save();
    fs.unlinkSync(req.file.path); // Remove file from local uploads after upload
    res.status(201).json(podcast);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload podcast' });
  }
};

// Get Podcasts
export const getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().populate('createdBy', 'username');
    res.status(200).json(podcasts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch podcasts' });
  }
};

// Like a Podcast
export const likePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ error: 'Podcast not found' });

    podcast.likes += 1;
    await podcast.save();

    const user = await User.findById(req.user._id);
    user.likedPodcasts.push(podcast._id);
    await user.save();

    res.status(200).json({ message: 'Podcast liked' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to like podcast' });
  }
};

// Get User Info
export const getUserBoard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('likedPodcasts')
      .populate('createdPodcasts')
      .populate('playlist');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
};
