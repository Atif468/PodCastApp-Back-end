<h1 align="center">🎧 Podcast Platform Backend</h1> <h3 align="center">A robust backend for managing user authentication, podcasts, playlists, and media storage</h3> <div align="center"> <img alt="Server" width="400" src="https://miro.medium.com/max/680/0*7Q3yvSIv_t0ioJ-Z.gif"/> </div>
🔍 APIs for user authentication, podcast uploads, and interactions
💾 Using MongoDB for data storage and Cloudinary for media management
🔒 JWT and Bcrypt for secure authentication
<h3 align="center">🛠️ Technologies Used:</h3> <div align="center"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="Node.js" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" alt="Express.js" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="MongoDB" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg" height="40" alt="Cloudinary" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" alt="GitHub" /> </div>
🚀 Features
User Authentication: Sign up, log in, and JWT-secured access.
Podcast Management: Upload and organize podcasts with audio and image files.
Playlists & Likes: Create playlists and interact with podcasts.
Secure Media Storage: Cloudinary integration for audio and image files.
⚙️ Setup Instructions
Clone the repository:

bash
Copy code
git clone <repository-link>
cd podcast-backend
Install dependencies:

bash
Copy code
npm install
Set up Environment Variables in a .env file:

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
<h3 align="center">API Endpoints:</h3> <div align="center"> <table> <tr><th>Endpoint</th><th>Description</th></tr> <tr><td>POST /auth/signup</td><td>Register a new user</td></tr> <tr><td>POST /auth/login</td><td>Login and get JWT token</td></tr> <tr><td>POST /podcast/upload</td><td>Upload podcast with audio and image</td></tr> <tr><td>PATCH /playlist/add/:podcastId</td><td>Add a podcast to the playlist</td></tr> <tr><td>POST /podcast/like/:podcastId</td><td>Toggle like on a podcast</td></tr> </table> </div>
<h3 align="center">Error Handling:</h3> <div align="center"> <p>Includes meaningful error responses for:</p> <ul> <li><b>400</b> - Bad Request</li> <li><b>401</b> - Unauthorized</li> <li><b>404</b> - Not Found</li> <li><b>500</b> - Server Error</li> </ul> </div>
<h3 align="center">📑 License:</h3> <div align="center"> <p>MIT License</p> </div> <h3 align="center">Connect with Me:</h3> <p align="center"> <a href="https://linkedin.com/in/atif468" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" height="30" width="40" /></a> <a href="https://www.hackerrank.com/atif_22015001907" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/hackerrank.svg" alt="HackerRank" height="30" width="40" /></a> <a href="https://www.leetcode.com/atif_32395" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="LeetCode" height="30" width="40" /></a> <a href="https://auth.geeksforgeeks.org/user/atifans468" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/geeks-for-geeks.svg" alt="GeeksforGeeks" height="30" width="40" /></a> </p> <div align="center"> <p><img align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=atif468&show_icons=true&locale=en&layout=compact" alt="Top Languages" /></p> <p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=atif468&show_icons=true&locale=en" alt="GitHub Stats" /></p> <p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=atif468&" alt="Streak Stats" /></p> </div>
