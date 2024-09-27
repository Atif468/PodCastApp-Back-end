import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
},
  description: { 
    type: String
},
  audioUrl: {
    type: String,
    required: true
},
  likes: {
    type: Number,
    default: 0
},
  views: {
    type: Number,
    default: 0
},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
}, { timestamps: true });

export default mongoose.model('Podcast', podcastSchema);