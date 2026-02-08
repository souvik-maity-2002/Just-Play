import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import VideoCard from '../components/VideoCard'
import { likeService } from '../services/likeService'
import { useAuthStore } from '../store/authStore'

function LikedVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    fetchLikedVideos()
  }, [])

  const fetchLikedVideos = async () => {
    try {
      const data = await likeService.getLikedVideos()
      setVideos(data.data || [])
    } catch (error) {
      toast.error('Failed to fetch liked videos')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Loading liked videos...</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-2">Liked Videos</h1>
      <p className="text-gray-600 mb-8">Your favorite videos in one place</p>

      {videos.length === 0 ? (
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <p className="text-lg text-gray-600">No liked videos yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}

export default LikedVideos
