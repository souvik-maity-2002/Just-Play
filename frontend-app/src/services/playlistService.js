import api from './api'

export const playlistService = {
  getUserPlaylists: async () => {
    const response = await api.get('/playlist')
    return response.data
  },

  getPlaylistById: async (playlistId) => {
    const response = await api.get(`/playlist/${playlistId}`)
    return response.data
  },

  createPlaylist: async (name, description) => {
    const response = await api.post('/playlist', { name, description })
    return response.data
  },

  updatePlaylist: async (playlistId, name, description) => {
    const response = await api.patch(`/playlist/${playlistId}`, { name, description })
    return response.data
  },

  deletePlaylist: async (playlistId) => {
    const response = await api.delete(`/playlist/${playlistId}`)
    return response.data
  },

  addVideoToPlaylist: async (playlistId, videoId) => {
    const response = await api.patch(
      `/playlist/add/${videoId}/${playlistId}`
    )
    return response.data
  },

  removeVideoFromPlaylist: async (playlistId, videoId) => {
    const response = await api.patch(
      `/playlist/remove/${videoId}/${playlistId}`
    )
    return response.data
  }
}
