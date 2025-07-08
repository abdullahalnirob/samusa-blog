import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { Tooltip } from "@mui/material";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOutUser } = useAuth();

  const handleNavClick = () => {
    setOpen(false);
  };

  const links = (
    <>
      <li onClick={handleNavClick}>
        <Link to="/" className="hover:text-[#10B981] transition">
          Home
        </Link>
      </li>
      {user && (
        <li onClick={handleNavClick}>
          <Link to="/add-blog" className="hover:text-[#10B981] transition">
            Add Blog
          </Link>
        </li>
      )}
      <li onClick={handleNavClick}>
        <Link to="/all-blogs" className="hover:text-[#10B981] transition">
          All Blogs
        </Link>
      </li>
      <li onClick={handleNavClick}>
        <Link to="/featured-blogs" className="hover:text-[#10B981] transition">
          Featured Blogs
        </Link>
      </li>
      {user && (
        <li onClick={handleNavClick}>
          <Link to="/wishlist" className="hover:text-[#10B981] transition">
            Wishlist
          </Link>
        </li>
      )}
      {user ? (
        <li className="md:hidden" onClick={handleNavClick}>
          <p
            onClick={() => {
              signOutUser();
              toast.success(`${user?.displayName} was Successfully logout`);
            }}
            className="hover:text-[#10B981] transition"
          >
            Log out
          </p>
        </li>
      ) : (
        <>
          <li className="md:hidden" onClick={handleNavClick}>
            <Link to="/login" className="hover:text-[#10B981] transition">
              Login
            </Link>
          </li>
          <li className="md:hidden" onClick={handleNavClick}>
            <Link to="/signup" className="hover:text-[#10B981] transition">
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div>
      <header className="bg-white fixed z-50 w-full left-0 right-0">
        <div className="md:mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center md:space-x-3">
                <img
                  src="samosa.png"
                  alt="Samusa logo"
                  className="w-12 h-12 object-contain"
                />
                <span className="md:text-2xl md:font-bold text-black">
                  Samusa Blog
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              {user && (
                <p className="text-sm md:hidden ring-1 ring-[#10B981] text-[#10B981] bg-[#10b9811c] rounded-md p-2">
                  {user?.displayName}
                </p>
              )}
              <div
                className="md:hidden p-1 rounded-md hover:bg-[#10B981] hover:text-white duration-200"
                onClick={() => setOpen(!open)}
              >
                <BiMenu size={30} />
              </div>
            </div>
          </div>
          <ul
            className={`fixed md:relative top-[70px] md:top-auto left-0 md:left-auto px-4 md:px-0 shadow-md md:shadow-none w-full md:w-auto py-5 md:py-0 bg-white flex flex-col md:flex-row items-start md:items-center space-x-6 space-y-5 md:space-y-0 transform duration-300 ${
              open
                ? "translate-x-0 md:translate-none"
                : "-translate-x-full md:translate-none"
            }`}
          >
            {links}
          </ul>
          <div className="flex items-center space-x-3">
            <Tooltip title={user?.displayName}>
              {user && (
                <img
                  className="w-10 cursor-pointer hidden md:block h-10 rounded-md object-cover ring-1 ring-[#10B981]"
                  src={user?.photoURL}
                  alt="User"
                />
              )}
            </Tooltip>
            {user && (
              <p className="font-bold hidden md:block ring-1 ring-[#10B981] text-[#10B981] bg-[#10b9811c] rounded-md p-2">
                {user?.displayName}
              </p>
            )}
            {user ? (
              <button
                onClick={() => {
                  signOutUser();
                  handleNavClick();
                  toast.success(`${user?.displayName} was Successfully logout`);
                }}
                className="px-4 py-2 bg-[#10B981] hover:bg-[#2a6d57] text-white rounded hidden md:block cursor-pointer transition"
              >
                Log out
              </button>
            ) : (
              <>
                <Link onClick={handleNavClick} to="/signup">
                  <button className="px-4 py-2 bg-[#10B981] hover:bg-[#2a6d57] text-white rounded cursor-pointer hidden md:block transition">
                    Sign Up
                  </button>
                </Link>
                <Link onClick={handleNavClick} to="/login">
                  <button className="px-4 py-2 bg-[#10B981] hover:bg-[#2a6d57] text-white rounded hidden md:block cursor-pointer transition">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="border-t hidden md:block border-[#c7c7c7]" />
      </header>
    </div>
  );
};

export default Navbar;
