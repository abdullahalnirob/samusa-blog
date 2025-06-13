import { Tooltip } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaUserAlt, FaPencilAlt } from "react-icons/fa";
import useAuth from "../hook/useAuth";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
];

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/allBlogs")
      .then((data) => {
        setBlogs(data.data.blogs);
        setFilteredBlogs(data.data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`Failed to load blogs!`);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory, blogs]);

  const addToWishlist = (blog) => {
    if (!blog || !blog.title || !blog.imageUrl || !blog.author) {
      toast.error("Blog not found!");
      return;
    }
    if (!user || !user.email) {
      toast.error("Please login first to add to wishlist!");
      return;
    }

    const blogData = {
      title: blog.title,
      blogId: blog._id,
      imageUrl: blog.imageUrl,
      author: blog.author,
      lister: user.email,
    };

    axios
      .post("http://localhost:2000/api/addToWishlist", blogData)
      .then((res) => {
        if (res.status === 200 && res.data.wishlist?.acknowledged === true) {
          toast.success("Added to wishlist!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Failed to add to wishlist!");
        }
      });
  };

  const BlogCardSkeleton = () => (
    <div className="bg-white ring-1 ring-gray-300 shadow rounded overflow-hidden transition duration-300">
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
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen px-4 md:px-10 pt-6 pb-10">
        <div className="mb-10">
          <h1 className="text-center text-4xl font-bold text-gray-800">
            All Blogs
          </h1>
          <Skeleton height={50} className="mt-5" />
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {categories.map((_, i) => (
              <Skeleton
                key={i}
                width={80}
                height={36}
                className="rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill()
            .map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
        </div>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-5 w-full mx-auto block px-5 py-3 rounded-md outline-none ring-1 bg-white ring-gray-300 focus:ring-[#10B981] transition duration-200"
        />
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border ${selectedCategory === cat
                ? "bg-[#10B981] text-white border-[#10B981]"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
                } transition duration-200`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, i) => (
            <div
              key={i}
              className="bg-white ring-1 ring-gray-300 shadow rounded overflow-hidden transition duration-300"
            >
              <Tooltip title="Click to preview image">
                <PhotoProvider>
                  <PhotoView src={blog.imageUrl}>
                    <img
                      src={blog.imageUrl || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-48 object-cover cursor-zoom-in"
                      loading="lazy"
                    />
                  </PhotoView>
                </PhotoProvider>
              </Tooltip>
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
                    <Link to={`/blog/edit/${blog._id}`}>
                      <span>
                        <Tooltip title="Edit blog">
                          <button className="flex items-center gap-1 bg-green-300 px-3 cursor-pointer py-1 rounded-md  hover:text-black duration-200">
                            <FaPencilAlt />
                            <p>Edit blog</p>
                          </button>
                        </Tooltip>
                      </span>
                    </Link>
                  )}
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 py-3 border-t border-gray-300">
                  <Link to={`/blog/${blog._id}`} className="w-full">
                    <button className="w-full text-white cursor-pointer px-5 py-2 rounded bg-[#10B981] hover:bg-[#458d75] duration-200">
                      View more
                    </button>
                  </Link>
                  <button
                    onClick={() => addToWishlist(blog)}
                    className="w-full text-[#10B981] cursor-pointer px-5 py-2 rounded ring-[#10B981] ring-1 hover:ring-2 hover:ring-[#458d75] duration-200"
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No blogs found!
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
