import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/allBlogs")
      .then((data) => {
        setBlogs(data.data.blogs);
        setLoading(false); // ✅ stop loading
      })
      .catch((err) => {
        toast.error(`Failed to load blogs!`);
        setLoading(false); // ✅ still stop loading on error
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <CircularProgress size={50} color="success" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-10 pt-6 pb-10">
      <div className="mb-10">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          All Blogs
        </h1>
        <input
          type="text"
          placeholder="Search Blog..."
          className="mt-5 w-full mx-auto block px-5 py-3 rounded-md outline-none ring-1 bg-white ring-gray-300 focus:ring-[#10B981] transition duration-200"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(blogs) &&
          blogs.map((blog, i) => (
            <div
              key={i}
              className="bg-white ring-1 ring-gray-300 shadow rounded overflow-hidden transition duration-300"
            >
              <img
                src={blog.imageUrl}
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
                <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                  {blog.category}
                </span>
              </div>
              <div className="flex justify-between items-center px-5 py-3 border-t border-gray-300">
                <Link to={`/blog/${blog._id}`}>
                  <button className="mb-3 mx-3 text-white cursor-pointer px-5 py-2 rounded bg-[#10B981] hover:bg-[#458d75] duration-200">
                    View more
                  </button>
                </Link>
                <button className="mb-3 mx-3 text-[#10B981] cursor-pointer px-5 py-2 rounded ring-[#10B981] ring-1 hover:ring-2 hover:ring-[#458d75] duration-200">
                  Wishlist
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBlogs;
