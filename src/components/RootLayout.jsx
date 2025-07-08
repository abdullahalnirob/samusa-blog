import React from "react";
import Hero from "./Hero";
import Newsletter from "./Newsletter";
import RecentPosts from "./RecentPosts";
import Faq from "./Faq";
import Staticks from "./Staticks";

const RootLayout = () => {
  return (
    <div>
      <Hero />
      <RecentPosts />
      <Faq />
      <Staticks />
      <Newsletter />
    </div>
  );
};

export default RootLayout;
