import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";
import { useParams, useNavigate } from "react-router-dom";

const categories = [
  "Technology",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
  "Health",
  "Education",
  "Entertainment",
];

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const { user } = useAuth();
  const author = user?.displayName;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://samusa-blog-server.vercel.app/api/blog/${id}`)
      .then((res) => {
        const blog = res.data.blog;
        setTitle(blog.title || "");
        setImageUrl(blog.imageUrl || "");
        setCategory(blog.category || "");
        setShortDescription(blog.shortDescription || "");
        setLongDescription(blog.longDescription || "");
      })
      .catch(() => {
        toast.error("Failed to load blog details!");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlog = {
      title,
      imageUrl,
      category,
      shortDescription,
      longDescription,
      author,
    };

    axios
      .put(`https://samusa-blog-server.vercel.app/api/editblog/${id}`, updatedBlog)
      .then(() => {
        toast.success("Blog updated successfully!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to update blog!");
      });
  };

  return (
    <div className="min-h-screen py-6 px-2">
      <div className="max-w-2xl mx-auto bg-white shadow-md ring-1 ring-gray-200 rounded-md">
        <div className="bg-gradient-to-r rounded-md from-blue-500 to-indigo-600 px-6 py-4">
          <h1 className="text-xl font-bold text-white mb-1">Edit Blog Post</h1>
          <p className="text-blue-100 text-sm">Update your content below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <TextField
                fullWidth
                size="small"
                label="Blog Title"
                color="primary"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                size="small"
                label="Image URL"
                color="primary"
                variant="outlined"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                size="small"
                select
                label="Category"
                variant="outlined"
                color="primary"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField
                fullWidth
                size="small"
                label="Short Description"
                variant="outlined"
                multiline
                rows={2}
                color="primary"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                helperText="Max 200 characters"
              />
            </div>

            <div className="md:col-span-2">
              <TextField
                fullWidth
                size="small"
                label="Long Description"
                variant="outlined"
                multiline
                rows={4}
                color="primary"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                helperText="Detailed blog content"
              />
            </div>
          </div>

          {imageUrl && (
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Image Preview
              </h3>
              <div className="overflow-hidden max-w-md">
                <img
                  src={imageUrl}
                  alt="Blog preview"
                  className="w-full h-36 object-cover rounded"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              variant="contained"
              size="medium"
              className="text-white font-semibold rounded"
              sx={{
                background: "linear-gradient(45deg, #2196f3 30%, #1e88e5 90%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)",
                },
              }}
            >
              Update Blog
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
