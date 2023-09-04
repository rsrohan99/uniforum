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
  post_info: {
    id: string,
    user_id: string,
    post_type: string,
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

  const updateBestAnswer = () => {
    toast.loading("Updating Best Answer", {position: "bottom-right", id: 'best-answer'})
    const queryToSetFalse = supabase
      .from('comments')
      .update({best_answer: false})
      .neq('comment_id', comment.comment_id)
      .eq('post_id', comment.post_info.id)

    const queryToUpdate = supabase
      .from('comments')
      .update({best_answer: !comment.best_answer})
      .eq('comment_id', comment.comment_id)

    Promise.all([queryToSetFalse, queryToUpdate])
      .then(() => {
        toast.remove('best-answer')
        toast.success("Updated Best Answer", {position: "bottom-right"})
        if (comment?.setUpdateComments) comment?.setUpdateComments(!comment?.updateComments)
      })
      .catch(() => {
          toast.remove('best-answer')
          showErrorToast("Error while updating best answer.")
      })

    // const {error} = await queryToSetFalse
    // const {error: error2} = await queryToUpdate
    //
    // if (error || error2) {
    //   toast.remove('best-answer')
    //   showErrorToast("Error while updating best answer.")
    //   return
    // }
    // toast.remove('best-answer')
    // toast.success("Updated Best Answer", {position: "bottom-right"})

    // else {
    //   toast.remove('deleting')
    //   toast.success("Reply deleted", {position: "bottom-right"})
    //   // toggleTriggerPostRefresh();
    //   if (comment?.setUpdateComments) comment?.setUpdateComments(!comment?.updateComments)
    // }
  }

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
        {(comment.post_info.user_id===session?.user.id && comment.post_info.post_type==="Q&A") && (
          <div
            onClick={updateBestAnswer}
            className={`rounded-xl text-xs ${comment.best_answer? "bg-green-400 text-white":"bg-background text-muted-foreground"} font-semibold tracking-wide px-3 py-1 hover:text-white hover:bg-green-400 cursor-pointer`}
          >{comment.best_answer? "Best Answer": "Set Best Answer"}</div>
        )}
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
    </div>
  );
}

export default Reply;