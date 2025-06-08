import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RootLayout from "../components/RootLayout";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NotFound from "../components/NotFound";
import AddBlog from "../components/AddBlog";
import PrivateRoute from "./PrivateRoute";
import AllBlogs from "../components/AllBlogs";
import BlogDetails from "../components/BlogDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
      },
      {
        path: "/all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
