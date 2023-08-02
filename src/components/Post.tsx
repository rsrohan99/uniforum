'use client'

import React from "react";

const Post = () => {
  const post = {
    user: {
      name: "John Doe",
      image: "https://picsum.photos/200/300"
    },
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    timestamp: "2021-09-01T00:00:00.000Z",
    hierarchy: "BUET/CSE",
    body: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    tags: ["tag1", "tag2", "tag3"],
    upvotes: 10,
    replies: 5
  }
  return (
    <div
      className="m-5">
      <div className="flex items-center justify-between">
        <div>
          <img src={post.user.image} alt="user image" className="w-12 h-12 rounded-full" />
        </div>
        <div>
          <p>1 hour ago</p>
        </div>
        <div>
          <p>{post.hierarchy}</p>
        </div>
        <div>
          <p>Announcement</p>
        </div>
      </div>
      <div>
        <h5 className="">{post.title}</h5>
      </div>
      <div>
        <p>{post.body}</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p>upvotes: {post.upvotes}</p>
        </div>
        <div>
          <p>replies: {post.replies}</p>
        </div>
        <div>
          <p>share</p> 
        </div>
        <div>
          <p>save</p>
        </div>
        <div>
          <p>report</p>
        </div>
      </div>
    </div>
  );
}

export default Post;