'use client'

import React, {useEffect, useState} from "react";

import Post, {PostProps} from "~/components/Post";
import {clientSupabase} from "~/server/supabase/supabaseClient";
import PostsSkeleton from "~/components/posts/PostsSkeleton";

const PostsContainer = () => {

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true)

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
            hierarchy,
            content,
            post_type
          `)
        if (posts_error) throw posts_error;
        // console.log(posts)
        setPosts(posts)
        setLoading(false)
      }
      getPosts();
    };
  }, []);


  // const posts = [
  //   {
  //     id: 'p1',
  //     user: {
  //       name: "JohnDoe",
  //       avatar: "https://picsum.photos/200/300"
  //     },
  //     title: "Conference on Computer Vision will be held on tomorrow",
  //     timestamp: 1690293118,
  //     hierarchy: "BUET/CSE",
  //     body: "A conference on computer vision will be held on tomorrow at 10:00 AM, 21st January, 2023, arranged by CSE, BUET. All the students are requested to join the conference.",
  //     tags: ["python", "js", "c++"],
  //     upvotes: 220,
  //     replies: 5
  //   }
  // ]
  return (
    <div
      className="w-10/12 lg:w-7/12 flex rounded-xl flex-col gap-4">
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