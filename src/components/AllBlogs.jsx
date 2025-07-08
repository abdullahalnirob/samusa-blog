import { Tooltip } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { FaUserAlt, FaPencilAlt } from "react-icons/fa"
import useAuth from "../hook/useAuth"
import { PhotoProvider, PhotoView } from "react-photo-view"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { motion, AnimatePresence } from "framer-motion"

const categories = [
  "All",
  "Technology",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
  "Health",
  "Education",
  "Entertainment",
]

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { user } = useAuth()

  useEffect(() => {
    axios
      .get("https://samusa-blog-server.vercel.app/api/allBlogs")
      .then((data) => {
        setBlogs(data.data.blogs)
        setFilteredBlogs(data.data.blogs)
        setLoading(false)
      })
      .catch((err) => {
        toast.error(`Failed to load blogs!`)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "All" || blog.category.toLowerCase() === selectedCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
    setFilteredBlogs(filtered)
  }, [searchTerm, selectedCategory, blogs])

  const addToWishlist = (blog) => {
    if (!blog || !blog.title || !blog.imageUrl || !blog.author) {
      toast.error("Blog not found!")
      return
    }
    if (!user || !user.email) {
      toast.error("Please login first to add to wishlist!")
      return
    }

    const blogData = {
      title: blog.title,
      blogId: blog._id,
      imageUrl: blog.imageUrl,
      author: blog.author,
      lister: user.email,
    }

    axios
      .post("https://samusa-blog-server.vercel.app/api/addToWishlist", blogData)
      .then((res) => {
        if (res.status === 200 && res.data.wishlist?.acknowledged === true) {
          toast.success("Added to wishlist!")
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message)
        } else {
          toast.error("Failed to add to wishlist!")
        }
      })
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }


  const BlogCardSkeleton = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white ring-1 ring-gray-300 shadow rounded overflow-hidden transition duration-300"
    >
      <Skeleton height={192} width="100%" />
      <div className="p-5">
        <Skeleton height={28} width="80%" className="mb-2" />
        <Skeleton count={2} className="mb-4" />
        <div className="flex my-1 items-center justify-between">
          <Skeleton width={100} height={20} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 py-3 border-t border-gray-300 mt-2">
          <Skeleton height={40} width="100%" />
          <Skeleton height={40} width="100%" />
        </div>
      </div>
    </motion.div>
  )

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen px-4 md:px-10 pt-6 pb-10">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center text-4xl font-bold text-gray-800"
          >
            All Blogs
          </motion.h1>
          <Skeleton height={50} className="mt-5" />
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {categories.map((_, i) => (
              <Skeleton key={i} width={80} height={36} className="rounded-full" />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {Array(6)
            .fill()
            .map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen px-4 md:px-10 pt-6 pb-10">
      <motion.div className="mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center text-4xl font-bold text-gray-800"
        >
          All Blogs
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search Blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-5 w-full mx-auto block px-5 py-3 rounded-md outline-none ring-1 bg-white ring-gray-300 focus:ring-[#10B981] transition duration-200"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-5 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border ${selectedCategory === cat
                ? "bg-[#10B981] text-white border-[#10B981]"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
                } transition duration-200`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + searchTerm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, i) => (
              <motion.div
                key={blog._id || i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white ring-1 ring-gray-300 shadow rounded overflow-hidden transition duration-300"
              >
                <Tooltip title="Click to preview image">
                  <PhotoProvider>
                    <PhotoView src={blog.imageUrl}>
                      <motion.img
                        src={blog.imageUrl || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-48 object-cover cursor-zoom-in"
                        loading="lazy"
                        initial={{ scale: 1.1 }}
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.4 }}
                      />
                    </PhotoView>
                  </PhotoProvider>
                </Tooltip>
                <div className="p-5">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                    className="text-xl font-semibold text-gray-800 mb-2"
                  >
                    {blog.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    className="text-gray-600 text-sm mb-4"
                  >
                    {blog.shortDescription.length > 100
                      ? blog.shortDescription.slice(0, 100) + "..."
                      : blog.shortDescription}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                    className="flex my-1 items-center justify-between text-gray-500"
                  >
                    <motion.span
                      whileHover={{ color: "#10B981" }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1"
                    >
                      <FaUserAlt />
                      <p>{blog?.author}</p>
                    </motion.span>
                    {user?.displayName == blog?.author && (
                      <Link to={`/blog/edit/${blog._id}`}>
                        <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Tooltip title="Edit blog">
                            <motion.button className="flex items-center gap-1 bg-green-300 px-3 cursor-pointer py-1 rounded-md hover:text-black duration-200">
                              <FaPencilAlt />
                              <p>Edit blog</p>
                            </motion.button>
                          </Tooltip>
                        </motion.span>
                      </Link>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-3 py-3 border-t border-gray-300"
                  >
                    <Link to={`/blog/${blog._id}`} className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.03, backgroundColor: "#458d75" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="w-full text-white cursor-pointer px-5 py-2 rounded bg-[#10B981] hover:bg-[#458d75] duration-200"
                      >
                        View more
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={() => addToWishlist(blog)}
                      whileHover={{ scale: 1.03, borderColor: "#458d75" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="w-full text-[#10B981] cursor-pointer px-5 py-2 rounded ring-[#10B981] ring-1 hover:ring-2 hover:ring-[#458d75] duration-200"
                    >
                      Wishlist
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center col-span-3 text-gray-500"
            >
              No blogs found!
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default AllBlogs
