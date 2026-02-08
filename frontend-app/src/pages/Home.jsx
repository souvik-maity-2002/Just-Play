import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { useVideoStore } from '../store/videoStore'

function Home() {
  const [searchParams] = useSearchParams()
  const { videos, loading, fetchVideos } = useVideoStore()

  useEffect(() => {
    const searchQuery = searchParams.get('search')
    const query = searchQuery ? { search: searchQuery, searchType: 'title' } : {}
    fetchVideos(query)
  }, [searchParams])

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Videos</h1>
        <p className="text-gray-600">Discover amazing content</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-gray-600">Loading videos...</div>
        </div>
      ) : videos.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-gray-600">No videos found</div>
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

export default Home
