import React from "react";
import FilterBox from "~/components/home-container/FilterBox";
import PostsContainer from "~/components/home-container/PostsContainer";
import CoursesTree from "~/components/home-container/CoursesTree";

const Container = () => {
  return (
    <div
      className="mt-4 flex h-full w-full flex-row items-start justify-between overflow-hidden px-2 sm:px-7 md:mt-8">
      <FilterBox/>
      <PostsContainer/>
      <CoursesTree/>
    </div>
  );
}

export default Container;
