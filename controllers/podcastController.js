import cloudinary from "cloudinary";
import Podcastmodel from "../models/Podcast.js";

cloudinary.v2.config({
  cloud_name: "dc1uzsmk2",
  api_key: "227675225885688",
  api_secret: "zlvmXJ_mSGhg3_eYiBc2-kHKIQY",
});

const cloudinaryUploadAudio = async (fileBuffer) => {
  try {
    const data = await cloudinary.v2.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          throw new Error("Internal Server Error (cloudinary)");
        }
        return result;
      }
    ).end(fileBuffer);
  } catch (error) {
    console.log("Cloudinary Error:", error);
    throw new Error("Internal Server Error (cloudinary)");
  }
};


export const uploadPodcast = async (req, res) => {
  console.log("File Upload Data:", req.file); // Check what is being uploaded

  const { title, author } = req.body;

  if (!title || !author || !req.file) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const result = await cloudinaryUploadAudio(req.file.buffer);
    if (!result || !result.secure_url) {
      throw new Error("Failed to get secure URL from Cloudinary response.");
    }

    const newPodcast = {
      title: title,
      author: author,
      audioUrl: result.secure_url,
    };
    
    await Podcastmodel.create(newPodcast);
    res.status(201).json({ message: "Audio file uploaded and saved in the database.", podcast: newPodcast });
  } catch (error) {
    console.error("Error in uploading podcast:", error);
    res.status(500).json({ message: "Server error." });
  }
};
