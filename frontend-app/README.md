# JustPlay Frontend

A modern React frontend application for the JustPlay video sharing platform.

## Features

- **User Authentication**: Register, login, and manage your profile
- **Video Management**: Upload, view, and manage videos
- **Social Features**: Like videos, subscribe to channels, comment on videos
- **Playlists**: Create and manage custom playlists
- **Dashboard**: View channel statistics and manage your content
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18**: UI framework
- **React Router v6**: Client-side routing
- **Zustand**: State management
- **Axios**: HTTP client
- **Tailwind CSS**: Styling
- **Vite**: Build tool
- **React Icons**: Icon library
- **React Toastify**: Notifications
- **Date-fns**: Date formatting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/justplay-frontend.git
cd frontend-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your backend URL:
```
VITE_API_URL=http://localhost:8000/api/v1
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── VideoCard.jsx
│   ├── CommentSection.jsx
│   └── ProtectedRoute.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── VideoPlayer.jsx
│   ├── UploadVideo.jsx
│   ├── Channel.jsx
│   ├── Playlist.jsx
│   ├── LikedVideos.jsx
│   ├── Dashboard.jsx
│   └── NotFound.jsx
├── services/           # API services
│   ├── api.js
│   ├── authService.js
│   ├── videoService.js
│   ├── commentService.js
│   ├── likeService.js
│   ├── subscriptionService.js
│   ├── playlistService.js
│   └── dashboardService.js
├── store/              # Zustand stores
│   ├── authStore.js
│   └── videoStore.js
├── App.jsx
├── main.jsx
└── index.css
```

## Key Features

### Authentication
- User registration with email, password, and avatar
- Email-based login
- JWT token-based authorization
- Automatic token refresh

### Videos
- Browse and search videos
- Upload new videos with metadata
- View video details with comments
- Like/unlike videos
- Subscribe to channels

### Comments
- Add comments to videos
- Edit and delete your own comments
- Real-time comment updates

### Playlists
- Create custom playlists
- Add/remove videos from playlists
- Edit and delete playlists

### User Profile
- View channel information
- Update profile and cover images
- Check watch history
- View channel statistics

## API Endpoints

The frontend communicates with the following backend endpoints:

- **Auth**: `/users/register`, `/users/login`, `/users/logout`, `/users/current-user`
- **Videos**: `/videos`, `/videos/:id`, `/videos/publish`
- **Comments**: `/comments/:videoId`, `/comments/c/:commentId`
- **Likes**: `/likes/toggle/v/:videoId`, `/likes/videos`
- **Subscriptions**: `/subscriptions/c/:channelId`
- **Playlists**: `/playlist`, `/playlist/:id`
- **Dashboard**: `/dashboard/stats`, `/dashboard/videos`

## Environment Variables

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## Deployment

### Deploy to Vercel

```bash
npm run build
# Then connect your GitHub repository to Vercel
```

### Deploy to Netlify

```bash
npm run build
# Connect your repository and deploy
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Support

For support, please create an issue in the repository.
