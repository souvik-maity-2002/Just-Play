import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useVideoStore } from '../store/videoStore'

function UploadVideo() {
  const navigate = useNavigate()
  const { publishVideo } = useVideoStore()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null
  })
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState({
    videoFile: null,
    thumbnail: null
  })

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] })
      if (name === 'thumbnail' && files[0]) {
        setPreview({
          ...preview,
          thumbnail: URL.createObjectURL(files[0])
        })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.videoFile || !formData.thumbnail) {
      toast.error('All fields are required')
      return
    }

    setLoading(true)
    try {
      await publishVideo(formData)
      toast.success('Video uploaded successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload video')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Upload Video</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter video title"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Enter video description"
              rows={5}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Video File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video File *
            </label>
            <input
              type="file"
              name="videoFile"
              onChange={handleChange}
              accept="video/*"
              className="input-field"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: MP4, WebM, OGG
            </p>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail *
            </label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleChange}
              accept="image/*"
              className="input-field"
              required
            />
            {preview.thumbnail && (
              <div className="mt-3">
                <img
                  src={preview.thumbnail}
                  alt="Thumbnail preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 1280x720 pixels
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 py-3 text-lg"
          >
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadVideo
