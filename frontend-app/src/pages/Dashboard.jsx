import { useEffect, useState } from 'react'
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { dashboardService } from '../services/dashboardService'
import { videoService } from '../services/videoService'
import { useAuthStore } from '../store/authStore'

function Dashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const statsData = await dashboardService.getChannelStats()
      const videosData = await dashboardService.getChannelVideos()
      setStats(statsData.data)
      setVideos(videosData.data || [])
    } catch (error) {
      toast.error('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Delete this video?')) return
    try {
      await videoService.deleteVideo(videoId)
      setVideos(videos.filter((v) => v._id !== videoId))
      toast.success('Video deleted')
    } catch (error) {
      toast.error('Failed to delete video')
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm font-semibold">Total Videos</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.totalVideos || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm font-semibold">Total Views</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.totalViews || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm font-semibold">Subscribers</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {stats.totalSubscribers || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm font-semibold">Total Likes</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.totalLikes || 0}
            </p>
          </div>
        </div>
      )}

      {/* Videos Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Videos</h2>
          <Link
            to="/upload"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Upload New Video
          </Link>
        </div>

        {videos.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            <p>No videos uploaded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Title</th>
                  <th className="text-left px-6 py-3 font-semibold">Views</th>
                  <th className="text-left px-6 py-3 font-semibold">Status</th>
                  <th className="text-left px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <p className="font-semibold line-clamp-1">
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {video.createdAt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <FiEye />
                        {video.views || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          video.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {video.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/video/${video._id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        >
                          <FiEye />
                        </Link>
                        <button className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200">
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video._id)}
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
