'use client'

import React from "react";
import { ArrowDown, ArrowUp, Flag, MessageCircle, Save, Share2 } from 'lucide-react';

function daysAgo(timestamp) {
  // Step 1: Get the current timestamp
  const currentTimestamp = Date.now() / 1000;

  // Step 2: Calculate the time difference in seconds
  const timeDifference = currentTimestamp - timestamp;

  // Step 3: Convert the time difference into days
  const daysDifference = timeDifference / (24 * 60 * 60);

  return Math.floor(daysDifference); // Convert to an integer to get whole days
}

const Post = () => {
  const post = {
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
  return (
    <div
      className="m-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={post.user.image} alt="user image" className="w-12 h-12 rounded-full" />
          <p className="pl-3 text-gray-500 font-bold">@{post.user.name}</p>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-3xl pr-2 pb-3 text-accent2">.</span>
          <p className="text-gray-500 font-bold">{daysAgo(post.timestamp)} day/s ago</p>
        </div>
        <div>
          <p className="text-gray-500 font-bold bg-background py-2 px-4 rounded-2xl text-sm">{post.hierarchy}</p>
        </div>
        <div>
          <p className="text-gray-500 font-bold bg-background py-2 px-4 rounded-2xl text-sm">Announcement</p>
        </div>
      </div>
      <div className="mt-5 flex">
        <h5 className="text-gray-700 font-bold text-2xl">{post.title}</h5>
        <div className="flex ml-5">
          {post.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-accent2 rounded-2xl px-4 py-1 text-white font-bold text-sm ml-2">
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-gray-500 font-medium">{post.body}</p>
      </div>
      <div className="flex justify-between mt-5 font-bold text-slate-500">
        <div className="flex bg-background rounded-3xl px-6 py-2">
          <ArrowUp className="text-accent2" />
          <p className="ml-4 text-accent2">{post.upvotes}</p>
          <ArrowDown className="ml-4 text-slate-500" />
        </div>
        <div className="flex">
          <MessageCircle />
          <p className="ml-2">{post.replies} replies</p>
        </div>
        <div className="flex">
          <Share2 />
          <p className="ml-2">share</p> 
        </div>
        <div className="flex">
          <Save />
          <p className="ml-2">save</p>
        </div>
        <div className="flex">
          <Flag />
          <p className="ml-2">report</p>
        </div>
      </div>
    </div>
  );
}

export default Post;