import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  audioUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },
  views: { type: Number, default: 0 },
});

const PodcastModel = mongoose.model("Podcast", PodcastSchema);
export default PodcastModel;
