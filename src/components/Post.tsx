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
      title: "Conference On Computer Vision Will Be Held Tomorrow",
      timestamp: "2021-09-01T00:00:00.000Z",
      hierarchy: "BUET/CSE",
      body: "A conference on computer vision will held tomorrow at 9 am on 4th August,2023,arranged by Buet,Cse.All students are expected to participate in this program.",
      tags: ["tag1", "tag2", "tag3"],
      upvotes: 220,
      replies: 118
    },
    {
      user: {
        name: "oliver",
        image: "https://picsum.photos/200/301"
      },
      title: "CSE 305 ct will be held on 6th August,2023",
      timestamp: "2021-09-02T00:00:00.000Z",
      hierarchy: "BUET/CSE/CSE305",
      body: "CSE 305 class date has been announced. The syllebus is from chapter 1 to chapter 3.",
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