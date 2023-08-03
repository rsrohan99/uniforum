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

const Post = () => {
  console.log("hello")
  return (
    <div
      className="mt-8 flex h-screen flex-row items-start justify-between bg-red-500">
      Post
    </div>
  );
}


export default Post;