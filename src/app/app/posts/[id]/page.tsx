'use client'
import Post from "~/components/posts/Post";
import React, {useEffect, useState} from "react";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import PostsSkeleton from "~/components/posts/PostsSkeleton";
import '~/styles/w-md.css'
import 'katex/dist/katex.css';
import {MDEditor} from "~/components/posts/Compose";
import {codeComponent} from "~/components/posts/Compose";
import PostsSkeletonFull from "~/components/posts/PostSkeletonFull";
import {Textarea} from "~/components/ui/textarea";
import {Button} from "~/components/ui/button";
import {MessageCircle, UploadIcon} from "lucide-react";
import toast from "react-hot-toast";
import Reply, {ReplyProps} from "~/components/posts/Reply";


export default function PostPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const clientSupabase = useSupabase()
  const session = useSession()
  const [post, setPost] = useState<any>()
  const [commentBody, setCommentBody] = useState("")

  const [updateComments, setUpdateComments] = useState(false);
  const [replies, setReplies] = useState<ReplyProps[]>([])

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    return () => {
      const getPost = async () => {
        setLoading(true)

        const {data: posts, error: post_error} = await clientSupabase
          .from('posts')
          .select(`
            id,
            user: user_id(user_id, username, profile_pic),
            title,
            date_posted,
            subtitle,
            content,
            post_type,
            university,
            department,
            course
          `)
          .eq('id', params.id)
        if (post_error) throw post_error;
        // console.log(posts)
        if (posts && posts.length>0) setPost(posts[0])
        setLoading(false)
      }
      getPost();
    };
  }, [hasMounted]);

  useEffect(() => {
    return () => {
      const getComments = async () => {
        const {data:comments} = await clientSupabase
          .from('comments')
          .select(`
            comment_id,
            user:user_id(user_id, username, profile_pic),
            best_answer,
            comment_content,
            date_commented
          `)
          .eq('post_id', params.id)
          .order('best_answer', { ascending: true })
          .order('date_commented', { ascending: false })

        setReplies(comments || null)
      }
      getComments();
    };
  }, [hasMounted, updateComments]);


  const handleComment = async () => {
    toast.loading("Posting Comment...", {position: "bottom-right", id: 'commenting'})
    await clientSupabase
      .from('comments')
      .insert({
        user_id: session?.user.id,
        post_id: params.id,
        comment_content: commentBody
      })
    setUpdateComments(!updateComments)
    setCommentBody("")
    toast.remove('commenting')
    toast.success("Comment Posted", {position: "bottom-right"})
  }

  return (
    <div className='mx-auto pt-20 w-10/12 flex-col gap-3 rounded-xl lg:w-7/12'>
      {loading ? (
        <PostsSkeletonFull/>
      ) : (
        <>
          <div className='mb-2'>
            <Post {...post}/>
          </div>
          {(post.post_type==='Discussion' || post.post_type==="Q&A") && (
            <MDEditor previewOptions={{components: {code: codeComponent}}} height={500} hideToolbar={true} preview={'preview'} value={post.content}/>
          )}
          {(replies.length >= 1) ? (
            <>
              <div className="my-4 flex flex-row justify-center align-middle text-muted-foreground text-sm font-medium tracking-wide">
                Replies
              </div>
              <div className="mt-2 mb-5 flex flex-col gap-4">
                {replies.map(reply => (
                  <Reply key={reply.comment_id} {...{...reply, updateComments, setUpdateComments}} />
                ))}
              </div>
            </>
          ):(
            <div className="my-5 flex flex-row justify-center align-middle text-muted-foreground text-sm font-medium tracking-wide">
              No Replies yet
            </div>
          )}
          <div className="my-4 flex flex-row justify-center align-middle text-muted-foreground text-sm font-medium tracking-wide">
            Add Reply
          </div>
          <Textarea
            className="my-4 h-1 rounded-xl bg-white font-medium placeholder:text-md tracking-wide placeholder:text-gray-400 text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={'Add Reply'} value={commentBody} onChange={(e) => setCommentBody(e.target.value)}/>
          <Button
            onClick={handleComment}
            className="
              mb-5
              px-7
              h-8
              rounded-xl
              bg-white
              hover:bg-accent2
              hover:text-white
              tracking-wider
              font-bold
              text-gray-500"
          ><span className="mr-2"><MessageCircle size={18}/></span>Post Reply</Button>
        </>
      )}
    </div>
  )
}