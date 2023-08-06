'use client'

import React, {useEffect, useState} from "react";

import Post from "~/components/posts/Post";
import PostsSkeleton from "~/components/posts/PostsSkeleton";
import {useSupabase} from "~/providers/supabase-provider";

const PostsContainer = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const clientSupabase = useSupabase()

  useEffect(() => {
    return () => {
      const getPosts = async () => {
        setLoading(true)
        const {data: posts, error: posts_error} = await clientSupabase
          .from('posts')
          .select(`
            id,
            user: user_id(username, profile_pic),
            title,
            date_posted,
            subtitle,
            post_type,
            university,
            department,
            course
          `)
          .order('date_posted', {ascending: false})
        if (posts_error) throw posts_error;
        // console.log(posts)
        setPosts(posts)
        setLoading(false)
      }
      getPosts();
    };
  }, []);


  return (
    <div
      className="flex w-10/12 flex-col gap-4 rounded-xl lg:w-7/12">
      {loading ? (
        <>
          <PostsSkeleton/>
          <PostsSkeleton/>
          <PostsSkeleton/>
        </>
      ) : (
        <>
          {posts.map(post => (
            <Post key={post.id} {...post}/>
          ))}
        </>
      )}
      {/*<Post/>*/}
    </div>
  );
}

export default PostsContainer;