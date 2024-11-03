<h1 align="center">🎧 Podcast Platform Backend</h1>
<h3 align="center">A Powerful Backend for Podcast Management</h3>

<div align="center">
  <img alt="Server Illustration" width="400" src="https://miro.medium.com/max/680/0*7Q3yvSIv_t0ioJ-Z.gif"/>
</div>

---

### 🚀 Features

- **User Authentication**: 
  - Secure sign-up and log-in.
  - JWT-token-based access for security.

- **Podcast Management**: 
  - Users can upload, retrieve, and manage podcasts seamlessly.

- **Interactive Playlists**: 
  - Users can create and manage playlists of their favorite podcasts.

- **Cloud-based Media Storage**: 
  - Audio files and images are stored on Cloudinary for easy access.

---

### 🛠️ Technologies Used:

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="Node.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" alt="Express.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="MongoDB" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg" height="40" alt="Cloudinary" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" alt="GitHub" />
</div>

---

### ⚙️ Getting Started

To get your development environment up and running, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-link>
   cd podcast-backend


<h2>🛠️ API Endpoints:</h2>

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/auth/signup</td>
            <td>Register new users</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/auth/login</td>
            <td>User login</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/podcasts/upload</td>
            <td>Upload a new podcast</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/podcasts</td>
            <td>Retrieve all podcasts</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/podcasts/liked/</td>
            <td>Get liked podcasts by user ID</td>
        </tr>
        <tr>
            <td>PUT</td>
            <td>/podcasts/like/</td>
            <td>Like or unlike a podcast</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/playlists/add/</td>
            <td>Add a podcast to user's playlist</td>
        </tr>
    </tbody>
</table>
<h2>📁 Project Structure</h2>
<pre>project-root
    │
    ├── config
    │   └── cloudinary.js          # Cloudinary configuration
    │
    ├── models
    │   ├── Podcast.js             # Podcast model schema
    │   └── userModel.js           # User model schema
    │
    ├── controllers
    │   ├── authController.js      # Authentication logic
    │   ├── podcastController.js    # Podcast management logic
    │   └── userController.js       # User management logic
    │
    ├── middleware
    │   └── auth.js                # JWT authentication middleware
    │
    ├── routes
    │   ├── authRoutes.js          # Authentication routes
    │   ├── podcastRoutes.js       # Podcast routes
    │   └── userRoutes.js          # User routes
    │
    ├── .env                        # Environment variables
    ├── package.json                # Project metadata and dependencies
    └── server.js                   # Entry point of the application</pre>
