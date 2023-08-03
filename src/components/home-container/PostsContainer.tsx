import React from "react";

import Post from "~/components/Post";

const PostsContainer = () => {
  const posts = [
    {
      id: 'p1',
      user: {
        name: "JohnDoe",
        image: "https://picsum.photos/200/300"
      },
      title: "Conference on Computer Vision will be held on tomorrow",
      timestamp: 1690293118,
      hierarchy: "BUET/CSE",
      body: "A conference on computer vision will be held on tomorrow at 10:00 AM, 21st January, 2023, arranged by CSE, BUET. All the students are requested to join the conference.",
      tags: ["python", "js", "c++"],
      upvotes: 220,
      replies: 5
    }
  ]
  return (
    <div
      className="w-10/12 lg:w-7/12 flex rounded-xl flex-col">
      {/*PostsContainer*/}
      {posts.map(post => (
        <Post key={post.id} post={post}/>
      ))}
      {/*<Post/>*/}
    </div>
  );
}

export default PostsContainer;