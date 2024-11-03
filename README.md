
<h1>📁 Project Structure</h1>
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
