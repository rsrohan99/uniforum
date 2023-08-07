'use client'
import Post from "~/components/posts/Post";
import React, {useEffect, useState} from "react";
import {useSupabase} from "~/providers/supabase-provider";
import PostsSkeleton from "~/components/posts/PostsSkeleton";
import '~/styles/w-md.css'
import 'katex/dist/katex.css';
import {MDEditor} from "~/components/posts/Compose";
import {codeComponent} from "~/components/posts/Compose";
import PostsSkeletonFull from "~/components/posts/PostSkeletonFull";


export default function PostPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const clientSupabase = useSupabase()
  const [post, setPost] = useState<any>()

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
            user: user_id(username, profile_pic),
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
  return (
    <div className='mx-auto pt-20 w-10/12 flex-col gap-3 rounded-xl lg:w-7/12'>
      {loading ? (
        <PostsSkeletonFull/>
      ) : (
        <>
          <div className='mb-2'>
            <Post {...post}/>
          </div>
          <MDEditor previewOptions={{components: {code: codeComponent}}} height={500} hideToolbar={true} preview={'preview'} value={post.content}/>
        </>
      )}
    </div>
  )
}