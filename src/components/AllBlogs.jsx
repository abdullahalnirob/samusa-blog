import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/allBlogs")
      .then((data) => {
        setBlogs(data.data.blogs);
      })
      .catch((err) => {
        toast.error(`Failed to load blogs!`);
      });
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-10 pt-6 pb-10">
      <div className="mb-10">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          All Blogs
        </h1>
        <input
          type="text"
          placeholder="Search Blog..."
          className="mt-5 w-full mx-auto block px-5 py-3 rounded-md outline-none ring-1 bg-white ring-gray-300  focus:ring-[#10B981] transition duration-200"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(blogs) &&
          blogs.map((blog, i) => (
            <div
              key={i}
              className="bg-white shadow rounded overflow-hidden  transition duration-300"
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
              <button className="mb-3 mx-3 text-white cursor-pointer px-5 py-3 rounded bg-[#10B981] hover:bg-[#458d75] duration-200">
                View more
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBlogs;
