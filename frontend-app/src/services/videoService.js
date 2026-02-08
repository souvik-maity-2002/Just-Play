import api from './api'

export const videoService = {
  getAllVideos: async (query = {}) => {
    const response = await api.get('/videos', { params: query })
    return response.data
  },

  getVideoById: async (videoId) => {
    const response = await api.get(`/videos/${videoId}`)
    return response.data
  },

  publishVideo: async (videoData) => {
    const formData = new FormData()
    formData.append('title', videoData.title)
    formData.append('description', videoData.description)
    formData.append('videoFile', videoData.videoFile)
    formData.append('thumbnail', videoData.thumbnail)

    const response = await api.post('/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  updateVideo: async (videoId, updateData) => {
    const formData = new FormData()
    formData.append('title', updateData.title)
    formData.append('description', updateData.description)
    if (updateData.thumbnail) formData.append('thumbnail', updateData.thumbnail)

    const response = await api.patch(`/videos/${videoId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  deleteVideo: async (videoId) => {
    const response = await api.delete(`/videos/${videoId}`)
    return response.data
  },

  togglePublishStatus: async (videoId) => {
    const response = await api.patch(`/videos/toggle/publish/${videoId}`)
    return response.data
  }
}
