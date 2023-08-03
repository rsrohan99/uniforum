'use client'

import React from "react";

const Post = () => {
  console.log("hello")
  const post = [
    {
      user: {
        name: "John Doe",
        image: "https://picsum.photos/200/300"
      },
      title: "Post 1 Title",
      timestamp: "2021-09-01T00:00:00.000Z",
      hierarchy: "BUET/CSE",
      body: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      tags: ["tag1", "tag2", "tag3"],
      upvotes: 10,
      replies: 5
    },
    {
      user: {
        name: "oliver",
        image: "https://picsum.photos/200/301"
      },
      title: "Post 2 Title",
      timestamp: "2021-09-02T00:00:00.000Z",
      hierarchy: "BUET/CSE/CSE305",
      body: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      tags: ["tag4", "tag5", "tag6"],
      upvotes: 15,
      replies: 10
    }
  ];

  return (
    <div className="mt-8 flex h-screen flex-row items-start justify-between bg-red-500">
    <div className="m-5">
      {/* Loop through each post */}
      {post.map((post, index) => (
        <div key={index}>
          <div className="flex items-center justify-between">
            <div>
              <img src={post.user.image} alt="user image" className="w-12 h-12 rounded-full" />
            </div>
            <div>
              <p>5 hours ago</p>
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
      ))}
    </div>
  </div>
  );
}


export default Post;