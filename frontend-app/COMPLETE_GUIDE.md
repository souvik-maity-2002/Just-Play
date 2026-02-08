# JustPlay Frontend - Complete Documentation

## 📋 Project Overview

This is a full-featured React frontend for the JustPlay backend video sharing platform. It's built with modern React best practices and provides a complete user experience for watching, uploading, and sharing videos.

**Location:** `c:\Users\SOUVIK MAITY\OneDrive\Desktop\Just-Play\frontend-app`

---

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd frontend-app
npm install
```

### Step 2: Configure Environment
```bash
copy .env.example .env
```

Edit `.env` if your backend is not on `localhost:8000`:
```
VITE_API_URL=http://localhost:8000/api/v1
```

### Step 3: Start Development Server
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

---

## 📁 Project Structure

```
frontend-app/
├── public/                    # Static files
├── src/
│   ├── components/            # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── VideoCard.jsx
│   │   ├── CommentSection.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/                 # Page components (one per route)
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── UploadVideo.jsx
│   │   ├── Channel.jsx
│   │   ├── Playlist.jsx
│   │   ├── PlaylistDetail.jsx
│   │   ├── LikedVideos.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   ├── services/              # API integration layer
│   │   ├── api.js             # Axios instance
│   │   ├── authService.js
│   │   ├── videoService.js
│   │   ├── commentService.js
│   │   ├── likeService.js
│   │   ├── subscriptionService.js
│   │   ├── playlistService.js
│   │   └── dashboardService.js
│   ├── store/                 # State management (Zustand)
│   │   ├── authStore.js
│   │   └── videoStore.js
│   ├── utils/                 # Helper functions
│   │   └── helpers.js
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── .env.example               # Environment variables template
├── .gitignore
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── package.json
├── README.md
└── SETUP_GUIDE.md             # This file
```

---

## 🎨 Features & Pages

### Authentication Pages

#### 1. **Login** (`/login`)
- Email and password login
- Form validation
- Error handling
- Links to registration

#### 2. **Register** (`/register`)
- User registration form
- Required fields: username, email, password, fullName, avatar
- Optional: cover image
- Password validation
- Avatar file upload

---

### Main Pages (Authenticated)

#### 3. **Home** (`/`)
- Video feed grid layout
- Search functionality
- Loading states
- Responsive grid (1-4 columns)

#### 4. **Video Player** (`/video/:videoId`)
- Full-screen video player
- Video metadata
- Like button with toggle
- Subscribe button
- Comment section
- Related videos sidebar

#### 5. **Upload Video** (`/upload`)
- Video file upload
- Thumbnail upload
- Title and description
- Form validation
- Progress indication

#### 6. **Channel** (`/channel/:username`)
- Channel header with cover image
- Channel avatar
- Subscriber count
- Subscribe button
- Videos grid
- Channel statistics

#### 7. **Dashboard** (`/dashboard`)
- Channel statistics (views, videos, subscribers, likes)
- Videos management table
- View, edit, delete options
- Upload new video button
- Video metadata display

#### 8. **Profile** (`/profile`)
- User information display
- Edit profile form
- Avatar display
- Member since date
- Link to public channel

#### 9. **Playlists** (`/playlist`)
- Create new playlist
- Edit existing playlists
- Delete playlists
- View playlist count and videos
- Visual playlist cards

#### 10. **Playlist Detail** (`/playlist/:playlistId`)
- Playlist information
- Videos in playlist
- Video grid layout

#### 11. **Liked Videos** (`/liked-videos`)
- Collection of liked videos
- Video grid display
- Like count

---

## 🔧 Components

### Navbar Component
- Logo and branding
- Search bar with form submission
- User profile dropdown menu
- Upload button
- Responsive design

### Sidebar Component
- Navigation links
- Collapsible menu
- Active route highlighting
- Logout button
- Responsive width toggle

### VideoCard Component
- Thumbnail image
- Video title
- Channel name
- View count
- Upload date (relative)
- Hover effects
- Link to video player

### CommentSection Component
- Display comments list
- Add new comment form
- Edit comment (own comments)
- Delete comment (own comments)
- User avatars
- Timestamps

### ProtectedRoute Component
- Guards authenticated routes
- Redirects to login if not authenticated
- Wraps protected pages

---

## 📡 API Services

### API Base URL
```
http://localhost:8000/api/v1
```

### Services Available

#### authService
- `register()` - Create account
- `login()` - Login user
- `logout()` - Logout user
- `getCurrentUser()` - Get logged-in user
- `updateAccount()` - Update user info
- `changePassword()` - Change password
- `updateAvatar()` - Update profile picture
- `updateCoverImage()` - Update cover image
- `getUserChannel()` - Get channel info
- `getWatchHistory()` - Get watch history

#### videoService
- `getAllVideos()` - Fetch videos
- `getVideoById()` - Get video details
- `publishVideo()` - Upload new video
- `updateVideo()` - Edit video metadata
- `deleteVideo()` - Delete video
- `togglePublishStatus()` - Publish/unpublish video

#### commentService
- `getVideoComments()` - Fetch video comments
- `addComment()` - Add comment
- `updateComment()` - Edit comment
- `deleteComment()` - Delete comment

#### likeService
- `toggleVideoLike()` - Like/unlike video
- `toggleCommentLike()` - Like/unlike comment
- `toggleTweetLike()` - Like/unlike tweet
- `getLikedVideos()` - Get liked videos

#### subscriptionService
- `toggleSubscription()` - Subscribe/unsubscribe
- `getSubscribedChannels()` - Get channel subscribers
- `getChannelSubscribers()` - Get user's subscriptions

#### playlistService
- `getUserPlaylists()` - Get all playlists
- `getPlaylistById()` - Get playlist details
- `createPlaylist()` - Create new playlist
- `updatePlaylist()` - Edit playlist
- `deletePlaylist()` - Delete playlist
- `addVideoToPlaylist()` - Add video to playlist
- `removeVideoFromPlaylist()` - Remove video from playlist

#### dashboardService
- `getChannelStats()` - Get channel statistics
- `getChannelVideos()` - Get channel videos

---

## 🔐 State Management (Zustand)

### Auth Store (`authStore.js`)
```javascript
useAuthStore().user              // Current logged-in user
useAuthStore().loading           // Loading state
useAuthStore().error             // Error message
useAuthStore().register()        // Register function
useAuthStore().login()           // Login function
useAuthStore().logout()          // Logout function
useAuthStore().loadUser()        // Load user from server
useAuthStore().updateUser()      // Update user data
```

### Video Store (`videoStore.js`)
```javascript
useVideoStore().videos           // List of videos
useVideoStore().currentVideo     // Currently playing video
useVideoStore().loading          // Loading state
useVideoStore().error            // Error message
useVideoStore().fetchVideos()    // Fetch all videos
useVideoStore().fetchVideoById() // Fetch single video
useVideoStore().publishVideo()   // Upload video
useVideoStore().deleteVideo()    // Delete video
```

---

## 🎨 Styling

### Framework: Tailwind CSS
- Utility-first CSS framework
- Responsive design utilities
- Custom color scheme
- Global styles in `index.css`

### Custom Classes
```css
.container        /* Max-width container */
.btn-primary      /* Primary button */
.btn-secondary    /* Secondary button */
.input-field      /* Form input */
.card             /* Card component */
```

---

## 🔒 Authentication Flow

1. User navigates to `/register`
2. Enters credentials and uploads avatar
3. Backend returns user info on successful registration
4. User logs in at `/login`
5. Backend returns JWT token
6. Token stored in localStorage
7. Dashboard visible if authenticated
8. Token automatically refreshed before expiry
9. Redirected to login if token expires

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "react-icons": "^4.12.0",
    "react-toastify": "^9.1.3",
    "date-fns": "^2.30.0"
  }
}
```

