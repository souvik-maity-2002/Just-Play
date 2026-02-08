# Frontend Installation & Setup Guide

## Quick Setup (Windows)

1. Navigate to the frontend-app folder:
```bash
cd frontend-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
copy .env.example .env
```

4. Update `.env` file with backend URL (if not localhost:8000):
```
VITE_API_URL=http://localhost:8000/api/v1
```

5. Start development server:
```bash
npm run dev
```

6. Open browser and go to: `http://localhost:3000`

---

## Features Implemented

### 🔐 Authentication
- ✅ User Registration with avatar upload
- ✅ Email/Password Login
- ✅ JWT Token Management
- ✅ Automatic Token Refresh
- ✅ Protected Routes

### 📹 Video Management
- ✅ Browse all videos
- ✅ Search videos by title
- ✅ Upload new videos
- ✅ View video details
- ✅ Video player with controls
- ✅ Delete videos (own videos only)

### 👥 Social Features
- ✅ Like/Unlike videos
- ✅ Subscribe/Unsubscribe to channels
- ✅ View subscriber count
- ✅ Add/Edit/Delete comments
- ✅ View user profiles/channels

### 📋 Playlists
- ✅ Create playlists
- ✅ View all playlists
- ✅ Edit playlist details
- ✅ Delete playlists
- ✅ Add/Remove videos from playlists

### 📊 Dashboard
- ✅ View channel statistics
- ✅ Total videos uploaded
- ✅ Total views count
- ✅ Subscriber count
- ✅ Manage your videos
- ✅ Quick delete/edit options

### 📱 Additional Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Navigation sidebar
- ✅ Search functionality
- ✅ Toast notifications
- ✅ Error handling
- ✅ Loading states

---

## Project Structure

```
frontend-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx     # Top navigation bar
│   │   ├── Sidebar.jsx    # Left sidebar navigation
│   │   ├── VideoCard.jsx  # Video grid card component
│   │   ├── CommentSection.jsx  # Comment management
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── pages/             # Page components
│   │   ├── Login.jsx                  # Login page
│   │   ├── Register.jsx               # Registration page
│   │   ├── Home.jsx                   # Video feed
│   │   ├── VideoPlayer.jsx            # Video playback page
│   │   ├── UploadVideo.jsx            # Video upload
│   │   ├── Channel.jsx                # User channel
│   │   ├── Playlist.jsx               # Playlist management
│   │   ├── LikedVideos.jsx            # Liked videos collection
│   │   ├── Dashboard.jsx              # Creator dashboard
│   │   └── NotFound.jsx               # 404 page
│   ├── services/          # API client layer
│   │   ├── api.js                     # Axios instance with interceptors
│   │   ├── authService.js             # Authentication endpoints
│   │   ├── videoService.js            # Video endpoints
│   │   ├── commentService.js          # Comment endpoints
│   │   ├── likeService.js             # Like/dislike endpoints
│   │   ├── subscriptionService.js     # Subscription endpoints
│   │   ├── playlistService.js         # Playlist endpoints
│   │   └── dashboardService.js        # Dashboard endpoints
│   ├── store/             # State management (Zustand)
│   │   ├── authStore.js               # Auth state
│   │   └── videoStore.js              # Video state
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── index.html             # HTML template
├── package.json           # Dependencies
└── README.md              # Documentation

```

---

## API Endpoints Consumed

### Authentication
- `POST /users/register` - Create new account
- `POST /users/login` - Login user
- `POST /users/logout` - Logout user
- `GET /users/current-user` - Get logged-in user info
- `POST /users/refresh-token` - Refresh JWT token
- `PATCH /users/update-account` - Update user details
- `PATCH /users/avatar` - Update avatar
- `PATCH /users/cover-image` - Update cover image
- `GET /users/c/:username` - Get user channel
- `GET /users/history` - Get watch history

### Videos
- `GET /videos` - Get all videos
- `POST /videos` - Upload new video
- `GET /videos/:videoId` - Get video details
- `PATCH /videos/:videoId` - Update video
- `DELETE /videos/:videoId` - Delete video
- `PATCH /videos/toggle/publish/:videoId` - Toggle publish status

### Comments
- `GET /comments/:videoId` - Get video comments
- `POST /comments/:videoId` - Add comment
- `PATCH /comments/c/:commentId` - Update comment
- `DELETE /comments/c/:commentId` - Delete comment

### Likes
- `POST /likes/toggle/v/:videoId` - Toggle video like
- `POST /likes/toggle/c/:commentId` - Toggle comment like
- `POST /likes/toggle/t/:tweetId` - Toggle tweet like
- `GET /likes/videos` - Get liked videos

### Subscriptions
- `POST /subscriptions/c/:channelId` - Toggle subscription
- `GET /subscriptions/c/:channelId` - Get channel subscribers
- `GET /subscriptions/u/:userId` - Get user subscriptions

### Playlists
- `GET /playlist` - Get user playlists
- `POST /playlist` - Create playlist
- `GET /playlist/:playlistId` - Get playlist details
- `PATCH /playlist/:playlistId` - Update playlist
- `DELETE /playlist/:playlistId` - Delete playlist
- `PATCH /playlist/add/:videoId/:playlistId` - Add video to playlist
- `PATCH /playlist/remove/:videoId/:playlistId` - Remove video from playlist

### Dashboard
- `GET /dashboard/stats` - Get channel statistics
- `GET /dashboard/videos` - Get channel videos

---

## Environment Variables

Create a `.env` file in the frontend-app directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:8000/api/v1
```

---

## Running the Application

### Development Mode
```bash
npm run dev
```
- Starts Vite dev server on port 3000
- Hot module replacement enabled
- Auto-opens browser

### Production Build
```bash
npm run build
```
- Builds optimized production bundle
- Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Useful for testing before deployment

---

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy with one click

### Deploy to Netlify
1. Build project: `npm run build`
2. Deploy the `dist/` folder
3. Set environment variables in Netlify dashboard

### Deploy to GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

---

## Troubleshooting

### Port 3000 already in use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Backend connection errors
- Ensure backend is running on port 8000
- Check CORS configuration in backend
- Verify `.env` has correct API URL

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Key Technologies

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Next-gen build tool
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **Date-fns** - Date formatting

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 12+
- Mobile browsers

---

## Performance Features

- ✅ Code splitting with React Router
- ✅ Automatic token refresh
- ✅ Efficient API caching
- ✅ Responsive images
- ✅ Optimized bundle size

---

## Security Features

- ✅ Protected routes
- ✅ JWT token management
- ✅ HTTP-only cookies support
- ✅ CORS enabled
- ✅ Input validation

---

## Contributing

1. Create a new branch for features
2. Keep commits clean and descriptive
3. Test thoroughly before PR
4. Update documentation

---

## Support & Issues

For issues or questions:
1. Check the backend is running
2. Verify environment variables
3. Check browser console for errors
4. Review network tab in DevTools

---

Happy coding! 🚀
