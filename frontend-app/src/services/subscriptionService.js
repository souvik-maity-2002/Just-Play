import api from './api'

export const subscriptionService = {
  toggleSubscription: async (channelId) => {
    const response = await api.post(`/subscriptions/c/${channelId}`)
    return response.data
  },

  getSubscribedChannels: async (channelId) => {
    const response = await api.get(`/subscriptions/c/${channelId}`)
    return response.data
  },

  getChannelSubscribers: async (userId) => {
    const response = await api.get(`/subscriptions/u/${userId}`)
    return response.data
  }
}
