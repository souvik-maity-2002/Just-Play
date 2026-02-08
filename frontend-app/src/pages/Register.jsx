import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    avatar: null,
    coverImage: null
  })
  const [errors, setErrors] = useState({})
  const { register, loading } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData({
      ...formData,
      [name]: type === 'file' ? files?.[0] : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (!formData.username || !formData.email || !formData.password || !formData.fullName) {
      setErrors({ form: 'All fields are required' })
      return
    }

    if (formData.password.length < 6) {
      setErrors({ form: 'Password must be at least 6 characters' })
      return
    }

    if (!formData.avatar) {
      setErrors({ form: 'Avatar is required' })
      return
    }

    try {
      await register(formData)
      navigate('/')
    } catch (error) {
      setErrors({
        form: error.response?.data?.message || 'Registration failed'
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
          JustPlay
        </h1>
        <p className="text-center text-gray-600 mb-8">Create your account</p>

        {errors.form && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {errors.form}
          </div>
        )}

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
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              placeholder="johndoe"
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
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar *
            </label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              accept="image/*"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              accept="image/*"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 mt-6"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
