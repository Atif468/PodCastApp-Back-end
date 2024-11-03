Podcast Platform Backend
This is the backend for the Podcast Platform, developed with Node.js, Express.js, MongoDB, and Cloudinary for media management. It provides RESTful APIs for user authentication, podcast uploads, playlist management, and podcast interactions (like, views, and playlists).

Table of Contents
Features
Technologies Used
Setup Instructions
Environment Variables
API Endpoints
User Authentication
Podcast Management
Playlist and Interactions
Models
Error Handling
Features
User Authentication: Sign-up, login, and token-based authentication.
Podcast Upload: Allows users to upload podcasts with audio and cover images.
Playlist Management: Add/remove podcasts to/from playlists.
Podcast Interactions: Toggle likes on podcasts.
User Information Retrieval: Get user information and liked podcasts.
Technologies Used
Node.js & Express.js for server and routing
MongoDB & Mongoose for database and data modeling
Cloudinary for media file management
JWT for secure token-based authentication
Bcrypt for password hashing
Setup Instructions
Clone the repository:

bash
Copy code
git clone <repository-link>
cd podcast-backend
Install dependencies:

bash
Copy code
npm install
Configure Environment Variables: Create a .env file in the root directory with the following variables:

plaintext
Copy code
JWT_SECRET=<your_jwt_secret>
MONGODB_URI=<your_mongodb_connection_string>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
Run the Server:

bash
Copy code
npm start
The server will start on http://localhost:8080.

Environment Variables
Set the following environment variables in your .env file:

Variable	Description
JWT_SECRET	Secret key for JWT token encryption
MONGODB_URI	MongoDB connection URI
CLOUDINARY_CLOUD_NAME	Cloudinary cloud name
CLOUDINARY_API_KEY	Cloudinary API key
CLOUDINARY_API_SECRET	Cloudinary API secret
API Endpoints
User Authentication
1. Sign Up
Endpoint: POST /auth/signup
Description: Register a new user.
Request:
json
Copy code
{
  "name": "string",
  "email": "string",
  "password": "string"
}
Response: Success message and JWT token.
2. Login
Endpoint: POST /auth/login
Description: Authenticate user and get a JWT token.
Request:
json
Copy code
{
  "email": "string",
  "password": "string"
}
Response: Success message and JWT token.
Podcast Management
1. Upload Podcast
Endpoint: POST /podcast/upload
Description: Allows authenticated users to upload a podcast with audio and cover image files.
Request: Form-data with title, author, audioFile, and imageFile.
Response: Success message with podcast details.
📌 Screenshot: Insert an image here showing the form-data for a podcast upload.

2. Get All Podcasts
Endpoint: GET /podcast
Description: Fetches a list of all podcasts.
Response: Array of podcast objects.
Playlist and Interactions
1. Add to Playlist
Endpoint: PATCH /playlist/add/:podcastId
Description: Adds a podcast to the user's playlist if not already added.
Response: Success message.
2. Toggle Like
Endpoint: POST /podcast/like/:podcastId
Description: Toggles like on a podcast.
Response: Updated like count and user list who liked the podcast.
Models
User Model
javascript
Copy code
{
  name: String,
  email: String,
  password: String,
  playlist: [ObjectId], // Array of podcast IDs
  likedPodcasts: [ObjectId], // Array of liked podcast IDs
  createdPodcasts: [ObjectId] // Array of created podcast IDs
}
Podcast Model
javascript
Copy code
{
  title: String,
  author: String,
  audioUrl: String,
  imageUrl: String,
  likes: Number,
  likedBy: [String], // Array of user IDs
  views: Number
}
Error Handling
Each route has error handling to ensure meaningful error messages and to catch possible issues with requests or server errors. Typical error responses include:

400 Bad Request: For missing or invalid request data.
401 Unauthorized: For requests missing authentication or invalid tokens.
404 Not Found: For missing resources, such as a podcast or user.
500 Server Error: For any unexpected errors on the server side.