---

## 🛠️ Available Commands

```bash
# Development
npm run dev        # Start development server

# Production
npm run build      # Build for production
npm run preview    # Preview production build

# Linting
npm run lint       # Run ESLint
```

---

## 🚀 Deployment Guide

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deploy to Vercel
1. Push to GitHub
2. Import repo in Vercel dashboard
3. Set environment variables
4. Deploy with one click

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Deploy dist/ to gh-pages branch
```

---

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Vite Configuration
- Port: 3000
- Auto-open browser
- Fast HMR

### Tailwind Configuration
- Custom colors (primary, secondary, accent)
- Extended theme

---

## 📝 Routing Map

| Route | Component | Auth Required | Purpose |
|-------|-----------|---------------|---------|
| `/` | Home | Yes | Video feed |
| `/login` | Login | No | User authentication |
| `/register` | Register | No | Create account |
| `/video/:videoId` | VideoPlayer | Yes | Watch video |
| `/upload` | UploadVideo | Yes | Upload video |
| `/channel/:username` | Channel | No | View channel |
| `/profile` | Profile | Yes | User profile |
| `/dashboard` | Dashboard | Yes | Creator dashboard |
| `/playlist` | Playlist | Yes | Manage playlists |
| `/playlist/:playlistId` | PlaylistDetail | Yes | View playlist |
| `/liked-videos` | LikedVideos | Yes | Liked videos |
| `*` | NotFound | No | 404 page |

---

## 💡 Usage Examples

### Accessing Current User
```javascript
import { useAuthStore } from './store/authStore'

