"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUser, FaCalendarAlt, FaTrash } from "react-icons/fa";
import { TextField, Button, Box, Typography, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const { user } = useAuth();
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

  // Fetch comments
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  const fetchComments = () => {
    setLoadingComments(true);
    axios
      .get("http://localhost:2000/api/allComments")
      .then((data) => {
        const comments = data.data.comment;
        const blogComments = comments.filter(
          (comment) => comment.blogId === id
        );
        setComments(blogComments);
        setLoadingComments(false);
      })
      .catch((err) => {
        console.log("Error fetching comments:", err);
        setLoadingComments(false);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      comment,
      blogId: id,
      author: user?.displayName,
      profilePic: user?.photoURL,
    };
    axios
      .post(`http://localhost:2000/api/addcomment`, commentData)
      .then((data) => {
        toast.success("Comment submitted successfully");
        setComment("");
        fetchComments();
      })
      .catch((err) => {
        toast.error("Error submitting comment..");
        console.log(err);
      });
  };

  const handleDeleteComment = (id) => {
    axios
      .delete(`http://localhost:2000/api/deletecomment/${id}`)
      .then((data) => {
        toast.success("Comment deleted successfully");
        fetchComments();
      })
      .catch((err) => {
        toast.error("Error deleting comment..");
        console.log(err);
      });
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
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={blog.imageUrl || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="p-6 md:p-8 lg:p-12">
          <div className="flex items-center gap-2 mb-4">
            <BiCategory className="text-emerald-500 text-lg" />
            <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
          </div>
          <div className="flex items-center gap-6 mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <FaUser className="text-emerald-600 text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Written by</p>
                <p className="font-semibold text-gray-800">
                  {blog.author || "Anonymous"}
                </p>
              </div>
            </div>
            {blog.createdAt && (
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Published on</p>
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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="bg-gray-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-lg">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic">
              {blog.shortDescription}
            </p>
          </div>
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-8 whitespace-pre-line text-base md:text-lg">
              {blog.longDescription}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 md:px-8 lg:px-12 py-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="text-gray-400">Article ID: {id}</div>
              {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                <div className="text-gray-400">
                  Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-400" />
              <span className="text-gray-500">
                By {blog.author || "Anonymous"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white px-6 md:px-8 lg:px-12 py-8 border-t border-gray-200">
          <div className="mb-8">
            <Typography
              variant="h5"
              component="h2"
              className="mb-6 font-bold text-gray-900"
            >
              Comments ({comments.length})
            </Typography>

            {loadingComments ? (
              <div className="flex items-center justify-center py-8">
                <AiOutlineLoading3Quarters className="animate-spin text-2xl text-emerald-500 mr-2" />
                <span className="text-gray-600">Loading comments...</span>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-4 mb-8">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-md bg-emerald-100  flex items-center justify-center">
                        <img
                          className="rounded-md"
                          src={comment?.profilePic}
                          alt=""
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-gray-800">
                          {comment.author}
                        </span>
                        {user?.displayName == comment.author && (
                          <Tooltip title="Delete">
                            {" "}
                            <button
                              className="text-red-500 hover:text-red-600 cursor-pointer"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              <FaTrash />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed ml-10">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 pt-8">
            <Typography
              variant="h6"
              component="h3"
              className="mb-4 font-semibold text-gray-900"
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
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
