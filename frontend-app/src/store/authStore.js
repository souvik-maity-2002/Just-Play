import { toast } from 'react-toastify'
import { create } from 'zustand'
import { authService } from '../services/authService'

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  loadUser: async () => {
    try {
      const data = await authService.getCurrentUser()
      set({ user: data.data })
    } catch (error) {
      set({ user: null })
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null })
    try {
      const data = await authService.register(userData)
      set({ user: data.data, loading: false })
      toast.success('Registration successful!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      set({ error: message, loading: false })
      toast.error(message)
      throw error
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const data = await authService.login(email, password)
      localStorage.setItem('accessToken', data.data.accessToken)
      set({ user: data.data.user, loading: false })
      toast.success('Login successful!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      set({ error: message, loading: false })
      toast.error(message)
      throw error
    }
  },

  logout: async () => {
    set({ loading: true })
    try {
      await authService.logout()
      localStorage.removeItem('accessToken')
      set({ user: null, loading: false })
      toast.success('Logged out successfully!')
    } catch (error) {
      const message = error.response?.data?.message || 'Logout failed'
      toast.error(message)
      set({ loading: false })
    }
  },

  updateUser: (userData) => {
    set((state) => ({
      user: { ...state.user, ...userData }
    }))
  }
}))
