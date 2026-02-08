import { useState } from 'react'
import { FiLogOut, FiMenu, FiSearch, FiUpload, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left - Menu & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg text-xl"
          >
            <FiMenu />
          </button>
          <Link to="/" className="font-bold text-2xl text-blue-600">
            JustPlay
          </Link>
        </div>

        {/* Center - Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            >
              <FiSearch />
            </button>
          </div>
        </form>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/upload"
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiUpload />
            <span className="hidden sm:inline">Upload</span>
          </Link>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FiUser className="text-xl" />
              )}
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user?.fullName}</p>
                  <p className="text-sm text-gray-500">@{user?.username}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to={`/channel/${user?.username}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Channel
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/liked-videos"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Liked Videos
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
