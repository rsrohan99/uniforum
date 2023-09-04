'use client'

import React, {useEffect, useState} from "react";
import {ChevronDown, ChevronUp, Download, MessageCircle, Share2, Trash} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {useRouter} from "next/navigation";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "~/components/ui/alert-dialog"
import {Popover, PopoverContent, PopoverTrigger,} from "~/components/ui/popover"
import {showErrorToast} from "~/components/posts/Compose";
import toast from "react-hot-toast";
import {useTriggerPostRefresh} from "~/hooks/useTriggerPostRefresh";
import NProgress from "nprogress";
import ShareButtom from "~/components/posts/ShareButtom";
import {useBookmarks} from "~/hooks/useBookmarks";

export function timeAgo(timestamp: string): string {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  const elapsedMilliseconds = currentDate.getTime() - targetDate.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  if (elapsedSeconds < 60) {
    return `${Math.max(elapsedSeconds, 1)} second${elapsedSeconds === 1 ? '' : 's'} ago`;
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
  metadata?: {
    isOpen: boolean,
    currentPolls: {
      option: string,
      count: number,
    }[]
  },
  // }
}


const Post: React.FC<PostProps> = ({
  ...post
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])

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

  const [votesCount, setVotesCount] = useState(0)
  const [repliesCount, setRepliesCount] = useState(0)

  const [updateVotesReplies, setUpdateVotesReplies] = useState(false)
  const [updateSaveStatus, setUpdateSaveStatus] = useState(false)

  const [updatePolls, setUpdatePolls] = useState(false)
  const [metadata, setMetadata] = useState(post.metadata)

  const [userPoll, setUserPoll] = useState("")

  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    return () => {
      const getVotesReplies = async () => {
        const getVotesPromise = supabase
          .from('udvotes')
          .select('vote_value')
          .eq('post_id', post.id)

        const getRepliesPromise = supabase
          .from('comments')
          .select('*', {count: 'exact'})
          .eq('post_id', post.id)

        const getUserVotePromise = supabase
          .from('udvotes')
          .select('vote_value')
          .eq('user_id', session?.user.id)
          .eq('post_id', post.id)

        const {data: userVote} = await getUserVotePromise
        if (userVote && userVote.length >= 1) {
          setIsUpvoted(userVote[0].vote_value === 1)
          setIsDownvoted(userVote[0].vote_value === -1)
        } else {
          setIsUpvoted(false)
          setIsDownvoted(false)
        }

        const {data: votes} = await getVotesPromise
        let total_votes = 0
        if (votes && votes.length >= 1) {
          for (let i = 0; i < votes.length; i++) {
            total_votes += votes[i].vote_value;
          }
        }
        setVotesCount(total_votes)
        const {count: repCount} = await getRepliesPromise
        setRepliesCount(repCount || 0);
      }

      getVotesReplies();
    };
  }, [updateVotesReplies, hasMounted]);

  useEffect(() => {
    return () => {
      const getSaveStatus = async () => {
        const {data} = await supabase
          .from('bookmarks')
          .select('bookmark_id')
          .eq('user_id', session?.user.id)
          .eq('post_id', post.id)
        if (data && data.length >= 1) {
          setIsSaved(true)
        } else setIsSaved(false)
      }
      getSaveStatus();
    };
  }, [updateSaveStatus, hasMounted]);


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
    setUpdateSaveStatus(!updateSaveStatus)
    if (getLatestBookmarks()) toggleTriggerPostRefresh()
  }

  const goToPostPage = () => {
    NProgress.start()
    router.push(`/app/posts/${post.id}`)
  }

  const vote = async (userVote: number) => {
    const {error} = await supabase
      .from('udvotes')
      .insert({
        user_id: session?.user.id,
        post_id: post.id,
        vote_value: userVote
      })
    if (error) {
      if (error.message.includes("duplicate key value")) {
        let updatePromise;

        if ((isDownvoted && userVote === -1) || (isUpvoted && userVote === 1))
          updatePromise = supabase.from('udvotes').delete()
        else updatePromise = supabase.from('udvotes').update({
          vote_value: userVote
        })

        await updatePromise
          .eq('user_id', session?.user.id)
          .eq('post_id', post.id)
        // setVotesCount(0)
      }
    }
    toast.success("Updated Vote", {position: "bottom-right"})
    setUpdateVotesReplies(!updateVotesReplies);
  }

  useEffect(() => {
    return () => {
      const getMetadata = async () => {
        const {data} = await supabase
          .from('posts')
          .select('metadata')
          .eq('id', post.id)
        if (data!==undefined && data && data[0])
          setMetadata(data[0].metadata)
      }
      getMetadata();
    };
  }, [updatePolls]);

  useEffect(() => {
    return () => {
      if (post.post_type !== "Poll") return
      const getMyPolls = async () => {
        const {data} = await supabase
          .from('user_polls')
          .select('poll_option')
          .eq('user_id', session?.user.id)
          .eq('post_id', post.id)
        setUserPoll((data[0]===undefined)? "" : (data[0].poll_option) || "")
        // console.log(data)
      }

      if (post.post_type === "Poll") getMyPolls();
      // console.log("Here")

    };
  }, [hasMounted, updatePolls]);



  const handlePoll = async (option:string) => {
    toast.loading("Submitting Vote on Poll", {id: 'polling', position:"bottom-right"})
    const {error} = await supabase
      .rpc('vote_on_poll', {
        p_poll_id: post.id,
        p_user_id: session?.user.id,
        p_vote_option: option
      })
    toast.remove('polling')
    if (error) {
      if (error.message.includes("duplicate key value violates unique constraint")) {
        showErrorToast("Already Voted")
      }
    } else {
      setUpdatePolls(!updatePolls)
      toast.success("Updated Vote", {position:"bottom-right"})
    }
  }

  const getPercentage = (option: string) => {
    const targetObject = metadata?.currentPolls.find(obj => obj.option === option);

    if (!targetObject) {
      return 33;
    }

    // Calculate the sum of scores for all objects
    const totalScore = metadata?.currentPolls.reduce((acc, obj) => acc + obj.count, 0);

    if (totalScore===undefined) return 33;

    // Calculate the percentage
    return Math.floor((targetObject.count / totalScore) * 100) || 0;
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
      <div>
        <div
          onClick={goToPostPage}
          className="mt-1 flex cursor-pointer">
          <h5
            className="text-xl font-bold text-gray-600 mb-3">{post.title}</h5>
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
        {(post.post_type==="Poll")? (
          <div className="flex flex-col gap-3">
            {
              metadata?.currentPolls.sort((a,b)=>(b.count-a.count)).map(currentPoll => (
                <div
                  onClick={async () => {
                    await handlePoll(currentPoll.option)
                  }}
                  key={currentPoll.option}
                  style={{width: `${getPercentage(currentPoll.option)}%`}}
                  className={`flex flex-row gap-4 justify-between px-4 py-[5px] bg-background rounded-xl text-xs text-muted-foreground font-semibold tracking-wide cursor-pointer ${(userPoll===currentPoll.option)?"ring-1 ring-accent2":""}`}>
                    <span>{currentPoll.option}</span>
                    {/*<span>{currentPoll.count}</span>*/}
                    <span>{getPercentage(currentPoll.option)}%</span>
                </div>
              ))
            }
          </div>
          ):(
          <div
            onClick={goToPostPage}
            className="mt-3 cursor-pointer">
            <p className="text-sm font-medium text-gray-500">{post.subtitle}</p>
          </div>
        )}
      </div>
      <div className="mt-7 flex flex-wrap gap-3 items-center justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center rounded-3xl px-6 py-2 bg-background">
          <ChevronUp onClick={async () => await vote(1)} size={18} className={`${isUpvoted? "text-accent2": "text-slate-500"} cursor-pointer`} />
          <p className="ml-4 text-accent2">{votesCount || "0"}</p>
          <ChevronDown onClick={async () => await vote(-1)} size={18} className={`ml-4 ${isDownvoted? "text-accent2": "text-slate-500" } cursor-pointer`} />
        </div>
        <div className="flex items-center">
          <MessageCircle size={18} />
          <p className="ml-2">{repliesCount} {repliesCount>1?"replies": "reply"}</p>
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
        <div className={`flex items-center hover:text-accent2 cursor-pointer ${isSaved?"text-accent2": "text-muted-foreground"}`}
             onClick={async () => await saveBookmark(post.id)}
        >
          <Download size={18} />
          <p className="ml-2">Save{isSaved?"d":""}</p>
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