import { useEffect, useState } from 'react'
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { playlistService } from '../services/playlistService'

function Playlist() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchPlaylists()
  }, [])

  const fetchPlaylists = async () => {
    try {
      const data = await playlistService.getUserPlaylists()
      setPlaylists(data.data || [])
    } catch (error) {
      toast.error('Failed to fetch playlists')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast.error('Playlist name is required')
      return
    }

    try {
      if (editingId) {
        await playlistService.updatePlaylist(
          editingId,
          formData.name,
          formData.description
        )
        toast.success('Playlist updated')
      } else {
        await playlistService.createPlaylist(
          formData.name,
          formData.description
        )
        toast.success('Playlist created')
      }
      setFormData({ name: '', description: '' })
      setEditingId(null)
      setShowForm(false)
      fetchPlaylists()
    } catch (error) {
      toast.error('Failed to save playlist')
    }
  }

  const handleDelete = async (playlistId) => {
    if (!window.confirm('Delete this playlist?')) return
    try {
      await playlistService.deletePlaylist(playlistId)
      toast.success('Playlist deleted')
      fetchPlaylists()
    } catch (error) {
      toast.error('Failed to delete playlist')
    }
  }

  const handleEdit = (playlist) => {
    setFormData({ name: playlist.name, description: playlist.description })
    setEditingId(playlist._id)
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Loading playlists...</p>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Playlists</h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            if (editingId) {
              setEditingId(null)
              setFormData({ name: '', description: '' })
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FiPlus /> Create Playlist
        </button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Playlist' : 'Create New Playlist'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Playlist Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input-field"
                placeholder="Enter playlist name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input-field resize-none"
                placeholder="Enter description"
                rows="3"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ name: '', description: '' })
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Playlists Grid */}
      {playlists.length === 0 ? (
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <p className="text-lg text-gray-600">No playlists yet. Create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-32 bg-gray-300 overflow-hidden">
                {playlist.videos?.[0]?.thumbnail ? (
                  <img
                    src={playlist.videos[0].thumbnail}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                    <FiPlus className="text-4xl text-white opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {playlist.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {playlist.description || 'No description'}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {playlist.videos?.length || 0} videos
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/playlist/${playlist._id}`}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleEdit(playlist)}
                    className="px-3 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(playlist._id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Playlist
