import cloudinary from "../config/cloudinary.js";
import PodcastModel from "../models/Podcast.js";
import UserModel from '../models/userModel.js';

const cloudinaryUpload = (fileBuffer, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const uploadPodcast = async (req, res) => {
  try {
    const { title, author } = req.body;
    console.log(req);
    if (!title || !author || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        message: "All fields are required, including audio and image.",
      });
    }

    const audioFile = req.files.audioFile[0];
    const imageFile = req.files.imageFile[0];

    const audioResult = await cloudinaryUpload(audioFile.buffer, "auto");
    const imageResult = await cloudinaryUpload(imageFile.buffer, "image");

    const newPodcast = {
      title,
      author,
      audioUrl: audioResult.secure_url,
      imageUrl: imageResult.secure_url,
    };

    const podcast = await PodcastModel.create(newPodcast);

    req.user.createdPodcasts.push(podcast._id);
    await req.user.save();

    res.status(201).json({ message: "Podcast uploaded successfully", podcast });
  } catch (error) {
    console.error("Error in uploading podcast:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getPodCast = async (req, res) => {
  try {
    const data = await PodcastModel.find({});
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// export const incrementViews = async (req, res) => {
//   const { podcastId } = req.params;

//   try {
//     const podcast = await PodcastModel.findById(podcastId);
//     if (!podcast) {
//       return res.status(404).json({ message: "Podcast not found" });
//     }

//     podcast.views += 1;
//     await podcast.save();

//     res.status(200).json({ message: "View count updated", views: podcast.views });
//   } catch (error) {
//     console.error("Error updating views:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const toggleLike = async (req, res) => {
  const { podcastId } = req.params;

  try {
    const podcast = await PodcastModel.findById(podcastId);

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    const username = req.user.name;
    const userId = req.user._id;

    if (!podcast.likedBy) {
      podcast.likedBy = [];
    }

    // Toggle like status
    if (podcast.likedBy.includes(username.toString())) {
      podcast.likes -= 1;
      podcast.likedBy = podcast.likedBy.filter(
        (id) => id !== username.toString()
      );

      req.user.likedPodcasts = req.user.likedPodcasts.filter(
        (id) => id.toString() !== podcastId
      );
    } else {
      podcast.likes += 1;
      podcast.likedBy.push(username.toString());

      req.user.likedPodcasts.push(podcastId);
    }

    await podcast.save();
    await req.user.save();

    res.status(200).json({
      message: "Like status updated",
      likes: podcast.likes,
      likedBy: podcast.likedBy,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLiked = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the podcast by Object ID
    const podcastId = "6700e9fa5dd3c0525e842273"; // Ensure this is a valid ObjectId
    const podcast = await PodcastModel.findById(podcastId);

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    res.json(podcast);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const addToPlaylist = async (req, res) => {
  const { podcastId } = req.params;
  const userId = req.user._id;

  try {
    const podcast = await PodcastModel.findById(podcastId);
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.playlist.includes(podcastId)) {
      user.playlist.push(podcastId);
      await user.save();
      return res.status(200).json({ message: "Podcast added to playlist" });
    } else {
      return res.status(400).json({ message: "Podcast already in playlist" });
    }
  } catch (error) {
    console.error("Error adding to playlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};