import { create } from 'zustand'
import { videoService } from '../services/videoService'

export const useVideoStore = create((set) => ({
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,

  fetchVideos: async (query = {}) => {
    set({ loading: true, error: null })
    try {
      const data = await videoService.getAllVideos(query)
      set({ videos: data.data || [], loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  fetchVideoById: async (videoId) => {
    set({ loading: true, error: null })
    try {
      const data = await videoService.getVideoById(videoId)
      set({ currentVideo: data.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  publishVideo: async (videoData) => {
    set({ loading: true, error: null })
    try {
      const data = await videoService.publishVideo(videoData)
      set({ loading: false })
      return data
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  deleteVideo: async (videoId) => {
    set({ loading: true, error: null })
    try {
      await videoService.deleteVideo(videoId)
      set((state) => ({
        videos: state.videos.filter((v) => v._id !== videoId),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))
