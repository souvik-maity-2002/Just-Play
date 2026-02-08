import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { commentService } from '../services/commentService'
import { useAuthStore } from '../store/authStore'

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const { user } = useAuthStore()

  useEffect(() => {
    fetchComments()
  }, [videoId])

  const fetchComments = async () => {
    try {
      const data = await commentService.getVideoComments(videoId)
      setComments(data.data || [])
    } catch (error) {
      toast.error('Failed to fetch comments')
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      if (editingId) {
        await commentService.updateComment(editingId, content)
        setEditingId(null)
      } else {
        await commentService.addComment(videoId, content)
      }
      setContent('')
      fetchComments()
      toast.success(editingId ? 'Comment updated' : 'Comment added')
    } catch (error) {
      toast.error('Failed to save comment')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return
    try {
      await commentService.deleteComment(commentId)
      fetchComments()
      toast.success('Comment deleted')
    } catch (error) {
      toast.error('Failed to delete comment')
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-bold">Comments</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
          rows="3"
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {editingId ? 'Update' : 'Comment'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setContent('')
            }}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 p-3 bg-gray-100 rounded-lg">
              <img
                src={comment.owner?.avatar || '/default-avatar.png'}
                alt={comment.owner?.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">
                      {comment.owner?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true
                      })}
                    </p>
                  </div>
                  {user?._id === comment.owner?._id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(comment._id)
                          setContent(comment.content)
                        }}
                        className="p-1 hover:bg-yellow-200 rounded"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="p-1 hover:bg-red-200 rounded"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm mt-2">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentSection
