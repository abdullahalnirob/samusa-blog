import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black text-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="md:w-1/2">
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 object-contain mr-3"
              src="samosa.png"
              alt="Samusa Logo"
            />
            <p className="text-3xl md:text-4xl font-bold">Samusa Blog</p>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 md:pr-20">
            Welcome to Samusa Blog — your daily dose of inspiration, innovation,
            and insight. Whether you're here to explore the latest trends in
            tech, dive into personal growth stories, or discover hidden
            lifestyle hacks, Samusa is your cozy digital corner. Our mission is
            simple: to spark curiosity, fuel creativity, and build a community
            where knowledge meets passion. Join us on this journey — one story,
            one thought, one idea at a time.
          </p>
        </div>
        <div className="md:w-1/4">
          <p className="text-xl font-semibold mb-4">Links</p>
          <ul className="space-y-2 text-gray-300 flex flex-col">
            <Link to="/" className="hover:text-white cursor-pointer">Home</Link>
            <Link to="/add-blog" className="hover:text-white cursor-pointer">Add Blog</Link>
            <Link to="/all-blogs" className="hover:text-white cursor-pointer">All Blogs</Link>
            <Link to="/featured-blogs" className="hover:text-white cursor-pointer">Featured Blogs</Link>
            <Link to="/wishlist" className="hover:text-white cursor-pointer">Wishlist</Link>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        © {currentYear} Samusa Blog. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
