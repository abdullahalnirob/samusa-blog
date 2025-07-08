import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { FaUser, FaFileAlt, FaTrophy, FaMedal } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";

const FeaturedBlogs = () => {
  const [topBlogs, setTopBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://samusa-blog-server.vercel.app/api/allBlogs")
      .then((res) => {
        const blogs = res.data.blogs;
        const blogsWithWordCount = blogs.map((blog) => ({
          ...blog,
          wordCount: blog.longDescription?.split(/\s+/).length || 0,
        }));
        const top10 = blogsWithWordCount
          .sort((a, b) => b.wordCount - a.wordCount)
          .slice(0, 10);

        setTopBlogs(top10);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load blogs!");
        setLoading(false);
      });
  }, []);

  const getRankIcon = (index) => {
    if (index === 0)
      return <FaTrophy className="text-yellow-500 text-xl sm:text-2xl" />;
    if (index === 1)
      return <FaMedal className="text-gray-400 text-xl sm:text-2xl" />;
    if (index === 2)
      return <FaMedal className="text-amber-600 text-xl sm:text-2xl" />;
    return (
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10B981] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
        {index + 1}
      </div>
    );
  };

  const getRankBadge = (index) => {
    if (index === 0)
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (index === 1)
      return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (index === 2)
      return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
    return "bg-gradient-to-r from-[#10B981] to-[#059669] text-white";
  };

  if (loading) {
    return (
      <div className="flex flex-col text-center justify-center items-center h-[70vh] px-4">
        <CircularProgress size={50} color="success" />
        <p className="mt-4 text-lg sm:text-xl text-gray-600 font-medium">
          Featured Blogs are loading....
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 md:py-12">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaTrophy className="text-[#10B981] text-2xl sm:text-3xl md:text-4xl" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">
            Top 10 Featured Blogs
          </h1>
          <FaTrophy className="text-[#10B981] text-2xl sm:text-3xl md:text-4xl" />
        </div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our most comprehensive and detailed blog posts, ranked by
          content depth and quality
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {topBlogs.slice(0, 3).map((blog, index) => (
            <div
              key={blog._id}
              className={`relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${index === 0 ? "md:col-span-3 lg:col-span-1" : ""
                } ${index === 0
                  ? "transform hover:scale-[1.02]"
                  : "transform hover:scale-[1.03]"
                }`}
            >
              {" "}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                <div
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${getRankBadge(
                    index
                  )}`}
                >
                  #{index + 1} Featured
                </div>
              </div>
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  {getRankIcon(index)}
                  <div className="flex items-center gap-2">
                    <BiCategory className="text-[#10B981] text-sm sm:text-base" />
                    <span className="text-xs sm:text-sm font-semibold text-[#10B981] bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 line-clamp-2 leading-tight">
                  {blog.title}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                  {blog.shortDescription?.slice(0, 120)}...
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-500 text-sm" />
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      {blog.author || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaFileAlt className="text-[#10B981] text-sm" />
                    <span className="text-sm sm:text-base font-bold text-[#10B981]">
                      {blog.wordCount} words
                    </span>
                  </div>
                </div>
                <Link to={`/blog/${blog._id}`}>
                  <button className="w-full cursor-pointer bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-[#059669] hover:to-[#047857] transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base">
                    Read Full Article
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#10B981] to-[#059669] px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <FaMedal className="text-yellow-300" />
              More Featured Articles
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {topBlogs.slice(3).map((blog, index) => (
              <div
                key={blog._id}
                className="p-4 sm:p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getRankIcon(index + 3)}
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={blog.imageUrl || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 line-clamp-2">
                        {blog.title}
                      </h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <FaFileAlt className="text-[#10B981] text-sm" />
                        <span className="text-sm sm:text-base font-bold text-[#10B981]">
                          {blog.wordCount} words
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-500 text-sm" />
                          <span className="text-sm text-gray-600">
                            {blog.author || "Anonymous"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BiCategory className="text-gray-500 text-sm" />
                          <span className="text-xs sm:text-sm bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      <Link to={`/blog/${blog._id}`}>
                        <button className="bg-[#10B981] cursor-pointer hover:bg-[#059669] text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
