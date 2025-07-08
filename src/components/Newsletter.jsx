import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      `Thank you "${email}" for subscribing to Samusa Blog! We're thrilled to have you on board!`
    );
  };
  return (
    <div className="px-5 md:px-10">
      <div className="bg-emerald-500 text-white p-6 sm:p-10 rounded-2xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="opacity-90 mb-6 text-base sm:text-lg">
          Stay updated with our latest news, articles, and special offers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg border border-white bg-transparent text-white placeholder-white outline-none focus:ring-2 focus:ring-white transition-all duration-300 w-full max-w-xs"
          />
          <button
            type="submit"
            className="px-6  cursor-pointer py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
