'use client'

import React from "react";
import {ChevronDown, ChevronUp, Flag, MessageCircle, Save, Share2} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";

function timeAgo(timestamp: string): string {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  const elapsedMilliseconds = currentDate.getTime() - targetDate.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} second${elapsedSeconds === 1 ? '' : 's'} ago`;
  }

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minute${elapsedMinutes === 1 ? '' : 's'} ago`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);

  if (elapsedHours < 24) {
    return `${elapsedHours} hour${elapsedHours === 1 ? '' : 's'} ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays < 30) {
    return `${elapsedDays} day${elapsedDays === 1 ? '' : 's'} ago`;
  }

  const elapsedMonths = Math.floor(elapsedDays / 30);

  if (elapsedMonths < 12) {
    return `${elapsedMonths} month${elapsedMonths === 1 ? '' : 's'} ago`;
  }

  const elapsedYears = Math.floor(elapsedMonths / 12);
  return `${elapsedYears} year${elapsedYears === 1 ? '' : 's'} ago`;
}

export interface PostProps {
  // post: {
  id: string,
  user: {
    username: string;
    profile_pic: string;
  };
  title: string;
  date_posted: string;
  hierarchy: string;
  content: string;
  // tags: string[];
  upvotes: number;
  replies: number;
  post_type: string;
  // }
}

const Post: React.FC<PostProps> = ({
  ...post
}) => {
  return (
    <div
      className="bg-white p-5 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.user.profile_pic}/>
            <AvatarFallback className="bg-background">{post.user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {/*<img src={post.user.image} alt="user image" className="w-8 h-8 rounded-full" />*/}
          <p className="pl-3 text-gray-500 text-xs font-semibold">@{post.user.username}</p>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-3xl pr-2 pb-[17px] text-accent2">.</span>
          <p className="text-gray-500 font-semibold text-xs">{timeAgo(post.date_posted)}</p>
        </div>
        <div>
          <p className="text-gray-500 font-bold bg-background py-2 px-4 rounded-2xl text-xs">{post.hierarchy.toUpperCase()}</p>
        </div>
        <div>
          <p className="text-gray-500 font-bold bg-background py-2 px-4 rounded-2xl text-xs tracking-wide">{post.post_type}</p>
        </div>
      </div>
      <div className="mt-1 flex">
        <h5 className="text-gray-600 font-bold text-xl">{post.title}</h5>
        {/*<div className="flex ml-5">*/}
        {/*  {post.tags.map((tag, index) => (*/}
        {/*    <div*/}
        {/*      key={index}*/}
        {/*      className="bg-accent2 rounded-2xl h-6 px-4 py-1 text-white tracking-wide font-semibold text-xs ml-1 align-middle">*/}
        {/*      #&nbsp;{tag}*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
      <div className="mt-3">
        <p className="text-gray-500 font-medium text-sm">{post.content}</p>
      </div>
      <div className="flex items-center justify-between mt-7 font-semibold text-xs text-slate-500">
        <div className="flex items-center bg-background rounded-3xl px-6 py-2">
          <ChevronUp size={18} className="text-accent2" />
          <p className="ml-4 text-accent2">{post.upvotes}</p>
          <ChevronDown size={18} className="ml-4 text-slate-500" />
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