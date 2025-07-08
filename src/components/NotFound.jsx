import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 py-20 text-gray-800">
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        Oops! The page you are looking for doesn't exist, has been removed, or
        is temporarily unavailable. But don’t worry—we’ve got some links to help
        you find your way.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-[#10B981] hover:bg-[#0e9f75] text-white font-medium py-3 px-6 rounded-md transition duration-200 mb-10"
      >
        <FaArrowLeft />
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
