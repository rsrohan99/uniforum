'use client'

import React from "react";
import {ChevronDown, ChevronUp, Flag, MessageCircle, Save, Share2} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {useRouter} from "next/navigation";

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
  subtitle: string;
  date_posted: string;
  // content: string;
  upvotes: number;
  replies: number;
  post_type: string;
  university: string,
  department: string,
  course: string,
  // }
}

const Post: React.FC<PostProps> = ({
  ...post
}) => {
  const router = useRouter()
  let h_dept, h_course;
  if (post.department?.includes('_all_~')) h_dept = ''
  else h_dept = post.department
  if (post.course?.includes('_all_~')) h_course = ''
  else h_course = post.course
  let hierarchy = post.university
  if (h_dept) hierarchy += ` • ${h_dept}`
  if (h_course) hierarchy += ` • ${h_course}`
  return (
    <div
      onClick={() => router.push(`/app/posts/${post.id}`)}
      className="rounded-xl bg-white p-5 shadow-sm cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.user.profile_pic}/>
            <AvatarFallback className="bg-background">{post.user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {/*<img src={post.user.image} alt="user image" className="h-8 w-8 rounded-full" />*/}
          <p className="pl-3 text-xs font-semibold text-gray-500">@{post.user.username}</p>
        </div>
        <div className="flex items-center">
          <span className="pr-2 text-3xl font-bold pb-[17px] text-accent2">.</span>
          <p className="text-xs font-semibold text-gray-500">{timeAgo(post.date_posted)}</p>
        </div>
        <div>
          <p className="rounded-2xl px-4 py-2 text-xs font-bold text-gray-500 bg-background">{hierarchy.toUpperCase()}</p>
        </div>
        <div>
          <p className="rounded-2xl px-4 py-2 text-xs font-bold tracking-wide text-gray-500 bg-background">{post.post_type}</p>
        </div>
      </div>
      <div className="mt-1 flex">
        <h5 className="text-xl font-bold text-gray-600">{post.title}</h5>
        {/*<div className="ml-5 flex">*/}
        {/*  {post.tags.map((tag, index) => (*/}
        {/*    <div*/}
        {/*      key={index}*/}
        {/*      className="ml-1 h-6 rounded-2xl px-4 py-1 align-middle text-xs font-semibold tracking-wide text-white bg-accent2">*/}
        {/*      #&nbsp;{tag}*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
      <div className="mt-3">
        <p className="text-sm font-medium text-gray-500">{post.subtitle}</p>
      </div>
      <div className="mt-7 flex items-center justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center rounded-3xl px-6 py-2 bg-background">
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