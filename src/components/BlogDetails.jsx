"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiCategory, BiTime, BiUser } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TextField, Button, Box, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/blog/${id}`)
      .then((data) => {
        const blogData = data.data.blog;
        setBlog(blogData);
      })
      .catch((err) => {
        console.log("Error fetching blog:", err);
      });
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    // Here you would typically send the comment to your API
    setComment("");
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-emerald-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-medium">
            Loading blog details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={blog.imageUrl || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-12">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <BiCategory className="text-emerald-500 text-lg" />
            <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Short Description */}
          <div className="bg-gray-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-lg">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic">
              {blog.shortDescription}
            </p>
          </div>

          {/* Long Description */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-8 whitespace-pre-line text-base md:text-lg">
              {blog.longDescription}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 md:px-8 lg:px-12 py-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <BiUser className="text-gray-500" />
                <span>Author</span>
              </div>
              <div className="flex items-center gap-1">
                <BiTime className="text-gray-500" />
                <span>Published</span>
              </div>
            </div>
            <div className="text-gray-400">Article ID: {id}</div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="bg-white px-6 md:px-8 lg:px-12 py-8 border-t border-gray-200">
          <Typography
            variant="h5"
            component="h2"
            className="mb-6 font-bold text-gray-900"
          >
            Leave a Comment
          </Typography>
          <Box
            component="form"
            onSubmit={handleCommentSubmit}
            className="space-y-4"
          >
            <div className="my-3">
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                color="success"
                label="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this blog post..."
                className="mb-4"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              disabled={!comment.trim()}
              className="px-8 py-2"
            >
              Post Comment
            </Button>
          </Box>
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
