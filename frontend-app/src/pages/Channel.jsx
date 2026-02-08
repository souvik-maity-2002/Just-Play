import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import VideoCard from '../components/VideoCard'
import { authService } from '../services/authService'
import { subscriptionService } from '../services/subscriptionService'
import { useAuthStore } from '../store/authStore'

function Channel() {
  const { username } = useParams()
  const { user } = useAuthStore()
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(0)

  useEffect(() => {
    fetchChannelData()
  }, [username])

  const fetchChannelData = async () => {
    try {
      const data = await authService.getUserChannel(username)
      setChannel(data.data)
      
      if (data.data?._id) {
        const subscribersData = await subscriptionService.getChannelSubscribers(data.data._id)
        setSubscriberCount(subscribersData.data?.length || 0)
      }
    } catch (error) {
      toast.error('Failed to fetch channel')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!channel?._id) return
    try {
      await subscriptionService.toggleSubscription(channel._id)
      setIsSubscribed(!isSubscribed)
      toast.success(!isSubscribed ? 'Subscribed' : 'Unsubscribed')
    } catch (error) {
      toast.error('Failed to subscribe')
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Loading channel...</p>
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Channel not found</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Cover Image */}
      {channel.coverImage && (
        <div className="w-full h-32 md:h-48 overflow-hidden">
          <img
            src={channel.coverImage}
            alt={channel.fullName}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container">
        {/* Channel Header */}
        <div className="flex items-end gap-4 py-6 border-b">
          <img
            src={channel.avatar}
            alt={channel.fullName}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white -mt-12 md:-mt-16"
          />
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold">{channel.fullName}</h1>
            <p className="text-gray-600">@{channel.username}</p>
            <div className="flex gap-4 text-sm text-gray-600 mt-2">
              <span>{channel.subscribersCount || subscriberCount} subscribers</span>
              <span>{channel.videosCount || 0} videos</span>
            </div>
          </div>
          {user?._id !== channel._id && (
            <button
              onClick={handleSubscribe}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                isSubscribed
                  ? 'bg-gray-300 text-gray-800'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          )}
        </div>

        {/* Videos */}
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Videos</h2>
          {channel.videos && channel.videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {channel.videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No videos yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Channel
