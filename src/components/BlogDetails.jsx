import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { PhotoProvider, PhotoView } from "react-photo-view"
import "react-photo-view/dist/react-photo-view.css"
import { FaUser, FaCalendarAlt, FaTrash, FaPencilAlt, FaRegComment, FaHeart } from "react-icons/fa"
import { TextField, Button, Box, Typography, Tooltip, Fade, CircularProgress } from "@mui/material"
import toast from "react-hot-toast"
import useAuth from "../hook/useAuth"

const BlogDetails = () => {
  const [blog, setBlog] = useState(null)
  const { id } = useParams()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(true)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setIsImageLoading(true)
    axios
      .get(`https://samusa-blog-server.vercel.app/api/blog/${id}`)
      .then((res) => setBlog(res.data.blog))
      .catch((err) => {
        toast.error("Failed to load blog")
        console.error(err)
      })
  }, [id])

  useEffect(() => {
    let intervalId

    const fetchComments = () => {
      axios
        .get("https://samusa-blog-server.vercel.app/api/allComments")
        .then((res) => {
          const blogComments = res.data.comment.filter((c) => c.blogId?.toString() === id)
          setComments(blogComments)
          setLoadingComments(false)
        })
        .catch((err) => {
          console.error(err)
          setLoadingComments(false)
        })
    }

    if (id) {
      fetchComments()
      intervalId = setInterval(fetchComments, 5000)
    }
    return () => clearInterval(intervalId)
  }, [id])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    axios
      .post(`https://samusa-blog-server.vercel.app/api/addcomment`, {
        comment,
        blogId: id,
        author: user?.displayName,
        profilePic: user?.photoURL,
      })
      .then(() => {
        toast.success("Comment submitted")
        setComment("")
      })
      .catch(() => toast.error("Error submitting comment"))
      .finally(() => setIsSubmitting(false))
  }

  const handleDeleteComment = (cmtId) => {
    axios
      .delete(`https://samusa-blog-server.vercel.app/api/deletecomment/${cmtId}`)
      .then(() => toast.success("Comment deleted"))
      .catch(() => toast.error("Error deleting comment"))
  }

  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <CircularProgress size={50} color="success" />
        <p className="mt-4 text-lg my-1 sm:text-xl text-gray-600 font-medium">Blog is loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-8 px-4">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all border border-emerald-100">
        <PhotoProvider>
          <div className="relative h-[70vh] min-h-[400px] overflow-hidden">
            {blog.imageUrl ? (
              <>
                <PhotoView src={blog.imageUrl}>
                  <Tooltip title="Click to enlarge image" arrow placement="top">
                    <img
                      src={blog.imageUrl || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover cursor-zoom-in transition-transform hover:scale-105 duration-700"
                      onLoad={() => setIsImageLoading(false)}
                    />
                  </Tooltip>
                </PhotoView>
                <Fade in={isImageLoading}>
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <CircularProgress color="success" />
                  </div>
                </Fade>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 border-2 border-dashed border-emerald-200 rounded-xl">
                <span className="text-gray-500 text-xl">No image available</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 z-10">
              <span className="bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                {blog.category}
              </span>
            </div>
          </div>
        </PhotoProvider>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-emerald-100">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full border-2 border-emerald-200">
                  <FaUser className="text-emerald-600 text-lg" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600 font-medium">Written by</p>
                  <p className="font-semibold text-gray-800">{blog.author || "Anonymous"}</p>
                </div>
              </div>
              {blog.createdAt && (
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full border-2 border-emerald-200">
                    <FaCalendarAlt className="text-emerald-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600 font-medium">Published on</p>
                    <p className="font-medium text-gray-700">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {user?.displayName === blog.author && (
              <Link to={`/blog/edit/${blog._id}`}>
                <Tooltip title="Edit blog" arrow>
                  <button className="mt-4 cursor-pointer md:mt-0 px-4 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md flex items-center gap-2">
                    <FaPencilAlt />
                    <span>Edit blog</span>
                  </button>
                </Tooltip>
              </Link>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
          <div className="border-l-4 border-emerald-500 bg-emerald-50 p-6 mb-8 rounded-r-lg shadow-sm">
            <p className="text-xl italic text-gray-700">{blog.shortDescription}</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line">{blog.longDescription}</div>
        </div>

        <div className="bg-emerald-50 px-8 py-6 border-t border-emerald-100 flex flex-col sm:flex-row justify-between text-sm text-gray-600">
          <div>
            <span className="bg-white px-3 py-1 rounded-md border border-emerald-200 inline-block">
              Article ID: {id}
            </span>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-2">
            <FaHeart className="text-emerald-500" />
            <span>By {blog.author || "Anonymous"}</span>
          </div>
        </div>
        <div className="p-6 bg-white border-t border-emerald-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <FaRegComment className="text-emerald-600 text-sm" />
            </div>
            <Typography variant="h6" className="font-bold text-gray-900">
              Comments ({comments.length})
            </Typography>
          </div>

          {loadingComments ? (
            <div className="flex items-center justify-center py-8">
              <CircularProgress color="success" size={24} className="mr-2" />
              <span className="text-gray-600 text-sm">Loading comments...</span>
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-3 mb-6">
              {comments.map(({ _id, author: cA, comment: msg, profilePic }) => (
                <div
                  key={_id}
                  className="border border-gray-200 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full overflow-hidden flex-shrink-0 border border-emerald-200">
                      <img
                        src={profilePic || "/default-user.png"}
                        alt={cA}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/default-user.png"
                        }}
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-800 text-sm">{cA}</span>
                        {user?.displayName === cA && (
                          <Tooltip title="Delete comment" arrow>
                            <button
                              onClick={() => handleDeleteComment(_id)}
                              className="text-red-400 cursor-pointer hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed break-words">{msg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500 border border-dashed border-emerald-200 rounded-lg bg-emerald-50 mb-6">
              <FaRegComment className="text-2xl mx-auto mb-2 text-emerald-300" />
              <p className="text-sm">No comments yet. Be the first to comment!</p>
            </div>
          )}

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <Typography variant="subtitle1" className="mb-3 font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full inline-block"></span>
              Leave a Comment
            </Typography>
            <Box component="form" onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="my-5">
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  color="success"
                  label="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this blog post..."
                  required
                  disabled={isSubmitting || !user}
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#10b981",
                      },
                    },
                  }}
                />
              </div>
              {!user && (
                <div className="text-amber-600 text-xs bg-amber-50 p-2 rounded border border-amber-200">
                  You need to be logged in to comment.
                </div>
              )}
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="medium"
                disabled={!comment.trim() || isSubmitting || !user}
                startIcon={isSubmitting && <CircularProgress size={16} color="inherit" />}
                sx={{ textTransform: "none" }}
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </Box>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogDetails
