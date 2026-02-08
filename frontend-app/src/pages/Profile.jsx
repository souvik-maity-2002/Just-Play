import { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'

function Profile() {
  const { user, updateUser } = useAuthStore()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  })

  useEffect(() => {
    if (user) {
      setProfile(user)
      setFormData({
        fullName: user.fullName,
        email: user.email
      })
    }
    setLoading(false)
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await authService.updateAccount(formData)
      updateUser(data.data)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src={profile?.avatar}
              alt={profile?.username}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <h2 className="text-xl font-bold">{profile?.fullName}</h2>
            <p className="text-gray-600">@{profile?.username}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {isEditing ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Profile Information</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                >
                  <FiEdit2 /> Edit
                </button>
              </div>

              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-lg font-semibold">{profile?.email}</p>
              </div>

              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm">Full Name</p>
                <p className="text-lg font-semibold">{profile?.fullName}</p>
              </div>

              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm">Username</p>
                <p className="text-lg font-semibold">@{profile?.username}</p>
              </div>

              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm">Member Since</p>
                <p className="text-lg font-semibold">
                  {new Date(profile?.createdAt).toLocaleDateString()}
                </p>
              </div>

              <Link
                to={`/channel/${profile?.username}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
              >
                View Public Channel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
