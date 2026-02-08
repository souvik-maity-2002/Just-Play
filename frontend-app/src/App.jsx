import React, { useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useAuthStore } from './store/authStore'

// Pages
import ProtectedRoute from './components/ProtectedRoute'
import Channel from './pages/Channel'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import LikedVideos from './pages/LikedVideos'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Playlist from './pages/Playlist'
import PlaylistDetail from './pages/PlaylistDetail'
import Profile from './pages/Profile'
import Register from './pages/Register'
import UploadVideo from './pages/UploadVideo'
import VideoPlayer from './pages/VideoPlayer'

function App() {
  const { user, loadUser } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {user ? (
        <div className="flex bg-gray-100 min-h-screen">
          <Sidebar open={sidebarOpen} />
          <div className="flex-1 flex flex-col">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:videoId" element={<VideoPlayer />} />
                <Route path="/upload" element={<ProtectedRoute><UploadVideo /></ProtectedRoute>} />
                <Route path="/channel/:username" element={<Channel />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/playlist" element={<ProtectedRoute><Playlist /></ProtectedRoute>} />
                <Route path="/playlist/:playlistId" element={<ProtectedRoute><PlaylistDetail /></ProtectedRoute>} />
                <Route path="/liked-videos" element={<ProtectedRoute><LikedVideos /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  )
}

export default App
