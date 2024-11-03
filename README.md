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
