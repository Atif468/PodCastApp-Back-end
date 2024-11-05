import mongoose from "mongoose";

const connectDB = () => {

    mongoose
        .connect("mongodb+srv://atif:atif123@podcast.9l8gq.mongodb.net/?retryWrites=true&w=majority&appName=podcast")
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.error("Error connecting to DB:", error);
        });

}

export default connectDB;