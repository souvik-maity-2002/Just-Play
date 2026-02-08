import { formatDistanceToNow } from 'date-fns'
import { FiEye } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function VideoCard({ video }) {
  return (
    <Link
      to={`/video/${video._id}`}
      className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-gray-300 h-48">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="p-3 bg-white">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {video.owner?.fullName || 'Unknown Channel'}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <FiEye /> {video.views || 0} views
          </div>
          <span>{formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}</span>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
