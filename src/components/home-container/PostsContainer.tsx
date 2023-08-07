'use client'

import React, { useEffect, useState } from "react";

import Post from "~/components/posts/Post";
import PostsSkeleton from "~/components/posts/PostsSkeleton";
import { useSession, useSupabase } from "~/providers/supabase-provider";
import { useCoursesFilters, usePostTypeFilters } from "~/hooks/usePostFilters";
import { usePostsHook } from "~/hooks/usePosts";
import {useSearchQueryHook} from "~/hooks/useSearchQuery";
import {useTriggerPostRefresh} from "~/hooks/useTriggerPostRefresh";

const PostsContainer = () => {

  const [posts, setPosts] = useState([]);
  const {query, getLatestQuery} = useSearchQueryHook()
  const { getLatestPostIds, post_ids } = usePostsHook()
  const {toggleTriggerPostRefresh, triggerPostRefresh} = useTriggerPostRefresh()
  // const [triggerPostsRefresh, setTriggerPostsRefresh] = useState(false);
  const [loading, setLoading] = useState(true)
  const clientSupabase = useSupabase()
  const { postTypesFilters, getLatestPostTypeFilters } = usePostTypeFilters()
  const { coursesFilters, getLatestCoursesFilters, setCoursesFilters } = useCoursesFilters();
  const session = useSession()

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    return () => {
      if (posts.length === 0 && !getLatestQuery()) toggleTriggerPostRefresh();
    };
  }, [query]);
  

  useEffect(() => {
    return () => {
      const getPosts = async () => {
        if (getLatestCoursesFilters().length === 0) {
          const { data: courses_data } = await clientSupabase
            .from('enrollments')
            .select('course')
            .eq('user_id', session?.user.id)
          if (courses_data && courses_data.length > 0) {
            setCoursesFilters(courses_data.filter(course => !course.course.includes('_all_~')).map(course => ({
              courseId: course.course,
              checked: false
            })))
          }
        }
        setLoading(true)
        let queryBuilder = clientSupabase
          .from('posts')
          .select(`
            id,
            user: user_id(user_id, username, profile_pic),
            title,
            date_posted,
            subtitle,
            post_type,
            university,
            department,
            course
          `)

        const filteredPostTypes: string[] = getLatestPostTypeFilters().filter(postTypeFilter => postTypeFilter.checked).map(postTypeFilter => postTypeFilter.postType)
        const filteredCourses: string[] = getLatestCoursesFilters().filter(courseFilter => courseFilter.checked).map(courseFilter => courseFilter.courseId)
        const searchPostIds = getLatestPostIds();


        if (filteredPostTypes.length > 0) queryBuilder = queryBuilder.in('post_type', filteredPostTypes)
        if (filteredCourses.length > 0) queryBuilder = queryBuilder.in('course', filteredCourses)
        if (getLatestQuery() || searchPostIds.length > 0) queryBuilder = queryBuilder.in('id', searchPostIds)

        const { data: posts, error: posts_error } = await queryBuilder
          .order('date_posted', { ascending: false })
        if (posts_error) throw posts_error;
        // console.log(posts)
        setPosts(posts)
        setLoading(false)
      }
      getPosts();
    };
  }, [hasMounted, postTypesFilters, coursesFilters, post_ids, triggerPostRefresh]);


  return (
    <div
      className="flex w-10/12 flex-col gap-4 rounded-xl lg:w-7/12">
      {loading ? (
        <>
          <PostsSkeleton />
          <PostsSkeleton />
          <PostsSkeleton />
        </>
      ) : (
        <>
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </>
      )}
      {/*<Post/>*/}
    </div>
  );
}

export default PostsContainer;
