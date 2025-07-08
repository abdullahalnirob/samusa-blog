import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";
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

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const { user } = useAuth();
  const author = user?.displayName;
  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title,
      imageUrl,
      category,
      shortDescription,
      longDescription,
      author,
    };
    axios
      .post("https://samusa-blog-server.vercel.app/api/addblog", blogData)
      .then(() => {
        toast.success("Successfully blog added!");
        setTitle("");
        setCategory("");
        setImageUrl("");
        setShortDescription("");
        setLongDescription("");
      })
      .catch(() => {
        toast.error("Something error! Blog is not create!");
      });
  };

  return (
    <div className="min-h-screen py-6 px-2">
      <div className="max-w-2xl mx-auto bg-white shadow-md ring-1 ring-gray-200 rounded-md">
        <div className="bg-gradient-to-r rounded-md from-green-500 to-emerald-600 px-6 py-4">
          <h1 className="text-xl font-bold text-white mb-1">
            Create Blog Post
          </h1>
          <p className="text-green-100 text-sm">Share your thoughts</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <TextField
                fullWidth
                size="small"
                label="Blog Title"
                color="success"
                sx={{
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#10b981",
                    },
                  },
                }}
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
                color="success"
                sx={{
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#10b981",
                    },
                  },
                }}
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
                color="success"
                sx={{
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#10b981",
                    },
                  },
                }}
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
                color="success"
                sx={{
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#10b981",
                    },
                  },
                }}
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
                color="success"
                sx={{
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#10b981",
                    },
                  },
                }}
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
                background: "linear-gradient(45deg, #4caf50 30%, #00e676 90%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #388e3c 30%, #00c853 90%)",
                },
              }}
            >
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
