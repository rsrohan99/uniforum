import React from "react";
import Post from "../Post";

const PostsContainer = () => {
  return (
    <div
      className="w-10/12 lg:w-7/12 flex rounded-xl flex-col bg-white">
      <Post />
    </div>
  );
}

export default PostsContainer;