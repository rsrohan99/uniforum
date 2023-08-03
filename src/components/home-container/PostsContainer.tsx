import React from "react";

import Post from "~/components/Post";

const PostsContainer = () => {
  return (
    <div
      className="w-10/12 lg:w-7/12 flex rounded-xl flex-col">
      {/*PostsContainer*/}
      <Post/>
    </div>
  );
}

export default PostsContainer;