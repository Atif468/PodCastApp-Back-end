import mongoose from "mongoose";

const connectDB = () => {

    mongoose
        .connect("mongodb://127.0.0.1:27017", { dbName: "PodcastApp" })
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.error("Error connecting to DB:", error);
        });

}

export default connectDB;