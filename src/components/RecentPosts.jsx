import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CircularProgress, Tooltip } from "@mui/material";
import { FaPencilAlt, FaUserAlt } from "react-icons/fa";
import useAuth from "../hook/useAuth";

const RecentPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get("http://localhost:2000/api/allBlogs")
      .then((res) => {
        const latestBlogs = res.data.blogs.slice(-6).reverse();
        setBlogs(latestBlogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recent blogs", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <CircularProgress size={40} color="success" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Recent Blogs
      </h2>
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <div
            key={i}
            className="bg-white ring-1 ring-gray-300 shadow rounded overflow-hidden transition duration-300"
          >
            <img
              src={blog.imageUrl || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {blog.shortDescription.length > 100
                  ? blog.shortDescription.slice(0, 100) + "..."
                  : blog.shortDescription}
              </p>
              <div className="flex my-1 items-center justify-between text-gray-500">
                <span className="flex items-center gap-1">
                  <FaUserAlt />
                  <p>{blog?.author}</p>
                </span>
                {user?.displayName == blog?.author && (
                  <span>
                    <Tooltip title="Edit blog">
                      <button className="flex items-center gap-1 bg-green-300 px-3 cursor-pointer py-1 rounded-md  hover:text-black duration-200">
                        <FaPencilAlt />
                        <p>Edit blog</p>
                      </button>
                    </Tooltip>
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 py-3 border-t border-gray-300">
                <Link to={`/blog/${blog._id}`} className="w-full">
                  <button className="w-full text-white cursor-pointer px-5 py-2 rounded bg-[#10B981] hover:bg-[#458d75] duration-200">
                    View more
                  </button>
                </Link>
                <button className="w-full text-[#10B981] cursor-pointer px-5 py-2 rounded ring-[#10B981] ring-1 hover:ring-2 hover:ring-[#458d75] duration-200">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
