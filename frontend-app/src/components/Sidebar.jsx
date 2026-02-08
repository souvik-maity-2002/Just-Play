import { FiHeart, FiHome, FiLayout, FiList, FiLogOut } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function Sidebar({ open }) {
  const location = useLocation()
  const { logout } = useAuthStore()

  const navItems = [
    { icon: FiHome, label: 'Home', path: '/' },
    { icon: FiLayout, label: 'Dashboard', path: '/dashboard' },
    { icon: FiHeart, label: 'Liked Videos', path: '/liked-videos' },
    { icon: FiList, label: 'Playlists', path: '/playlist' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div
      className={`${
        open ? 'w-64' : 'w-20'
      } bg-gray-800 text-white transition-all duration-300 min-h-screen`}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Navigation Items */}
        <div className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <Icon className="text-xl" />
                {open && <span>{item.label}</span>}
              </Link>
            )
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 w-full transition-colors text-red-400"
        >
          <FiLogOut className="text-xl" />
          {open && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
