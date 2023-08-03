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

interface PostProps {
  post: {
    id: string,
    user: {
      name: string;
      image: string;
    };
    title: string;
    timestamp: number;
    hierarchy: string;
    body: string;
    tags: string[];
    upvotes: number;
    replies: number;
  }
}

const Post: React.FC<PostProps> = ({
  post
}) => {
  return (
    <div
      className="bg-white p-5 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={post.user.image} alt="user image" className="w-8 h-8 rounded-full" />
          <p className="pl-3 text-gray-500 text-xs font-semibold">@{post.user.name}</p>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-3xl pr-2 pb-[17px] text-accent2">.</span>
          <p className="text-gray-500 font-semibold text-xs">{daysAgo(post.timestamp)} day{(daysAgo(post.timestamp) > 1) ? 's':''} ago</p>
        </div>
        <div>
          <p className="text-gray-500 font-bold bg-background py-2 px-4 rounded-2xl text-xs">{post.hierarchy}</p>
        </div>
        <div>
          <p className="text-gray-500 font-bold bg-background py-2 px-4 rounded-2xl text-xs tracking-wide">Announcement</p>
        </div>
      </div>
      <div className="mt-4 flex">
        <h5 className="text-gray-600 font-bold text-xl">{post.title}</h5>
        <div className="flex ml-5">
          {post.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-accent2 rounded-2xl h-6 px-4 py-1 text-white tracking-wide font-semibold text-xs ml-1 align-middle">
              #&nbsp;{tag}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-500 font-medium text-sm">{post.body}</p>
      </div>
      <div className="flex items-center justify-between mt-5 font-semibold text-xs text-slate-500">
        <div className="flex items-center bg-background rounded-3xl px-6 py-2">
          <ArrowUp size={18} className="text-accent2" />
          <p className="ml-4 text-accent2">{post.upvotes}</p>
          <ArrowDown size={18} className="ml-4 text-slate-500" />
        </div>
        <div className="flex items-center">
          <MessageCircle size={18} />
          <p className="ml-2">{post.replies} replies</p>
        </div>
        <div className="flex items-center">
          <Share2 size={18} />
          <p className="ml-2">Share</p>
        </div>
        <div className="flex items-center">
          <Save size={18} />
          <p className="ml-2">Save</p>
        </div>
        <div className="flex items-center">
          <Flag size={18} />
          <p className="ml-2">Report</p>
        </div>
      </div>
    </div>
  );
}

export default Post;