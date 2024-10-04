import cloudinary from "../config/cloudinary.js";
import PodcastModel from "../models/Podcast.js";

 const cloudinaryUploadAudio = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, 
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
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
  console.log("File Upload Data:", req.file); 

   if (req.file && req.file.buffer) {
    console.log("Buffer size:", req.file.buffer.length);  
  } else {
    console.log("No file buffer found."); 
    return res.status(400).json({ message: "No file uploaded." });
  }

  const { title, author } = req.body;

   if (!title || !author || !req.file) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    console.log(req.body); 
    console.log(req.file);  

     const result = await cloudinaryUploadAudio(req.file.buffer);
    
     if (!result || !result.secure_url) {
      throw new Error("Failed to get secure URL from Cloudinary response.");
    }

     const newPodcast = {
      title: title,
      author: author,
      audioUrl: result.secure_url,
    };
    
     await PodcastModel.create(newPodcast);
    res.status(201).json({ message: "Success", podcast: newPodcast });
  } catch (error) {
    console.error("Error in uploading podcast:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getPodCast = async (req, res) => {

    const data = await PodcastModel.find({});

    res.send({"data":data});
}