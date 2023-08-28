'use client'

import React from "react";
import {Trash} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "~/components/ui/alert-dialog"
import toast from "react-hot-toast";
import {showErrorToast} from "~/components/posts/Compose";
import {timeAgo} from "~/components/posts/Post";


export interface ReplyProps {
  comment_id: string,
  user: {
    user_id: string;
    username: string;
    profile_pic: string;
  };
  date_commented: string;
  comment_content: string;
  best_answer: boolean,
  setUpdateComments?: React.Dispatch<React.SetStateAction<boolean>>,
  updateComments?: boolean,
}


const Reply: React.FC<ReplyProps> = ({
  ...comment
}) => {
  // const [hasMounted, setHasMounted] = useState(false);
  // useEffect(() => {
  //   setHasMounted(true);
  // }, [])

  const session = useSession();
  const supabase = useSupabase();
  // const {toggleTriggerPostRefresh} = useTriggerPostRefresh()


  const deleteComment = async () => {
    toast.loading("Deleting Reply", {position: "bottom-right", id: 'deleting'})
    const {error} = await supabase
      .from('comments')
      .delete()
      .eq('comment_id', comment.comment_id)

    if (error) showErrorToast("Error while deleting your post.")
    else {
      toast.remove('deleting')
      toast.success("Reply deleted", {position: "bottom-right"})
      // toggleTriggerPostRefresh();
      if (comment?.setUpdateComments) comment?.setUpdateComments(!comment?.updateComments)
    }

  }

  // const vote = async (userVote: number) => {
  //   const {error} = await supabase
  //     .from('udvotes')
  //     .insert({
  //       user_id: session?.user.id,
  //       post_id: post.id,
  //       vote_value: userVote
  //     })
  //   if (error) {
  //     if (error.message.includes("duplicate key value")) {
  //       let updatePromise;
  //
  //       if ((isDownvoted && userVote === -1) || (isUpvoted && userVote === 1))
  //         updatePromise = supabase.from('udvotes').delete()
  //       else updatePromise = supabase.from('udvotes').update({
  //         vote_value: userVote
  //       })
  //
  //       await updatePromise
  //         .eq('user_id', session?.user.id)
  //         .eq('post_id', post.id)
  //       // setVotesCount(0)
  //     }
  //   }
  //   toast.success("Updated Vote", {position: "bottom-right"})
  //   setUpdateVotesReplies(!updateVotesReplies);
  // }

  return (
    <div
      className="rounded-xl bg-white px-3 pt-0 pb-3 shadow-sm">
      <div className="flex mb-1 flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-6 w-6">
            <AvatarImage src={comment.user.profile_pic}/>
            <AvatarFallback className="bg-background">{comment.user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {/*<img src={post.user.image} alt="user image" className="h-8 w-8 rounded-full" />*/}
          <p className="pl-2 text-xs font-semibold text-gray-500">@{comment.user.username}</p>
        </div>
        <div className="flex items-center">
          <span className="pr-2 text-3xl font-bold pb-[17px] text-accent2">.</span>
          <p className="text-xs font-semibold text-gray-500">{timeAgo(comment.date_commented)}</p>
        </div>
        {/*<div>*/}
        {/*  <p className="rounded-2xl px-4 py-2 text-xs font-bold tracking-wide text-gray-500 bg-background">{post.post_type}</p>*/}
        {/*</div>*/}
        {(comment.user.user_id === session?.user.id) && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash className="cursor-pointer h-8 w-8 p-2 bg-background text-red-400 rounded-full" size={18} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  comment and remove your it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='focus-visible:ring-0 focus-visible:ring-offset-0'>Cancel</AlertDialogCancel>
                <AlertDialogAction className='focus-visible:ring-0 focus-visible:ring-offset-0' onClick={deleteComment}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <div>
        <div
          className="mt-0">
          <p className="text-sm font-medium text-gray-500">{comment.comment_content}</p>
        </div>
      </div>
      {/*<div className="mt-7 flex flex-wrap gap-3 items-center justify-between text-xs font-semibold text-slate-500">*/}
      {/*  <div className="flex items-center rounded-3xl px-6 py-2 bg-background">*/}
      {/*    <ChevronUp onClick={async () => await vote(1)} size={18} className={`${isUpvoted? "text-accent2": "text-slate-500"} cursor-pointer`} />*/}
      {/*    <p className="ml-4 text-accent2">{votesCount || "0"}</p>*/}
      {/*    <ChevronDown onClick={async () => await vote(-1)} size={18} className={`ml-4 ${isDownvoted? "text-accent2": "text-slate-500" } cursor-pointer`} />*/}
      {/*  </div>*/}
      {/*  <div className="flex items-center">*/}
      {/*    <MessageCircle size={18} />*/}
      {/*    <p className="ml-2">{repliesCount} replies</p>*/}
      {/*  </div>*/}
      {/*    <Popover>*/}
      {/*      <PopoverTrigger>*/}
      {/*        <div className="flex items-center hover:text-accent2">*/}
      {/*          <Share2 size={18} />*/}
      {/*          <p className="ml-2">Share</p>*/}
      {/*        </div>*/}
      {/*      </PopoverTrigger>*/}
      {/*      <PopoverContent className="w-full text-muted-foreground">*/}
      {/*        <ShareButtom link={`${location.href}/app/posts/${post.id}`}/>*/}
      {/*      </PopoverContent>*/}
      {/*    </Popover>*/}
      {/*  <div className={`flex items-center hover:text-accent2 cursor-pointer ${isSaved?"text-accent2": "text-muted-foreground"}`}*/}
      {/*       onClick={async () => await saveBookmark(post.id)}*/}
      {/*  >*/}
      {/*    <Download size={18} />*/}
      {/*    <p className="ml-2">Save{isSaved?"d":""}</p>*/}
      {/*  </div>*/}
        {/*<div className="flex items-center">*/}
        {/*  <Flag size={18} />*/}
        {/*  <p className="ml-2">Report</p>*/}
        {/*</div>*/}
      {/*</div>*/}
    </div>
  );
}

export default Reply;