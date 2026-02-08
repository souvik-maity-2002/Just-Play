import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import VideoCard from '../components/VideoCard'
import { playlistService } from '../services/playlistService'

function PlaylistDetail() {
  const { playlistId } = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlaylist()
  }, [playlistId])

  const fetchPlaylist = async () => {
    try {
      const data = await playlistService.getPlaylistById(playlistId)
      setPlaylist(data.data)
    } catch (error) {
      toast.error('Failed to fetch playlist')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Loading playlist...</p>
      </div>
    )
  }

  if (!playlist) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Playlist not found</p>
      </div>
    )
  }

  return (
    <div className="container">
      {/* Playlist Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
        <p className="text-gray-600 mb-4">{playlist.description}</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>{playlist.videos?.length || 0} videos</span>
          <span>Created by {playlist.owner?.fullName}</span>
        </div>
      </div>

      {/* Videos */}
      {playlist.videos && playlist.videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {playlist.videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-lg text-gray-600">No videos in this playlist</p>
        </div>
      )}
    </div>
  )
}

export default PlaylistDetail
