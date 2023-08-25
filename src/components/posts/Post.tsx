'use client'

import React from "react";
import {ChevronDown, ChevronUp, Download, Flag, MessageCircle, Share2, Trash} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {useRouter} from "next/navigation";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "~/components/ui/alert-dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import {showErrorToast} from "~/components/posts/Compose";
import toast from "react-hot-toast";
import {useTriggerPostRefresh} from "~/hooks/useTriggerPostRefresh";
import NProgress from "nprogress";
import ShareButtom from "~/components/posts/ShareButtom";
import {useBookmarks} from "~/hooks/useBookmarks";

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
    user_id: string,
    username: string;
    profile_pic: string;
  };
  title: string;
  subtitle: string;
  date_posted: string;
  content?: string;
  // upvotes: number;
  // replies: number;
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

  const session = useSession();
  const supabase = useSupabase();
  const {toggleTriggerPostRefresh} = useTriggerPostRefresh()
  const {getLatestBookmarks} = useBookmarks()

  const deletePost = async () => {
    toast.loading("Deleting the post", {position: "bottom-right", id: 'deleting'})
    const {error} = await supabase
      .from('posts')
      .delete()
      .eq('id', post.id)

    if (error) showErrorToast("Error while deleting your post.")
    else {
      toast.remove('deleting')
      toast.success("Post deleted", {position: "bottom-right"})
      toggleTriggerPostRefresh();
    }

  }

  const saveBookmark = async (id: string) => {
    const {error} = await supabase
      .from('bookmarks')
      .insert({
        user_id: session?.user.id,
        post_id: id
      })
    if (error) {
      if (error.message.includes("duplicate key value")) {
        await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', session?.user.id)
          .eq('post_id', id)
      }
      toast.success("Removed bookmark.", {position: "bottom-right"})
    } else
    toast.success("Saved as bookmark.", {position: "bottom-right"})
    if (getLatestBookmarks()) toggleTriggerPostRefresh()
  }

  const goToPostPage = () => {
    NProgress.start()
    router.push(`/app/posts/${post.id}`)
  }

  return (
    <div
      className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex mb-2 flex-wrap gap-2 items-center justify-between">
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
        {(post.user.user_id === session?.user.id) && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash className="cursor-pointer h-8 w-8 p-2 bg-background text-red-400 rounded-full" size={18} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  post and remove your it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='focus-visible:ring-0 focus-visible:ring-offset-0'>Cancel</AlertDialogCancel>
                <AlertDialogAction className='focus-visible:ring-0 focus-visible:ring-offset-0' onClick={deletePost}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <div onClick={goToPostPage} className='cursor-pointer'>
        <div
          className="mt-1 flex">
          <h5
            className="text-xl font-bold text-gray-600">{post.title}</h5>
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
        <div
          className="mt-3">
          <p className="text-sm font-medium text-gray-500">{post.subtitle}</p>
        </div>
      </div>
      <div className="mt-7 flex flex-wrap gap-3 items-center justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center rounded-3xl px-6 py-2 bg-background">
          <ChevronUp size={18} className="text-accent2" />
          <p className="ml-4 text-accent2">{post.upvotes}</p>
          <ChevronDown size={18} className="ml-4 text-slate-500" />
        </div>
        <div className="flex items-center">
          <MessageCircle size={18} />
          <p className="ml-2">{post.replies} replies</p>
        </div>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center hover:text-accent2">
                <Share2 size={18} />
                <p className="ml-2">Share</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full text-muted-foreground">
              <ShareButtom link={`${location.href}/app/posts/${post.id}`}/>
            </PopoverContent>
          </Popover>
        <div className="flex items-center hover:text-accent2 cursor-pointer"
             onClick={async () => await saveBookmark(post.id)}
        >
          <Download size={18} />
          <p className="ml-2">Save</p>
        </div>
        {/*<div className="flex items-center">*/}
        {/*  <Flag size={18} />*/}
        {/*  <p className="ml-2">Report</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default Post;