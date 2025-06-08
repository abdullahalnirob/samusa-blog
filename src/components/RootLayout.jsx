import React from "react";
import Hero from "./Hero";
import Newsletter from "./Newsletter";
import RecentPosts from "./RecentPosts";

const RootLayout = () => {
  return (
    <div>
      <Hero />
      <RecentPosts />
      <Newsletter />
    </div>
  );
};

export default RootLayout;