function MyComponent() {
  const { user, logout } = useAuthStore()
  
  return (
    <div>
      <p>Hello, {user?.fullName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Fetching Videos
```javascript
import { useVideoStore } from './store/videoStore'

function VideoList() {
  const { videos, loading, fetchVideos } = useVideoStore()
  
  useEffect(() => {
    fetchVideos()
  }, [])
  
  return loading ? <p>Loading...</p> : (
    <div>
      {videos.map(v => <VideoCard key={v._id} video={v} />)}
    </div>
  )
}
```

### Using API Services
```javascript
import { videoService } from './services/videoService'

// Publish video
const response = await videoService.publishVideo({
  title: 'My Video',
  description: 'Description',
  videoFile: fileObject,
  thumbnail: imageFile
})

// Like video
await likeService.toggleVideoLike(videoId)
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Backend Connection Error
- Ensure backend is running on port 8000
- Check `.env` file has correct `VITE_API_URL`
- Verify CORS is enabled in backend

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run build -- --debug  # See detailed errors
```

---

## 📊 Performance Tips

1. **Code Splitting** - React Router automatically splits code
2. **Image Optimization** - Use thumbnails for videos
3. **Lazy Loading** - Components are lazy loaded by route
4. **Caching** - API responses are cached with Zustand
5. **Bundle Size** - Keep dependencies minimal

---

## 🔍 Browser DevTools

### React DevTools
Install React DevTools extension to inspect components and state.

### Network Tab
Check API requests and responses in Network tab.

### Console
TypeScript errors and warnings appear here.

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)

---

## ✅ Checklist Before Deployment

- [ ] Backend is running and accessible
- [ ] Environment variables are set
- [ ] All dependencies installed (`npm install`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors
- [ ] Tested authentication flow
- [ ] Tested video upload
- [ ] Tested comments
- [ ] Tested like functionality
- [ ] Tested subscriptions
- [ ] Responsive design checked
- [ ] Performance tested

---

## 📞 Support

For issues or questions about this frontend:

1. Check SETUP_GUIDE.md
2. Check browser console for errors
3. Verify backend is running
4. Check API responses in Network tab
5. Review component code for logic

---

## 🎉 You're All Set!

Your JustPlay frontend is ready to use. Start the development server and enjoy building!

```bash
npm run dev
```

Happy coding! 🚀
