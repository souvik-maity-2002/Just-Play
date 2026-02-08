import api from './api'

export const authService = {
  register: async (userData) => {
    const formData = new FormData()
    formData.append('username', userData.username)
    formData.append('email', userData.email)
    formData.append('password', userData.password)
    formData.append('fullName', userData.fullName)
    if (userData.avatar) formData.append('avatar', userData.avatar)
    if (userData.coverImage) formData.append('coverImage', userData.coverImage)

    const response = await api.post('/users/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  login: async (email, password) => {
    const response = await api.post('/users/login', { email, password })
    return response.data
  },

  logout: async () => {
    const response = await api.post('/users/logout')
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/current-user')
    return response.data
  },

  updateAccount: async (userData) => {
    const response = await api.patch('/users/update-account', userData)
    return response.data
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await api.post('/users/change-password', {
      oldPassword,
      newPassword
    })
    return response.data
  },

  updateAvatar: async (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await api.patch('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  updateCoverImage: async (file) => {
    const formData = new FormData()
    formData.append('coverImage', file)
    const response = await api.patch('/users/cover-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  getUserChannel: async (username) => {
    const response = await api.get(`/users/c/${username}`)
    return response.data
  },

  getWatchHistory: async () => {
    const response = await api.get('/users/history')
    return response.data
  }
}
