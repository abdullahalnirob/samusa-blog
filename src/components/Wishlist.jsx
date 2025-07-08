import { use, useEffect, useState } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `https://samusa-blog-server.vercel.app/api/wishlist?email=${user.email}`,
          {
            withCredentials: true,
          }
        );
        setWishlistItems(response.data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://samusa-blog-server.vercel.app/api/deleteFromWishlist/${id}`)
      .then((res) => {
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        toast.success("Item deleted from wishlist");
      })
      .catch((err) => {
        toast.error("Error deleting item from wishlist");
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <CircularProgress size={50} color="success" />
        <p className="mt-4 text-lg my-1 sm:text-xl text-gray-600 font-medium">
          Wishlist are loading..
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wishlistItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="px-3 py-2 whitespace-nowrap text-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                      {item.author}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-center ">
                      <span className="mx-3">
                        <Link to={`/blog/${item.blogId}`}>
                          <Button variant="contained" color="success">
                            View
                          </Button>
                        </Link>
                      </span>
                      <Button
                        onClick={() => handleDelete(item._id)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-3 py-2 border-t border-gray-200 text-xs text-gray-600">
            Showing {wishlistItems.length} items
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
