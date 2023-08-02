import React from "react";
import FilterBox from "~/components/home-container/FilterBox";
import PostsContainer from "~/components/home-container/PostsContainer";
import CoursesTree from "~/components/home-container/CoursesTree";

const Container = () => {
  return (
    <div
      className="mt-4 md:mt-8 flex px-2 sm:px-7 h-full w-full flex-row items-start justify-between">
      <FilterBox/>
      <PostsContainer/>
      <CoursesTree/>
    </div>
  );
}

export default Container;
