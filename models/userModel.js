import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        likedPodcasts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Podcast"
        }],
        playlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Podcast"
        }],
        createdPodcasts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Podcast"
        }],
        resetToken: String,
        resetTokenExpires: Date,
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);


export default User;