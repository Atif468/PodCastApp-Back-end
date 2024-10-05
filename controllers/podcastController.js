import cloudinary from "../config/cloudinary.js";
import PodcastModel from "../models/Podcast.js";

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
    console.log(req.body);
    console.log("Received files:", req.files);

    if (!title || !author || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        message: "All fields are required, including audio and image.",
      });
    }

    const audioFile = req.files.audioFile[0];
    const imageFile = req.files.imageFile[0];

    if (audioFile && audioFile.buffer) {
      console.log("Audio file buffer size:", audioFile.buffer.length);
    } else {
      console.error("Audio file buffer is missing");
      return res.status(400).json({ message: "Audio file is missing." });
    }

    if (imageFile && imageFile.buffer) {
      console.log("Image file buffer size:", imageFile.buffer.length);
    } else {
      console.error("Image file buffer is missing");
      return res.status(400).json({ message: "Image file is missing." });
    }

    const audioResult = await cloudinaryUpload(audioFile.buffer, "auto");
    console.log("Audio upload result:", audioResult);

    const imageResult = await cloudinaryUpload(imageFile.buffer, "image");
    console.log("Image upload result:", imageResult);

    if (!audioResult.secure_url || !imageResult.secure_url) {
      throw new Error("Failed to get secure URLs from Cloudinary response.");
    }

    const newPodcast = {
      title: title,
      author: author,
      audioUrl: audioResult.secure_url,
      imageUrl: imageResult.secure_url,
    };

    await PodcastModel.create(newPodcast);

    res
      .status(201)
      .json({ message: "Podcast uploaded successfully", podcast: newPodcast });
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
