import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { FaPencilAlt, FaUserAlt } from "react-icons/fa";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecentPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("https://samusa-blog-server.vercel.app/api/allBlogs")
      .then((res) => {
        const latestBlogs = res.data.blogs.slice(-6).reverse();
        setBlogs(latestBlogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recent blogs", err);
        toast.error("Failed to load recent blogs!");
        setLoading(false);
      });
  }, []);

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
      .post("https://samusa-blog-server.vercel.app/api/addToWishlist", blogData)
      .then((res) => {
        if (res.status === 200 && res.data.wishlist?.acknowledged === true) {
          toast.success("Added to wishlist successfully!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something problem in server..");
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
      <div className="px-4 md:px-10 py-10">
        <Skeleton height={40} width={200} className="mx-auto mb-8" />{" "}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
    <div className="px-4 md:px-10 py-10">
      <h2
        className="text-3xl font-bold text-center text-gray-800 mb-8"
        id="latest"
      >
        Recent Blogs
      </h2>
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <div
            key={i}
            className="bg-white ring-1 ring-gray-300 shadow rounded overflow-hidden transition duration-300"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover"
              loading="lazy"
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
                  <Link to={`/blog/edit/${blog._id}`}>
                    <span>
                      <Tooltip title="Edit blog">
                        <button className="flex items-center gap-1 bg-green-300 px-3 cursor-pointer py-1 rounded-md hover:text-black duration-200">
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
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
