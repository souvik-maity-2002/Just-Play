import { useEffect, useState } from 'react'
import { FiShare2, FiThumbsUp } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CommentSection from '../components/CommentSection'
import { likeService } from '../services/likeService'
import { subscriptionService } from '../services/subscriptionService'
import { useAuthStore } from '../store/authStore'
import { useVideoStore } from '../store/videoStore'

function VideoPlayer() {
  const { videoId } = useParams()
  const { currentVideo, loading, fetchVideoById, videos, fetchVideos } = useVideoStore()
  const { user } = useAuthStore()
  const [isLiked, setIsLiked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    fetchVideoById(videoId)
    fetchVideos()
  }, [videoId])

  const handleLike = async () => {
    try {
      await likeService.toggleVideoLike(videoId)
      setIsLiked(!isLiked)
      toast.success(!isLiked ? 'Added to likes' : 'Removed from likes')
    } catch (error) {
      toast.error('Failed to like video')
    }
  }

  const handleSubscribe = async () => {
    if (!currentVideo?.owner?._id) return
    try {
      await subscriptionService.toggleSubscription(currentVideo.owner._id)
      setIsSubscribed(!isSubscribed)
      toast.success(!isSubscribed ? 'Subscribed' : 'Unsubscribed')
    } catch (error) {
      toast.error('Failed to subscribe')
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Loading video...</p>
      </div>
    )
  }

  if (!currentVideo) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Video not found</p>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden mb-4">
            <video
              src={currentVideo.videoFile}
              controls
              className="w-full h-auto"
              style={{ aspectRatio: '16/9' }}
            />
          </div>

          {/* Video Info */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h1 className="text-2xl font-bold mb-2">{currentVideo.title}</h1>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={currentVideo.owner?.avatar}
                    alt={currentVideo.owner?.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{currentVideo.owner?.fullName}</p>
                    <p className="text-sm text-gray-500">
                      @{currentVideo.owner?.username}
                    </p>
                  </div>
                </div>
                {user?._id !== currentVideo.owner?._id && (
                  <button
                    onClick={handleSubscribe}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      isSubscribed
                        ? 'bg-gray-300 text-gray-800'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isLiked
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                  }`}
                >
                  <FiThumbsUp /> Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold">
                  <FiShare2 /> Share
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              {currentVideo.views || 0} views
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-700">{currentVideo.description}</p>
            </div>
          </div>

          {/* Comments */}
          <CommentSection videoId={videoId} />
        </div>

        {/* Sidebar - Related Videos */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-4">Related Videos</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {videos
              .filter((v) => v._id !== videoId)
              .slice(0, 8)
              .map((video) => (
                <div
                  key={video._id}
                  className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-semibold text-sm line-clamp-2">
                      {video.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {video.owner?.fullName}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
